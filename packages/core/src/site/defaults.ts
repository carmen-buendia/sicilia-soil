import type { SiteZoneConfig, SiteIrrigationConfig } from "./types";

/**
 * Fallback config used when no real installation config exists.
 * Useful for development, tests and demo deployments.
 * No geographic or crop-specific data.
 */
export const DEFAULT_ZONES_CONFIG: SiteZoneConfig[] = [
  {
    id: "zone-01",
    sensorId: "sensor-01",
    location: "Demo zone 1",
    soilType: "Unknown",
  },
  {
    id: "zone-02",
    sensorId: "sensor-02",
    location: "Demo zone 2",
    soilType: "Unknown",
  },
];

export const DEFAULT_IRRIGATION_CONFIG: SiteIrrigationConfig[] = [
  { zoneId: "zone-01", moistureTargets: { min: 40, optimal: 55, max: 70 } },
  { zoneId: "zone-02", moistureTargets: { min: 40, optimal: 55, max: 70 } },
];
