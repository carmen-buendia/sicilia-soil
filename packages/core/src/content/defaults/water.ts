export interface WaterReadingDefault {
  sensorId: string;
  current: number;
  history: number[];
  trend: "up" | "down" | "stable";
  lastWateringHoursAgo: number | "auto";
}

export const WATER_READINGS_DEFAULT: WaterReadingDefault[] = [
  {
    sensorId: "sensor-01",
    current: 78,
    history: [75, 77, 78, 76, 79, 78, 77],
    trend: "up",
    lastWateringHoursAgo: 4,
  },
  {
    sensorId: "sensor-02",
    current: 82,
    history: [80, 81, 82, 81, 83, 82, 81],
    trend: "up",
    lastWateringHoursAgo: 2,
  },
  {
    sensorId: "sensor-03",
    current: 45,
    history: [48, 46, 45, 44, 46, 45, 43],
    trend: "down",
    lastWateringHoursAgo: 12,
  },
  {
    sensorId: "sensor-04",
    current: 55,
    history: [53, 54, 55, 56, 55, 54, 55],
    trend: "up",
    lastWateringHoursAgo: 6,
  },
  {
    sensorId: "sensor-05",
    current: 68,
    history: [66, 67, 68, 69, 68, 67, 68],
    trend: "stable",
    lastWateringHoursAgo: 8,
  },
  {
    sensorId: "sensor-06",
    current: 90,
    history: [88, 89, 90, 91, 90, 89, 90],
    trend: "up",
    lastWateringHoursAgo: "auto",
  },
];

export const WATER_CLIMATE_DEFAULT = {
  temperature: { value: 28, unit: "°C", feelsLike: 26 },
  ambientHumidity: { value: 65, unit: "%", windKmh: 12 },
  evapotranspiration: { value: 4.2, unit: "mm/día", irrigationHint: 5 },
};

export const WATER_CONTROL_DEFAULT = {
  autoIrrigation: { enabled: true, nextInHours: 2, durationMinutes: 15 },
  consumption: { current: 124, limit: 200, unit: "L", periodHours: 24 },
};

export const WATER_FORECAST_DEFAULT = {
  airTempC: 30,
  irrigationIncreasePercent: 15,
};

export const WATER_LAST_READING_MINUTES = 2;
