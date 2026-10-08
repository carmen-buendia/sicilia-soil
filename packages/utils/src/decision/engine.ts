// packages/utils/src/decision/engine.ts

// ============================================================================
// Sicilia Soil — Decision engine v1
// ----------------------------------------------------------------------------
// Reads evidence, applies rules with weights, produces a DecisionOutput.
// Simple, transparent, explainable. No ML. No magic.
// ============================================================================

import type {
  DecisionContext,
  DecisionEvidence,
  DecisionOutput,
  DecisionRule,
  DecisionState,
  InputConflict,
  EvidenceSource,
} from "@sicilia-soil/core";
import { DECISION_RULES_V1 } from "./rules.v1";

// ----------------------------------------------------------------------------
// Evidence readers
// ----------------------------------------------------------------------------

function readField(
  evidence: DecisionEvidence,
  path: string,
): number | undefined {
  if (path === "sensors.soil_moisture")
    return evidence.sensors.find((s) => s.sensorType === "soil_moisture")
      ?.value;
  if (path === "sensors.soil_temperature")
    return evidence.sensors.find((s) => s.sensorType === "soil_temperature")
      ?.value;
  if (path === "eoIndices.NDVI")
    return evidence.eoIndices.find((e) => e.indexType === "NDVI")?.value;
  if (path === "eoIndices.NDWI")
    return evidence.eoIndices.find((e) => e.indexType === "NDWI")?.value;
  if (path === "eoIndices.LST")
    return evidence.eoIndices.find((e) => e.indexType === "LST")?.value;
  if (path === "weather.rainNext72hMm") return evidence.weather?.rainNext72hMm;
  if (path === "kpis.mycorrhiza_colonisation")
    return evidence.kpis.find((k) => k.kpiKey === "mycorrhiza_colonisation")
      ?.value;
  if (path === "kpis.glomalin")
    return evidence.kpis.find((k) => k.kpiKey === "glomalin")?.value;
  return undefined;
}

function evaluateCondition(
  actual: number | undefined,
  operator: string,
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

// ----------------------------------------------------------------------------
// Rule evaluation
// ----------------------------------------------------------------------------

interface FiredRule {
  rule: DecisionRule;
  weight: number;
}

function evaluateRule(
  rule: DecisionRule,
  evidence: DecisionEvidence,
  weights: Map<string, number>,
): FiredRule | null {
  if (!rule.active) return null;
  for (const condition of rule.conditions) {
    const actual = readField(evidence, condition.field);
    if (!evaluateCondition(actual, condition.operator, condition.value))
      return null;
  }
  const weight = weights.get(rule.id) ?? 1.0;
  return { rule, weight };
}

// ----------------------------------------------------------------------------
// Conflict detection
// ----------------------------------------------------------------------------

function detectConflicts(evidence: DecisionEvidence): InputConflict[] {
  const conflicts: InputConflict[] = [];
  const ssm = evidence.eoIndices.find((e) => e.indexType === "SSM")?.value;
  const iotMoisture = evidence.sensors.find(
    (s) => s.sensorType === "soil_moisture",
  )?.value;

  if (
    ssm !== undefined &&
    iotMoisture !== undefined &&
    Math.abs(ssm - iotMoisture) > 20
  ) {
    conflicts.push({
      sources: ["sentinel1", "iot"],
      description: `El satélite dice ${ssm.toFixed(0)}% de humedad y el sensor de campo dice ${iotMoisture.toFixed(0)}%`,
      resolution: "weighted",
    });
  }
  return conflicts;
}

// ----------------------------------------------------------------------------
// Natural language
// ----------------------------------------------------------------------------

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
  fired: FiredRule[],
  _conflicts: InputConflict[],
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

function buildSuggestedAction(
  state: DecisionState,
  fired: FiredRule[],
): string | undefined {
  if (state === "green") return undefined;
  const ruleIds = new Set(fired.map((f) => f.rule.id));
  if (ruleIds.has("soil_dry_no_rain"))
    return "Riega hoy. El suelo está seco y no hay lluvia prevista en 72 h.";
  if (ruleIds.has("mycorrhiza_declining") || ruleIds.has("glomalin_low"))
    return "Añade compost o purín para reforzar la red micorrícica.";
  if (ruleIds.has("lst_heat_stress"))
    return "Comprueba el estado de las hojas y considera una cubierta vegetal.";
  if (ruleIds.has("ndvi_dropping") || ruleIds.has("ndwi_canopy_stress"))
    return "Revisa el riego y observa posibles plagas en las próximas 48 h.";
  return "Revisa la parcela para confirmar el estado.";
}

function buildImpact(
  state: DecisionState,
  fired: FiredRule[],
): string | undefined {
  if (state !== "green") return undefined;
  const ruleIds = new Set(fired.map((f) => f.rule.id));
  if (ruleIds.has("soil_wet_rain_coming"))
    return "Ahorro estimado: 1.000-1.500 L de agua";
  return "Día de descanso del sistema";
}

function computeConfidence(
  fired: FiredRule[],
  state: DecisionState,
  conflicts: InputConflict[],
): number {
  if (fired.length === 0) return 0;
  const winners = fired.filter((f) => f.rule.votesFor === state);
  const total = fired.reduce((acc, f) => acc + f.weight, 0);
  const winnerWeight = winners.reduce((acc, f) => acc + f.weight, 0);
  if (total === 0) return 0;
  const ratio = winnerWeight / total;

  // Base confidence in range 0.4 - 0.95
  const base = 0.4 + ratio * 0.55;

  // Penalize 15 percentage points per conflict (floor at 0.30)
  const conflictPenalty = conflicts.length * 0.15;
  const final = Math.max(0.3, Math.min(0.95, base - conflictPenalty));

  return Math.round(final * 100) / 100;
}

// ----------------------------------------------------------------------------
// Main engine
// ----------------------------------------------------------------------------

export function decide(
  context: DecisionContext,
  evidence: DecisionEvidence,
  weights?: Map<string, number>,
): DecisionOutput {
  const weightsMap = weights ?? new Map<string, number>();

  const fired: FiredRule[] = [];
  for (const rule of DECISION_RULES_V1) {
    const result = evaluateRule(rule, evidence, weightsMap);
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

  const conflicts = detectConflicts(evidence);
  const confidence = computeConfidence(fired, state, conflicts);

  const sourcesUsed: EvidenceSource[] = [];
  if (evidence.eoIndices.length) sourcesUsed.push("sentinel2");
  if (evidence.sensors.length) sourcesUsed.push("iot");
  if (evidence.weather) sourcesUsed.push("weather");
  if (evidence.history) sourcesUsed.push("historical");

  return {
    state,
    confidence,
    headline: buildHeadline(state),
    explanation: buildExplanation(state, fired, conflicts),
    suggestedAction: buildSuggestedAction(state, fired),
    impact: buildImpact(state, fired),
    firedRules: fired.map((f) => ({
      ruleId: f.rule.id,
      weight: f.weight,
      vote: f.rule.votesFor,
    })),
    sourcesUsed,
    conflicts,
    ruleVersion: "v1.0",
  };
}
