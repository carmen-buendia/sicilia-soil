export const ui = {
  app: {
    name: "MycoMesh Protocol",
    subtitle: "Infraestructura open-source para la recuperación de suelo",
  },

  nav: {
    dashboard: "Panel",
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
    signIn: "Iniciar sesión",
    subtitle: "Accede al instrumento de recuperación de suelo",
    noAccount: "¿No tienes cuenta? El registro se abrirá pronto.",
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
    pillars: {
      soilHealth: "Salud del suelo",
      waterEfficiency: "Eficiencia hídrica",
      carbonCapture: "Captura de carbono",
    },
    cta: {
      accessDashboard: "Acceder al panel",
      viewOnGithub: "Ver en GitHub",
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
