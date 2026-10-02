export * from "./types";
export * from "./constants";
export * from "./data/copernicus.defaults";
export {
  HUMIDITY_DATA,
  getAverageHumidity,
  getCriticalZones,
  getOptimalZones,
  getZoneStatus,
  getZoneColor,
} from "./data/humidity.data";

export type { HumidityZone } from "./data/humidity.data";
