// packages/core/src/content/locales/es/enums.ts
export const enums = {
  alertSeverity: {
    alert: "Alerta",
    critical: "Crítica",
    info: "Informativa",
    warning: "Advertencia",
  },
  dataSource: {
    mock: "Mock",
    satellite: "Satélite",
    sensor: "Sensor",
  },
  mycorrhizalAffinity: {
    high: "Alta",
    low: "Baja",
    medium: "Media",
    none: "Ninguna",
  },
  waterNeed: {
    high: "Alta",
    low: "Baja",
    medium: "Media",
  },
  zoneStatus: {
    needsAttention: "Requiere atención",
    needsWater: "Necesita riego",
    offline: "Sin conexión",
    optimal: "Óptimo",
    unknown: "Sin datos",
  },
} as const;
