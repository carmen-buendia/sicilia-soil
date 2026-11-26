// packages/core/src/content/locales/es/system-status.ts
export const systemStatus = {
  action: {
    green: "Sin intervención requerida",
    red: "Intervención recomendada",
    unknown: "Recopilar más datos",
    yellow: "Monitorizar",
  },
  autoLearning:
    "Este sistema evalúa el estado continuamente. Sin intervención manual.",
  confidence: "Confianza del sistema",
  explanationIntro: {
    green: "El sistema se encuentra en una fase estable:",
    red: "Señales claras de atención:",
    unknown: "No hay datos suficientes para evaluar el estado.",
    yellow: "Señales que conviene vigilar:",
  },
  header: "Estado del sistema",
  moreRules: "+{count} más",
  phase: {
    green: "Fase de acumulación",
    red: "Fase de estrés",
    unknown: "Estado indeterminado",
    yellow: "Fase de transición",
  },
  rulesActive: "Reglas activas",
  sourcesInConflict: "Fuentes en desacuerdo",
  why: "¿Por qué?",
} as const;
