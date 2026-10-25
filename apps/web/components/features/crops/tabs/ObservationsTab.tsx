// apps/web/components/features/crops/tabs/ObservationsTab.tsx
"use client";

import { CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { DataCard } from "@sicilia-soil/ui";
import { getLocale } from "@sicilia-soil/core";
import { useAllObservations } from "@/hooks/useAllObservations";

const LEVEL_ICON = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
} as const;
const LEVEL_STYLE = {
  success: "bg-chloro/10 border-chloro/20 text-chloro",
  warning: "bg-solar/10 border-solar/20 text-solar",
  info: "bg-ink/5 border-ink/15 text-ink/70",
} as const;

export function ObservationsTab() {
  const t = getLocale("es").content.cropsPage.observations;
  const observations = useAllObservations();

  if (observations.length === 0) {
    return (
      <DataCard className="p-12 text-center border-dashed border-ink/20">
        <p className="font-mono text-sm text-ink/50">{t.empty}</p>
      </DataCard>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border-b border-ink/20 pb-2">
        <h3 className="text-xl font-serif font-bold text-ink">{t.title}</h3>
        <p className="font-sans text-sm text-ink/60 mt-1">{t.desc}</p>
      </div>
      <DataCard className="p-0 overflow-hidden">
        <ul className="divide-y divide-ink/10">
          {observations.map((obs) => {
            const Icon = LEVEL_ICON[obs.level];
            const date = new Date(
              obs.meta?.date ?? Date.now(),
            ).toLocaleDateString("es-IT");
            return (
              <li
                key={obs.id}
                className={`flex items-start gap-3 p-4 ${LEVEL_STYLE[obs.level]}`}
              >
                <Icon className="w-4 h-4 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{obs.systemIcon}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink/60">
                      {obs.systemName}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-ink">{obs.text}</p>
                  <p className="font-mono text-[10px] text-ink/50 mt-1 uppercase tracking-wider">
                    {obs.meta?.source ?? "—"} · {date}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </DataCard>
    </div>
  );
}
