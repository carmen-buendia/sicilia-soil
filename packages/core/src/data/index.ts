// packages/core/src/data/index.ts

export * from "./cereal.data";
export * from "./polyculture.data";
export * from "./coverFallow.data";
export * from "./analysis.data";
export * from "./esparto.data";
export * from "./cycle.data";
export * from "./soilHealth.data";
export * from "./groundCover.data";
export * from "./copernicus.defaults";
export * from "./recommendation.rules";
export * from "./sensors.mock";
export * from "./temperature.data";
export * from "./light.data";

// Humidity: exporta datos + helpers, no el tipo
export {
  HUMIDITY_DATA,
  getAverageHumidity,
  getCriticalZones,
  getOptimalZones,
  getZoneStatus,
  getZoneColor,
} from "./humidity.data";

// Dashboard
export { GARDEN_ZONES, DASHBOARD_KPIS, CARBON_SUMMARY } from "./dashboard.data";
