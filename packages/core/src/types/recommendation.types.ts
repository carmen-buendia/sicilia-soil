// ============================================================================
// Recommendation Types – NOSTRADAMUS Decision Support
// ============================================================================

export type RecommendationTopic = "T2" | "T3" | "general";

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
  | "composite";

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
  createdAt: string;
  expiresAt?: string;
  evidence?: Record<string, number | string>;
}

export interface RecommendationRuleInput {
  soilMoisture?: number;
  soilTemperature?: number;
  airTemperature?: number;
  co2?: number;
  ndvi?: number;
  ndwi?: number;
  ssm?: number;
  lst?: number;
  windSpeed?: number;
  zoneId?: string;
  zoneName?: string;
}

export interface RecommendationRule {
  id: string;
  topic: RecommendationTopic;
  category: RecommendationCategory;
  evaluate: (input: RecommendationRuleInput) => RecommendationItem | null;
}
