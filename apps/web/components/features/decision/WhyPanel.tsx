// apps/web/components/features/decision/WhyPanel.tsx
"use client";

import { Brain } from "lucide-react";
import type { DecisionOutput } from "@sicilia-soil/core";
import { VOTE_DOT_COLOR, weightTextColor } from "@/config/decision.styles";

interface WhyPanelProps {
  output: DecisionOutput;
}

export function WhyPanel({ output }: WhyPanelProps) {
  const winner = output.state;

  return (
    <div className="border-t border-oliveGreen/10 bg-white/60 backdrop-blur-sm px-5 py-4 space-y-4">
      <div>
        <h4 className="text-xs font-bold text-charcoalGray/80 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Brain className="w-3.5 h-3.5 text-oliveGreen" />
          Reglas activadas ({output.firedRules.length})
        </h4>
        <div className="space-y-1">
          {output.firedRules.map((r) => {
            const isWinner = r.vote === winner;
            return (
              <div
                key={r.ruleId}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-xs ${
                  isWinner
                    ? "bg-emerald-50/60 border-emerald-100"
                    : "bg-white/70 border-oliveGreen/10"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${VOTE_DOT_COLOR[r.vote]}`}
                />
                <code className="font-mono text-[10px] text-charcoalGray/70 shrink-0">
                  {r.ruleId}
                </code>
                <span className="flex-1 text-charcoalGray/60 text-[10px]">
                  vota {r.vote}
                </span>
                <span className={`font-bold ${weightTextColor(r.weight)}`}>
                  ×{r.weight.toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {output.conflicts.length > 0 && (
        <div>
          <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
            Fuentes en desacuerdo
          </h4>
          {output.conflicts.map((c, i) => (
            <div
              key={i}
              className="px-3 py-2 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900"
            >
              <div className="font-medium mb-1">{c.sources.join(" vs ")}</div>
              <div className="text-[11px] opacity-80">{c.description}</div>
              <div className="text-[10px] mt-1 opacity-60">
                Resolución: {c.resolution}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-[10px] text-charcoalGray/50 pt-2 border-t border-oliveGreen/10">
        <span>
          Motor: <code className="font-mono">{output.ruleVersion}</code>
        </span>
        <span>
          Fuentes: {output.sourcesUsed.length} · Reglas:{" "}
          {output.firedRules.length}
        </span>
      </div>
    </div>
  );
}
