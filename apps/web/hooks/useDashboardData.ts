"use client";

import {
  SENSOR_READINGS_MOCK,
  KPIS_MOCK,
  CARBON_MOCK,
} from "@sicilia-soil/core";
import { getZones } from "@sicilia-soil/core/site";

export function useDashboardData() {
  const zones = getZones().map((config) => {
    const reading = SENSOR_READINGS_MOCK.find(
      (r) => r.sensorId === config.sensorId,
    );

    return {
      id: config.id,
      sensorId: config.sensorId,
      location: config.location,
      currentCropId: config.currentCropId,
      moisture: reading?.moisture ?? 0,
      temperature: reading?.temperature ?? 0,
      light: reading?.light ?? 0,
      wind: reading?.wind ?? 0,
      statusKey: reading?.statusKey ?? "offline",
    };
  });

  return { zones, kpis: KPIS_MOCK, carbon: CARBON_MOCK };
}
