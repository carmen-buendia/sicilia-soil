"use client";

import {
  HUMIDITY_DATA,
  HUMIDITY_CLIMATE,
  WATER_CONTROL,
  HUMIDITY_FORECAST,
  HUMIDITY_LAST_READING,
  getAverageHumidity,
  getCriticalZones,
  getOptimalZones,
} from "@sicilia-soil/core";

export function useHumidityData() {
  return {
    zones: HUMIDITY_DATA,
    climate: HUMIDITY_CLIMATE,
    waterControl: WATER_CONTROL,
    forecast: HUMIDITY_FORECAST,
    lastReading: HUMIDITY_LAST_READING,
    average: getAverageHumidity(),
    criticalZones: getCriticalZones().length,
    optimalZones: getOptimalZones().length,
  };
}
