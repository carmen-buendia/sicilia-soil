"use client";

import {
  GARDEN_ZONES,
  DASHBOARD_KPIS,
  CARBON_SUMMARY,
} from "@sicilia-soil/core";

export function useDashboardData() {
  return {
    zones: GARDEN_ZONES,
    kpis: DASHBOARD_KPIS,
    carbon: CARBON_SUMMARY,
  };
}
