"use client";

import { ArrowRight } from "lucide-react";
import type { CycleStage } from "@sicilia-soil/core";

interface CycleDiagramProps {
  stages: CycleStage[];
  title?: string;
  subtitle?: string;
  closingNote?: string;
  compact?: boolean;
}

export function CycleDiagram({
  stages,
  title = "Ciclo regenerativo",
  subtitle = "De la biomasa al bioindicador, pasando por la red fúngica",
  closingNote,
  compact = false,
}: CycleDiagramProps) {
  return (
    <div className="bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 rounded-2xl p-6 border border-oliveGreen/15">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-charcoalGray flex items-center gap-2">
          ♻️ {title}
        </h3>
        <p className="text-sm text-oliveGreen/70 mt-1">{subtitle}</p>
      </div>

      {/* Steps */}
      <div
        className={`flex ${
          compact
            ? "flex-col gap-3"
            : "flex-col md:flex-row md:items-stretch gap-3 md:gap-2"
        }`}
      >
        {stages.map((stage, idx) => (
          <div
            key={stage.id}
            className="flex-1 flex flex-col md:flex-row md:items-center gap-2"
          >
            <div
              className="flex-1 rounded-xl p-4 border bg-card/60 backdrop-blur-sm hover:shadow-md transition-all"
              style={{ borderColor: `${stage.color}40` }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto md:mx-0"
                style={{ backgroundColor: `${stage.color}20` }}
              >
                <span className="text-2xl">{stage.icon}</span>
              </div>
              <h4 className="font-bold text-charcoalGray text-sm text-center md:text-left">
                {stage.title}
              </h4>
              <p className="text-xs text-oliveGreen/60 text-center md:text-left">
                {stage.subtitle}
              </p>
              <div className="mt-3 pt-3 border-t border-oliveGreen/10 text-center md:text-left">
                <p className="text-xl font-bold text-charcoalGray">
                  {stage.metric}
                </p>
                <p className="text-xs text-oliveGreen/60">
                  {stage.metricLabel}
                </p>
              </div>
            </div>

            {idx < stages.length - 1 && (
              <div className="flex justify-center md:flex-col md:items-center md:justify-center">
                <ArrowRight className="w-5 h-5 text-oliveGreen/40 rotate-90 md:rotate-0" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Closing note */}
      {closingNote && (
        <div className="mt-6 p-4 bg-card/60 rounded-xl border border-oliveGreen/10 text-sm text-oliveGreen/70">
          <p>{closingNote}</p>
        </div>
      )}
    </div>
  );
}
