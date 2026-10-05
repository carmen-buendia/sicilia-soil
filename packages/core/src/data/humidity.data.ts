// ============================================================================
// Humidity Data – Simulated data for development
// ============================================================================

export type HumidityTrend = "up" | "down" | "stable";

export interface HumidityZone {
  zone: string;
  current: number;
  optimal: number;
  history: number[];
  unit: string;
  trend: HumidityTrend;
  soilType: string;
  lastWatering: string;
}

export const HUMIDITY_DATA: HumidityZone[] = [
  {
    zone: "Zona de Esparto",
    current: 78,
    optimal: 70,
    history: [75, 77, 78, 76, 79, 78, 77],
    unit: "%",
    trend: "up",
    soilType: "Arcilloso",
    lastWatering: "hace 4h",
  },
  {
    zone: "Huerta de Tomates",
    current: 82,
    optimal: 75,
    history: [80, 81, 82, 81, 83, 82, 81],
    unit: "%",
    trend: "up",
    soilType: "Franco",
    lastWatering: "hace 2h",
  },
  {
    zone: "Olivar",
    current: 45,
    optimal: 60,
    history: [48, 46, 45, 44, 46, 45, 43],
    unit: "%",
    trend: "down",
    soilType: "Calcáreo",
    lastWatering: "hace 12h",
  },
  {
    zone: "Zona Compost",
    current: 55,
    optimal: 50,
    history: [53, 54, 55, 56, 55, 54, 55],
    unit: "%",
    trend: "up",
    soilType: "Orgánico",
    lastWatering: "hace 6h",
  },
  {
    zone: "Jardín de Hierbas",
    current: 68,
    optimal: 65,
    history: [66, 67, 68, 69, 68, 67, 68],
    unit: "%",
    trend: "stable",
    soilType: "Arenoso",
    lastWatering: "hace 8h",
  },
  {
    zone: "Depósito de Agua",
    current: 90,
    optimal: 85,
    history: [88, 89, 90, 91, 90, 89, 90],
    unit: "%",
    trend: "up",
    soilType: "N/A",
    lastWatering: "automático",
  },
];

// ============================================================================
// Derived Metrics
// ============================================================================

export function getAverageHumidity(
  data: HumidityZone[] = HUMIDITY_DATA,
): number {
  if (data.length === 0) return 0;
  let total = 0;
  for (const z of data) {
    total += z.current;
  }
  return Math.round(total / data.length);
}

export function getCriticalZones(
  data: HumidityZone[] = HUMIDITY_DATA,
  threshold = 10,
): HumidityZone[] {
  const result: HumidityZone[] = [];
  for (const z of data) {
    if (z.current < z.optimal - threshold) {
      result.push(z);
    }
  }
  return result;
}

export function getOptimalZones(
  data: HumidityZone[] = HUMIDITY_DATA,
): HumidityZone[] {
  const result: HumidityZone[] = [];
  for (const z of data) {
    if (z.current >= z.optimal) {
      result.push(z);
    }
  }
  return result;
}

export interface ZoneStatus {
  status: "optimal" | "moderate" | "critical";
  label: string;
  colorClass: string;
}

export function getZoneStatus(current: number, optimal: number): ZoneStatus {
  if (current >= optimal) {
    return {
      status: "optimal",
      label: "Óptimo",
      colorClass: "bg-green-100 text-green-800",
    };
  }
  if (current >= optimal - 10) {
    return {
      status: "moderate",
      label: "Moderado",
      colorClass: "bg-yellow-100 text-yellow-800",
    };
  }
  return {
    status: "critical",
    label: "Crítico - Regar",
    colorClass: "bg-red-100 text-red-800",
  };
}

export function getZoneColor(current: number, optimal: number): string {
  if (current >= optimal) return "#22c55e";
  if (current >= optimal - 10) return "#eab308";
  return "#ef4444";
}
