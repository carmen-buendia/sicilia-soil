"use client";

import { useMemo } from "react";
import {
  FARM_BOUNDARY,
  SENSORS_DEFAULT,
  PLOT_CROP_TYPE,
  EO_CONTEXT,
  type RecommendationItem,
  type RecommendationRuleInput,
} from "@sicilia-soil/core";
import { generateRecommendations } from "@sicilia-soil/utils";

/**
 * Genera recomendaciones a nivel de finca usando el contexto EO.
 *
 * TODO(feat/farm-parcels): iterar sobre las parcelas reales cuando estén
 * definidas. Hoy SENSORS_DEFAULT no tiene entrada para "farm", así que solo
 * se aplican las reglas basadas en EO_CONTEXT (NDVI, NDWI, SSM, LST, lluvia).
 */
export function useRecommendations(): RecommendationItem[] {
  return useMemo(() => {
    const all: RecommendationItem[] = [];

    for (const plot of FARM_BOUNDARY) {
      const sensors = SENSORS_DEFAULT[plot.id] ?? {};
      const cropType = PLOT_CROP_TYPE[plot.id] ?? "farm";

      const input: RecommendationRuleInput = {
        ...EO_CONTEXT,
        ...sensors,
        cropType,
        zoneId: plot.id,
        zoneName: plot.name,
      };

      if (input.soilMoisture !== undefined || input.ndvi !== undefined) {
        all.push(...generateRecommendations(input));
      }
    }

    return all;
  }, []);
}
