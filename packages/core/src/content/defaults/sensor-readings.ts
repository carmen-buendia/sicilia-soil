import type { ZoneStatusKey } from "../types/content.types";

/**
 * Runtime readings per sensor.
 *
 * Zone metadata (id, location, crop, soilType) lives in `site/site.config.ts`.
 * These objects are the values coming from sensors/backend in production.
 * For the MVP they are hardcoded mock.
 */
export interface SensorReadingDefault {
  sensorId: string;
  moisture: number;
  temperature: number;
  light: number;
  wind: number;
  statusKey: ZoneStatusKey;
}

export const SENSOR_READINGS_DEFAULT: SensorReadingDefault[] = [
  {
    sensorId: "sensor-01",
    moisture: 65,
    temperature: 22.5,
    light: 85,
    wind: 12,
    statusKey: "optimal",
  },
  {
    sensorId: "sensor-02",
    moisture: 58,
    temperature: 24.2,
    light: 92,
    wind: 8,
    statusKey: "optimal",
  },
  {
    sensorId: "sensor-03",
    moisture: 62,
    temperature: 23.1,
    light: 89,
    wind: 10,
    statusKey: "optimal",
  },
  {
    sensorId: "sensor-04",
    moisture: 68,
    temperature: 21.8,
    light: 78,
    wind: 7,
    statusKey: "optimal",
  },
  {
    sensorId: "sensor-05",
    moisture: 55,
    temperature: 28,
    light: 30,
    wind: 5,
    statusKey: "optimal",
  },
  {
    sensorId: "sensor-06",
    moisture: 90,
    temperature: 18,
    light: 40,
    wind: 7,
    statusKey: "optimal",
  },
];
