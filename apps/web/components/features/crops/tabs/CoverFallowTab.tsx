// apps/web/app/(app)/ground-cover/tabs/CoverFallowTab.tsx
"use client";

import { useState } from "react";
import { RotateCcw, Leaf, Plus, Edit2 } from "lucide-react";
import { SoilChart, SOIL_COLORS } from "@/components/features/shared";
import { DataCard, Button } from "@sicilia-soil/ui";
import { getLocale } from "@sicilia-soil/core";
import type { CropSystem } from "@sicilia-soil/core";
import { COVER_STATUS_CONFIG, FALLBACK_STATUS_STYLE } from "@/config";

export function CoverFallowTab({ system }: { system: CropSystem }) {
  const locale = getLocale("es");
  const t = locale.content.cropsPage.coverFallow;
  const shared = locale.content.cropsPage.shared;
  const [isEditingRotation, setIsEditingRotation] = useState(false);

  const subCrops = system.subCrops ?? [];
  const fallowSeries = system.series?.find((s) => s.key === "rotation");

  return (
    <div className="space-y-6">
      {/* COVER SECTION */}
      <section>
        <div className="flex items-center justify-between border-b border-ink/20 pb-2 mb-4">
          <h3 className="text-xl font-serif font-bold text-ink flex items-center gap-2">
            <Leaf className="w-5 h-5 text-chloro" />
            {t.coverTitle}
          </h3>
          <Button
            variant="bare"
            size="none"
            className="!rounded-none hover:scale-100 text-xs font-mono uppercase tracking-widest font-bold text-chloro hover:text-ink flex items-center gap-1"
            icon={<Plus className="w-4 h-4" />}
          >
            {t.addCover}
          </Button>
        </div>

        {subCrops.length === 0 ? (
          <DataCard className="p-8 text-center border-dashed border-ink/20 mb-6">
            <p className="font-mono text-sm text-ink/50">{t.noData}</p>
          </DataCard>
        ) : (
          <>
            <DataCard className="p-6 mb-6">
              <h4 className="font-serif font-bold text-ink mb-4">
                {t.comparatorTitle}
              </h4>
              <SoilChart
                type="column"
                categories={subCrops.map((c) => c.name)}
                series={[
                  {
                    name: t.series.cover,
                    data: subCrops.map((c) => c.water ?? 0),
                    color: SOIL_COLORS.chloro,
                  },
                  {
                    name: t.series.biomass,
                    data: subCrops.map((c) => c.residue ?? 0),
                    color: SOIL_COLORS.solar,
                  },
                  {
                    name: t.series.nitrogen,
                    data: subCrops.map((c) => c.extraction ?? 0),
                    color: SOIL_COLORS.ink,
                  },
                ]}
                yAxisLabel={shared.yAxisValue}
                height={320}
                legend
              />
            </DataCard>

            <DataCard className="p-0 overflow-hidden">
              <div className="grid grid-cols-6 gap-2 p-3 bg-paper/50 border-b border-ink/10 font-mono text-[10px] uppercase tracking-wider text-ink/60 font-bold">
                {t.tableHeaders.map((h, i) => (
                  <span key={i}>{h}</span>
                ))}
              </div>
              {subCrops.map((crop) => {
                const statusCfg = COVER_STATUS_CONFIG[crop.stage ?? ""];
                const statusLabel = statusCfg
                  ? t.statusLabels[
                      statusCfg.key as
                        | "highDensity"
                        | "emergence"
                        | "senescence"
                    ]
                  : (crop.stage ?? "—");
                const statusStyle = statusCfg?.style ?? FALLBACK_STATUS_STYLE;
                return (
                  <div
                    key={crop.id}
                    className="grid grid-cols-6 gap-2 p-3 border-t border-ink/10 text-sm items-center hover:bg-paper/30 transition-colors"
                  >
                    <span className="flex items-center gap-2 font-serif font-bold text-ink">
                      <span className="text-lg">{crop.icon}</span> {crop.name}
                    </span>
                    <span className="font-mono text-ink/70">
                      {crop.water ?? 0}%
                    </span>
                    <span className="font-mono text-ink/70">
                      {crop.residue ?? 0} t/ha
                    </span>
                    <span className="font-mono text-chloro font-bold">
                      {crop.extraction ?? 0} kg/ha
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                      {crop.season ?? "—"}
                    </span>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 border uppercase tracking-wider font-bold ${statusStyle}`}
                    >
                      {statusLabel}
                    </span>
                  </div>
                );
              })}
            </DataCard>
          </>
        )}
      </section>

      {/* FALLOW SECTION */}
      <section>
        <div className="flex items-center justify-between border-b border-ink/20 pb-2 mb-4">
          <h3 className="text-xl font-serif font-bold text-ink flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-ink/60" />
            {t.fallowTitle}
          </h3>
          <Button
            variant="bare"
            size="none"
            onClick={() => setIsEditingRotation(!isEditingRotation)}
            className="!rounded-none hover:scale-100 text-xs font-mono uppercase tracking-widest font-bold text-solar hover:text-ink flex items-center gap-1"
            icon={<Edit2 className="w-4 h-4" />}
          >
            {isEditingRotation ? t.cancelEdit : t.editRotation}
          </Button>
        </div>

        {isEditingRotation && (
          <DataCard className="p-6 mb-6 border-solar/30 bg-solar/5">
            <h4 className="font-serif font-bold text-ink mb-4 text-sm">
              {t.editRotationTitle}
            </h4>
            <p className="text-sm text-ink/70 mb-4">{t.editRotationDesc}</p>
            <Button variant="cta" className="text-xs">
              {t.saveRotation}
            </Button>
          </DataCard>
        )}

        {fallowSeries && (
          <DataCard className="p-6">
            <h4 className="font-serif font-bold text-ink mb-4">
              {t.rotationTitle}
            </h4>
            <SoilChart
              type="bar"
              categories={fallowSeries.categories ?? []}
              series={[
                {
                  name: t.rotationLabel,
                  data: fallowSeries.data,
                  color: SOIL_COLORS.chloro,
                },
              ]}
              yAxisLabel={shared.yAxisProgress}
              yAxisUnit="%"
              height={280}
              legend={false}
            />
          </DataCard>
        )}
      </section>
    </div>
  );
}
