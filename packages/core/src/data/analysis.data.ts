// ============================================================================
// MOCK DATA — Comparativa de coberturas (esparto, árboles, hortalizas, etc.)
// Reemplazar por hook useAnalysisData() cuando IoT/Data Cube estén listos
// ============================================================================

export type CoverComparisonRow = {
  id: string;
  cover: string;
  colonisation: number; // %
  glomalin: number; // mg/g
  shi: number; // 0-100
};

export const COVER_COMPARISON: CoverComparisonRow[] = [
  { id: "esparto", cover: "Esparto", colonisation: 45, glomalin: 2.1, shi: 88 },
  { id: "arboles", cover: "Árboles", colonisation: 42, glomalin: 2.0, shi: 82 },
  {
    id: "hortalizas",
    cover: "Hortalizas",
    colonisation: 35,
    glomalin: 1.6,
    shi: 68,
  },
  { id: "cereal", cover: "Cereal", colonisation: 30, glomalin: 1.5, shi: 62 },
  {
    id: "cubiertas",
    cover: "Cubiertas",
    colonisation: 38,
    glomalin: 1.8,
    shi: 74,
  },
  {
    id: "barbecho",
    cover: "Barbecho",
    colonisation: 25,
    glomalin: 1.2,
    shi: 55,
  },
];
