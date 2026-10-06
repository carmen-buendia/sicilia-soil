"use client";

import {
  LIGHT_ZONES,
  LIGHT_HISTORICAL,
  LIGHT_FORECAST,
  LIGHT_CLIMATE,
  LIGHT_SUN_DATA,
  getAverageLight,
  getLowLightZones,
  getOptimalLightZones,
} from "@sicilia-soil/core";

export function useLightData() {
  return {
    zones: LIGHT_ZONES,
    historical: LIGHT_HISTORICAL,
    forecast: LIGHT_FORECAST,
    climate: LIGHT_CLIMATE,
    sunData: LIGHT_SUN_DATA,
    average: getAverageLight(),
    lowZones: getLowLightZones().length,
    optimalZones: getOptimalLightZones().length,
  };
}
