// packages/core/src/decision/index.ts
// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Carmen María Buendía Sánchez
export * from "./rules.v1";
export * from "./sicilia-soil.adapter";

// Re-export the generic engine types so consumers only need @sicilia-soil/core
export type {
  DecisionOutput,
  DecisionState,
  DecisionRule,
  RuleCondition,
  RuleOperator,
  FiredRule,
  InputConflict,
} from "@isola-node/rule-engine";
