"use client";

import { BarChart3 } from "lucide-react";
import { SoilChart, SOIL_COLORS } from "@/components/features/shared";
import { useAnalysisData } from "@/hooks/useAnalysisData";
import { getLocale } from "@sicilia-soil/core";
import { DataCard } from "@sicilia-soil/ui";

export function AnalysisTab() {
  const { coverComparison } = useAnalysisData();
  const locale = getLocale("es");
  const t = locale.content.cropsPage.analysis;

  return (
    <div className="space-y-6">
      <DataCard className="p-6">
        <h3 className="text-lg font-serif font-bold text-ink mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-chloro" />
          {t.title}
        </h3>
        <p className="font-sans text-sm text-ink/70 mb-6 leading-relaxed">
          {t.desc}
        </p>

        <SoilChart
          type="column"
          categories={coverComparison.map((c) => c.cover)}
          series={[
            {
              name: t.series.shi,
              data: coverComparison.map((c) => c.shi),
              color: SOIL_COLORS.chloro,
            },
            {
              name: t.series.colonisation,
              data: coverComparison.map((c) => c.colonisation),
              color: SOIL_COLORS.solar,
            },
            {
              name: t.series.glomalin,
              data: coverComparison.map((c) => c.glomalin * 10),
              color: SOIL_COLORS.ink,
            },
          ]}
          yAxisLabel="Valor"
          height={360}
          legend
        />
      </DataCard>

      {/* Interpretación */}
      <DataCard className="p-6">
        <h3 className="text-lg font-serif font-bold text-ink mb-4">
          {t.interpretationTitle}
        </h3>
        <ul className="space-y-3 font-sans text-sm text-ink/70">
          {t.interpretationList.map((text, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-chloro mt-0.5">✓</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </DataCard>

      <DataCard className="p-6">
        <h3 className="text-lg font-serif font-bold text-ink mb-3">
          {t.cycleTitle}
        </h3>
        <p className="font-sans text-sm text-ink/70 leading-relaxed">
          {t.cycleDesc}
        </p>
      </DataCard>
    </div>
  );
}
