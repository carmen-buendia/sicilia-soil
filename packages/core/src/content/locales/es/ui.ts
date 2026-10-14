export const ui = {
  app: {
    name: "MycoMesh Protocol",
    subtitle:
      "Recuperación de suelo open-source · Eficiencia hídrica · Captura de carbono",
  },

  nav: {
    home: "Inicio",
    water: "Agua",
    soilHealth: "Salud del suelo",
    groundCover: "Coberturas",
    recommendations: "Recomendaciones",
    notifications: "Notificaciones",
    configuration: "Configuración",
    about: "Acerca de",
    manifesto: "Manifiesto",
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
  },
  auth: {
    signIn: "Sign in",
    subtitle: "Access the soil recovery instrument",
    noAccount: "No account yet? Registration opens soon.",
  },
  dashboard: {
    moisture: "Humedad",
    temperature: "Temperatura",
    light: "Luz Solar",
    wind: "Viento",
    updated: "Actualizado",
    viewHistory: "Ver histórico",
  },
  landing: {
    headline: "Open-source soil recovery for Mediterranean agroecosystems",
    intro:
      "MycoMesh Protocol fuses in-situ IoT soil sensors with Copernicus Earth Observation data into open-source, offline-first infrastructure for sovereign soil monitoring.",
    pillars: {
      soilHealth: "Soil health",
      waterEfficiency: "Water efficiency",
      carbonCapture: "Carbon capture",
    },
    cta: {
      accessDashboard: "Access dashboard",
      viewOnGithub: "View on GitHub",
    },
    footerNote: "Apache 2.0 · Developed in Sicily",
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

  home: {
    map: {
      title: "🗺️ Mapa de la finca",
    },
    zones: {
      title: "Zonas del Huerto",
    },
    alerts: {
      title: "Alertas",
      empty: "✓ Sin alertas urgentes",
    },
    carbon: {
      title: "Captura de carbono",
      soc: "COS",
      bulkDensity: "Densidad aparente",
      depth: "Profundidad",
      co2: "CO₂ secuestrado",
    },
  },
} as const;
