// packages/core/src/data/rule-engine.defaults.ts

// Valores por defecto del motor de reglas de SikeliaSoil.
// Datos reales de Assoro (07/10/2026).
// Cuando tengamos el CRUD, esto vendrá de la base de datos.

import type { EngineContext, EngineEvidence } from "../types/rule-engine.types";

// Contexto: la finca sobre la que decidimos
export const ENGINE_CONTEXT_DEFAULT: EngineContext = {
  farmId: "farm-assoro",
  scopeType: "farm",
  scopeId: "farm",
  scopeName: "SikeliaSoil — Assoro",
  areaM2: 2240,
  criteria: ["water", "fertilisation", "protection", "efficiency", "decisions"],
};

// Evidencia: lo que nos dicen los sensores y los satélites
export const ENGINE_EVIDENCE_DEFAULT: EngineEvidence = {
  // Índices de satélite (Copernicus)
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

  // Sensores IoT en campo
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

  // KPIs de salud del suelo medidos manualmente
  kpis: [
    { kpiKey: "mycorrhiza_colonisation", value: 52, unit: "%", status: "good" },
    { kpiKey: "glomalin", value: 1.8, unit: "mg/g", status: "good" },
  ],

  observations: [],

  // Previsión meteorológica (Open-Meteo)
  weather: {
    rainNext72hMm: 0,
    tempMaxC: 24,
    tempMinC: 14,
    timestamp: "2026-10-07T06:00:00Z",
    source: "open-meteo",
  },

  // Histórico de los últimos 7 días (para tendencias)
  history: {
    ndvi7d: [0.71, 0.72, 0.71, 0.73, 0.74, 0.74, 0.74],
    soilMoisture7d: [58, 56, 55, 54, 53, 52, 52],
  },
};
