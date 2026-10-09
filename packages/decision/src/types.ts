// packages/decision/src/types.ts
// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Sicilia Soil Contributors

export type DecisionState = "green" | "yellow" | "red" | "unknown";

export type RuleOperator =
  | "lt"
  | "lte"
  | "gt"
  | "gte"
  | "eq"
  | "neq"
  | "between"
  | "outside"
  | "change_gt"
  | "change_lt"
  | "trend_up"
  | "trend_down";

export interface RuleCondition {
  field: string;
  operator: RuleOperator;
  value: number | [number, number];
}

export interface DecisionRule {
  id: string;
  label: string;
  conditions: RuleCondition[];
  votesFor: DecisionState;
  baseConfidence: number;
  criteria: string[];
  version: number;
  active: boolean;
}

export interface FiredRule {
  ruleId: string;
  weight: number;
  vote: DecisionState;
}

export interface InputConflict {
  sources: string[];
  description: string;
  resolution: "weighted" | "priority" | "ignored";
}

export interface DecisionOutput {
  state: DecisionState;
  confidence: number;
  headline: string;
  explanation: string;
  suggestedAction?: string;
  impact?: string;
  firedRules: FiredRule[];
  sourcesUsed: string[];
  conflicts: InputConflict[];
  ruleVersion: string;
}
