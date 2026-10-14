import type { SiteZoneConfig, SiteIrrigationConfig } from "./types";

/**
 * Physical installation config.
 *
 * To add a new sensor in the field:
 *   1. Note the sensor ID printed on the device
 *   2. Add a zone below with a location and soil type
 *   3. Add the irrigation targets in IRRIGATION_CONFIG
 *   4. Optionally assign a current crop
 */
export const ZONES_CONFIG: SiteZoneConfig[] = [
  {
    id: "zone-01",
    sensorId: "sensor-01",
    location: "Terraza alta",
    soilType: "Arcilloso",
    currentCropId: "crop-esparto",
  },
  {
    id: "zone-02",
    sensorId: "sensor-02",
    location: "Terraza media",
    soilType: "Franco",
    currentCropId: "crop-tomate",
  },
  {
    id: "zone-03",
    sensorId: "sensor-03",
    location: "Terraza baja",
    soilType: "Calcáreo",
    currentCropId: "crop-olivar",
  },
  {
    id: "zone-04",
    sensorId: "sensor-04",
    location: "Sector húmedo",
    soilType: "Orgánico",
    currentCropId: "crop-hierbas",
  },
  {
    id: "zone-05",
    sensorId: "sensor-05",
    location: "Sector seco",
    soilType: "Arenoso",
  },
  {
    id: "zone-06",
    sensorId: "sensor-06",
    location: "Zona de pruebas",
    soilType: "N/A",
  },
];

/**
 * Irrigation targets per zone (soil moisture, %).
 */
export const IRRIGATION_CONFIG: SiteIrrigationConfig[] = [
  { zoneId: "zone-01", moistureTargets: { min: 60, optimal: 70, max: 85 } },
  { zoneId: "zone-02", moistureTargets: { min: 65, optimal: 75, max: 90 } },
  { zoneId: "zone-03", moistureTargets: { min: 50, optimal: 60, max: 75 } },
  { zoneId: "zone-04", moistureTargets: { min: 40, optimal: 50, max: 65 } },
  { zoneId: "zone-05", moistureTargets: { min: 55, optimal: 65, max: 75 } },
  { zoneId: "zone-06", moistureTargets: { min: 70, optimal: 85, max: 100 } },
];
