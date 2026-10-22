// packages/core/src/decision/rules.v1.ts
// ============================================================================
// SikeliaSoil — Decision rules v1
// ----------------------------------------------------------------------------
// Ten declarative rules. Each reads like a sentence:
//   "IF soil is wet AND rain is coming THEN don't intervene"
//
// The engine applies them. The learner adjusts weights over time.
// ============================================================================

import { DecisionRule } from "@sicilia-soil/rule-engine";

export const DECISION_RULES_V1: DecisionRule[] = [
  // -------------------------------------------------------------------------
  // WATER
  // -------------------------------------------------------------------------
  {
    id: "soil_wet_rain_coming",
    label: "El suelo está húmedo y va a llover",
    conditions: [
      { field: "sensors.soil_moisture", operator: "gte", value: 55 },
      { field: "weather.rainNext72hMm", operator: "gte", value: 5 },
    ],
    votesFor: "green",
    baseConfidence: 0.9,
    criteria: ["water"],
    version: 1,
    active: true,
  },
  {
    id: "soil_dry_no_rain",
    label: "El suelo está seco y no va a llover",
    conditions: [
      { field: "sensors.soil_moisture", operator: "lte", value: 35 },
      { field: "weather.rainNext72hMm", operator: "lte", value: 2 },
    ],
    votesFor: "red",
    baseConfidence: 0.85,
    criteria: ["water"],
    version: 1,
    active: true,
  },
  {
    id: "soil_moderate_dry",
    label: "El suelo se está secando",
    conditions: [
      { field: "sensors.soil_moisture", operator: "between", value: [35, 50] },
    ],
    votesFor: "yellow",
    baseConfidence: 0.7,
    criteria: ["water"],
    version: 1,
    active: true,
  },

  // -------------------------------------------------------------------------
  // VEGETATION
  // -------------------------------------------------------------------------
  {
    id: "ndvi_healthy_stable",
    label: "El cultivo está vigoroso y estable",
    conditions: [{ field: "eoIndices.NDVI", operator: "gte", value: 0.6 }],
    votesFor: "green",
    baseConfidence: 0.8,
    criteria: ["water", "protection"],
    version: 1,
    active: true,
  },
  {
    id: "ndvi_dropping",
    label: "El vigor del cultivo está bajando",
    conditions: [{ field: "eoIndices.NDVI", operator: "lt", value: 0.5 }],
    votesFor: "yellow",
    baseConfidence: 0.75,
    criteria: ["water", "protection"],
    version: 1,
    active: true,
  },
  {
    id: "ndwi_canopy_stress",
    label: "Las hojas tienen poca agua",
    conditions: [{ field: "eoIndices.NDWI", operator: "lt", value: 0.3 }],
    votesFor: "yellow",
    baseConfidence: 0.75,
    criteria: ["water"],
    version: 1,
    active: true,
  },

  // -------------------------------------------------------------------------
  // THERMAL
  // -------------------------------------------------------------------------
  {
    id: "lst_heat_stress",
    label: "La superficie está muy caliente",
    conditions: [{ field: "eoIndices.LST", operator: "gte", value: 32 }],
    votesFor: "yellow",
    baseConfidence: 0.7,
    criteria: ["protection"],
    version: 1,
    active: true,
  },

  // -------------------------------------------------------------------------
  // SOIL BIOLOGY
  // -------------------------------------------------------------------------
  {
    id: "mycorrhiza_declining",
    label: "La red micorrícica está por debajo del umbral",
    conditions: [
      { field: "kpis.mycorrhiza_colonisation", operator: "lt", value: 40 },
    ],
    votesFor: "yellow",
    baseConfidence: 0.8,
    criteria: ["fertilisation"],
    version: 1,
    active: true,
  },
  {
    id: "mycorrhiza_active",
    label: "La red micorrícica está activa y sana",
    conditions: [
      { field: "kpis.mycorrhiza_colonisation", operator: "gte", value: 50 },
    ],
    votesFor: "green",
    baseConfidence: 0.85,
    criteria: ["fertilisation", "decisions"],
    version: 1,
    active: true,
  },
  {
    id: "glomalin_low",
    label: "La glomalina está baja: el suelo pierde estructura",
    conditions: [{ field: "kpis.glomalin", operator: "lt", value: 1.5 }],
    votesFor: "yellow",
    baseConfidence: 0.75,
    criteria: ["fertilisation"],
    version: 1,
    active: true,
  },
];
