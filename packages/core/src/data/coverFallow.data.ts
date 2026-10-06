// ============================================================================
// MOCK DATA — Coberturas vegetales y barbecho
// Reemplazar por hook useCoverFallowData() cuando IoT/Data Cube estén listos
// ============================================================================

export type CoverKpi = {
  label: string;
  value: string;
  note: string;
  icon: string;
  color: string;
};

export const COVER_KPIS: CoverKpi[] = [
  {
    label: "Cobertura del suelo",
    value: "78%",
    note: "↑ Óptimo",
    icon: "leaf",
    color: "text-emerald-600",
  },
  {
    label: "Biomasa aérea",
    value: "2.4 t/ha",
    note: "Estimada por NDVI",
    icon: "trending-up",
    color: "text-oliveGreen",
  },
  {
    label: "N fijado (leguminosas)",
    value: "18 kg/ha",
    note: "Trébol + veza",
    icon: "leaf",
    color: "text-green-600",
  },
  {
    label: "Ahorro de agua",
    value: "22%",
    note: "vs. suelo desnudo",
    icon: "droplet",
    color: "text-blue-500",
  },
];

export type CoverSpecies = {
  id: string;
  name: string;
  icon: string;
  cover: number; // %
  biomass: number; // t/ha
  n: number; // kg/ha
  season: string;
  status: "Activo" | "Terminando";
};

export const COVER_SPECIES: CoverSpecies[] = [
  {
    id: "trebol",
    name: "Trébol subterráneo",
    icon: "🍀",
    cover: 82,
    biomass: 2.8,
    n: 22,
    season: "Otoño-invierno",
    status: "Activo",
  },
  {
    id: "veza",
    name: "Veza",
    icon: "🌿",
    cover: 76,
    biomass: 2.5,
    n: 20,
    season: "Otoño-invierno",
    status: "Activo",
  },
  {
    id: "avena",
    name: "Avena",
    icon: "🌾",
    cover: 85,
    biomass: 3.1,
    n: 0,
    season: "Otoño",
    status: "Activo",
  },
  {
    id: "mostaza",
    name: "Mostaza",
    icon: "🌼",
    cover: 68,
    biomass: 2.0,
    n: 0,
    season: "Otoño",
    status: "Terminando",
  },
];

export type FallowKpi = {
  label: string;
  value: string;
  note: string;
};

export const FALLOW_KPIS: FallowKpi[] = [
  { label: "Duración", value: "6 meses", note: "rotación planificada" },
  { label: "Humedad del suelo", value: "45%", note: "recuperando" },
  { label: "Materia orgánica", value: "1.8%", note: "↑ 0.2 este ciclo" },
  { label: "Próxima siembra", value: "Marzo", note: "cereal de primavera" },
];

export type FallowTimelineStep = {
  month: string;
  stage: string;
  state: "done" | "active" | "pending";
};

export const FALLOW_TIMELINE: FallowTimelineStep[] = [
  { month: "Sep", stage: "Terminación cereal", state: "done" },
  { month: "Oct", stage: "Reposo inicial", state: "done" },
  { month: "Nov", stage: "Recuperación humedad", state: "active" },
  { month: "Dic", stage: "Recuperación nutrientes", state: "pending" },
  { month: "Ene", stage: "Reposo profundo", state: "pending" },
  { month: "Feb", stage: "Preparación siembra", state: "pending" },
  { month: "Mar", stage: "Siembra cereal", state: "pending" },
];
