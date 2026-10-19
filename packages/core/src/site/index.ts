import { ZONES_CONFIG, IRRIGATION_CONFIG } from "./site.config";
import { DEFAULT_ZONES_CONFIG, DEFAULT_IRRIGATION_CONFIG } from "./defaults";
import type { SiteZoneConfig, SiteIrrigationTargets } from "./types";

export function getZones(): SiteZoneConfig[] {
  return ZONES_CONFIG.length > 0 ? ZONES_CONFIG : DEFAULT_ZONES_CONFIG;
}

export function getZoneById(id: string): SiteZoneConfig | undefined {
  return getZones().find((zone) => zone.id === id);
}

export function getZoneBySensorId(
  sensorId: string,
): SiteZoneConfig | undefined {
  return getZones().find((zone) => zone.sensorId === sensorId);
}

export function getIrrigationTargets(zoneId: string): SiteIrrigationTargets {
  const target = IRRIGATION_CONFIG.find((config) => config.zoneId === zoneId);
  if (target) return target.moistureTargets;

  const fallback = DEFAULT_IRRIGATION_CONFIG.find(
    (config) => config.zoneId === zoneId,
  );
  if (fallback) return fallback.moistureTargets;

  return { min: 40, optimal: 55, max: 70 };
}

export type {
  SiteZoneConfig,
  SiteIrrigationConfig,
  SiteIrrigationTargets,
  SiteFarmConfig,
  SiteConfig,
} from "./types";
