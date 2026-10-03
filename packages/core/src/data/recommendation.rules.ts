import type {
  RecommendationItem,
  RecommendationRule,
  RecommendationRuleInput,
} from "../types/recommendation.types";

// ============================================================================
// Helper: build a Recommendation with sensible defaults
// ============================================================================

function buildRecommendation(
  base: Omit<RecommendationItem, "id" | "createdAt">,
): RecommendationItem {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  return {
    ...base,
    id: `rec-${base.topic}-${base.category}-${now.getTime()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };
}

// ============================================================================
// T3 – Water Resource Efficiency & Drought Resilience
// ============================================================================

const irrigationUrgentRule: RecommendationRule = {
  id: "T3-irrigation-urgent",
  topic: "T3",
  category: "irrigation",
  evaluate: (input: RecommendationRuleInput): RecommendationItem | null => {
    if (
      input.soilMoisture !== undefined &&
      input.soilMoisture < 40 &&
      input.airTemperature !== undefined &&
      input.airTemperature > 28
    ) {
      return buildRecommendation({
        topic: "T3",
        category: "irrigation",
        priority: "urgent",
        title: "Riego urgente requerido",
        description: `La humedad del suelo (${input.soilMoisture}%) está por debajo del umbral crítico y la temperatura del aire (${input.airTemperature}°C) acelera la evapotranspiración.`,
        action: "Activar riego de emergencia: 10-15 L/m²",
        dataSource: "soil-moisture",
        confidence: 92,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: {
          soilMoisture: input.soilMoisture,
          airTemperature: input.airTemperature,
        },
      });
    }
    return null;
  },
};

const irrigationRecommendedRule: RecommendationRule = {
  id: "T3-irrigation-recommended",
  topic: "T3",
  category: "irrigation",
  evaluate: (input: RecommendationRuleInput): RecommendationItem | null => {
    if (
      input.soilMoisture !== undefined &&
      input.soilMoisture >= 40 &&
      input.soilMoisture < 55
    ) {
      return buildRecommendation({
        topic: "T3",
        category: "irrigation",
        priority: "medium",
        title: "Riego recomendado próximamente",
        description: `La humedad del suelo (${input.soilMoisture}%) está descendiendo. Programa riego en las próximas 12-24 horas.`,
        action: "Programar riego: 5-8 L/m²",
        dataSource: "soil-moisture",
        confidence: 85,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: { soilMoisture: input.soilMoisture },
      });
    }
    return null;
  },
};

const windPostponeIrrigationRule: RecommendationRule = {
  id: "T3-wind-postpone",
  topic: "T3",
  category: "irrigation",
  evaluate: (input: RecommendationRuleInput): RecommendationItem | null => {
    if (input.windSpeed !== undefined && input.windSpeed > 25) {
      return buildRecommendation({
        topic: "T3",
        category: "irrigation",
        priority: "high",
        title: "Posponer riego por viento",
        description: `El viento (${input.windSpeed} km/h) reduce la eficiencia del riego y aumenta las pérdidas por evaporación.`,
        action: "Posponer riego hasta que el viento baje de 20 km/h",
        dataSource: "composite",
        confidence: 78,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: { windSpeed: input.windSpeed },
      });
    }
    return null;
  },
};

const ndviWaterStressRule: RecommendationRule = {
  id: "T3-ndvi-stress",
  topic: "T3",
  category: "irrigation",
  evaluate: (input: RecommendationRuleInput): RecommendationItem | null => {
    if (input.ndvi !== undefined && input.ndvi < 0.4) {
      return buildRecommendation({
        topic: "T3",
        category: "irrigation",
        priority: "high",
        title: "Estrés hídrico detectado por satélite",
        description: `El NDVI (${input.ndvi.toFixed(2)}) indica vigor vegetal bajo, señal de posible estrés hídrico.`,
        action: "Verificar humedad in-situ y considerar riego de apoyo",
        dataSource: "ndvi",
        confidence: 88,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: { ndvi: input.ndvi },
      });
    }
    return null;
  },
};

const ndwiWaterDeficitRule: RecommendationRule = {
  id: "T3-ndwi-deficit",
  topic: "T3",
  category: "irrigation",
  evaluate: (input: RecommendationRuleInput): RecommendationItem | null => {
    if (input.ndwi !== undefined && input.ndwi < 0.2) {
      return buildRecommendation({
        topic: "T3",
        category: "irrigation",
        priority: "high",
        title: "Déficit hídrico foliar",
        description: `El NDWI (${input.ndwi.toFixed(2)}) refleja bajo contenido de agua en las hojas.`,
        action: "Aumentar frecuencia de riego en un 20-30%",
        dataSource: "ndwi",
        confidence: 82,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: { ndwi: input.ndwi },
      });
    }
    return null;
  },
};

// ============================================================================
// T2 – Nutrient & Soil Health Management
// ============================================================================

const co2MushroomFruitingRule: RecommendationRule = {
  id: "T2-co2-fruiting",
  topic: "T2",
  category: "soil-health",
  evaluate: (input: RecommendationRuleInput): RecommendationItem | null => {
    if (
      input.co2 !== undefined &&
      input.co2 > 700 &&
      input.soilTemperature !== undefined &&
      input.soilTemperature >= 16 &&
      input.soilTemperature <= 22
    ) {
      return buildRecommendation({
        topic: "T2",
        category: "soil-health",
        priority: "medium",
        title: "CO₂ elevado: inducir fructificación",
        description: `El CO₂ (${input.co2} ppm) y la temperatura del suelo (${input.soilTemperature}°C) están en rango óptimo para inducir la fructificación de setas.`,
        action: "Reducir CO₂ a 500-600 ppm para estimular fructificación",
        dataSource: "co2",
        confidence: 80,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: {
          co2: input.co2,
          soilTemperature: input.soilTemperature,
        },
      });
    }
    return null;
  },
};

const soilMoistureMushroomRule: RecommendationRule = {
  id: "T2-mushroom-moisture",
  topic: "T2",
  category: "soil-health",
  evaluate: (input: RecommendationRuleInput): RecommendationItem | null => {
    if (
      input.soilMoisture !== undefined &&
      input.soilMoisture < 70 &&
      input.soilMoisture >= 40
    ) {
      return buildRecommendation({
        topic: "T2",
        category: "soil-health",
        priority: "medium",
        title: "Humedad baja para actividad fúngica",
        description: `La humedad del suelo (${input.soilMoisture}%) está por debajo del rango óptimo (75-85%) para el desarrollo de micelio.`,
        action: "Aumentar riego y aplicar mulch orgánico para retener humedad",
        dataSource: "soil-moisture",
        confidence: 75,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: { soilMoisture: input.soilMoisture },
      });
    }
    return null;
  },
};

const lstHeatStressRule: RecommendationRule = {
  id: "T2-lst-heat",
  topic: "T2",
  category: "soil-health",
  evaluate: (input: RecommendationRuleInput): RecommendationItem | null => {
    if (input.lst !== undefined && input.lst > 32) {
      return buildRecommendation({
        topic: "T2",
        category: "soil-health",
        priority: "high",
        title: "Estrés térmico del suelo",
        description: `La temperatura superficial (${input.lst.toFixed(1)}°C) puede degradar la actividad microbiológica y acelerar la pérdida de materia orgánica.`,
        action: "Aplicar acolchado (mulch) y considerar sombra temporal",
        dataSource: "lst",
        confidence: 86,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: { lst: input.lst },
      });
    }
    return null;
  },
};

// ============================================================================
// Rules Registry
// ============================================================================

export const RECOMMENDATION_RULES: RecommendationRule[] = [
  // T3 – Water
  irrigationUrgentRule,
  irrigationRecommendedRule,
  windPostponeIrrigationRule,
  ndviWaterStressRule,
  ndwiWaterDeficitRule,
  // T2 – Soil health
  co2MushroomFruitingRule,
  soilMoistureMushroomRule,
  lstHeatStressRule,
];
