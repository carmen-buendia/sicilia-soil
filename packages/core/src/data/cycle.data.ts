// ============================================================================
// MOCK DATA — Ciclo anual + ciclo regenerativo
// Reemplazar por hook useCycleData() cuando IoT/Data Cube estén listos
// ============================================================================

// ----------------------------------------------------------------------------
// Ciclo anual del sistema (gráfico de 12 meses)
// ----------------------------------------------------------------------------

export type YearCycleData = {
  growth: number[]; // crecimiento vegetal (%)
  mycorrhiza: number[]; // actividad micorrícica (%)
  harvest: number[]; // cosecha (%)
  mushroom: number[]; // ventana de setas (%)
};

export const YEAR_CYCLE_MONTHS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export const YEAR_CYCLE_DATA: YearCycleData = {
  growth: [10, 15, 30, 55, 75, 90, 100, 95, 80, 50, 25, 15],
  mycorrhiza: [40, 42, 48, 55, 60, 62, 58, 52, 55, 65, 55, 45],
  harvest: [0, 0, 0, 0, 0, 0, 100, 80, 0, 0, 0, 0],
  mushroom: [0, 0, 0, 0, 0, 0, 0, 0, 20, 90, 60, 10],
};

export const YEAR_CYCLE_LEGEND = [
  { key: "growth", label: "Crecimiento vegetal", color: "#8B9D6B" },
  { key: "mycorrhiza", label: "Micorrizas activas", color: "#10b981" },
  { key: "harvest", label: "Cosecha", color: "#D4A574" },
  { key: "mushroom", label: "Setas", color: "#E07A5F" },
];

export const YEAR_CYCLE_NOTE =
  "El micelio mantiene su actividad todo el año (línea verde). La cosecha del esparto coincide con el pico de crecimiento (jun-jul). La ventana de setas se concentra en otoño, tras las primeras lluvias (oct-nov).";

// ----------------------------------------------------------------------------
// Diagrama del ciclo regenerativo (etapas)
// ----------------------------------------------------------------------------

export type CycleStage = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  color: string;
};

export const ESPARTO_CYCLE_STAGES: CycleStage[] = [
  {
    id: "biomass",
    icon: "🌾",
    title: "Esparto + cereal",
    subtitle: "Biomasa vegetal",
    metric: "2.4 t/ha",
    metricLabel: "biomasa anual",
    color: "#8B9D6B",
  },
  {
    id: "mycelium",
    icon: "🕸️",
    title: "Micelio AMF",
    subtitle: "Red fúngica activa",
    metric: "45%",
    metricLabel: "colonización",
    color: "#A3B18A",
  },
  {
    id: "humus",
    icon: "🌱",
    title: "Suelo vivo",
    subtitle: "Humus + glomalina",
    metric: "2.1 mg/g",
    metricLabel: "glomalina",
    color: "#6B8E23",
  },
  {
    id: "mushrooms",
    icon: "🍄",
    title: "Setas",
    subtitle: "Bioindicador · otoño",
    metric: "4 sp.",
    metricLabel: "especies nativas",
    color: "#8B6F47",
  },
];

// Variante para otros contextos (policultivo, cereal)
export const POLYCULTURE_CYCLE_STAGES: CycleStage[] = [
  {
    id: "biomass",
    icon: "🌳",
    title: "Árboles + hortalizas",
    subtitle: "Biomasa diversa",
    metric: "3.2 t/ha",
    metricLabel: "biomasa anual",
    color: "#6B8E23",
  },
  {
    id: "mycelium",
    icon: "🕸️",
    title: "Micelio AMF",
    subtitle: "Red fúngica activa",
    metric: "42%",
    metricLabel: "colonización",
    color: "#A3B18A",
  },
  {
    id: "humus",
    icon: "🌱",
    title: "Compost → suelo",
    subtitle: "Ciclo cerrado",
    metric: "16 kg/mes",
    metricLabel: "compost aplicado",
    color: "#8B6F47",
  },
  {
    id: "mushrooms",
    icon: "🍄",
    title: "Setas saprófitas",
    subtitle: "Subproducto del compost",
    metric: "4 sp.",
    metricLabel: "especies cultivables",
    color: "#D4A574",
  },
];

export const CYCLE_CLOSING_NOTE =
  "El micelio trabaja todo el año bajo tierra. Cuando las condiciones son favorables (otoño, tras lluvias), aparecen las setas — señal visible de que la red está sana, no objetivo principal.";
