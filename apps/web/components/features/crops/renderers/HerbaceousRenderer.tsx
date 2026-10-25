// apps/web/components/features/crops/renderers/HerbaceousRenderer.tsx
"use client";

import { CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { SoilChart, SOIL_COLORS } from "@/components/features/shared";
import { DataCard } from "@sicilia-soil/ui";
import { getLocale } from "@sicilia-soil/core";
import type { CropSystem } from "@sicilia-soil/core";
import { useSystemObservations } from "@/hooks/useSystemObservations";

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

export function HerbaceousRenderer({ system }: { system: CropSystem }) {
  const locale = getLocale("es");
  const t = locale.content.cropsPage.herbaceous;
  const shared = locale.content.cropsPage.shared;
  const observations = useSystemObservations(system);

  const ndvi = system.series?.find((s) => s.key === "ndvi");
  const moisture = system.series?.find((s) => s.key === "moisture");

  return (
    <div className="space-y-6">
      <p className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
        {t.role}
      </p>
      {ndvi && moisture && (
        <DataCard className="p-6">
          <h4 className="font-serif font-bold text-ink mb-4">
            {t.chart1Title}
          </h4>
          <SoilChart
            type="line"
            categories={moisture.categories ?? []}
            series={[
              {
                name: moisture.name,
                data: moisture.data,
                color: SOIL_COLORS.blue,
              },
              { name: ndvi.name, data: ndvi.data, color: SOIL_COLORS.chloro },
            ]}
            yAxisLabel={shared.yAxisValue}
            height={280}
            legend
          />
        </DataCard>
      )}
      <DataCard className="p-6">
        <h4 className="font-serif font-bold text-ink mb-4">
          {t.observationsTitle}
        </h4>
        <ul className="space-y-3">
          {observations.map((obs) => {
            const Icon = LEVEL_ICON[obs.level];
            return (
              <li
                key={obs.id}
                className={`flex items-start gap-3 p-3 border ${LEVEL_STYLE[obs.level]}`}
              >
                <Icon className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-sans text-sm text-ink">{obs.text}</p>
                  <p className="font-mono text-[10px] text-ink/50 mt-1 uppercase">
                    {obs.meta?.source} ·{" "}
                    {new Date(obs.meta?.date ?? "").toLocaleDateString("es-IT")}
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
