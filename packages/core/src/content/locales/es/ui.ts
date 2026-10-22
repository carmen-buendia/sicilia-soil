// ============================================================================
// SikeliaSoil - UI Translations (Spanish)
// ----------------------------------------------------------------------------
// Centralized strings for the user interface.
// Sorted alphabetically by key for maintainability.
// ============================================================================

export const ui = {
  // Generic actions used across the app
  actions: {
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    export: "Exportar",
    save: "Guardar",
    viewAll: "Ver todas",
    viewCrops: "Ver cultivos",
    viewFull: "Ver completo",
  },

  // Global app metadata
  app: {
    name: "SikeliaSoil",
    subtitle: "Infraestructura open-source para la recuperación de suelo",
  },

  // Authentication (Login, Register, Errors)
  auth: {
    errors: {
      invalidCredentials: "Email o contraseña incorrectos.",
      missingFields: "Por favor, rellena todos los campos.",
      unknown: "Ha ocurrido un error inesperado.",
      userExists:
        "Este email ya está registrado. Por favor, ve a Iniciar Sesión.",
    },
    haveAccount: "¿Ya tienes cuenta?",
    loginLink: "Inicia sesión",
    noAccount: "¿No tienes cuenta?",
    registerButton: "Registrarse",
    registerLink: "Regístrate aquí",
    registerSubtitle: "Únete a SikeliaSoil",
    registerTitle: "Crear cuenta",
    signIn: "Iniciar sesión",
    subtitle: "Accede a tu cuenta de SikeliaSoil",
    success: {
      registered: "Cuenta creada con éxito. Por favor, inicia sesión.",
    },
  },

  // Copernicus Earth Observation and Satellite data
  copernicus: {
    badge: "Data Cube Engine",
    cloudCover: "Cobertura de Nubes",
    droughtDesc:
      "Fusión en la nube: Sensores IoT in-situ + Retrodispersión Sentinel-1 SAR.",
    droughtRisk: "Estrés por Sequía (DSI)",
    lastPass: "Última pasada",
    lst: "Temp. Superficie (LST)",
    ndvi: "NDVI (Vigor)",
    ndwi: "NDWI (Agua Foliar)",
    resolution: "Resolución",
    soilHealth: "Salud del Suelo (SHI)",
    soilHealthDesc:
      "Nivel de materia orgánica y estructura biológica evaluada por espectrometría.",
    ssm: "Humedad Suelo (SAR)",
    subtitle: "Monitoreo Satelital",
    tabAnalysis: "Análisis",
    tabIndices: "Índices de Satélite",
    title: "Copernicus Earth Observation",
  },

  // Main Dashboard widgets and metrics
  dashboard: {
    alertsEmpty: "✓ Sin alertas urgentes",
    alertsTitle: "Alertas",
    carbon: {
      bulkDensity: "Densidad aparente",
      co2: "CO₂ secuestrado",
      depth: "Profundidad",
      soc: "COS",
      title: "Captura de carbono",
    },
    currentCrop: "Cultivo actual",
    light: "Luz Solar",
    moisture: "Humedad",
    temperature: "Temperatura",
    updated: "Actualizado",
    viewHistory: "Ver histórico",
    wind: "Viento",
    zonesTitle: "Zonas de sensores",
  },

  // Esparto crop specific metrics
  espartoSummary: {
    density: "Densidad",
    growthStatus: "Estado de Crecimiento",
    harvest: "Cosecha",
    height: "Altura",
    moisture: "Humedad",
    newShoots: "nuevos brotes",
    nextHarvest: "Próxima cosecha",
    nutrients: "Nutrientes",
    ph: "pH",
    plantHealth: "Salud de la Planta",
    quality: "Calidad",
    soilCondition: "Condición del Suelo",
    stock: "Stock",
    yield: "Rendimiento",
  },

  // Global footer
  footer: {
    about: "Sobre el proyecto",
    createdBy: "Proyecto creado por Carmen María Buendía Sánchez",
    github: "GitHub",
    license: "Apache 2.0",
    madeWith: "Hecho con 🌱 en Sicilia",
    manifesto: "Manifiesto",
  },

  // Public Landing Page
  landing: {
    badge: "Open Source Infrastructure",
    cta: {
      accessDashboard: "Acceder a la plataforma",
      github: "Ver en GitHub",
      start: "Comenzar ahora",
      viewOnGithub: "Ver en GitHub",
    },
    hud: {
      carbonStored: "Carbono capturado",
      carbonStoredValue: "1.2 t/ha",
      edgeNode: "Nodo Edge",
      edgeNodeValue: "Online",
      mycorrhiza: "Micorriza",
      mycorrhizaValue: "Óptimo",
      soilMoisture: "Humedad del suelo",
      soilMoistureValue: "42.5%",
    },
    pillars: {
      carbonCapture: "Captura de carbono",
      soilHealth: "Salud del suelo",
      waterEfficiency: "Eficiencia hídrica",
    },
    tech: {
      auth: "Auth Segura (JWT)",
      db: "SQLite + Drizzle",
      edge: "Edge Computing Ready",
    },
    techTitle: "Infraestructura Abierta y Descentralizada",
  },

  // Mycology specific components
  mushroomCard: {
    co2: "CO₂",
    colonisation: "Colonización",
    fruiting: "Fructificación",
    glomalin: "Glomalina",
    humidity: "Humedad",
    mycorrhiza: {
      AMF: "AMF · Arbuscular",
      ECM: "ECM · Ectomicorrícica",
      none: "Sin micorriza",
    },
    status: {
      excellent: "Excelente",
      good: "Bueno",
      optimal: "Óptimo",
      ready: "Listo",
    },
    temperature: "Temperatura",
    viewDetails: "Ver detalles",
  },

  mushroomChip: {
    endemicLabel: "Endémica",
  },

  // Navigation Menu
  nav: {
    about: "Acerca de",
    backToHome: "Volver al inicio",
    backToLogin: "Volver al login",
    configuration: "Configuración",
    dashboard: "Panel",
    engine: "Motor",
    groundCover: "Cultivos",
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
    manifesto: "Manifiesto",
    notifications: "Notificaciones",
    recommendations: "Recomendaciones",
    soilHealth: "Suelo",
    water: "Agua",
  },

  // Notifications dropdown/widget
  notifications: {
    clearAll: "Limpiar todo",
    empty: "No hay notificaciones",
    markAllAsRead: "Marcar todas como leídas",
    system: "Sistema",
    title: "Notificaciones",
    viewAll: "Ver todas las notificaciones",
    viewMore: "Ver más",
  },

  // Dedicated Notifications Page
  notificationsPage: {
    clear: "Limpiar",
    emptyDesc:
      "Las notificaciones se generan automáticamente a partir de las recomendaciones urgentes, altas y medias.",
    emptyTitle: "No hay notificaciones",
    goToRecs: "Ir a Recomendaciones",
    infoDesc:
      "El motor de recomendaciones analiza los datos IoT y Copernicus, y genera notificaciones automáticamente para las recomendaciones de prioridad urgente, alta o media. Las notificaciones se guardan localmente en tu navegador.",
    infoTitle: "Cómo funciona:",
    markAll: "Marcar todas",
    stats: {
      critical: "Críticas",
      total: "Total",
      unread: "Sin leer",
      warning: "Advertencias",
    },
    subtitle: "Alertas de sensores IoT y recomendaciones del sistema",
    title: "Notificaciones",
  },

  // Decision Engine Recommendations
  recommendations: {
    action: "Acción recomendada",
    all: "Todos",
    empty:
      "No hay recomendaciones que coincidan con los filtros seleccionados.",
    general: "General",
    high: "Alta",
    info: "Info",
    low: "Baja",
    markDone: "Marcar como hecho",
    medium: "Media",
    priority: "Prioridad",
    soil: "Suelo",
    source: "Fuente",
    topic: "Tema",
    urgent: "Urgente",
    urgentCount: "{count} urgente",
    water: "Agua",
  },

  // Soil Health Page Tabs
  soilHealthTabs: {
    bioindicators: "Bioindicadores",
    networks: "Redes",
    remediation: "Biorremediación",
    summary: "Resumen",
  },

  // Generic UI states
  states: {
    empty: "Sin datos disponibles",
    error: "Ha ocurrido un error",
    loading: "Cargando…",
    offline: "Sin conexión",
  },

  // Plant-Fungi Symbiosis Widget
  symbiosis: {
    badge: "Ciclo regenerativo",
    carbon: "Carbono",
    carbonSub: "Glomalina + COS",
    hostsAmf: "AMF · Arbuscular",
    hostsEcm: "ECM · Ectomicorrícica",
    hostsTitle: "Colonización por huésped",
    networkAmf: "Red AMF",
    networkAmfSub: "Arbuscular",
    networkEcm: "Red ECM",
    networkEcmSub: "Ectomicorrícica",
    radarCarbon: "Carbono",
    radarReturn: "Retorno",
    radarStructure: "Estructura",
    radarSubstrate: "Sustrato",
    radarTitle: "Indicadores del ciclo",
    score: "Score global",
    title: "Simbiosis planta ↔ micelio",
    updated: "Actualizado",
  },

  // IoT Sensor Telemetry
  telemetry: {
    headers: {
      battery: "Batería",
      lastPing: "Último Ping",
      sensorId: "Sensor ID",
      signal: "Señal",
      status: "Estado",
      type: "Tipo",
    },
    network: "Red: SikeliaSoil-LoRa",
    ping: {
      hoursAgo: "Hace {hours} horas",
      minutesAgo: "Hace {minutes} min",
    },
    sensorTypes: {
      soilMoisture: "Humedad Suelo",
      soilTemp: "Temp. Suelo",
      solarRadiation: "Radiación Solar",
    },
    status: {
      online: "Online",
      unstable: "Inestable",
    },
    title: "Telemetría de Sensores",
  },
} as const;
