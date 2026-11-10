// packages/core/src/types/rule-engine.types.ts
// ============================================================================
// SikeliaSoil — Domain-specific rule-engine types
// ----------------------------------------------------------------------------
// Only the agriculture-specific types live here.
// Generic engine types (EngineOutput, EngineRule, RuleCondition, ...)
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
// Engine context (what's being decided about)
// ----------------------------------------------------------------------------

export interface EngineContext {
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

export interface EngineEvidence {
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
  engineId: string;
  followed: boolean;
  actionTaken?: string;
  outcome?: "good" | "bad" | "unknown";
  notes?: string;
  feedbackAt: string;
  userId: string;
}

export interface Verification {
  engineId: string;
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
