"use client";

// apps/web/hooks/useTodayDecision.ts

import { useMemo } from "react";
import {
  DECISION_CONTEXT_DEFAULT,
  DECISION_EVIDENCE_DEFAULT,
} from "@sicilia-soil/core";
import type { DecisionContext, DecisionEvidence } from "@sicilia-soil/core";
import { DecisionOutput } from "../../../packages/decision/src/types";
import { decide } from "@sicilia-soil/core/decision";

export interface UseTodayDecisionReturn {
  output: DecisionOutput;
  context: DecisionContext;
  evidence: DecisionEvidence;
}

export function useTodayDecision(): UseTodayDecisionReturn {
  return useMemo(() => {
    const output = decide(DECISION_EVIDENCE_DEFAULT);
    return {
      output,
      context: DECISION_CONTEXT_DEFAULT,
      evidence: DECISION_EVIDENCE_DEFAULT,
    };
  }, []);
}
