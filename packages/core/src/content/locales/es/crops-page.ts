// packages/core/src/content/locales/es/crops-page.ts
export const cropsPage = {
  addSystem: "Añadir Zona",
  backToDirectory: "Volver al directorio",
  badge: "Infraestructura de suelo",

  analytics: {
    cycleDesc:
      "Todos los sistemas comparten la misma red subterránea de micorrizas. Las cubiertas aportan biomasa al micelio; las leñosas, hojarasca y sombra; las herbáceas, raíz profunda. El barbecho permite que la red fúngica se recupere y expanda antes del siguiente ciclo de siembra.",
    cycleTitle: "Ciclo regenerativo del sistema",
    desc: "Misma metodología (SHI, colonización micorrícica, glomalina) aplicada a todos los sistemas del registro. Evidencia del enfoque crop-agnostic soil infrastructure.",
    empty: "Añade al menos un sistema para comparar.",
    interpretationTemplates: {
      "cover-fallow":
        "{name}: en recuperación fúngica; ascenso esperado tras el reposo.",
      herbaceous:
        "{name}: ciclo corto, colonización AMF moderada; relevante como rotación.",
      mixed: "{name}: sinergia entre estratos; cierre de ciclo vía compost.",
      woody:
        "{name}: micorrización estable y aporte de hojarasca; SHI alto sostenido.",
    },
    interpretationTitle: "Interpretación",
    series: {
      colonisation: "Colonización AMF (%)",
      glomalin: "Glomalina (mg/g × 10)",
      shi: "SHI (0-100)",
    },
    thresholds: {
      shiHigh: "SHI ≥ 75 · red micorrícica consolidada",
      shiLow: "SHI < 50 · red en recuperación",
      shiMid: "SHI 50–74 · red en desarrollo",
    },
    thresholdsTitle: "Umbrales de referencia",
    title: "Comparador de sistemas",
  },

  coverFallow: {
    addCover: "Añadir cubierta",
    cancelEdit: "Cancelar",
    comparatorTitle: "Comparativa de cubiertas",
    coverTitle: "Cubierta vegetal",
    editRotation: "Editar rotación",
    editRotationDesc: "Define la secuencia de barbecho para este sistema.",
    editRotationTitle: "Configurar rotación",
    fallowTitle: "Barbecho",
    noData: "Sin datos para este sistema.",
    noObservations: "Sin observaciones registradas.",
    observationsTitle: "Observaciones del sistema",
    rotationLabel: "Progreso",
    rotationTitle: "Cronograma de rotación",
    saveRotation: "Guardar rotación",
    series: {
      biomass: "Biomasa (t/ha)",
      cover: "Cobertura (%)",
      nitrogen: "N fijado (kg/ha)",
    },
    statusLabels: {
      emergence: "Emergencia",
      highDensity: "Alta densidad",
      senescence: "Senescencia",
    },
    tableHeaders: [
      "Especie",
      "Cobertura",
      "Biomasa",
      "N",
      "Estación",
      "Estado",
    ],
  },

  description:
    "Registro de sistemas de cultivo y coberturas. Cada sistema se define en el CRUD y aporta sus propias métricas, sin presuponer especie ni región.",
  directoryTitle: "Directorio de Zonas",
  emptySystems:
    "Aún no hay sistemas de cultivo definidos. Créalos en el registro para ver sus métricas.",
  enterButton: "Entrar",

  herbaceous: {
    chart1Title: "Evolución NDVI y humedad edáfica",
    chart2Title: "Comparación interna: {name} vs {reference}",
    observationsTitle: "Observaciones de campo",
    role: "Cultivo de prueba y rotación",
  },

  mixed: {
    balanceTitle: "Flujo hídrico y de biomasa",
    compostDesc:
      "Flujo de retorno: {input} kg/sem de biomasa vegetal se transforman en {output} kg de compost maduro, devolviendo {om} kg/mes de materia orgánica al suelo.",
    compostTitle: "Cierre del ciclo biogeoquímico",
    role: "Sistema agroforestal mixto",
    samplingArea: "Área de muestreo: {area}",
    seriesResidue: "Biomasa (kg/semana)",
    seriesWater: "Agua (L/semana)",
    tableHeaders: ["Cultivo", "Área", "Extracción", "Biomasa residual", "Agua"],
    vegTitle: "Subsistema hortícola",
  },

  moistureLabel: "Humedad",

  observations: {
    desc: "Registro factual de mediciones, con fuente y fecha. Sin prescripciones: la interpretación es del operador.",
    empty: "No hay observaciones registradas.",
    levelLabels: {
      info: "Informativo",
      success: "Dentro de rango",
      warning: "Umbral superado",
    },
    title: "Observaciones de campo",
  },

  shared: {
    loading: "Cargando…",
    noData: "Sin datos",
    yAxisProgress: "Progreso",
    yAxisValue: "Valor",
  },

  shiLabel: "SHI",

  tabs: {
    analytics: "Analítica",
    observations: "Observaciones",
  },

  title: "Sistemas de cultivo",
  viewAnalytics: "Ver analíticas",

  woody: {
    comparatorTitle: "Comparativa de microclimas",
    light: "Radiación solar",
    moisture: "Humedad edáfica",
    mycorrhiza: "Micorrizas",
    parcelsCount: "{count} parcelas monitoreadas",
    role: "Sistema arbóreo",
    seriesHumidity: "Humedad (%)",
    seriesLight: "Radiación (%)",
    seriesTemp: "Temperatura (°C)",
    seriesWind: "Viento (km/h)",
    stage: "Fase fenológica",
    temperature: "Temperatura",
    title: "Sistema arbóreo",
    wind: "Velocidad del viento",
  },
} as const;
