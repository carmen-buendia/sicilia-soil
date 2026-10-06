"use client";

import { useMemo } from "react";
import {
  DEFAULT_FARM_PLOTS,
  MOCK_SENSORS,
  PLOT_CROP_TYPE,
  EO_CONTEXT,
  type RecommendationItem,
  type RecommendationRuleInput,
} from "@sicilia-soil/core";
import { generateRecommendations } from "@sicilia-soil/utils";

export function useRecommendations(): RecommendationItem[] {
  return useMemo(() => {
    const all: RecommendationItem[] = [];

    for (const plot of DEFAULT_FARM_PLOTS) {
      const sensors = MOCK_SENSORS[plot.id] ?? {};
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
