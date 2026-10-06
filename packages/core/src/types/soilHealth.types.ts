// packages/core/src/types/soilHealth.types.ts

// ============================================================================
// Soil Health Types – Monitoring of soil biology and mycorrhizal network
// ----------------------------------------------------------------------------
// NOTA: las setas son un bioindicador estacional de la salud fúngica.
// El micelio trabaja todo el año. El objetivo principal es la regeneración
// del suelo a través de la red micorrícica (AMF en la mayoría, ECM en pinos).
// ============================================================================

import type { MycorrhizaHostId, MycorrhizaType } from "./mycorrhiza.types";

// ----------------------------------------------------------------------------
// Time series
// ----------------------------------------------------------------------------

export interface TimeSeriesPoint {
  timestamp: string;
  value: number;
}

export interface MushroomData {
  humidity: TimeSeriesPoint[];
  temperature: TimeSeriesPoint[];
  co2: TimeSeriesPoint[];
}

export interface MushroomOptimal {
  humidity: [number, number];
  temperature: [number, number];
  co2: [number, number];
}

// ----------------------------------------------------------------------------
// Mushroom (bioindicador estacional)
// ----------------------------------------------------------------------------

/**
 * Setas como bioindicador fúngico.
 * El micelio (invisible) trabaja todo el año.
 * Las setas (visibles) aparecen principalmente en otoño.
 */
export interface Mushroom {
  id: string;
  name: string;
  scientificName: string;
  icon: string;
  description: string;
  habitat: string;
  season: string[];
  isEndemic: boolean;
  /** Rol en el sistema: bioindicador, cultivo secundario, o ambos */
  role: "bioindicator" | "cultivation" | "both";
  /** Tipo de micorriza asociada (AMF/ECM) */
  mycorrhizaType: MycorrhizaType;
  /** Host principal con el que se asocia */
  hostId?: MycorrhizaHostId;
  data: MushroomData;
  optimal: MushroomOptimal;
}

// ----------------------------------------------------------------------------
// Monitoring zone (antes CultivationZone)
// ----------------------------------------------------------------------------

export type MushroomStage = "growth" | "fruiting" | "harvest";
export type MushroomStatus = "optimal" | "excellent" | "good" | "ready";

/**
 * Zona monitorizada del sistema.
 * Puede ser un host micorrícico (olivo, esparto, pino, etc.) o una zona
 * de fructificación de setas.
 */
export interface MonitoringZone {
  id: string;
  /** Host micorrícico al que pertenece (opcional) */
  hostId?: MycorrhizaHostId;
  name: string;
  scientificName?: string;
  icon: string;
  location: string;
  /** Tipo de micorriza dominante */
  mycorrhizaType: MycorrhizaType;
  /** Colonización micorrícica (%) */
  colonisation: number;
  /** Glomalina (mg/g) — solo AMF */
  glomalin?: number;
  /** Datos ambientales */
  humidity: number;
  temperature: number;
  co2: number;
  /** Estado fenológico (solo si aplica a setas) */
  stage?: MushroomStage;
  /** Tiempo estimado hasta la próxima fructificación */
  harvestIn?: string;
  status: MushroomStatus;
}

// ----------------------------------------------------------------------------
// Alias retrocompatible (evita romper imports existentes)
// ----------------------------------------------------------------------------

/** @deprecated Usar MonitoringZone */
export type CultivationZone = MonitoringZone;

// ============================================================================
// Contaminación histórica y biorremediación
// ----------------------------------------------------------------------------
// La zona noreste de la finca sufrió quemas de plásticos, aluminios y
// cartones durante años. El plan de biorremediación con hongos autóctonos
// arrancó en enero de 2026. Las mediciones se toman trimestralmente.
// ============================================================================

export type RemediationMeasurement = {
  /** Periodo de la medición: "2026 Q1", "2026 Q2", ... */
  period: string;
  /** Plomo (mg/kg) */
  lead: number;
  /** Cadmio (mg/kg) */
  cadmium: number;
  /** Mercurio (mg/kg) */
  mercury: number;
  /** Hidrocarburos (mg/kg) */
  hydrocarbons: number;
  /** true = medición real de laboratorio, false = proyección */
  real?: boolean;
  /** Notas opcionales (método de análisis, laboratorio, incidencias) */
  notes?: string;
};

export type RemediationThresholds = {
  lead: number;
  cadmium: number;
  mercury: number;
  hydrocarbons: number;
};

export type RemediationStrategy = {
  description: string;
  fungi: string[];
  plants: string[];
  expectedCompletion: string;
  startYear: number;
  affectedZone: string;
};

export type SoilContamination = {
  measurements: RemediationMeasurement[];
  thresholds: RemediationThresholds;
  strategy: RemediationStrategy;
};

export type RemediationProgress = {
  leadReduction: number;
  cadmiumReduction: number;
  mercuryReduction: number;
  hydrocarbonsReduction: number;
};

// ----------------------------------------------------------------------------
// Indicadores de suelo en la zona contaminada (por periodo)
// ----------------------------------------------------------------------------

export type RemediationSoilHealth = {
  period: string;
  /** pH del suelo (afecta movilidad de metales) */
  ph: number;
  /** Conductividad eléctrica (µS/cm) */
  conductivity: number;
  /** Biomasa fúngica (µg/g) — actividad biorremediadora */
  fungalBiomass: number;
  /** Glomalina (mg/g) — estabiliza metales en agregados */
  glomalin: number;
  /** Colonización micorrícica en la zona (%) */
  mycorrhizalColonisation: number;
};

export type SoilContaminationFull = SoilContamination & {
  soilHealth: RemediationSoilHealth[];
};
