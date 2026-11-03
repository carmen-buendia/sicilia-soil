// apps/web/components/features/engine/WhyPanel.tsx
"use client";

import { Brain } from "lucide-react";
import type { EngineOutput } from "@sicilia-soil/core";
import { VOTE_DOT_COLOR, weightTextColor } from "@/config/engine.styles";

interface WhyPanelProps {
  output: EngineOutput;
}

export function WhyPanel({ output }: WhyPanelProps) {
  const winner = output.state;

  return (
    <div className="px-5 py-4 space-y-5 bg-paper/50">
      <div>
        <h4 className="font-mono text-xs font-bold text-ink/80 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Brain className="w-3.5 h-3.5 text-chloro" />
          Reglas activadas ({output.firedRules.length})
        </h4>
        <div className="space-y-1.5">
          {output.firedRules.map((r) => {
            const isWinner = r.vote === winner;
            return (
              <div
                key={r.ruleId}
                className={`flex items-center gap-3 px-3 py-2 border text-xs ${
                  isWinner
                    ? "bg-chloro/5 border-chloro/20"
                    : "bg-card border-border"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${VOTE_DOT_COLOR[r.vote]}`}
                />
                <code className="font-mono text-[10px] text-ink/70 shrink-0">
                  {r.ruleId}
                </code>
                <span className="flex-1 text-ink/50 font-mono text-[10px] uppercase">
                  vota {r.vote}
                </span>
                <span
                  className={`font-mono font-bold ${weightTextColor(r.weight)}`}
                >
                  ×{r.weight.toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {output.conflicts.length > 0 && (
        <div>
          <h4 className="font-mono text-xs font-bold text-amber-800 uppercase tracking-widest mb-3">
            Fuentes en desacuerdo
          </h4>
          {output.conflicts.map((c, i) => (
            <div
              key={i}
              className="px-3 py-2.5 bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 mb-2"
            >
              <div className="font-mono font-bold mb-1 text-[11px] uppercase tracking-wider">
                {c.sources.join(" vs ")}
              </div>
              <div className="text-[11px] opacity-80 mb-2">{c.description}</div>
              <div className="text-[10px] font-mono uppercase tracking-wider opacity-60">
                Resolución: {c.resolution}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between font-mono text-[10px] text-ink/50 pt-3 border-t border-border">
        <span>
          Motor: <code className="text-ink/70">{output.ruleVersion}</code>
        </span>
        <span>
          Fuentes: {output.sourcesUsed.length} · Reglas:{" "}
          {output.firedRules.length}
        </span>
      </div>
    </div>
  );
}
