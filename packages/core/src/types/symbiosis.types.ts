// packages/core/src/types/symbiosis.types.ts

import type {
  MycorrhizaHost,
  MycorrhizaHostId,
  MycorrhizaType,
} from "./mycorrhiza.types";

// ============================================================================
// Symbiosis Types – Regenerative agriculture indicator (suelo + agua)
// ----------------------------------------------------------------------------
// La simbiosis planta–hongo es el núcleo de la regeneración.
// El micelio trabaja todo el año; las setas son un bioindicador estacional.
// ============================================================================

export type SymbiosisCategory =
  | "Establecida"
  | "En desarrollo"
  | "Inicial"
  | "Ausente";

// ----------------------------------------------------------------------------
// Inputs — datos que alimentan el cálculo
// ----------------------------------------------------------------------------

export interface SymbiosisInput {
  // Cubierta vegetal
  espartoHealth: number; // 0-100
  coverDensity: number; // % cobertura del suelo
  soilMoisture: number; // % humedad bajo cubierta

  // Red micorrícica (todo el año)
  mycorrhizalColonisation: number; // % de raíces colonizadas (AMF)
  glomalin: number; // mg/g de suelo
  fungalDiversity: number; // nº de morfoespecies activas
  soilRespiration: number; // µmol/m²/s (proxy de actividad biológica)

  // Carbono y estructura
  cosPercent: number; // % carbono orgánico del suelo
  aggregateStability: number; // % agregados estables al agua

  // Bioindicador estacional (solo aplica si hay setas)
  mushroomOccurrence?: number; // nº de especies observadas esta temporada
  mushroomSeason?: "primavera" | "verano" | "otono" | "invierno";
}

// ----------------------------------------------------------------------------
// Hosts micorrícicos del sistema (AMF y ECM)
// ----------------------------------------------------------------------------

export interface SymbiosisHostState {
  id: MycorrhizaHostId;
  name: string;
  icon: string;
  type: MycorrhizaType;
  /** Colonización actual (%) */
  colonisation: number;
  /** Umbral mínimo aceptable (%) */
  threshold: number;
  /** Estado calculado */
  status: "optimal" | "acceptable" | "deficient";
  /** Glomalina medida (solo AMF) */
  glomalin?: number;
  /** Setas observadas asociadas (solo ECM o saprófitos) */
  mushroomsObserved?: string[];
}

// ----------------------------------------------------------------------------
// Indicadores del ciclo
// ----------------------------------------------------------------------------

export interface SymbiosisIndicators {
  /** Flujo de sustrato: raíces → micelio (0-100) */
  substrateFlow: number;
  /** Flujo de retorno: micelio → plantas (agua + nutrientes) (0-100) */
  nutrientFlow: number;
  /** Captura de carbono estable vía glomalina (0-100) */
  carbonFlow: number;
  /** Estabilidad estructural del suelo (0-100) */
  structuralStability: number;
}

// ----------------------------------------------------------------------------
// Resultado global
// ----------------------------------------------------------------------------

export interface SymbiosisResult {
  /** Score global 0-100 */
  score: number;
  /** Categoría cualitativa */
  category: SymbiosisCategory;
  /** Indicadores desglosados */
  indicators: SymbiosisIndicators;
  /** Score por red (AMF global, ECM de pinos) */
  networks: {
    amf: number; // 0-100 — red arbuscular dominante
    ecm: number; // 0-100 — red ectomicorrícica (pinos)
  };
  /** Estado por host */
  hosts: SymbiosisHostState[];
  /** Interpretación textual */
  interpretation: string;
  /** Nota sobre setas como bioindicador estacional */
  mushroomNote: string;
  /** Timestamp */
  timestamp: string;
}
