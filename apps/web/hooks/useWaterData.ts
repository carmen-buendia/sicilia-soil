"use client";

import {
  WATER_READINGS_MOCK,
  WATER_CLIMATE_MOCK,
  WATER_CONTROL_MOCK,
  WATER_FORECAST_MOCK,
  WATER_LAST_READING_MINUTES,
} from "@sicilia-soil/core";
import { getZones, getIrrigationTargets } from "@sicilia-soil/core/site";

export function useWaterData() {
  const zones = getZones().map((config) => {
    const reading = WATER_READINGS_MOCK.find(
      (r) => r.sensorId === config.sensorId,
    );
    const targets = getIrrigationTargets(config.id);

    return {
      id: config.id,
      sensorId: config.sensorId,
      location: config.location,
      soilType: config.soilType,
      currentCropId: config.currentCropId,
      current: reading?.current ?? 0,
      history: reading?.history ?? [],
      trend: reading?.trend ?? "stable",
      lastWateringHoursAgo: reading?.lastWateringHoursAgo ?? 0,
      min: targets.min,
      optimal: targets.optimal,
      max: targets.max,
    };
  });

  const average =
    zones.length === 0
      ? 0
      : Math.round(
          zones.reduce((sum, zone) => sum + zone.current, 0) / zones.length,
        );

  const criticalZones = zones.filter((zone) => zone.current < zone.min).length;
  const optimalZones = zones.filter(
    (zone) => zone.current >= zone.min && zone.current <= zone.max,
  ).length;

  return {
    zones,
    climate: WATER_CLIMATE_MOCK,
    waterControl: WATER_CONTROL_MOCK,
    forecast: WATER_FORECAST_MOCK,
    lastReadingMinutes: WATER_LAST_READING_MINUTES,
    average,
    criticalZones,
    optimalZones,
  };
}
