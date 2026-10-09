"use client";

// apps/web/hooks/useTodayDecision.ts

import { useMemo } from "react";
import {
  MOCK_DECISION_CONTEXT,
  MOCK_DECISION_EVIDENCE,
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
    const output = decide(MOCK_DECISION_EVIDENCE);
    return {
      output,
      context: MOCK_DECISION_CONTEXT,
      evidence: MOCK_DECISION_EVIDENCE,
    };
  }, []);
}
