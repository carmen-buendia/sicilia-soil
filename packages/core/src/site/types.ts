/**
 * Site configuration types.
 *
 * Describe a physical installation (the farm, its zones and sensors,
 * irrigation targets). NOT mock data, NOT runtime readings.
 *
 * Prefixed with `Site` to avoid collision with the legacy types in
 * `types/farm.types.ts` (FarmConfig) and `types/monitoring.types.ts`
 * (ZoneConfig), both deprecated and pending removal.
 */

export interface SiteZoneConfig {
  id: string;
  sensorId: string;
  location: string;
  soilType: string;
  currentCropId?: string;
}

export interface SiteIrrigationTargets {
  min: number;
  optimal: number;
  max: number;
}

export interface SiteIrrigationConfig {
  zoneId: string;
  moistureTargets: SiteIrrigationTargets;
}

export interface SiteFarmConfig {
  name: string;
  location: string;
  zones: SiteZoneConfig[];
}

export interface SiteConfig {
  farm: SiteFarmConfig;
  irrigation: SiteIrrigationConfig[];
}
