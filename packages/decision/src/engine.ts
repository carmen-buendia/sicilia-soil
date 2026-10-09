// packages/decision/src/engine.ts
// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Sicilia Soil Contributors

// ============================================================================
// @sicilia-soil/decision — Generic engine
// ----------------------------------------------------------------------------
// Deterministic, explainable, no ML.
// ============================================================================

import type {
  DecisionRule,
  DecisionState,
  DecisionOutput,
  RuleCondition,
  InputConflict,
} from "./types";
import type { EvidenceAdapter } from "./adapter";

export interface EngineOptions {
  weights?: Map<string, number>;
  headlineBuilder?: (state: DecisionState) => string;
  explanationBuilder?: (
    state: DecisionState,
    fired: { rule: DecisionRule; weight: number }[],
  ) => string;
  confidenceCalculator?: (
    fired: { rule: DecisionRule; weight: number }[],
    state: DecisionState,
    conflicts: InputConflict[],
  ) => number;
  ruleVersion?: string;
}

function evaluateCondition(
  actual: number | undefined,
  operator: RuleCondition["operator"],
  target: number | [number, number],
): boolean {
  if (actual === undefined) return false;
  switch (operator) {
    case "lt":
      return actual < (target as number);
    case "lte":
      return actual <= (target as number);
    case "gt":
      return actual > (target as number);
    case "gte":
      return actual >= (target as number);
    case "eq":
      return actual === (target as number);
    case "neq":
      return actual !== (target as number);
    case "between": {
      const [min, max] = target as [number, number];
      return actual >= min && actual <= max;
    }
    case "outside": {
      const [min, max] = target as [number, number];
      return actual < min || actual > max;
    }
    default:
      return false;
  }
}

function evaluateRule<TEvidence>(
  rule: DecisionRule,
  evidence: TEvidence,
  adapter: EvidenceAdapter<TEvidence>,
  weights: Map<string, number>,
): { rule: DecisionRule; weight: number } | null {
  if (!rule.active) return null;
  for (const condition of rule.conditions) {
    const actual = adapter.read(evidence, condition.field);
    if (!evaluateCondition(actual, condition.operator, condition.value)) {
      return null;
    }
  }
  const weight = weights.get(rule.id) ?? 1.0;
  return { rule, weight };
}

function defaultHeadline(state: DecisionState): string {
  switch (state) {
    case "green":
      return "🟢 All good";
    case "yellow":
      return "🟡 Watch";
    case "red":
      return "🔴 Act now";
    case "unknown":
      return "⚪ Not enough data";
  }
}

function defaultExplanation(
  state: DecisionState,
  fired: { rule: DecisionRule; weight: number }[],
): string {
  if (fired.length === 0) return "Not enough data to decide.";
  return fired
    .slice()
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map((f) => `• ${f.rule.label}`)
    .join("\n");
}

function defaultConfidence(
  fired: { rule: DecisionRule; weight: number }[],
  state: DecisionState,
  conflicts: InputConflict[],
): number {
  if (fired.length === 0) return 0;
  const winners = fired.filter((f) => f.rule.votesFor === state);
  const total = fired.reduce((acc, f) => acc + f.weight, 0);
  const winnerWeight = winners.reduce((acc, f) => acc + f.weight, 0);
  if (total === 0) return 0;
  const ratio = winnerWeight / total;
  const base = 0.4 + ratio * 0.55;
  const penalty = conflicts.length * 0.15;
  return Math.round(Math.max(0.3, Math.min(0.95, base - penalty)) * 100) / 100;
}

export function decide<TEvidence>(
  evidence: TEvidence,
  rules: DecisionRule[],
  adapter: EvidenceAdapter<TEvidence>,
  options: EngineOptions = {},
): DecisionOutput {
  const weights = options.weights ?? new Map<string, number>();
  const headlineBuilder = options.headlineBuilder ?? defaultHeadline;
  const explanationBuilder = options.explanationBuilder ?? defaultExplanation;
  const confidenceCalculator =
    options.confidenceCalculator ?? defaultConfidence;
  const ruleVersion = options.ruleVersion ?? "v1.0";

  const fired: { rule: DecisionRule; weight: number }[] = [];
  for (const rule of rules) {
    const result = evaluateRule(rule, evidence, adapter, weights);
    if (result) fired.push(result);
  }

  const votes: Record<DecisionState, number> = {
    green: 0,
    yellow: 0,
    red: 0,
    unknown: 0,
  };
  for (const f of fired) votes[f.rule.votesFor] += f.weight;

  let state: DecisionState = "unknown";
  let maxVote = 0;
  (Object.keys(votes) as DecisionState[]).forEach((k) => {
    if (votes[k] > maxVote) {
      maxVote = votes[k];
      state = k;
    }
  });

  const conflicts = adapter.detectConflicts?.(evidence) ?? [];
  const confidence = confidenceCalculator(fired, state, conflicts);
  const sourcesUsed = adapter.sourcesUsed?.(evidence) ?? [];

  return {
    state,
    confidence,
    headline: headlineBuilder(state),
    explanation: explanationBuilder(state, fired),
    firedRules: fired.map((f) => ({
      ruleId: f.rule.id,
      weight: f.weight,
      vote: f.rule.votesFor,
    })),
    sourcesUsed,
    conflicts,
    ruleVersion,
  };
}
