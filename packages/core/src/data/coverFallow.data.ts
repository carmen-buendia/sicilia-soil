// ============================================================================
// DEMO DATA — Cover crops and fallow land (Focus: Ecological monitoring)
// Replace with useCoverFallowData() hook when IoT/Data Cube are ready
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
    label: "Coverage index", // Previously: Soil coverage
    value: "78%",
    note: "NDVI + in-situ fusion",
    icon: "leaf",
    color: "text-emerald-600",
  },
  {
    label: "Above-ground biomass",
    value: "2.4 t/ha",
    note: "Spectral estimation",
    icon: "trending-up",
    color: "text-oliveGreen",
  },
  {
    label: "Biological N fixation",
    value: "18 kg/ha",
    note: "Active legumes",
    icon: "leaf",
    color: "text-green-600",
  },
  {
    label: "Water retention", // Previously: Water savings
    value: "22%",
    note: "Vs. bare soil",
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
  status: "High density" | "Senescence" | "Emergence"; // Biological states, not tasks
};

export const COVER_SPECIES: CoverSpecies[] = [
  {
    id: "trebol",
    name: "Subterranean clover",
    icon: "🍀",
    cover: 82,
    biomass: 2.8,
    n: 22,
    season: "Autumn-winter",
    status: "High density",
  },
  {
    id: "veza",
    name: "Vetch",
    icon: "🌿",
    cover: 76,
    biomass: 2.5,
    n: 20,
    season: "Autumn-winter",
    status: "High density",
  },
  {
    id: "avena",
    name: "Oats",
    icon: "🌾",
    cover: 85,
    biomass: 3.1,
    n: 0,
    season: "Autumn",
    status: "High density",
  },
  {
    id: "mostaza",
    name: "Mustard",
    icon: "🌼",
    cover: 68,
    biomass: 2.0,
    n: 0,
    season: "Autumn",
    status: "Senescence", // Scientific term for "ending its cycle"
  },
];

export type FallowKpi = {
  label: string;
  value: string;
  note: string;
};

export const FALLOW_KPIS: FallowKpi[] = [
  { label: "Rest period", value: "6 months", note: "Planned cycle" },
  { label: "Soil moisture", value: "45%", note: "Recovering" },
  { label: "Organic matter", value: "1.8%", note: "↑ 0.2% this cycle" },
  { label: "Phenological window", value: "March", note: "Next cycle" },
];

export type FallowTimelineStep = {
  month: string;
  stage: string;
  state: "done" | "active" | "pending";
};

export const FALLOW_TIMELINE: FallowTimelineStep[] = [
  { month: "Sep", stage: "Initial decomposition", state: "done" },
  { month: "Oct", stage: "Microbial latency", state: "done" },
  { month: "Nov", stage: "Aquifer recharge", state: "active" },
  { month: "Dec", stage: "N mineralization", state: "pending" },
  { month: "Jan", stage: "Edaphic rest", state: "pending" },
  { month: "Feb", stage: "Enzymatic activity", state: "pending" },
  { month: "Mar", stage: "Crop emergence", state: "pending" },
];
