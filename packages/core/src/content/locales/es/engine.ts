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
} as const;
