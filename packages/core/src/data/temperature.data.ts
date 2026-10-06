// packages/core/src/data/temperature.data.ts

// ============================================================================
// MOCK DATA — Temperatura por zona
// Reemplazar por hook useTemperatureData() cuando IoT esté conectado
// ============================================================================

import type { TemperatureZone } from "../types/monitoring.types";

// ----------------------------------------------------------------------------
// Zonas monitorizadas
// ----------------------------------------------------------------------------

export const TEMPERATURE_ZONES: TemperatureZone[] = [
  {
    id: "esparto",
    zone: "Zona de Esparto",
    current: 22,
    optimal: 25,
    min: 18,
    max: 30,
    history: [21, 22, 23, 22, 21, 22, 22],
    unit: "°C",
    trend: "up",
    soilType: "Arcilloso",
    status: "buena",
    icon: "🌾",
    location: "Parcela Norte",
  },
  {
    id: "tomates",
    zone: "Huerta de Tomates",
    current: 24,
    optimal: 28,
    min: 20,
    max: 32,
    history: [23, 24, 25, 24, 23, 24, 24],
    unit: "°C",
    trend: "up",
    soilType: "Franco",
    status: "buena",
    icon: "🍅",
    location: "Parcela Sur",
  },
  {
    id: "olivar",
    zone: "Olivar",
    current: 21,
    optimal: 30,
    min: 18,
    max: 35,
    history: [20, 21, 22, 21, 20, 21, 21],
    unit: "°C",
    trend: "down",
    soilType: "Calcáreo",
    status: "baja",
    icon: "🫒",
    location: "Ladera Este",
  },
  {
    id: "compost",
    zone: "Zona Compost",
    current: 28,
    optimal: 35,
    min: 25,
    max: 45,
    history: [27, 28, 29, 28, 27, 28, 28],
    unit: "°C",
    trend: "up",
    soilType: "Orgánico",
    status: "buena",
    icon: "♻️",
    location: "Trasera",
  },
  {
    id: "hierbas",
    zone: "Jardín de Hierbas",
    current: 23,
    optimal: 26,
    min: 18,
    max: 30,
    history: [22, 23, 24, 23, 22, 23, 23],
    unit: "°C",
    trend: "stable",
    soilType: "Arenoso",
    status: "buena",
    icon: "🌿",
    location: "Parcela Oeste",
  },
  {
    id: "agua",
    zone: "Depósito de Agua",
    current: 18,
    optimal: 22,
    min: 15,
    max: 25,
    history: [17, 18, 19, 18, 17, 18, 18],
    unit: "°C",
    trend: "up",
    soilType: "N/A",
    status: "buena",
    icon: "💧",
    location: "Noreste",
  },
];

// ----------------------------------------------------------------------------
// Clima general
// ----------------------------------------------------------------------------

export const TEMPERATURE_CLIMATE = {
  solarRadiation: {
    value: 780,
    unit: "W/m²",
    label: "Radiación solar",
    status: "Alta",
  },
  relativeHumidity: {
    value: 55,
    unit: "%",
    label: "Humedad relativa",
    status: "Moderada",
  },
  wind: {
    value: 12,
    unit: "km/h",
    label: "Viento",
    status: "Brisa suave",
  },
};

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

export function getAverageTemperature(): number {
  if (TEMPERATURE_ZONES.length === 0) return 0;
  const sum = TEMPERATURE_ZONES.reduce((acc, z) => acc + z.current, 0);
  return Math.round(sum / TEMPERATURE_ZONES.length);
}

export function getHighTempZones(): TemperatureZone[] {
  return TEMPERATURE_ZONES.filter((z) => z.current > z.optimal + 5);
}

export function getOptimalTempZones(): TemperatureZone[] {
  return TEMPERATURE_ZONES.filter((z) => z.current <= z.optimal);
}

export function getTempStatusColor(current: number, optimal: number): string {
  if (current <= optimal) return "bg-green-100 text-green-800";
  if (current <= optimal + 5) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}

export function getTempStatusText(current: number, optimal: number): string {
  if (current <= optimal) return "Óptimo";
  if (current <= optimal + 5) return "Moderado";
  return "Alta · Proteger";
}
