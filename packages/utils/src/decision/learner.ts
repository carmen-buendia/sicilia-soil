// packages/utils/src/decision/learner.ts

// ============================================================================
// Sicilia Soil — Decision learner
// ----------------------------------------------------------------------------
// Adjusts rule weights based on:
//   • Satellite verification (Capa 1, automática, 7 días después)
//   • Implicit feedback from operations (Capa 2, sin preguntar)
//   • Contextual questions when uncertain (Capa 3, 1/semana máx)
//
// Runs as a cron job, NOT on user request.
// ============================================================================

import type { AnyOperation } from "@sicilia-soil/core";

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

export interface InferredFeedback {
  followed: boolean | null;
  source: "implicit_operations" | "satellite_verification" | "explicit_user";
  confidence: number; // 0-1
}

export interface DecisionForLearning {
  id: string;
  state: "green" | "yellow" | "red" | "unknown";
  suggestedTaskType?: string;
  firedRuleIds: string[];
}

// ----------------------------------------------------------------------------
// Infer feedback without asking the user
// ----------------------------------------------------------------------------

export function inferFeedback(
  decision: DecisionForLearning,
  operations: AnyOperation[],
  daysSinceDecision: number,
): InferredFeedback {
  const irrigations = operations.filter((o) => o.kind === "irrigation");
  const inputs = operations.filter((o) => o.kind === "input");
  const action = decision.suggestedTaskType;

  // Decisión VERDE (no intervengas)
  if (decision.state === "green") {
    if (irrigations.length > 0 || inputs.length > 0) {
      return {
        followed: false,
        source: "implicit_operations",
        confidence: 0.7,
      };
    }
    if (daysSinceDecision >= 3) {
      return { followed: true, source: "implicit_operations", confidence: 0.6 };
    }
    return { followed: null, source: "implicit_operations", confidence: 0.3 };
  }

  // Decisión con acción específica
  if (action === "irrigate") {
    if (irrigations.length > 0)
      return { followed: true, source: "implicit_operations", confidence: 0.9 };
    if (daysSinceDecision >= 2)
      return {
        followed: false,
        source: "implicit_operations",
        confidence: 0.7,
      };
  }

  if (action === "fertilize") {
    if (inputs.length > 0)
      return { followed: true, source: "implicit_operations", confidence: 0.9 };
    if (daysSinceDecision >= 4)
      return {
        followed: false,
        source: "implicit_operations",
        confidence: 0.7,
      };
  }

  return { followed: null, source: "implicit_operations", confidence: 0.2 };
}

// ----------------------------------------------------------------------------
// Update rule weights
// ----------------------------------------------------------------------------

function clamp(v: number, min = 0.1, max = 3.0): number {
  return Math.max(min, Math.min(max, v));
}

export function adjustWeights(
  firedRuleIds: string[],
  feedback: InferredFeedback,
  satelliteCorrect: boolean | null,
  currentWeights: Map<string, number>,
): Map<string, number> {
  const ε = 0.05;
  const updated = new Map(currentWeights);

  // Capa 1: verificación satelital (peso fuerte, 2x)
  if (satelliteCorrect !== null) {
    const delta = satelliteCorrect ? +ε * 2 : -ε * 2;
    for (const ruleId of firedRuleIds) {
      updated.set(ruleId, clamp((updated.get(ruleId) ?? 1.0) + delta));
    }
  }

  // Capa 2: feedback implícito (peso medio, solo si confianza >= 0.6)
  if (feedback.followed !== null && feedback.confidence >= 0.6) {
    const delta = feedback.followed ? +ε : -ε;
    for (const ruleId of firedRuleIds) {
      updated.set(ruleId, clamp((updated.get(ruleId) ?? 1.0) + delta));
    }
  }

  return updated;
}

// ----------------------------------------------------------------------------
// Learning summary (para el panel "wow")
// ----------------------------------------------------------------------------

export interface LearningSummary {
  totalDecisions: number;
  totalVerified: number;
  accuracy: number;
  accuracy30dAgo?: number;
  headline: string;
}

export function buildLearningSummary(
  totalDecisions: number,
  totalVerified: number,
  correct: number,
  accuracy30dAgo?: number,
): LearningSummary {
  const accuracy = totalVerified > 0 ? correct / totalVerified : 0;
  const pct = Math.round(accuracy * 100);
  const trend =
    accuracy30dAgo !== undefined
      ? accuracy > accuracy30dAgo
        ? " ↑"
        : accuracy < accuracy30dAgo
          ? " ↓"
          : ""
      : "";

  return {
    totalDecisions,
    totalVerified,
    accuracy,
    accuracy30dAgo,
    headline: `El sistema ha aprendido de ${totalDecisions} decisiones. Precisión: ${pct}%${trend}`,
  };
}
