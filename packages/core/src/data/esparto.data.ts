// ============================================================================
// MOCK DATA — Esparto
// Reemplazar por hook useEspartoData() cuando IoT/Data Cube estén listos
// ============================================================================

import type { SymbiosisInput } from "../types/symbiosis.types";

export type EspartoKpi = {
  key: "moisture" | "temperature" | "light" | "wind";
  value: string;
  note: string;
  noteColor: string;
};

export const ESPARTO_KPIS: EspartoKpi[] = [
  {
    key: "moisture",
    value: "69%",
    note: "↑ Óptimo",
    noteColor: "text-green-600",
  },
  {
    key: "temperature",
    value: "20°C",
    note: "✓ Ideal",
    noteColor: "text-green-600",
  },
  {
    key: "light",
    value: "64%",
    note: "Buena exposición",
    noteColor: "text-green-600",
  },
  {
    key: "wind",
    value: "12 km/h",
    note: "Moderado",
    noteColor: "text-green-600",
  },
];

// Input para el motor de simbiosis (sin espartoHealth, que se calcula dinámicamente)
export const ESPARTO_SYMBIOSIS_INPUT: Omit<SymbiosisInput, "espartoHealth"> = {
  coverDensity: 78,
  soilMoisture: 69,
  mycorrhizalColonisation: 45,
  glomalin: 2.1,
  fungalDiversity: 4,
  soilRespiration: 3.2,
  cosPercent: 2.5,
  aggregateStability: 34,
};
