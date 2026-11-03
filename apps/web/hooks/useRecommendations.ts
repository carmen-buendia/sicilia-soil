"use client";

import { useMemo } from "react";
import {
  FARM_BOUNDARY,
  SENSORS_DEFAULT,
  PLOT_CROP_TYPE,
  EO_CONTEXT,
  type RecommendationItem,
} from "@sicilia-soil/core";
// 👇 Importamos nuestro nuevo motor
import { decide } from "@isola-node/rule-engine";
import type {
  EngineInput,
  EngineRule,
  EvidenceAdapter,
} from "@isola-node/rule-engine";

// 1. Definimos las reglas aquí mismo (o impórtalas de tu @sicilia-soil/core si las tienes)
// Estas reglas sustituyen a las que tenías dentro de "generateRecommendations"
const RECOMMENDATION_RULES: EngineRule[] = [
  {
    id: "water-irrigation",
    label: "Riego sugerido",
    conditions: [{ field: "soilMoisture", operator: "lessThan", value: 30 }],
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
];

// 2. Adaptador para que el motor lea los datos de SikeliaSoil
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

      // 3. Preparamos la entrada para nuestro motor
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

      // 4. Evaluamos con el nuevo motor
      const output = decide(input, RECOMMENDATION_RULES, evidenceAdapter);

      // 5. Si el motor ha encontrado alertas, las mapeamos al formato de la UI
      if (output.firedRules.length > 0) {
        output.firedRules.forEach((firedRule) => {
          // 👇 EL TRUCO: Generamos un ID determinista.
          // Usamos el ID de la parcela y el ID de la regla. Así el servidor y el cliente generan el mismo ID.
          const safeId = `rec-${plot.id}-${firedRule.ruleId}`;

          all.push({
            id: safeId,
            topic: firedRule.vote === "red" ? "water" : "soil", // Ejemplo de mapeo
            title:
              RECOMMENDATION_RULES.find((r) => r.id === firedRule.ruleId)
                ?.label ?? "Alerta",
            description: output.explanation,
            confidence: Math.round(output.confidence * 100),
            priority: firedRule.vote === "red" ? "urgent" : "medium",
            zoneId: plot.id,
            zoneName: plot.name,
            dataSource: "sensor",
            action: output.suggestedAction ?? "Revisar la zona",
            createdAt: "2026-11-02T12:00:00Z",
          } as unknown as RecommendationItem);
        });
      }
    }

    return all;
  }, []);
}
