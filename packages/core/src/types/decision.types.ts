// packages/core/src/types/decision.types.ts
// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Carmen María Buendía Sánchez
// ============================================================================
// SikeliaSoil — Domain-specific decision types
// ----------------------------------------------------------------------------
// Only the agriculture-specific types live here.
// Generic engine types (DecisionOutput, DecisionRule, RuleCondition, ...)
// are re-exported from @sicilia-soil/decision via ./decision/index.ts.
// ============================================================================

import type { KPIStatus, DDSCriterion } from "./kpi.types";
import type { SpatialTargetType } from "./spatial.types";
import type { EOIndexType } from "./eo.types";
import type { SensorType, ReadingQuality } from "./iot.types";

// ----------------------------------------------------------------------------
// Evidence sources
// ----------------------------------------------------------------------------

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
  scopeType: SpatialTargetType;
  scopeId: string;
  scopeName: string;
  speciesId?: string;
  stage?: string;
  areaM2?: number;
  criteria: DDSCriterion[];
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
  history?: {
    ndvi7d?: number[];
    soilMoisture7d?: number[];
  };
}

// ----------------------------------------------------------------------------
// Feedback & verification
// ----------------------------------------------------------------------------

export interface UserFeedback {
  decisionId: string;
  followed: boolean;
  actionTaken?: string;
  outcome?: "good" | "bad" | "unknown";
  notes?: string;
  feedbackAt: string;
  userId: string;
}

export interface Verification {
  decisionId: string;
  observedNdvi?: number;
  observedSoilMoisture?: number;
  observedLst?: number;
  daysAfter: number;
  predictionCorrect: boolean;
  deltaVsPrediction?: number;
  source: "sentinel2" | "sentinel1" | "sentinel3" | "iot" | "manual";
  observedAt: string;
}

export interface RuleWeight {
  ruleId: string;
  weight: number;
  timesApplied: number;
  timesCorrect: number;
  timesWrong: number;
  lastUpdatedAt: string;
}
