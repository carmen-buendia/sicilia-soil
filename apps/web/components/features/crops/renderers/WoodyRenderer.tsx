// apps/web/components/features/crops/renderers/WoodyRenderer.tsx
"use client";

import { Droplets, Thermometer, TreeDeciduous } from "lucide-react";
import { SoilChart, SOIL_COLORS } from "@/components/features/shared";
import { DataCard } from "@sicilia-soil/ui";
import { getLocale } from "@sicilia-soil/core";
import type { CropSystem } from "@sicilia-soil/core";

export function WoodyRenderer({ system }: { system: CropSystem }) {
  const locale = getLocale("es");
  const t = locale.content.cropsPage.woody;
  const shared = locale.content.cropsPage.shared;
  const subCrops = system.subCrops ?? [];

  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-ink/20 pb-2">
          <h3 className="text-xl font-serif font-bold text-ink flex items-center gap-2">
            <TreeDeciduous className="w-5 h-5 text-chloro" /> {t.title}
          </h3>
          <span className="font-mono text-[10px] uppercase text-ink/50">
            {t.parcelsCount.replace("{count}", String(subCrops.length))}
          </span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {subCrops.map((crop) => (
            <DataCard key={crop.id} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{crop.icon}</span>
              </div>
              <h4 className="font-serif font-bold text-ink mb-3">{crop.name}</h4>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink/50"><Droplets className="w-3.5 h-3.5" /> {t.moisture}</span>
                  <span className="font-bold text-ink">{crop.water ?? "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink/50"><Thermometer className="w-3.5 h-3.5" /> {t.temperature}</span>
                  <span className="font-bold text-ink">{system.metrics.temperature ?? "—"}</span>
                </div>
              </div>
            </DataCard>
          ))}
        </div>
      </section>
      {subCrops.length > 0 && (
        <DataCard className="p-6">
          <h3 className="text-lg font-serif font-bold text-ink mb-4">{t.comparatorTitle}</h3>
          <SoilChart
            type="column"
            categories={subCrops.map((c) => c.name)}
            series={[{ name: t.seriesHumidity, data: subCrops.map((c) => c.water ?? 0), color: SOIL_COLORS.blue }]}
            yAxisLabel={shared.yAxisValue}
            height={320}
            legend
          />
        </DataCard>
      )}
    </div>
  );
}