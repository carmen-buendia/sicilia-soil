"use client";

import {
  TEMPERATURE_ZONES,
  TEMPERATURE_CLIMATE,
  getAverageTemperature,
  getHighTempZones,
  getOptimalTempZones,
} from "@sicilia-soil/core";

/**
 * Hook de temperatura por zona.
 * Ahora: lee del mock centralizado en @sicilia-soil/core.
 * Después: leerá de IoT cuando esté conectado.
 */
export function useTemperatureData() {
  return {
    zones: TEMPERATURE_ZONES,
    climate: TEMPERATURE_CLIMATE,
    average: getAverageTemperature(),
    highZones: getHighTempZones().length,
    optimalZones: getOptimalTempZones().length,
  };
}
