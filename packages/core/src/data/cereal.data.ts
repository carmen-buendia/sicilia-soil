// ============================================================================
// MOCK DATA — Cereal test plot
// Reemplazar por hook useCerealData() cuando IoT/Data Cube estén listos
// ============================================================================

export type CerealKpi = {
  label: string;
  value: string;
  note: string;
  color: string;
};

export const CEREAL_KPIS: CerealKpi[] = [
  {
    label: "NDVI actual",
    value: "0.58",
    note: "Crecimiento vegetativo",
    color: "text-emerald-600",
  },
  {
    label: "Humedad",
    value: "58%",
    note: "Óptimo 60-70%",
    color: "text-blue-500",
  },
  {
    label: "Temperatura",
    value: "24°C",
    note: "✓ Ideal",
    color: "text-red-500",
  },
  {
    label: "Colonización micorrícica",
    value: "30%",
    note: "vs. esparto: 45%",
    color: "text-amber-600",
  },
];

export type CerealGrowthPoint = {
  week: string;
  ndvi: number;
  moisture: number;
};

export const CEREAL_GROWTH_DATA: CerealGrowthPoint[] = [
  { week: "S1", ndvi: 0.12, moisture: 68 },
  { week: "S2", ndvi: 0.21, moisture: 66 },
  { week: "S3", ndvi: 0.34, moisture: 64 },
  { week: "S4", ndvi: 0.45, moisture: 62 },
  { week: "S5", ndvi: 0.52, moisture: 60 },
  { week: "S6", ndvi: 0.58, moisture: 58 },
];

export type CerealComparison = {
  metric: string;
  cereal: number;
  esparto: number;
};

export const CEREAL_COMPARISON: CerealComparison[] = [
  { metric: "NDVI", cereal: 0.58, esparto: 0.74 },
  { metric: "Colonización AMF", cereal: 30, esparto: 45 },
  { metric: "Glomalina (mg/g)", cereal: 1.5, esparto: 2.1 },
  { metric: "SHI (0-100)", cereal: 62, esparto: 88 },
];

export const CEREAL_PLOT_INFO = {
  name: "Parcela de Cereal",
  role: "Trigo, cebada y avena en rotación · comparación con esparto y cubiertas",
  area: "40–50 m²",
  crops: ["Trigo", "Cebada", "Avena"],
  stage: "Crecimiento vegetativo",
};
