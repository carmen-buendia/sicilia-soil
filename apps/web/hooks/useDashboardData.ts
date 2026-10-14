"use client";

import { ZONES_MOCK, KPIS_MOCK, CARBON_MOCK } from "@sicilia-soil/core";

export function useDashboardData() {
  return {
    zones: ZONES_MOCK,
    kpis: KPIS_MOCK,
    carbon: CARBON_MOCK,
  };
}
