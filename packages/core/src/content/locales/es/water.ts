// packages/core/src/content/locales/es/water.ts
export const water = {
  atmosphericDemand: "Demanda Atmosférica (ET)",

  climate: {
    evapotranspirationLabel: "Evapotranspiración",
    evapotranspirationNote: "Riego recomendado: {hint}L/m²",
    humidityLabel: "Humedad ambiental",
    humidityNote: "Viento: {windKmh} km/h",
    temperatureLabel: "Temperatura",
    temperatureNote: "Sensación térmica: {feelsLike}°C",
  },

  control: {
    advancedConfig: "⚙️ Configuración avanzada",
    autoIrrigation: "Riego automático",
    consumptionLimit: "límite",
    consumptionPeriod: "en las últimas {hours}h",
    consumptionTitle: "Consumo de agua",
    duration: "Duración estimada",
    durationMinutes: "{minutes} minutos",
    forecast: "Pronóstico",
    forecastTemplate:
      "Se esperan temperaturas de {temp}°C mañana. Aumentar riego en un {percent}% en zonas críticas.",
    nextInHours: "en {hours} horas",
    nextScheduled: "Próximo riego programado",
    quickActions: "Acciones rápidas",
    scheduleWatering: "📅 Programar riego",
    status: "Estado",
    statusOff: "Desactivado",
    statusOn: "Activado",
    title: "Control de Riego Inteligente",
  },

  deficit: "Déficit",
  etHigh: "Alta demanda de evaporación. El suelo pierde humedad rápido.",
  etModerate: "Demanda de evaporación moderada.",

  footer: {
    allOperational: "Todos los sensores operativos",
    realtime: "💧 Datos actualizados en tiempo real desde sensores IoT",
    syncMinutesAgo: "Última sincronización: hace {minutes} minutos",
  },

  globalEfficiency: "Eficiencia Global",

  header: {
    exportData: "Exportar datos",
    rangeLastWeek: "Última semana",
    subtitle: "Monitoreo detallado de humedad por zona",
    title: "Humedad del Suelo",
  },

  reserveNormal: "Consumo dentro de los parámetros normales.",
  reserveUsage: "Uso de la reserva",
  reserveWarning: "Cerca del límite. Reduce el riego.",

  stats: {
    activeSensors: "sensores activos",
    average: "Promedio general",
    averageTrend: "↑ 2% vs ayer",
    lastReading: "Última lectura",
    needsWater: "Necesitan riego",
    ofZones: "de {count} zonas",
    optimalZones: "Zonas óptimas",
    urgentAttention: "⚠️ Atención urgente",
  },

  statusOptimal: "Óptimo",
  statusRequiresWater: "Requiere Agua",
  stressCritical: "Crítico",
  stressDesc:
    "{critical} de {total} zonas presentan déficit hídrico. Humedad media del sistema: {average}%.",
  stressLow: "Bajo",
  stressModerate: "Moderado",
  surplus: "Superávit",
  systemStress: "Estrés Hídrico del Sistema",

  tableBadge: "Tiempo Real",
  tableHeaders: {
    balance: "Balance",
    current: "Humedad Actual",
    optimal: "Humedad Óptima",
    status: "Estado",
    zone: "Zona",
  },
  tableTitle: "Balance Hídrico por Zona",

  wateringInProgress: "Regando...",

  zones: {
    current: "Actual",
    evolution24h: "Evolución últimas 24h",
    manualWatering: "💧 Riego manual ahora",
    nextWatering: "Próximo riego",
    nextWateringLater: "En 6-8 horas",
    nextWateringNow: "Inmediato",
    optimal: "Óptimo",
    recommendation: "Recomendación",
    recommendationKeep: "Mantener nivel actual",
    recommendationWater: "Regar {liters}L/m²",
    sectionTitle: "Monitoreo por Zona",
    trendDown: "Disminuyendo",
    trendStable: "Estable",
    trendUp: "Aumentando",
    watering: "Riego",
    wateringAuto: "automático",
    wateringHoursAgo: "hace {hours}h",
  },
} as const;
