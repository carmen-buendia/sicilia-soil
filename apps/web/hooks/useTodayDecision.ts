"use client";

// apps/web/hooks/useTodayDecision.ts

import { useMemo } from "react";
import {
  DECISION_CONTEXT_DEFAULT,
  DECISION_EVIDENCE_DEFAULT,
  DECISION_RULES_V1,
  SiciliaSoilAdapter,
} from "@sicilia-soil/core";
import type {
  DecisionContext,
  DecisionEvidence,
  DecisionOutput,
} from "@sicilia-soil/core";
// Generic motor
import { decide } from "@isola-node/rule-engine";

export interface UseTodayDecisionReturn {
  output: DecisionOutput;
  context: DecisionContext;
  evidence: DecisionEvidence;
}

export function useTodayDecision(): UseTodayDecisionReturn {
  return useMemo(() => {
    // 🚨 LA FIRMA DEL MOTOR REQUIERE 3 ARGUMENTOS:
    // 1. evidence (los datos)
    // 2. rules (las reglas de Sikelia)
    // 3. adapter (el adaptador que sabe leer las reglas)
    const output = decide(
      DECISION_EVIDENCE_DEFAULT,
      DECISION_RULES_V1,
      SiciliaSoilAdapter,
    );

    return {
      output,
      context: DECISION_CONTEXT_DEFAULT,
      evidence: DECISION_EVIDENCE_DEFAULT,
    };
  }, []);
}
