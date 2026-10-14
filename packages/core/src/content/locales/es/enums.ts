export const enums = {
  waterNeed: {
    low: "Baja",
    medium: "Media",
    high: "Alta",
  },
  alertSeverity: {
    info: "Informativa",
    warning: "Advertencia",
    alert: "Alerta",
    critical: "Crítica",
  },
  dataSource: {
    mock: "Mock",
    sensor: "Sensor",
    satellite: "Satélite",
  },
  mycorrhizalAffinity: {
    high: "Alta",
    medium: "Media",
    low: "Baja",
    none: "Ninguna",
  },
} as const;
