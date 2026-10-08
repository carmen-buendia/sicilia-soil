// packages/core/src/types/decision.types.ts

// ============================================================================
// Sicilia Soil — Decision layer
// ----------------------------------------------------------------------------
// Thin layer on top of existing types (EOIndexValue, SensorReading, KPIStatus).
// Supports the feedback loop that makes the DDS *learn* over time.
//
// Design principles:
//   - Reuse existing types: never redefine what's in eo/iot/kpi/spatial
//   - Explainable: every decision carries its evidence and rule weights
//   - Learnable: rules have weights adjusted by user feedback + verification
//   - Polymorphic: applies to farm | zone | plot | bed
// ============================================================================

import type { KPIStatus, DDSCriterion } from "./kpi.types";
import type { SpatialTargetType } from "./spatial.types";
import type { EOIndexType } from "./eo.types";
import type { SensorType, ReadingQuality } from "./iot.types";

// ----------------------------------------------------------------------------
// Decision state (semaphore)
// ----------------------------------------------------------------------------

/**
 * The "traffic light" state shown on the Daily Decision Card.
 * Maps conceptually to KPIStatus but with a user-facing naming.
 */
export type DecisionState = "green" | "yellow" | "red" | "unknown";

/**
 * Origin of a piece of evidence.
 * Not an enum of types — an enum of *sources*, so we can weight by reliability.
 */
export type EvidenceSource =
  | "sentinel1"
  | "sentinel2"
  | "sentinel3"
  | "iot"
  | "weather"
  | "historical"
  | "observation";

// ----------------------------------------------------------------------------
// Decision context (what's being decided about)
// ----------------------------------------------------------------------------

export interface DecisionContext {
  farmId: string;
  scopeType: SpatialTargetType; // farm | zone | plot | bed
  scopeId: string;
  scopeName: string;
  /** Species on this scope, if applicable */
  speciesId?: string;
  /** Phenological stage if known */
  stage?: string;
  /** Area in m² for impact calculations */
  areaM2?: number;
  criteria: DDSCriterion[]; // which DDS criteria this decision serves
}

// ----------------------------------------------------------------------------
// Evidence (reuses existing types)
// ----------------------------------------------------------------------------

export interface EOEvidence {
  indexType: EOIndexType;
  value: number;
  timestamp: string;
  validPixelPercent?: number;
  source: Extract<EvidenceSource, "sentinel1" | "sentinel2" | "sentinel3">;
}

export interface SensorEvidence {
  sensorId: string;
  sensorType: SensorType;
  value: number;
  unit: string;
  timestamp: string;
  quality: ReadingQuality;
}

export interface KPIEvidence {
  kpiKey: string;
  value: number;
  unit: string;
  status: KPIStatus;
}

export interface ObservationEvidence {
  observationId: string;
  type: string;
  severity: string;
  timestamp: string;
}

export interface WeatherEvidence {
  /** Rain forecast next 72h in mm */
  rainNext72hMm: number;
  tempMaxC: number;
  tempMinC: number;
  timestamp: string;
  source: "open-meteo" | "manual";
}

export interface DecisionEvidence {
  eoIndices: EOEvidence[];
  sensors: SensorEvidence[];
  kpis: KPIEvidence[];
  observations: ObservationEvidence[];
  weather?: WeatherEvidence;
  /** Historical values for trend detection */
  history?: {
    ndvi7d?: number[];
    soilMoisture7d?: number[];
    decisionsLast30d?: DecisionState[];
  };
}

// ----------------------------------------------------------------------------
// Rules (declarative, weighted)
// ----------------------------------------------------------------------------

export type RuleOperator =
  | "lt"
  | "lte"
  | "gt"
  | "gte"
  | "eq"
  | "neq"
  | "between"
  | "outside"
  | "trend_up"
  | "trend_down";

/**
 * A single condition on a specific evidence field.
 */
export interface RuleCondition {
  /** Which evidence field to read (dot path, e.g. "sensors.soil_moisture" or "eoIndices.NDVI") */
  field: string;
  operator: RuleOperator;
  /** Threshold or [min, max] */
  value: number | [number, number];
}

/**
 * A rule combines conditions and votes for a state.
 * Rule weight starts at 1.0 and is adjusted by the learner.
 */
