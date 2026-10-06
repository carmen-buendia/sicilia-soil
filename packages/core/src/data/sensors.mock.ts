// packages/core/src/data/sensors.mock.ts

// ============================================================================
// MOCK DATA — Sensores por parcela
// Reemplazar por hook useSensors() cuando IoT esté conectado
// ============================================================================

import type {
  RecommendationRuleInput,
  RecommendationCropType,
} from "../types/recommendation.types";

// ----------------------------------------------------------------------------
// Mapeo plot id → cropType
// ----------------------------------------------------------------------------

export const PLOT_CROP_TYPE: Record<string, RecommendationCropType> = {
  esparto: "esparto",
  "huerta-tomates": "hortaliza",
  olivar: "olivo",
  "jardin-hierbas": "hortaliza",
  compost: "farm",
  "deposito-agua": "farm",
  cereal: "cereal",
  barbecho: "barbecho",
};

// ----------------------------------------------------------------------------
// Sensores por parcela
// ----------------------------------------------------------------------------

export const MOCK_SENSORS: Record<string, Partial<RecommendationRuleInput>> = {
  esparto: {
    soilMoisture: 78,
    soilTemperature: 20,
    airTemperature: 24,
    windSpeed: 12,
    light: 85,
    optimalMoisture: [65, 80],
    optimalTemperature: [18, 28],
    cropStage: "crecimiento",
    organicMatter: 2.5,
    mycorrhiza: 45,
    glomalin: 2.1,
    fungalDiversity: 4,
  },
  "huerta-tomates": {
    soilMoisture: 82,
    soilTemperature: 22,
    airTemperature: 24,
    windSpeed: 8,
    light: 92,
    optimalMoisture: [70, 85],
    optimalTemperature: [20, 28],
    cropStage: "fructificacion",
    organicMatter: 2.2,
    mycorrhiza: 35,
    glomalin: 1.6,
    fungalDiversity: 3,
  },
  olivar: {
    soilMoisture: 45,
    soilTemperature: 24,
    airTemperature: 31,
    windSpeed: 10,
    light: 89,
    optimalMoisture: [55, 70],
    optimalTemperature: [18, 30],
    cropStage: "fructificacion",
    organicMatter: 1.8,
    mycorrhiza: 28,
    glomalin: 1.3,
    fungalDiversity: 2,
  },
  "jardin-hierbas": {
    soilMoisture: 68,
    soilTemperature: 21,
    airTemperature: 23,
    windSpeed: 9,
    light: 78,
    optimalMoisture: [60, 75],
    optimalTemperature: [18, 28],
    cropStage: "crecimiento",
    organicMatter: 2.4,
    mycorrhiza: 38,
    glomalin: 1.8,
    fungalDiversity: 3,
  },
  compost: {
    soilMoisture: 55,
    soilTemperature: 28,
    airTemperature: 26,
    windSpeed: 5,
    optimalMoisture: [50, 70],
    optimalTemperature: [25, 40],
    cropStage: "reposo",
    organicMatter: 3.5,
    mycorrhiza: 40,
    glomalin: 2.2,
    fungalDiversity: 4,
  },
  cereal: {
    soilMoisture: 58,
    soilTemperature: 19,
    airTemperature: 24,
    windSpeed: 6,
    light: 88,
    optimalMoisture: [55, 70],
    optimalTemperature: [15, 25],
    cropStage: "crecimiento",
    organicMatter: 2.0,
    mycorrhiza: 30,
    glomalin: 1.5,
    fungalDiversity: 3,
  },
  barbecho: {
    soilMoisture: 45,
    soilTemperature: 22,
    airTemperature: 26,
    windSpeed: 8,
    optimalMoisture: [40, 60],
    optimalTemperature: [15, 30],
    cropStage: "reposo",
    organicMatter: 1.9,
    mycorrhiza: 25,
    glomalin: 1.2,
    fungalDiversity: 2,
  },
  "deposito-agua": {
    soilMoisture: 90,
    soilTemperature: 18,
    airTemperature: 22,
    windSpeed: 7,
    light: 40,
  },
};

// ----------------------------------------------------------------------------
// Contexto EO (Copernicus)
// ----------------------------------------------------------------------------

export const EO_CONTEXT = {
  ndvi: 0.74,
  ndwi: 0.52,
  ssm: 31,
  lst: 24.8,
  rainForecast: 5,
};