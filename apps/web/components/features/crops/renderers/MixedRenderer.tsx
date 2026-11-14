// apps/web/components/features/crops/renderers/MixedRenderer.tsx
"use client";

import { Carrot, Recycle } from "lucide-react";
import { SoilChart, SOIL_COLORS } from "@/components/features/shared";
import { DataCard } from "@sicilia-soil/ui";
import { getLocale } from "@sicilia-soil/core";
import type { CropSystem } from "@sicilia-soil/core";

const locale = getLocale("es");
const mixedContent = locale.content.cropsPage.mixed;
const sharedContent = locale.content.cropsPage.shared;

export function MixedRenderer({ system }: { system: CropSystem }) {
  const subCrops = system.subCrops ?? [];

  const compostDescription = mixedContent.compostDesc
    .replace("{input}", String(system.metrics.residueInput ?? 6.5))
    .replace("{output}", String(system.metrics.compostOutput ?? 4))
    .replace("{om}", String(system.metrics.organicMatter ?? 16));

  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-ink/20 pb-2">
          <h3 className="text-xl font-serif font-bold text-ink flex items-center gap-2">
            <Carrot className="w-5 h-5 text-chloro" /> {mixedContent.vegTitle}
          </h3>
        </div>

        <DataCard className="p-0 overflow-hidden mb-6">
          <div className="grid grid-cols-5 gap-2 p-3 bg-paper/50 border-b border-ink/10 text-[10px] font-mono uppercase text-ink/50 font-bold">
            {mixedContent.tableHeaders.map((header, i) => (
              <span key={i}>{header}</span>
            ))}
          </div>
          {subCrops.map((crop) => (
            <div
              key={crop.id}
              className="grid grid-cols-5 gap-2 p-3 border-t border-ink/10 text-sm font-mono items-center hover:bg-paper/30"
            >
              <span className="flex items-center gap-2 font-serif font-bold text-ink">
                <span className="text-lg">{crop.icon}</span> {crop.name}
              </span>
              <span className="text-ink/60">{crop.area}</span>
              <span className="text-ink/60">{crop.extraction ?? "—"}</span>
              <span className="text-solar">{crop.residue ?? 0} kg/sem</span>
              <span className="text-blue">{crop.water ?? 0} L/sem</span>
            </div>
          ))}
        </DataCard>

        <DataCard className="p-6">
          <h4 className="font-serif font-bold text-ink mb-4">
            {mixedContent.balanceTitle}
          </h4>
          <SoilChart
            type="column"
            categories={subCrops.map((c) => c.name)}
            series={[
              {
                name: mixedContent.seriesWater,
                data: subCrops.map((c) => c.water ?? 0),
                color: SOIL_COLORS.blue,
              },
              {
                name: mixedContent.seriesResidue,
                data: subCrops.map((c) => c.residue ?? 0),
                color: SOIL_COLORS.solar,
              },
            ]}
            yAxisLabel={sharedContent.yAxisValue}
            height={280}
            legend
          />
        </DataCard>
      </section>

      <DataCard className="p-6">
        <h3 className="text-xl font-serif font-bold text-ink mb-4 flex items-center gap-2">
          <Recycle className="w-5 h-5 text-chloro" />{" "}
          {mixedContent.compostTitle}
        </h3>
        <p className="font-sans text-sm text-ink/70">{compostDescription}</p>
      </DataCard>
    </div>
  );
}
