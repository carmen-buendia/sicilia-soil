import type { CopernicusData, IndexMetric } from "@sicilia-soil/core";

// ============================================================================
// Color Helpers
// ============================================================================

export type IndexType = "ndvi" | "ndwi" | "ssm" | "lst";

const COLOR_CLASSES: Record<IndexType, string> = {
  ndvi: "text-emerald-600",
  ndwi: "text-blue-600",
  ssm: "text-cyan-600",
  lst: "text-amber-600",
};

const STATUS_COLORS = {
  optimal: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  critical: "bg-red-50 text-red-700 border-red-200",
  neutral: "bg-blue-50 text-blue-700 border-blue-200",
};

// ============================================================================
// Value Interpolation
// ============================================================================

export function getIndexColor(type: IndexType): string {
  return COLOR_CLASSES[type];
}

export function getIndexStatusColor(
  level: "optimal" | "warning" | "critical" | "neutral",
): string {
  return STATUS_COLORS[level];
}

// ============================================================================
// Index Interpretation
// ============================================================================

export interface IndexInterpretation {
  status: string;
  color: string;
  level: "optimal" | "warning" | "critical";
}

export function interpretNdvi(value: number): IndexInterpretation {
  if (value >= 0.7) {
    return {
      status: "Óptimo",
      color: COLOR_CLASSES.ndvi,
      level: "optimal",
    };
  }
  if (value >= 0.4) {
    return {
      status: "Moderado",
      color: "text-amber-600",
      level: "warning",
    };
  }
  return {
    status: "Estrés",
    color: "text-red-600",
    level: "critical",
  };
}

export function interpretNdwi(value: number): IndexInterpretation {
  if (value >= 0.5) {
    return {
      status: "Adecuado",
      color: COLOR_CLASSES.ndwi,
      level: "optimal",
    };
  }
  if (value >= 0.2) {
    return {
      status: "Moderado",
      color: "text-amber-600",
      level: "warning",
    };
  }
  return {
    status: "Déficit hídrico",
    color: "text-red-600",
    level: "critical",
  };
}

export function interpretSsm(value: number): IndexInterpretation {
  if (value >= 30) {
    return {
      status: "Buena penetración SAR",
      color: COLOR_CLASSES.ssm,
      level: "optimal",
    };
  }
  if (value >= 15) {
    return {
      status: "Moderada",
      color: "text-amber-600",
      level: "warning",
    };
  }
  return {
    status: "Suelo seco",
    color: "text-red-600",
    level: "critical",
  };
}

export function interpretLst(value: number): IndexInterpretation {
  if (value <= 28) {
    return {
      status: "Sin estrés térmico",
      color: COLOR_CLASSES.lst,
      level: "optimal",
    };
  }
  if (value <= 35) {
    return {
      status: "Estrés moderado",
      color: "text-amber-600",
      level: "warning",
    };
  }
  return {
    status: "Estrés térmico",
    color: "text-red-600",
    level: "critical",
  };
}

// ============================================================================
// Formatters
// ============================================================================

export function formatIndexValue(value: number | string, decimals = 2): string {
  if (typeof value === "number") {
    return value.toFixed(decimals);
  }
  return value;
}

export function formatLastPass(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return isoString;
    return date.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return isoString;
  }
}

// ============================================================================
// Data Helpers
// ============================================================================

export function isCopernicusDataValid(data: CopernicusData | null): boolean {
  if (!data) return false;
  return Boolean(
    data.lastPass && data.satellite && data.indices && data.analysisScores,
  );
}

export function getIndexMetric(
  data: CopernicusData,
  type: IndexType,
): IndexMetric {
  return data.indices[type];
}
