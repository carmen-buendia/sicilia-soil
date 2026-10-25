// packages/core/src/content/locales/es/engine.ts

export const engine = {
  header: {
    title: "Motor de decisión",
    subtitle: "Reglas deterministas · Trazabilidad auditable",
    recalculate: "Recalcular",
  },

  infoBox: {
    title: "🧠 Motor de reglas determinista",
    description:
      "El motor evalúa los datos de sensores IoT y Copernicus contra un conjunto de reglas agronómicas auditables. Cada recomendación muestra la regla que la disparó, su peso y la fuente del dato.",
  },

  filters: {
    topicLabel: "Tema:",
    priorityLabel: "Prioridad:",
    topics: {
      all: "Todos",
      soil: "Suelo",
      water: "Agua",
    },
    priorities: {
      all: "Todas",
      urgent: "Urgente",
      high: "Alta",
      medium: "Media",
      low: "Baja",
      info: "Info",
    },
    urgentCount: "{count} urgente",
    urgentCountPlural: "{count} urgentes",
  },

  card: {
    actionLabel: "Acción recomendada",
    sourcePrefix: "Fuente:",
    markAsDone: "Marcar como hecho →",
    priorityLabels: {
      urgent: "Urgente",
      high: "Alta",
      medium: "Media",
      low: "Baja",
      info: "Info",
    },
    topicLabels: {
      soil: "Suelo",
      water: "Agua",
      general: "General",
    },
  },

  empty: "No hay recomendaciones que coincidan con los filtros seleccionados.",

  //  NUEVA SECCIÓN PARA EL DIAGNÓSTICO (Usada en CerealTab)
  diagnostics: {
    title: "Diagnóstico del Motor de Reglas",
    subtitle:
      "Observaciones deterministas basadas en la fusión de datos IoT y Copernicus. No se utilizan cajas negras de IA.",
    engineVersion: "Rule Engine v1.0",
    statusWarning: "Alerta",
    statusSuccess: "Óptimo",
    metrics: {
      soilMoisture: {
        label: "Humedad del suelo",
        threshold: "65% - 80%",
        descWarning:
          "El sensor in-situ detecta un nivel inferior al rango óptimo para la etapa actual.",
      },
      ndvi: {
        label: "Índice NDVI (Vigor)",
        threshold: "> 0.60",
        descSuccess:
          "Curva ascendente. Crecimiento vegetativo normal para la semana 6 de desarrollo.",
      },
      mycorrhiza: {
        label: "Colonización micorrícica",
        threshold: "> 40%",
        descWarning:
          "Actividad fúngica por debajo del umbral de referencia en la parcela.",
      },
      glomalin: {
        label: "Glomalina",
        threshold: "> 1.5 mg/g",
        descSuccess:
          "Los niveles de estructura del suelo se mantienen estables.",
      },
    },
  },
} as const;
