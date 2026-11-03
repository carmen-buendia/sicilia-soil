"use client";

// apps/web/hooks/useTodayEngine.ts

import { useMemo } from "react";
import {
  ENGINE_CONTEXT_DEFAULT,
  ENGINE_EVIDENCE_DEFAULT,
  ENGINE_RULES_V1,
  SiciliaSoilAdapter,
} from "@sicilia-soil/core";
// Importamos los tipos correctos del nuevo motor
import { decide } from "@isola-node/rule-engine";
import type {
  EngineRule,
  EvidenceAdapter,
  EngineInput,
  EngineOutput as IsolaEngineOutput,
} from "@isola-node/rule-engine";

// Nota: Si los tipos de SikeliaSoil son diferentes, podemos hacer un cast seguro
// ya que la estructura de datos es la misma.
const rules = ENGINE_RULES_V1 as unknown as EngineRule[];

// El adaptador de SikeliaSoil debe cumplir con la nueva interfaz
const adapter = SiciliaSoilAdapter as unknown as EvidenceAdapter<EngineInput>;

export interface UseTodayEngineReturn {
  output: IsolaEngineOutput;
  context: typeof ENGINE_CONTEXT_DEFAULT;
  evidence: typeof ENGINE_EVIDENCE_DEFAULT;
}

export function useTodayEngine(): UseTodayEngineReturn {
  return useMemo(() => {
    // 1. evidence (los datos)
    // 2. rules (las reglas de Sikelia)
    // 3. adapter (el adaptador que sabe leer las reglas)

    // El motor decide recibe la evidencia, las reglas y el adaptador
    const output = decide(
      ENGINE_EVIDENCE_DEFAULT as unknown as EngineInput,
      rules,
      adapter,
    );

    return {
      output,
      context: ENGINE_CONTEXT_DEFAULT,
      evidence: ENGINE_EVIDENCE_DEFAULT,
    };
  }, []);
}
