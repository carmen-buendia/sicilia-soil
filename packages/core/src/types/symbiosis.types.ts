// ============================================================================
// Symbiosis Types – Integrated indicator for regenerative agriculture (T2 + T3)
// ============================================================================

export type SymbiosisCategory =
  | "Establecida"
  | "En desarrollo"
  | "Inicial"
  | "Ausente";

export interface SymbiosisInput {
  // From ground cover (T3)
  espartoHealth: number; // 0-100
  coverDensity: number; // % coverage
  soilMoisture: number; // % (under cover)

  // From soil biology (T2)
  myceliumActivity: number; // 0-100 (based on CO2 and humidity)
  fungalDiversity: number; // Number of active species
  cosPercent: number; // Soil organic carbon (%)
}

export interface SymbiosisIndicators {
  espartoToMycelium: number; // 0-100 (substrate flow)
  myceliumToEsparto: number; // 0-100 (water + nutrients flow)
  carbonFlow: number; // 0-100 (carbon capture of the cycle)
}

export interface SymbiosisResult {
  score: number; // 0-100
  category: SymbiosisCategory;
  indicators: SymbiosisIndicators;
  interpretation: string;
  timestamp: string;
}
