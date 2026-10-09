// packages/core/src/decision/decide.ts
// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Carmen María Buendía Sánchez
// ============================================================================
// Sicilia Soil — Decision wrapper
// ----------------------------------------------------------------------------
// Pre-wires SiciliaSoilAdapter + DECISION_RULES_V1 with the generic engine.
// Customizes headline + explanation to Spanish domain language.
// ============================================================================

import {
  decide as decideGeneric,
  type DecisionOutput,
  type DecisionRule,
  type DecisionState,
  type InputConflict,
} from "@sicilia-soil/decision";
import type { DecisionEvidence } from "../types/decision.types";
import { SiciliaSoilAdapter } from "./sicilia-soil.adapter";
import { DECISION_RULES_V1 } from "./rules.v1";

// ---------------------------------------------------------------------------
// Sicilia Soil — natural language builders
// ---------------------------------------------------------------------------

function buildHeadline(state: DecisionState): string {
  switch (state) {
    case "green":
      return "🟢 Hoy no intervengas";
    case "yellow":
      return "🟡 Vigila, puede que necesites actuar";
    case "red":
      return "🔴 Actúa hoy";
    case "unknown":
      return "⚪ Faltan datos para decidir";
  }
}

function buildExplanation(
  state: DecisionState,
  fired: { rule: DecisionRule; weight: number }[],
): string {
  if (fired.length === 0) {
    return "No hay suficiente información para tomar una decisión fiable.";
  }
  const top = fired
    .slice()
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map((f) => `• ${f.rule.label.toLowerCase()}`)
    .join("\n");

  const intro =
    state === "green"
      ? "Todo apunta a que hoy no hace falta intervenir:"
      : state === "yellow"
        ? "Hay señales que conviene vigilar:"
        : "Hay señales claras de que hay que actuar:";

  return `${intro}\n${top}`;
}

function buildConfidence(
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

// ---------------------------------------------------------------------------
// Wrapper
// ---------------------------------------------------------------------------

export function decide(
  evidence: DecisionEvidence,
  weights?: Map<string, number>,
): DecisionOutput {
  return decideGeneric(evidence, DECISION_RULES_V1, SiciliaSoilAdapter, {
    weights,
    headlineBuilder: buildHeadline,
    explanationBuilder: buildExplanation,
    confidenceCalculator: buildConfidence,
    ruleVersion: "v1.0",
  });
}
