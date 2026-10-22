// ============================================================================
// Recommendation Types – SikeliaSoil Decision Support
// ============================================================================

export type RecommendationTopic = "soil" | "water" | "general";
export type RecommendationPriority =
  | "info"
  | "low"
  | "medium"
  | "high"
  | "urgent";

export type RecommendationCategory =
  | "irrigation"
  | "fertilization"
  | "soil-health"
  | "pest-control"
  | "erosion-control"
  | "carbon-sequestration"
  | "harvest"
  | "regeneration"
  | "general";

export type RecommendationDataSource =
  | "ndvi"
  | "ndwi"
  | "ssm"
  | "lst"
  | "soil-moisture"
  | "soil-temperature"
  | "air-temperature"
  | "co2"
  | "wind"
  | "light"
  | "rain-forecast"
  | "organic-matter"
  | "mycorrhiza"
  | "composite";

// ----------------------------------------------------------------------------
// Crop types (para reglas específicas por cultivo)
// ----------------------------------------------------------------------------

export type RecommendationCropType =
  | "esparto"
  | "olivo"
  | "almendro"
  | "ciruelo"
  | "algarrobo"
  | "cereal"
  | "hortaliza"
  | "cubierta"
  | "barbecho"
  | "farm";

export type CropStage =
  | "siembra"
  | "crecimiento"
  | "floracion"
  | "fructificacion"
  | "cosecha"
  | "post-cosecha"
  | "reposo"
  | "establecimiento";

// ----------------------------------------------------------------------------
// Item
// ----------------------------------------------------------------------------

export interface RecommendationItem {
  id: string;
  topic: RecommendationTopic;
  category: RecommendationCategory;
  priority: RecommendationPriority;
  title: string;
  description: string;
  action: string;
  dataSource: RecommendationDataSource;
  confidence: number; // 0-100
  zoneId?: string;
  zoneName?: string;
  cropType?: RecommendationCropType;
  createdAt: string;
  expiresAt?: string;
  evidence?: Record<string, number | string>;
  // Acciones UI
  ctaLabel?: string;
  ctaUrl?: string;
  icon?: string;
}

// ----------------------------------------------------------------------------
// Input (contexto que reciben las reglas)
// ----------------------------------------------------------------------------

export interface RecommendationRuleInput {
  // Sensores
  soilMoisture?: number;
  soilTemperature?: number;
  airTemperature?: number;
  co2?: number;
  light?: number;
  windSpeed?: number;

  // Satellite / EO
  ndvi?: number;
  ndwi?: number;
  ssm?: number;
  lst?: number;

  // Contexto agronómico
  cropType?: RecommendationCropType;
  cropStage?: CropStage;
  optimalMoisture?: [number, number];
  optimalTemperature?: [number, number];

  // Regeneración
  organicMatter?: number;
  mycorrhiza?: number;
  glomalin?: number;
  fungalDiversity?: number;

  // Predicción
  rainForecast?: number; // mm en próximas 24h

  // Zona
  zoneId?: string;
  zoneName?: string;
}

// ----------------------------------------------------------------------------
// Rule
// ----------------------------------------------------------------------------

export interface RecommendationRule {
  id: string;
  topic: RecommendationTopic;
  category: RecommendationCategory;
  /** Opcional: limita la regla a ciertos cultivos */
  crops?: RecommendationCropType[];
  /** Opcional: cooldown en horas para no repetir la misma alerta */
  cooldown?: number;
  evaluate: (input: RecommendationRuleInput) => RecommendationItem | null;
}
