"use client";

// apps/web/hooks/useTodayDecision.ts

import { useMemo } from "react";
import { decide } from "@sicilia-soil/utils";
import {
  MOCK_DECISION_CONTEXT,
  MOCK_DECISION_EVIDENCE,
} from "@sicilia-soil/core";
import type {
  DecisionContext,
  DecisionEvidence,
  DecisionOutput,
} from "@sicilia-soil/core";

export interface UseTodayDecisionReturn {
  output: DecisionOutput;
  context: DecisionContext;
  evidence: DecisionEvidence;
}

export function useTodayDecision(): UseTodayDecisionReturn {
  return useMemo(() => {
    const output = decide(MOCK_DECISION_CONTEXT, MOCK_DECISION_EVIDENCE);
    return {
      output,
      context: MOCK_DECISION_CONTEXT,
      evidence: MOCK_DECISION_EVIDENCE,
    };
  }, []);
}
