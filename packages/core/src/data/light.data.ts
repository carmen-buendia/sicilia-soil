// packages/core/src/data/light.data.ts

// ============================================================================
// MOCK DATA — Luz solar por zona
// Reemplazar por hook useLightData() cuando IoT esté conectado
// ============================================================================

import type { LightZone, HistoricalDataPoint } from "../types/monitoring.types";

// Tipo local para previsión (incluye UV)
export interface LightForecastPoint {
  day: string;
  value: number;
  uv: number;
}

// ----------------------------------------------------------------------------
// Zonas monitorizadas
// ----------------------------------------------------------------------------

export const LIGHT_ZONES: LightZone[] = [
  {
    id: "esparto",
    zone: "Zona de Esparto",
    current: 65,
    optimal: 70,
    min: 50,
    max: 85,
    history: [62, 63, 65, 64, 66, 65, 65],
    unit: "%",
    trend: "up",
    soilType: "Arcilloso",
    status: "buena",
    icon: "🌾",
    location: "Parcela Norte",
    uv: 4,
    hours: 8.5,
  },
  {
    id: "tomates",
    zone: "Huerta de Tomates",
    current: 78,
    optimal: 80,
    min: 60,
    max: 90,
    history: [75, 76, 78, 77, 79, 78, 78],
    unit: "%",
    trend: "up",
    soilType: "Franco",
    status: "excelente",
    icon: "🍅",
    location: "Parcela Sur",
    uv: 5,
    hours: 9.2,
  },
  {
    id: "olivar",
    zone: "Olivar",
    current: 45,
    optimal: 60,
    min: 40,
    max: 75,
    history: [43, 44, 45, 44, 46, 45, 45],
    unit: "%",
    trend: "down",
    soilType: "Calcáreo",
    status: "baja",
    icon: "🫒",
    location: "Ladera Este",
    uv: 3,
    hours: 6.0,
  },
  {
    id: "compost",
    zone: "Zona Compost",
    current: 30,
    optimal: 40,
    min: 25,
    max: 55,
    history: [28, 29, 30, 31, 30, 29, 30],
    unit: "%",
    trend: "up",
    soilType: "Orgánico",
    status: "muy baja",
    icon: "♻️",
    location: "Trasera",
    uv: 2,
    hours: 4.5,
  },
  {
    id: "hierbas",
    zone: "Jardín de Hierbas",
    current: 70,
    optimal: 75,
    min: 55,
    max: 85,
    history: [68, 69, 70, 71, 70, 69, 70],
    unit: "%",
    trend: "stable",
    soilType: "Arenoso",
    status: "buena",
    icon: "🌿",
    location: "Parcela Oeste",
    uv: 4,
    hours: 8.0,
  },
  {
    id: "agua",
    zone: "Depósito de Agua",
    current: 40,
    optimal: 50,
    min: 35,
    max: 65,
    history: [38, 39, 40, 41, 40, 39, 40],
    unit: "%",
    trend: "up",
    soilType: "N/A",
    status: "baja",
    icon: "💧",
    location: "Noreste",
    uv: 3,
    hours: 5.5,
  },
];

// ----------------------------------------------------------------------------
// Histórico (últimos 7 días)
// ----------------------------------------------------------------------------

export const LIGHT_HISTORICAL: HistoricalDataPoint[] = [
  { day: "Lun", value: 65, optimal: 70 },
  { day: "Mar", value: 68, optimal: 70 },
  { day: "Mié", value: 72, optimal: 70 },
  { day: "Jue", value: 70, optimal: 70 },
  { day: "Vie", value: 75, optimal: 70 },
  { day: "Sáb", value: 78, optimal: 70 },
  { day: "Dom", value: 73, optimal: 70 },
];

// ----------------------------------------------------------------------------
// Previsión (próximos 5 días)
// ----------------------------------------------------------------------------

export const LIGHT_FORECAST: LightForecastPoint[] = [
  { day: "Lun", value: 72, uv: 5 },
  { day: "Mar", value: 75, uv: 6 },
  { day: "Mié", value: 68, uv: 4 },
  { day: "Jue", value: 70, uv: 5 },
  { day: "Vie", value: 78, uv: 7 },
];

// ----------------------------------------------------------------------------
// Clima general
// ----------------------------------------------------------------------------

export const LIGHT_CLIMATE = {
  solarRadiation: {
    value: 650,
    unit: "W/m²",
    label: "Radiación solar",
    status: "Buena exposición",
  },
  ambientHumidity: {
    value: 58,
    unit: "%",
    label: "Humedad ambiental",
    status: "Normal",
  },
  temperature: {
    value: 24,
    unit: "°C",
    label: "Temperatura",
    status: "Templado",
  },
};

// ----------------------------------------------------------------------------
// Datos astronómicos (amanecer, atardecer, UV máximo, etc.)
// ----------------------------------------------------------------------------

export const LIGHT_SUN_DATA = {
  sunrise: "06:47",
  sunset: "19:32",
  dayLength: "12h 45m",
  maxUV: { value: 7, label: "Alto" },
  nextAlarm: "En 2h (UV alto)",
};

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

export function getAverageLight(): number {
  if (LIGHT_ZONES.length === 0) return 0;
  const sum = LIGHT_ZONES.reduce((acc, z) => acc + z.current, 0);
  return Math.round(sum / LIGHT_ZONES.length);
}

export function getLowLightZones(): LightZone[] {
  return LIGHT_ZONES.filter((z) => z.current < z.optimal - 15);
}

export function getOptimalLightZones(): LightZone[] {
  return LIGHT_ZONES.filter((z) => z.current >= z.optimal);
}