export interface DecisionRule {
  id: string;
  label: string;
  conditions: RuleCondition[]; // all must be true (AND)
  /** What state this rule votes for */
  votesFor: DecisionState;
  /** Base confidence contribution (before learning) */
  baseConfidence: number;
  /** Criteria this rule serves */
  criteria: DDSCriterion[];
  /** Version — bump when rule logic changes */
  version: number;
  /** Is this rule active? */
  active: boolean;
}

/**
 * Runtime state of a rule (learned).
 * Stored separately so the definition stays clean.
 */
export interface RuleWeight {
  ruleId: string;
  weight: number; // starts 1.0, adjusted by learner
  timesApplied: number;
  timesCorrect: number; // rule's vote matched observed outcome
  timesWrong: number;
  lastUpdatedAt: string;
}

// ----------------------------------------------------------------------------
// Decision output
// ----------------------------------------------------------------------------

export interface InputConflict {
  /** Which sources disagree */
  sources: EvidenceSource[];
  /** Human-readable description */
  description: string;
  /** How the engine resolved it */
  resolution: "weighted" | "priority" | "ignored";
}

export interface DecisionOutput {
  state: DecisionState;
  /** 0-1 — how confident the engine is */
  confidence: number;
  /** Short headline shown on the card, e.g. "🟢 No intervengas hoy" */
  headline: string;
  /** 1-3 sentence explanation in natural language */
  explanation: string;
  /** Optional suggested action */
  suggestedAction?: string;
  /** Optional task type to create if user accepts */
  suggestedTaskType?: string;
  /** Quantified impact if user follows, e.g. "Ahorro estimado: 1.200 L" */
  impact?: string;
  /** Which rules fired (with weights) */
  firedRules: {
    ruleId: string;
    weight: number;
    vote: DecisionState;
  }[];
  /** Evidence sources actually used */
  sourcesUsed: EvidenceSource[];
  /** Conflicts detected between sources */
  conflicts: InputConflict[];
  /** Version of the rule engine that produced this */
  ruleVersion: string;
}

// ----------------------------------------------------------------------------
// Feedback & verification (the learning loop)
// ----------------------------------------------------------------------------

export interface UserFeedback {
  decisionId: string;
  /** Did the user follow the suggested action? */
  followed: boolean;
  /** What did they actually do (free text) */
  actionTaken?: string;
  /** Self-assessed outcome */
  outcome?: "good" | "bad" | "unknown";
  /** Free notes */
  notes?: string;
  /** When */
  feedbackAt: string;
  /** Who */
  userId: string;
}

/**
 * Automated verification after N days.
 * Filled by a cron job comparing the prediction to the observed reality.
 */
export interface Verification {
  decisionId: string;
  /** Observed values at verification time */
  observedNdvi?: number;
  observedSoilMoisture?: number;
  observedLst?: number;
  /** How many days after the decision */
  daysAfter: number;
  /** Was the prediction correct? Computed from observed vs predicted */
  predictionCorrect: boolean;
  /** Numerical error (for future model calibration) */
  deltaVsPrediction?: number;
  /** Source of the verification data */
  source: "sentinel2" | "sentinel1" | "sentinel3" | "iot" | "manual";
  observedAt: string;
}

// ----------------------------------------------------------------------------
// The record that ties it all together
// ----------------------------------------------------------------------------

/**
 * A DecisionRecord is the central unit of the learning loop.
 * One per scope per day (or per significant event).
 */
export interface DecisionRecord {
  id: string;
  schemaVersion: string; // "1.0.0"
  farmId: string;
  context: DecisionContext;
  evidence: DecisionEvidence;
  output: DecisionOutput;
  feedback?: UserFeedback;
  verification?: Verification;
  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------------------------------
// Learning summary (for the "wow" indicator)
// ----------------------------------------------------------------------------

/**
 * Aggregated learning stats shown on the UI to demonstrate the system learns.
 */
export interface LearningSummary {
  farmId: string;
  totalDecisions: number;
  decisionsWithFeedback: number;
  decisionsVerified: number;
  /** Overall accuracy (correct / verified) */
  accuracy: number;
  /** Accuracy 30 days ago, for trend */
  accuracy30dAgo?: number;
  /** Which rules improved the most */
  topImprovedRules: {
    ruleId: string;
    label: string;
    accuracyBefore: number;
    accuracyNow: number;
    weight: number;
  }[];
  /** Human-readable statement */
  headline: string; // "El sistema ha aprendido de 47 decisiones"
  lastUpdatedAt: string;
}
