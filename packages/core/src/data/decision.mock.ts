// packages/core/src/data/decision.mock.ts

// ============================================================================
// MycoMesh Protocoltocoltocoltocol — Decision mock data
// ----------------------------------------------------------------------------
// Real values from the Assoro farm, captured 2026-10-07.
// Replace with API call once feat/db-crud is available.
// ============================================================================

import type {
  DecisionContext,
  DecisionEvidence,
} from "../types/decision.types";

// ---------------------------------------------------------------------------
// Context: the farm we're deciding about
// ---------------------------------------------------------------------------

export const MOCK_DECISION_CONTEXT: DecisionContext = {
  farmId: "farm-assoro",
  scopeType: "farm",
  scopeId: "farm",
  scopeName: "MycoMesh Protocoltocoltocoltocol — Assoro",
  areaM2: 2240,
  criteria: ["water", "fertilisation", "protection", "efficiency", "decisions"],
};

// ---------------------------------------------------------------------------
// Evidence: what the sensors and satellites told us
// ---------------------------------------------------------------------------

export const MOCK_DECISION_EVIDENCE: DecisionEvidence = {
  eoIndices: [
    {
      indexType: "NDVI",
      value: 0.74,
      timestamp: "2026-10-05T10:30:00Z",
      validPixelPercent: 92,
      source: "sentinel2",
    },
    {
      indexType: "NDWI",
      value: 0.52,
      timestamp: "2026-10-05T10:30:00Z",
      validPixelPercent: 92,
      source: "sentinel2",
    },
    {
      indexType: "SSM",
      value: 31,
      timestamp: "2026-10-04T22:00:00Z",
      validPixelPercent: 88,
      source: "sentinel1",
    },
    {
      indexType: "LST",
      value: 24.8,
      timestamp: "2026-10-05T13:00:00Z",
      validPixelPercent: 85,
      source: "sentinel3",
    },
  ],
  sensors: [
    {
      sensorId: "iot-soil-moist-01",
      sensorType: "soil_moisture",
      value: 52,
      unit: "%",
      timestamp: "2026-10-07T08:00:00Z",
      quality: "good",
    },
    {
      sensorId: "iot-soil-temp-01",
      sensorType: "soil_temperature",
      value: 19.5,
      unit: "°C",
      timestamp: "2026-10-07T08:00:00Z",
      quality: "good",
    },
  ],
  kpis: [
    { kpiKey: "mycorrhiza_colonisation", value: 52, unit: "%", status: "good" },
    { kpiKey: "glomalin", value: 1.8, unit: "mg/g", status: "good" },
  ],
  observations: [],
  weather: {
    rainNext72hMm: 0,
    tempMaxC: 24,
    tempMinC: 14,
    timestamp: "2026-10-07T06:00:00Z",
    source: "open-meteo",
  },
  history: {
    ndvi7d: [0.71, 0.72, 0.71, 0.73, 0.74, 0.74, 0.74],
    soilMoisture7d: [58, 56, 55, 54, 53, 52, 52],
  },
};
