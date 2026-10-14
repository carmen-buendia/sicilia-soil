// packages/core/src/data/water.data.ts

// ============================================================================
// MOCK DATA — Water / soil moisture
// Reemplazar por hook useWaterData() cuando IoT esté conectado
// ============================================================================

import type { WaterZone } from "../types/monitoring.types";

// ----------------------------------------------------------------------------
// Zonas monitorizadas — físicas, definidas por sensor instalado
// ----------------------------------------------------------------------------

export const WATER_DATA: WaterZone[] = [
  {
    id: "zone-01",
    sensorId: "sensor-01",
    zone: "Zona 1",
    location: "Terraza alta",
    current: 78,
    optimal: 70,
    min: 60,
    max: 85,
    history: [75, 77, 78, 76, 79, 78, 77],
    unit: "%",
    trend: "up",
    soilType: "Arcilloso",
    status: "buena",
    icon: "📍",
    lastWatering: "hace 4h",
  },
  {
    id: "zone-02",
    sensorId: "sensor-02",
    zone: "Zona 2",
    location: "Terraza media",
    current: 82,
    optimal: 75,
    min: 65,
    max: 90,
    history: [80, 81, 82, 81, 83, 82, 81],
    unit: "%",
    trend: "up",
    soilType: "Franco",
    status: "excelente",
    icon: "📍",
    lastWatering: "hace 2h",
  },
  {
    id: "zone-03",
    sensorId: "sensor-03",
    zone: "Zona 3",
    location: "Terraza baja",
    current: 45,
    optimal: 60,
    min: 50,
    max: 75,
    history: [48, 46, 45, 44, 46, 45, 43],
    unit: "%",
    trend: "down",
    soilType: "Calcáreo",
    status: "baja",
    icon: "📍",
    lastWatering: "hace 12h",
  },
  {
    id: "zone-04",
    sensorId: "sensor-04",
    zone: "Zona 4",
    location: "Sector húmedo",
    current: 55,
    optimal: 50,
    min: 40,
    max: 65,
    history: [53, 54, 55, 56, 55, 54, 55],
    unit: "%",
    trend: "up",
    soilType: "Orgánico",
    status: "buena",
    icon: "📍",
    lastWatering: "hace 6h",
  },
  {
    id: "zone-05",
    sensorId: "sensor-05",
    zone: "Zona 5",
    location: "Sector seco",
    current: 68,
    optimal: 65,
    min: 55,
    max: 75,
    history: [66, 67, 68, 69, 68, 67, 68],
    unit: "%",
    trend: "stable",
    soilType: "Arenoso",
    status: "buena",
    icon: "📍",
    lastWatering: "hace 8h",
  },
  {
    id: "zone-06",
    sensorId: "sensor-06",
    zone: "Zona 6",
    location: "Zona de pruebas",
    current: 90,
    optimal: 85,
    min: 70,
    max: 100,
    history: [88, 89, 90, 91, 90, 89, 90],
    unit: "%",
    trend: "up",
    soilType: "N/A",
    status: "excelente",
    icon: "📍",
    lastWatering: "automático",
  },
];

// ----------------------------------------------------------------------------
// Clima general
// ----------------------------------------------------------------------------

export const WATER_CLIMATE = {
  temperature: {
    value: 28,
    unit: "°C",
    label: "Temperatura",
    note: "Sensación térmica: 26°C",
  },
  ambientHumidity: {
    value: 65,
    unit: "%",
    label: "Humedad ambiental",
    note: "Viento: 12 km/h",
  },
  evapotranspiration: {
    value: 4.2,
    unit: "mm/día",
    label: "Evapotranspiración",
    note: "Riego recomendado: 5L/m²",
  },
};

// ----------------------------------------------------------------------------
// Control de riego
// ----------------------------------------------------------------------------

export const WATER_CONTROL = {
  autoIrrigation: {
    enabled: true,
    statusLabel: "Activado",
    nextIn: "en 2 horas",
    duration: "15 minutos",
  },
  consumption: {
    current: 124,
    limit: 200,
    unit: "L",
    period: "en las últimas 24h",
  },
};

// ----------------------------------------------------------------------------
// Pronóstico
// ----------------------------------------------------------------------------

export const WATER_FORECAST =
  "Se esperan temperaturas de 30°C mañana. Aumentar riego en un 15% en zonas críticas.";

export const WATER_LAST_READING = "2 min";

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

export function getAverageWater(): number {
  if (WATER_DATA.length === 0) return 0;
  const sum = WATER_DATA.reduce((acc, zone) => acc + zone.current, 0);
  return Math.round(sum / WATER_DATA.length);
}

export function getCriticalZones(): WaterZone[] {
  return WATER_DATA.filter((zone) => zone.current < zone.min);
}

export function getOptimalZones(): WaterZone[] {
  return WATER_DATA.filter(
    (zone) => zone.current >= zone.min && zone.current <= zone.max,
  );
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
