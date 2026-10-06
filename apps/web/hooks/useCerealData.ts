"use client";

import {
  CEREAL_KPIS,
  CEREAL_GROWTH_DATA,
  CEREAL_COMPARISON,
  CEREAL_PLOT_INFO,
} from "@sicilia-soil/core";

/**
 * Hook que devuelve los datos del cereal.
 * Ahora: lee del mock centralizado en @sicilia-soil/core.
 * Después: leerá de IoT + Data Cube.
 */
export function useCerealData() {
  // Cuando haya IoT/Data Cube, este hook hará fetch:
  // return useQuery({ queryKey: ["cereal"], queryFn: fetchCerealData })
  return {
    kpis: CEREAL_KPIS,
    growth: CEREAL_GROWTH_DATA,
    comparison: CEREAL_COMPARISON,
    plotInfo: CEREAL_PLOT_INFO,
  };
}
