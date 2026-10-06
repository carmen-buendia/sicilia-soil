// packages/core/src/data/humidity.data.ts

// ============================================================================
// Humidity Data – Simulated data for development
// ============================================================================

import type { HumidityZone } from "../types/monitoring.types";

export const HUMIDITY_DATA: HumidityZone[] = [
  {
    id: "esparto",
    zone: "Zona de Esparto",
    current: 78,
    optimal: 70,
    min: 60,
    max: 85,
    history: [75, 77, 78, 76, 79, 78, 77],
    unit: "%",
    trend: "up",
    soilType: "Arcilloso",
    status: "buena",
    icon: "🌾",
    location: "Parcela Norte",
    lastWatering: "hace 4h",
  },
  {
    id: "tomates",
    zone: "Huerta de Tomates",
    current: 82,
    optimal: 75,
    min: 65,
    max: 90,
    history: [80, 81, 82, 81, 83, 82, 81],
    unit: "%",
    trend: "up",
    soilType: "Franco",
    status: "excelente",
    icon: "🍅",
    location: "Parcela Sur",
    lastWatering: "hace 2h",
  },
  {
    id: "olivar",
    zone: "Olivar",
    current: 45,
    optimal: 60,
    min: 50,
    max: 75,
    history: [48, 46, 45, 44, 46, 45, 43],
    unit: "%",
    trend: "down",
    soilType: "Calcáreo",
    status: "baja",
    icon: "🫒",
    location: "Ladera Este",
    lastWatering: "hace 12h",
  },
  {
    id: "compost",
    zone: "Zona Compost",
    current: 55,
    optimal: 50,
    min: 40,
    max: 65,
    history: [53, 54, 55, 56, 55, 54, 55],
    unit: "%",
    trend: "up",
    soilType: "Orgánico",
    status: "buena",
    icon: "♻️",
    location: "Trasera",
    lastWatering: "hace 6h",
  },
  {
    id: "hierbas",
    zone: "Jardín de Hierbas",
    current: 68,
    optimal: 65,
    min: 55,
    max: 75,
    history: [66, 67, 68, 69, 68, 67, 68],
    unit: "%",
    trend: "stable",
    soilType: "Arenoso",
    status: "buena",
    icon: "🌿",
    location: "Parcela Oeste",
    lastWatering: "hace 8h",
  },
  {
    id: "agua",
    zone: "Depósito de Agua",
    current: 90,
    optimal: 85,
    min: 70,
    max: 100,
    history: [88, 89, 90, 91, 90, 89, 90],
    unit: "%",
    trend: "up",
    soilType: "N/A",
    status: "excelente",
    icon: "💧",
    location: "Noreste",
    lastWatering: "automático",
  },
];

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

export function getAverageHumidity(): number {
  if (HUMIDITY_DATA.length === 0) return 0;
  const sum = HUMIDITY_DATA.reduce((acc, z) => acc + z.current, 0);
  return Math.round(sum / HUMIDITY_DATA.length);
}

export function getCriticalZones(): HumidityZone[] {
  return HUMIDITY_DATA.filter((z) => z.current < z.min);
}

export function getOptimalZones(): HumidityZone[] {
  return HUMIDITY_DATA.filter((z) => z.current >= z.min && z.current <= z.max);
}

export function getZoneStatus(
  current: number,
  optimal: number,
): { status: string; label: string; colorClass: string } {
  if (current < optimal - 10) {
    return {
      status: "critical",
      label: "Necesita riego",
      colorClass: "bg-red-100 text-red-700",
    };
  }
  if (current < optimal - 5) {
    return {
      status: "warning",
      label: "Bajo",
      colorClass: "bg-yellow-100 text-yellow-700",
    };
  }
  return {
    status: "optimal",
    label: "Óptimo",
    colorClass: "bg-green-100 text-green-700",
  };
}

export function getZoneColor(current: number, optimal: number): string {
  if (current < optimal - 10) return "#ef4444";
  if (current < optimal - 5) return "#eab308";
  return "#10b981";
}
