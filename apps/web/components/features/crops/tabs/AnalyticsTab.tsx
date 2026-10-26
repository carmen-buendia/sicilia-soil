// apps/web/components/features/crops/tabs/AnalyticsTab.tsx
"use client";

import { Leaf, TreeDeciduous, Sprout, Carrot } from "lucide-react";
import { SoilChart, SOIL_COLORS } from "@/components/features/shared";
import { DataCard } from "@sicilia-soil/ui";
import { getLocale } from "@sicilia-soil/core";
import type { SystemTemplate } from "@sicilia-soil/core";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";

const TEMPLATE_ICON: Record<SystemTemplate, React.ElementType> = {
  herbaceous: Leaf,
  woody: TreeDeciduous,
  mixed: Sprout,
  "cover-fallow": Carrot,
};

export function AnalyticsTab() {
  const t = getLocale("es").content.cropsPage.analytics;
  const { rows, hasData, series, thresholds } = useAnalyticsData();

  if (!hasData) {
    return (
      <DataCard className="p-12 text-center border-dashed border-ink/20">
        <p className="font-mono text-sm text-ink/50">{t.empty}</p>
      </DataCard>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-ink/20 pb-2">
        <h3 className="text-xl font-serif font-bold text-ink">{t.title}</h3>
        <p className="font-sans text-sm text-ink/60 mt-1">{t.desc}</p>
      </div>
      <DataCard className="p-6">
        <SoilChart
          type="column"
          categories={rows.map((r) => r.name)}
          series={[
            {
              name: series.shi,
              data: rows.map((r) => r.shi),
              color: SOIL_COLORS.chloro,
            },
            {
              name: series.colonisation,
              data: rows.map((r) => r.amf),
              color: SOIL_COLORS.solar,
            },
            {
              name: series.glomalin,
              data: rows.map((r) => r.glomalin),
              color: SOIL_COLORS.ink,
            },
          ]}
          yAxisLabel="0–100"
          height={320}
          legend
        />
      </DataCard>
      <DataCard className="p-6">
        <h4 className="font-serif font-bold text-ink mb-4">
          {t.interpretationTitle}
        </h4>
        <ul className="space-y-3">
          {rows.map((r) => {
            const Icon = TEMPLATE_ICON[r.template];
            return (
              <li key={r.id} className="flex items-start gap-3">
                <Icon className="w-4 h-4 mt-0.5 shrink-0 text-chloro" />
                <p className="font-sans text-sm text-ink/80">
                  {r.interpretation}
                </p>
              </li>
            );
          })}
        </ul>
      </DataCard>
      <DataCard className="p-6 bg-paper border-ink/20">
        <h4 className="font-serif font-bold text-ink mb-3">
          {t.thresholdsTitle}
        </h4>
        <ul className="space-y-1 font-mono text-xs text-ink/70">
          <li>{thresholds.shiHigh}</li>
          <li>{thresholds.shiMid}</li>
          <li>{thresholds.shiLow}</li>
        </ul>
      </DataCard>
    </div>
  );
}
