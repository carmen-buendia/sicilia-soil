"use client";

import { useMemo } from "react";
import {
  FARM_BOUNDARY,
  SENSORS_DEFAULT,
  PLOT_CROP_TYPE,
  EO_CONTEXT,
  type RecommendationItem,
} from "@sicilia-soil/core";
import { decide } from "@isola-node/rule-engine";
import type {
  EngineInput,
  EngineRule,
  EvidenceAdapter,
} from "@isola-node/rule-engine";

const RECOMMENDATION_RULES: EngineRule[] = [
  {
    id: "water-irrigation",
    label: "Riego sugerido",
    conditions: [{ field: "ssm", operator: "lessThan", value: 35 }],
    votesFor: "red",
    baseConfidence: 0.9,
    criteria: ["water"],
    version: 1,
    active: true,
  },
  {
    id: "soil-health",
    label: "Revisar salud del suelo",
    conditions: [{ field: "ndvi", operator: "lessThan", value: 0.4 }],
    votesFor: "yellow",
    baseConfidence: 0.8,
    criteria: ["soil"],
    version: 1,
    active: true,
  },
  {
    id: "heat-stress",
    label: "Estrés térmico",
    conditions: [{ field: "lst", operator: "greaterThan", value: 30 }],
    votesFor: "yellow",
    baseConfidence: 0.75,
    criteria: ["protection"],
    version: 1,
    active: true,
  },
];

const evidenceAdapter: EvidenceAdapter<EngineInput> = {
  read: (input, path) => {
    const val = input.data[path];
    return typeof val === "number" ? val : undefined;
  },
  detectConflicts: () => [],
  sourcesUsed: () => ["EO_CONTEXT", "SENSORS_DEFAULT"],
};

export function useRecommendations(): RecommendationItem[] {
  return useMemo(() => {
    const all: RecommendationItem[] = [];

    for (const plot of FARM_BOUNDARY) {
      const sensors = SENSORS_DEFAULT[plot.id] ?? {};
      const cropType = PLOT_CROP_TYPE[plot.id] ?? "farm";

      const input: EngineInput = {
        data: {
          ...EO_CONTEXT,
          ...sensors,
          cropType,
        } as unknown as Record<string, number | string | boolean | null>,
        context: {
          zoneId: plot.id,
          zoneName: plot.name,
        },
      };

      const output = decide(input, RECOMMENDATION_RULES, evidenceAdapter);

      if (output.firedRules.length > 0) {
        output.firedRules.forEach((firedRule) => {
          const safeId = `rec-${plot.id}-${firedRule.ruleId}`;
          const ruleDef = RECOMMENDATION_RULES.find(
            (r) => r.id === firedRule.ruleId,
          );

          const isRed = firedRule.vote === "red";
          const isGreen = firedRule.vote === "green";

          all.push({
            id: safeId,
            topic: isRed ? "water" : isGreen ? "general" : "soil",
            title: ruleDef?.label ?? "Alerta",
            description: output.explanation,
            confidence: Math.round(output.confidence * 100),
            priority: isRed ? "urgent" : isGreen ? "info" : "medium",
            zoneId: plot.id,
            zoneName: plot.name,
            dataSource: "sensor",
            category: ruleDef?.criteria[0] ?? "general",
            action: output.suggestedAction ?? "Revisar la zona",
            createdAt: "2026-11-02T12:00:00Z",
          } as unknown as RecommendationItem);
        });
      }
    }

    return all;
  }, []);
}
