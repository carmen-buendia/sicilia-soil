// packages/decision/src/learner.ts
// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Sicilia Soil Contributors

export interface LearningSignal {
  firedRuleIds: string[];
  correct: boolean | null;
  epsilon?: number;
  strength?: number;
}

export interface WeightState {
  ruleId: string;
  weight: number;
  timesApplied: number;
  timesCorrect: number;
  timesWrong: number;
  lastUpdatedAt: string;
}

function clamp(v: number, min = 0.1, max = 3.0): number {
  return Math.max(min, Math.min(max, v));
}

export function updateWeights(
  currentWeights: Map<string, number>,
  signals: LearningSignal[],
): Map<string, number> {
  const updated = new Map(currentWeights);
  for (const signal of signals) {
    if (signal.correct === null) continue;
    const epsilon = signal.epsilon ?? 0.05;
    const strength = signal.strength ?? 2;
    const delta = signal.correct ? +epsilon * strength : -epsilon * strength;
    for (const ruleId of signal.firedRuleIds) {
      updated.set(ruleId, clamp((updated.get(ruleId) ?? 1.0) + delta));
    }
  }
  return updated;
}

export function buildLearningSummary(
  totalDecisions: number,
  totalVerified: number,
  correct: number,
  accuracy30dAgo?: number,
): {
  totalDecisions: number;
  totalVerified: number;
  accuracy: number;
  headline: string;
} {
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
    headline: `System learned from ${totalDecisions} decisions. Accuracy: ${pct}%${trend}`,
  };
}
