"use client";

import {
  WATER_DATA,
  WATER_CLIMATE,
  WATER_CONTROL,
  WATER_FORECAST,
  WATER_LAST_READING,
  getAverageWater,
  getCriticalZones,
  getOptimalZones,
} from "@sicilia-soil/core";

export function useWaterData() {
  return {
    zones: WATER_DATA,
    climate: WATER_CLIMATE,
    waterControl: WATER_CONTROL,
    forecast: WATER_FORECAST,
    lastReading: WATER_LAST_READING,
    average: getAverageWater(),
    criticalZones: getCriticalZones().length,
    optimalZones: getOptimalZones().length,
  };
}
