export * from "./types";
export * from "./constants";
export * from "./data/copernicus.defaults";
export * from "./types/groundCover.types";
export * from "./data/groundCover.data";
export {
  HUMIDITY_DATA,
  getAverageHumidity,
  getCriticalZones,
  getOptimalZones,
  getZoneStatus,
  getZoneColor,
} from "./data/humidity.data";

export type { HumidityZone } from "./data/humidity.data";
export * from "./types/soilHealth.types";
export * from "./data/soilHealth.data";
