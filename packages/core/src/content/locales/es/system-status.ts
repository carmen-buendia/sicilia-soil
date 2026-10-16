export const systemStatus = {
  header: "Estado del sistema",

  phase: {
    green: "Fase de acumulación",
    yellow: "Fase de transición",
    red: "Fase de estrés",
    unknown: "Estado indeterminado",
  },

  action: {
    green: "Sin intervención requerida",
    yellow: "Monitorizar",
    red: "Intervención recomendada",
    unknown: "Recopilar más datos",
  },

  explanationIntro: {
    green: "El sistema se encuentra en una fase estable:",
    yellow: "Señales que conviene vigilar:",
    red: "Señales claras de atención:",
    unknown: "No hay datos suficientes para evaluar el estado.",
  },

  confidence: "Confianza del sistema",
  rulesActive: "Reglas activas",
  sourcesInConflict: "Fuentes en desacuerdo",
  why: "¿Por qué?",
  moreRules: "+{count} más",
  autoLearning:
    "Este sistema evalúa el estado continuamente. Sin intervención manual.",
} as const;
