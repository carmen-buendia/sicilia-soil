"use client";

import { ZONES_MOCK, DASHBOARD_KPIS, CARBON_SUMMARY } from "@sicilia-soil/core";

export function useDashboardData() {
  return {
    zones: ZONES_MOCK, // ← nuevo
    kpis: DASHBOARD_KPIS, //TODO: ← se migra después
    carbon: CARBON_SUMMARY, // TODO: ← se migra después
  };
}
