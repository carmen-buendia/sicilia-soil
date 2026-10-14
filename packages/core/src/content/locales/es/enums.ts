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
  zoneStatus: {
    optimal: "Óptimo",
    healthy: "Saludable",
    needsWater: "Necesita riego",
    active: "Activo",
    full: "Lleno",
    unknown: "Sin datos",
  },
  zoneType: {
    fiber: "Planta textil",
    vegetables: "Hortalizas",
    trees: "Árboles",
    aromatics: "Aromáticas",
    livingSoil: "Suelo vivo",
    waterCollection: "Recolección",
  },
  zoneLocation: {
    north: "Parcela Norte",
    south: "Parcela Sur",
    east: "Ladera Este",
    west: "Parcela Oeste",
    rear: "Trasera",
    northeast: "Noreste",
  },
} as const;
