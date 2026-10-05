// packages/core/src/data/recommendation.rules.ts

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
// water – Water Resource Efficiency & Drought Resilience (existentes)
// ============================================================================

const irrigationUrgentRule: RecommendationRule = {
  id: "water-irrigation-urgent",
  topic: "water",
  category: "irrigation",
  evaluate: (input: RecommendationRuleInput): RecommendationItem | null => {
    if (
      input.soilMoisture !== undefined &&
      input.soilMoisture < 40 &&
      input.airTemperature !== undefined &&
      input.airTemperature > 28
    ) {
      return buildRecommendation({
        topic: "water",
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
  id: "water-irrigation-recommended",
  topic: "water",
  category: "irrigation",
  evaluate: (input: RecommendationRuleInput): RecommendationItem | null => {
    if (
      input.soilMoisture !== undefined &&
      input.soilMoisture >= 40 &&
      input.soilMoisture < 55
    ) {
      return buildRecommendation({
        topic: "water",
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
  id: "water-wind-postpone",
  topic: "water",
  category: "irrigation",
  evaluate: (input: RecommendationRuleInput): RecommendationItem | null => {
    if (input.windSpeed !== undefined && input.windSpeed > 25) {
      return buildRecommendation({
        topic: "water",
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
  id: "water-ndvi-stress",
  topic: "water",
  category: "irrigation",
  evaluate: (input: RecommendationRuleInput): RecommendationItem | null => {
    if (input.ndvi !== undefined && input.ndvi < 0.4) {
      return buildRecommendation({
        topic: "water",
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
  id: "water-ndwi-deficit",
  topic: "water",
  category: "irrigation",
  evaluate: (input: RecommendationRuleInput): RecommendationItem | null => {
    if (input.ndwi !== undefined && input.ndwi < 0.2) {
      return buildRecommendation({
        topic: "water",
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
// water – Nuevas reglas: lluvia, evapotranspiración
// ============================================================================

const rainForecastRule: RecommendationRule = {
  id: "water-rain-forecast",
  topic: "water",
  category: "irrigation",
  evaluate: (input) => {
    if (
      input.rainForecast !== undefined &&
      input.rainForecast > 10 &&
      input.soilMoisture !== undefined &&
      input.soilMoisture < 60
    ) {
      return buildRecommendation({
        topic: "water",
        category: "irrigation",
        priority: "medium",
        title: "No regar: lluvia prevista",
        description: `Se esperan ${input.rainForecast} mm en 24 h. La humedad actual (${input.soilMoisture}%) se recuperará sin riego.`,
        action: "Cancelar riego programado. Ahorro estimado: 15 L/m²",
        dataSource: "rain-forecast",
        confidence: 88,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: {
          rainForecast: input.rainForecast,
          soilMoisture: input.soilMoisture,
        },
      });
    }
    return null;
  },
};

const highEvapotranspirationRule: RecommendationRule = {
  id: "water-high-et",
  topic: "water",
  category: "irrigation",
  evaluate: (input) => {
    if (
      input.airTemperature !== undefined &&
      input.airTemperature > 30 &&
      input.light !== undefined &&
      input.light > 85 &&
      input.soilMoisture !== undefined &&
      input.soilMoisture < 60
    ) {
      return buildRecommendation({
        topic: "water",
        category: "irrigation",
        priority: "medium",
        title: "Aumentar riego 15%",
        description: `Temperatura ${input.airTemperature}°C + radiación alta (${input.light}%) aceleran la evapotranspiración.`,
        action: "Ajustar goteo durante los próximos 3 días",
        dataSource: "composite",
        confidence: 80,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: {
          airTemperature: input.airTemperature,
          light: input.light,
          soilMoisture: input.soilMoisture,
        },
      });
    }
    return null;
  },
};

// ============================================================================
// soil – Nutrient & Soil Health Management (existentes)
// ============================================================================

const co2MushroomFruitingRule: RecommendationRule = {
  id: "soil-co2-fruiting",
  topic: "soil",
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
        topic: "soil",
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
  id: "soil-mushroom-moisture",
  topic: "soil",
  category: "soil-health",
  evaluate: (input: RecommendationRuleInput): RecommendationItem | null => {
    if (
      input.soilMoisture !== undefined &&
      input.soilMoisture < 70 &&
      input.soilMoisture >= 40
    ) {
      return buildRecommendation({
        topic: "soil",
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
  id: "soil-lst-heat",
  topic: "soil",
  category: "soil-health",
  evaluate: (input: RecommendationRuleInput): RecommendationItem | null => {
    if (input.lst !== undefined && input.lst > 32) {
      return buildRecommendation({
        topic: "soil",
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
// soil – Regeneración del suelo (nuevas)
// ============================================================================

const lowOrganicMatterRule: RecommendationRule = {
  id: "soil-low-organic-matter",
  topic: "soil",
  category: "regeneration",
  evaluate: (input) => {
    if (input.organicMatter !== undefined && input.organicMatter < 2) {
      return buildRecommendation({
        topic: "soil",
        category: "regeneration",
        priority: "high",
        title: "Añadir compost",
        description: `Materia orgánica al ${input.organicMatter}% (umbral 2%). El suelo pierde capacidad de retención hídrica.`,
        action: "Aplicar 20 kg de compost maduro por 100 m²",
        dataSource: "organic-matter",
        confidence: 88,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: { organicMatter: input.organicMatter },
      });
    }
    return null;
  },
};

const lowMycorrhizaRule: RecommendationRule = {
  id: "soil-low-mycorrhiza",
  topic: "soil",
  category: "regeneration",
  evaluate: (input) => {
    if (input.mycorrhiza !== undefined && input.mycorrhiza < 30) {
      return buildRecommendation({
        topic: "soil",
        category: "regeneration",
        priority: "medium",
        title: "Inocular micorrizas",
        description: `Colonización micorrícica al ${input.mycorrhiza}% (umbral 30%). La red fúngica está debilitada.`,
        action:
          "Aplicar inóculo micorrícico tras la cosecha. Reducir labranza.",
        dataSource: "soil-temperature",
        confidence: 82,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: { mycorrhiza: input.mycorrhiza },
      });
    }
    return null;
  },
};

const lowGlomalinRule: RecommendationRule = {
  id: "soil-low-glomalin",
  topic: "soil",
  category: "regeneration",
  evaluate: (input) => {
    if (input.glomalin !== undefined && input.glomalin < 1.5) {
      return buildRecommendation({
        topic: "soil",
        category: "regeneration",
        priority: "medium",
        title: "Reducir labranza",
        description: `Glomalina al ${input.glomalin} mg/g (umbral 1.5). La estructura del suelo se está debilitando.`,
        action: "Evitar laboreo profundo. Aumentar cubierta vegetal",
        dataSource: "soil-temperature",
        confidence: 80,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: { glomalin: input.glomalin },
      });
    }
    return null;
  },
};

const lowFungalDiversityRule: RecommendationRule = {
  id: "soil-low-fungal-diversity",
  topic: "soil",
  category: "regeneration",
  evaluate: (input) => {
    if (input.fungalDiversity !== undefined && input.fungalDiversity < 3) {
      return buildRecommendation({
        topic: "soil",
        category: "regeneration",
        priority: "low",
        title: "Aumentar diversidad fúngica",
        description: `Diversidad fúngica al ${input.fungalDiversity} (umbral 3). El sistema pierde resiliencia.`,
        action: "Introducir restos de poda variados y mulch leñoso",
        dataSource: "soil-temperature",
        confidence: 72,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: { fungalDiversity: input.fungalDiversity },
      });
    }
    return null;
  },
};

// ============================================================================
// soil – Erosión y carbono (nuevas)
// ============================================================================

const erosionRiskRule: RecommendationRule = {
  id: "soil-erosion-risk",
  topic: "soil",
  category: "erosion-control",
  evaluate: (input) => {
    if (
      input.windSpeed !== undefined &&
      input.windSpeed > 40 &&
      input.ndvi !== undefined &&
      input.ndvi < 0.3
    ) {
      return buildRecommendation({
        topic: "soil",
        category: "erosion-control",
        priority: "urgent",
        title: "Riesgo de erosión eólica",
        description: `Viento ${input.windSpeed} km/h + suelo desnudo (NDVI ${input.ndvi.toFixed(2)}).`,
        action:
          "Activar riego ligero para fijar el suelo. Sembrar cubierta urgente",
        dataSource: "composite",
        confidence: 90,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: {
          windSpeed: input.windSpeed,
          ndvi: input.ndvi,
        },
      });
    }
    return null;
  },
};

const lowCarbonSequestrationRule: RecommendationRule = {
  id: "soil-low-carbon",
  topic: "soil",
  category: "carbon-sequestration",
  evaluate: (input) => {
    if (
      input.organicMatter !== undefined &&
      input.organicMatter < 2.5 &&
      input.ndvi !== undefined &&
      input.ndvi > 0.5
    ) {
      return buildRecommendation({
        topic: "soil",
        category: "carbon-sequestration",
        priority: "low",
        title: "Potenciar captura de carbono",
        description: `MO al ${input.organicMatter}% con vegetación activa (NDVI ${input.ndvi.toFixed(2)}).`,
        action: "Mantener cubierta permanente. Añadir mulch leñoso",
        dataSource: "organic-matter",
        confidence: 75,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: {
          organicMatter: input.organicMatter,
          ndvi: input.ndvi,
        },
      });
    }
    return null;
  },
};

// ============================================================================
// Fenología – siembra, cosecha, riesgo fúngico (nuevas)
// ============================================================================

const sowingWindowRule: RecommendationRule = {
  id: "general-sowing-window",
  topic: "general",
  category: "harvest",
  evaluate: (input) => {
    if (
      input.cropStage === "siembra" &&
      input.soilTemperature !== undefined &&
      input.soilTemperature >= 8 &&
      input.soilTemperature <= 18 &&
      input.soilMoisture !== undefined &&
      input.soilMoisture > 40
    ) {
      return buildRecommendation({
        topic: "general",
        category: "harvest",
        priority: "high",
        title: "Ventana óptima de siembra",
        description: `Suelo a ${input.soilTemperature}°C y ${input.soilMoisture}% de humedad.`,
        action: "Sembrar ahora. Condiciones ideales para germinación",
        dataSource: "composite",
        confidence: 88,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: {
          soilTemperature: input.soilTemperature,
          soilMoisture: input.soilMoisture,
        },
      });
    }
    return null;
  },
};

const harvestWindowRule: RecommendationRule = {
  id: "general-harvest-window",
  topic: "general",
  category: "harvest",
  evaluate: (input) => {
    if (
      input.cropStage === "cosecha" &&
      input.ndvi !== undefined &&
      input.ndvi > 0.6
    ) {
      return buildRecommendation({
        topic: "general",
        category: "harvest",
        priority: "medium",
        title: "Ventana de cosecha",
        description: `NDVI ${input.ndvi.toFixed(2)} indica biomasa máxima.`,
        action: "Cosechar en los próximos 5–7 días",
        dataSource: "ndvi",
        confidence: 82,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: { ndvi: input.ndvi },
      });
    }
    return null;
  },
};

const fungalRiskRule: RecommendationRule = {
  id: "soil-fungal-risk",
  topic: "soil",
  category: "pest-control",
  evaluate: (input) => {
    if (
      input.soilMoisture !== undefined &&
      input.soilMoisture > 80 &&
      input.light !== undefined &&
      input.light > 90
    ) {
      return buildRecommendation({
        topic: "soil",
        category: "pest-control",
        priority: "medium",
        title: "Riesgo fúngico",
        description: `Humedad alta (${input.soilMoisture}%) + radiación intensa (${input.light}%).`,
        action:
          "Aplicar preventivo (cobre o bicarbonato). Ventilar si es invernadero",
        dataSource: "composite",
        confidence: 70,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: {
          soilMoisture: input.soilMoisture,
          light: input.light,
        },
      });
    }
    return null;
  },
};

const mushroomSignalRule: RecommendationRule = {
  id: "soil-mushroom-signal",
  topic: "soil",
  category: "regeneration",
  evaluate: (input) => {
    if (
      input.rainForecast !== undefined &&
      input.rainForecast > 5 &&
      input.soilMoisture !== undefined &&
      input.soilMoisture > 60
    ) {
      return buildRecommendation({
        topic: "soil",
        category: "regeneration",
        priority: "info",
        title: "Posible aparición de setas",
        description: `Lluvia reciente + humedad alta (${input.soilMoisture}%). Señal de red fúngica activa.`,
        action: "Registrar especies que aparezcan como bioindicador",
        dataSource: "composite",
        confidence: 65,
        zoneId: input.zoneId,
        zoneName: input.zoneName,
        evidence: {
          rainForecast: input.rainForecast,
          soilMoisture: input.soilMoisture,
        },
      });
    }
    return null;
  },
};

// ============================================================================
// Rules Registry
// ============================================================================

export const RECOMMENDATION_RULES: RecommendationRule[] = [
  // water – Water (existentes)
  irrigationUrgentRule,
  irrigationRecommendedRule,
  windPostponeIrrigationRule,
  ndviWaterStressRule,
  ndwiWaterDeficitRule,

  // water – Nuevas
  rainForecastRule,
  highEvapotranspirationRule,

  // soil – Soil health (existentes)
  co2MushroomFruitingRule,
  soilMoistureMushroomRule,
  lstHeatStressRule,

  // soil – Regeneración (nuevas)
  lowOrganicMatterRule,
  lowMycorrhizaRule,
  lowGlomalinRule,
  lowFungalDiversityRule,

  // soil – Erosión y carbono (nuevas)
  erosionRiskRule,
  lowCarbonSequestrationRule,

  // General – Fenología (nuevas)
  sowingWindowRule,
  harvestWindowRule,

  // soil – Fúngico (nuevas)
  fungalRiskRule,
  mushroomSignalRule,
];
