// packages/core/src/content/locales/es/engine.ts
export const engine = {
  card: {
    actionLabel: "Acción recomendada",
    markAsDone: "Marcar como hecho →",
    priorityLabels: {
      high: "Alta",
      info: "Info",
      low: "Baja",
      medium: "Media",
      urgent: "Urgente",
    },
    sourcePrefix: "Fuente:",
    topicLabels: {
      general: "General",
      soil: "Suelo",
      water: "Agua",
    },
  },

  diagnostics: {
    engineVersion: "Rule Engine v1.0",
    metrics: {
      glomalin: {
        descSuccess:
          "Los niveles de estructura del suelo se mantienen estables.",
        label: "Glomalina",
        threshold: "> 1.5 mg/g",
      },
      mycorrhiza: {
        descWarning:
          "Actividad fúngica por debajo del umbral de referencia en la parcela.",
        label: "Colonización micorrícica",
        threshold: "> 40%",
      },
      ndvi: {
        descSuccess:
          "Curva ascendente. Crecimiento vegetativo normal para la semana 6 de desarrollo.",
        label: "Índice NDVI (Vigor)",
        threshold: "> 0.60",
      },
      soilMoisture: {
        descWarning:
          "El sensor in-situ detecta un nivel inferior al rango óptimo para la etapa actual.",
        label: "Humedad del suelo",
        threshold: "65% - 80%",
      },
    },
    statusSuccess: "Óptimo",
    statusWarning: "Alerta",
    subtitle:
      "Observaciones deterministas basadas en la fusión de datos IoT y Copernicus. No se utilizan cajas negras de IA.",
    title: "Diagnóstico del Motor de Reglas",
  },

  empty: "No hay recomendaciones que coincidan con los filtros seleccionados.",

  filters: {
    priorities: {
      all: "Todas",
      high: "Alta",
      info: "Info",
      low: "Baja",
      medium: "Media",
      urgent: "Urgente",
    },
    priorityLabel: "Prioridad:",
    topics: {
      all: "Todos",
      soil: "Suelo",
      water: "Agua",
    },
    topicLabel: "Tema:",
    urgentCount: "{count} urgente",
    urgentCountPlural: "{count} urgentes",
  },

  header: {
    recalculate: "Recalcular",
    subtitle: "Reglas deterministas · Trazabilidad auditable",
    title: "Motor de decisión",
  },

  infoBox: {
    description:
      "El motor evalúa los datos de sensores IoT y Copernicus contra un conjunto de reglas agronómicas auditables. Cada recomendación muestra la regla que la disparó, su peso y la fuente del dato.",
    title: "🧠 Motor de reglas determinista",
  },
} as const;
