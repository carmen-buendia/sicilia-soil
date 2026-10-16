/**
 * Input values for the recommendation engine.
 * Per-zone readings that feed generateRecommendations().
 *
 * No text, no zone names — those come from site config + locale.
 */
export interface RecommendationInputDefault {
  soilMoisture: number;
  soilTemperature: number;
  airTemperature: number;
  co2: number;
  ndvi: number;
  ndwi: number;
  lst: number;
  windSpeed: number;
}

export const RECOMMENDATION_INPUT_DEFAULT: RecommendationInputDefault = {
  soilMoisture: 38,
  soilTemperature: 21,
  airTemperature: 30,
  co2: 720,
  ndvi: 0.35,
  ndwi: 0.18,
  lst: 34,
  windSpeed: 27,
};
