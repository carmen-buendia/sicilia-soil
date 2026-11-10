"use client";

// apps/web/hooks/useTodayEngine.ts

import { useMemo } from "react";
import {
  ENGINE_CONTEXT_DEFAULT,
  ENGINE_EVIDENCE_DEFAULT,
} from "@sicilia-soil/core";
import { decide } from "@isola-node/rule-engine";
import type {
  EngineRule,
  EvidenceAdapter,
  EngineInput,
  EngineOutput as IsolaEngineOutput,
} from "@isola-node/rule-engine";

// 1. Definimos las reglas específicas de SikeliaSoil usando el tipo del nuevo motor
const SICILIA_RULES: EngineRule[] = [
  {
    id: "water-irrigation-urgent",
    label: "Riego urgente requerido",
    conditions: [
      { field: "soilMoisture", operator: "lessThan", value: 40 },
      { field: "airTemperature", operator: "greaterThan", value: 28 },
    ],
    votesFor: "red",
    baseConfidence: 0.92,
    criteria: ["water"],
    version: 1,
    active: true,
  },
  {
    id: "soil-health-warning",
    label: "Revisar salud del suelo",
    conditions: [{ field: "ndvi", operator: "lessThan", value: 0.4 }],
    votesFor: "yellow",
    baseConfidence: 0.85,
    criteria: ["soil"],
    version: 1,
    active: true,
  },
];

// 2. Creamos el adaptador de evidencia que lee los datos de SikeliaSoil
const evidenceAdapter: EvidenceAdapter<EngineInput> = {
  read: (input, path) => {
    const value = input.data ? input.data[path] : (input as any)[path];
    return typeof value === "number" ? value : undefined;
  },
  detectConflicts: () => [],
  sourcesUsed: () => ["sensors", "copernicus"],
};

export interface UseTodayEngineReturn {
  output: IsolaEngineOutput;
  context: typeof ENGINE_CONTEXT_DEFAULT;
  evidence: typeof ENGINE_EVIDENCE_DEFAULT;
}

export function useTodayEngine(): UseTodayEngineReturn {
  return useMemo(() => {
    // 3. Ejecutamos el motor de Isola-Node con las reglas de Sikelia
    const output = decide(
      ENGINE_EVIDENCE_DEFAULT as unknown as EngineInput,
      SICILIA_RULES,
      evidenceAdapter,
    );

    return {
      output,
      context: ENGINE_CONTEXT_DEFAULT,
      evidence: ENGINE_EVIDENCE_DEFAULT,
    };
  }, []);
}
