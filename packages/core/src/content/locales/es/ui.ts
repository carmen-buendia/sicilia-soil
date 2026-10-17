export const ui = {
  app: {
    name: "MycoMesh Protocol",
    subtitle: "Infraestructura open-source para la recuperación de suelo",
  },

  nav: {
    dashboard: "Panel",
    water: "Agua",
    soilHealth: "Suelo",
    groundCover: "Cultivos",
    engine: "Motor",
    recommendations: "Recomendaciones",
    notifications: "Notificaciones",
    configuration: "Configuración",
    about: "Acerca de",
    manifesto: "Manifiesto",
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
    backToHome: "Volver al inicio",
    backToLogin: "Volver al login",
  },

  auth: {
    signIn: "Iniciar sesión",
    subtitle: "Accede a tu cuenta de MycoMesh",
    noAccount: "¿No tienes cuenta?",
    registerLink: "Regístrate aquí",

    registerTitle: "Crear cuenta",
    registerSubtitle: "Únete a MycoMesh Protocol",
    registerButton: "Registrarse",
    haveAccount: "¿Ya tienes cuenta?",
    loginLink: "Inicia sesión",

    errors: {
      invalidCredentials: "Email o contraseña incorrectos.",
      missingFields: "Por favor, rellena todos los campos.",
      userExists:
        "Este email ya está registrado. Por favor, ve a Iniciar Sesión.",
      unknown: "Ha ocurrido un error inesperado.",
    },
    success: {
      registered: "Cuenta creada con éxito. Por favor, inicia sesión.",
    },
  },

  dashboard: {
    moisture: "Humedad",
    temperature: "Temperatura",
    light: "Luz Solar",
    wind: "Viento",
    updated: "Actualizado",
    viewHistory: "Ver histórico",
    currentCrop: "Cultivo actual",
    mapTitle: "🗺️ Mapa de la finca",
    zonesTitle: "Zonas de sensores",
    alertsTitle: "Alertas",
    alertsEmpty: "✓ Sin alertas urgentes",
    carbon: {
      title: "Captura de carbono",
      soc: "COS",
      bulkDensity: "Densidad aparente",
      depth: "Profundidad",
      co2: "CO₂ secuestrado",
    },
  },

  landing: {
    badge: "Open Source Infrastructure",
    pillars: {
      soilHealth: "Salud del suelo",
      waterEfficiency: "Eficiencia hídrica",
      carbonCapture: "Captura de carbono",
    },
    cta: {
      start: "Comenzar ahora",
      accessDashboard: "Acceder a la plataforma",
      viewOnGithub: "Ver en GitHub",
      github: "Ver en GitHub",
    },
    hud: {
      soilMoisture: "Humedad del suelo",
      soilMoistureValue: "42.5%",
      edgeNode: "Nodo Edge",
      edgeNodeValue: "Online",
      carbonStored: "Carbono capturado",
      carbonStoredValue: "1.2 t/ha",
      mycorrhiza: "Micorriza",
      mycorrhizaValue: "Óptimo",
    },
    techTitle: "Infraestructura Abierta y Descentralizada",
    tech: {
      db: "SQLite + Drizzle",
      edge: "Edge Computing Ready",
      auth: "Auth Segura (JWT)",
    },
    footer: {
      manifesto: "Manifiesto",
      about: "Sobre el proyecto",
      github: "GitHub",
    },
  },

  actions: {
    viewFull: "Ver completo",
    viewAll: "Ver todas",
    viewCrops: "Ver cultivos",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    export: "Exportar",
  },

  states: {
    loading: "Cargando…",
    loadingMap: "Cargando mapa…",
    empty: "Sin datos disponibles",
    error: "Ha ocurrido un error",
    offline: "Sin conexión",
  },
} as const;
