// packages/core/src/data/dashboard.data.ts

// ============================================================================
// MOCK DATA — Dashboard (zonas + KPIs + carbono)
// Reemplazar por hook useDashboardData() cuando IoT/Data Cube estén listos
// ============================================================================

import type {
  GardenZone,
  DashboardKpi,
  CarbonSummary,
} from "../types/monitoring.types";

export const GARDEN_ZONES: GardenZone[] = [
  {
    id: "norte",
    name: "Zona de Esparto",
    type: "Planta textil",
    location: "Parcela Norte",
    moisture: 65,
    temperature: 22.5,
    light: 85,
    wind: 12,
    status: "saludable",
    icon: "🌾",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "sur",
    name: "Huerta de Tomates",
    type: "Hortalizas",
    location: "Parcela Sur",
    moisture: 58,
    temperature: 24.2,
    light: 92,
    wind: 8,
    status: "saludable",
    icon: "🍅",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "este",
    name: "Olivar",
    type: "Árboles",
    location: "Ladera Este",
    moisture: 62,
    temperature: 23.1,
    light: 89,
    wind: 10,
    status: "saludable",
    icon: "🫒",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "oeste",
    name: "Jardín de Hierbas",
    type: "Aromáticas",
    location: "Parcela Oeste",
    moisture: 68,
    temperature: 21.8,
    light: 78,
    wind: 7,
    status: "saludable",
    icon: "🌿",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "compost",
    name: "Zona Compost",
    type: "Suelo vivo",
    location: "Trasera",
    moisture: 55,
    temperature: 28,
    light: 30,
    wind: 5,
    status: "activo",
    icon: "♻️",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "agua",
    name: "Depósito de Agua",
    type: "Recolección",
    location: "Noreste",
    moisture: 90,
    temperature: 18,
    light: 40,
    wind: 7,
    status: "lleno",
    icon: "💧",
    lastUpdate: new Date().toISOString(),
  },
];

export const DASHBOARD_KPIS: DashboardKpi[] = [
  {
    value: "88/100",
    label: "Salud del suelo",
    icon: "leaf",
    subtext: "Índice SHI",
  },
  {
    value: "0.18",
    label: "Estrés hídrico",
    icon: "droplet",
    subtext: "Bajo · estable",
  },
  {
    value: "31%",
    label: "Humedad del suelo",
    icon: "gauge",
    subtext: "Sentinel-1 SAR",
  },
  {
    value: "2.5%",
    label: "Carbono orgánico (COS)",
    icon: "trees",
    subtext: "↑ +0.3% este ciclo",
  },
  {
    value: "33 t/ha",
    label: "CO₂ secuestrado",
    icon: "trees",
    subtext: "Captura estimada",
  },
  {
    value: "4",
    label: "Redes micorrícicas",
    icon: "mycorrhiza",
    subtext: "Red fúngica activa",
  },
];

export const CARBON_SUMMARY: CarbonSummary = {
  organicCarbonPercent: 2.5,
  bulkDensity: 1.2,
  depth: 30,
  co2Sequestration: 33.0,
};
