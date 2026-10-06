"use client";

import {
  ESPARTO_KPIS,
  ESPARTO_SYMBIOSIS_INPUT,
  ESPARTO_CYCLE_STAGES,
  YEAR_CYCLE_MONTHS,
  YEAR_CYCLE_DATA,
  YEAR_CYCLE_LEGEND,
  YEAR_CYCLE_NOTE,
  CYCLE_CLOSING_NOTE,
  GROUND_COVER_INFO,
  GROUND_COVER_MONITORING,
  MONITORING_CHART_CONFIG,
} from "@sicilia-soil/core";

export function useEspartoData() {
  return {
    // Info general
    info: GROUND_COVER_INFO,

    // KPIs
    kpis: ESPARTO_KPIS,

    // Monitoring + chart config
    monitoring: GROUND_COVER_MONITORING,
    chartConfig: MONITORING_CHART_CONFIG,

    // Input para motor de simbiosis
    symbiosisInput: ESPARTO_SYMBIOSIS_INPUT,

    // Ciclo anual
    yearCycle: {
      months: YEAR_CYCLE_MONTHS,
      data: YEAR_CYCLE_DATA,
      legend: YEAR_CYCLE_LEGEND,
      note: YEAR_CYCLE_NOTE,
    },

    // Diagrama del ciclo regenerativo
    cycleStages: ESPARTO_CYCLE_STAGES,
    cycleClosingNote: CYCLE_CLOSING_NOTE,
  };
}
