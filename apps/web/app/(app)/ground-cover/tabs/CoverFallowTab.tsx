"use client";

import { RotateCcw, Leaf, TrendingUp, Droplets } from "lucide-react";
import { SoilChart, SOIL_COLORS } from "@/components/features/shared";
import { useCoverFallowData } from "@/hooks/useCoverFallowData";
import { getLocale } from "@sicilia-soil/core";
import { DataCard } from "@sicilia-soil/ui";

const ICON_MAP: Record<string, any> = {
  leaf: Leaf,
  "trending-up": TrendingUp,
  droplet: Droplets,
};

export function CoverFallowTab() {
  const { coverKpis, coverSpecies, fallowKpis, fallowTimeline } =
    useCoverFallowData();
  const locale = getLocale("es");
  const t = locale.content.cropsPage.coverFallow;

  return (
    <div className="space-y-8">
      {/* Cubiertas */}
      <section>
        <h3 className="text-xl font-serif font-bold text-ink mb-4 flex items-center gap-2 border-b border-ink/20 pb-2">
          <Leaf className="w-5 h-5 text-chloro" />
          {t.coverTitle}
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {coverKpis.map((kpi) => {
            const Icon = ICON_MAP[kpi.icon] ?? Leaf;
            return (
              <DataCard key={kpi.label} className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                    {kpi.label}
                  </span>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
                <p className="font-mono text-2xl font-bold text-ink">
                  {kpi.value}
                </p>
                <p className="font-sans text-[10px] text-ink/50 mt-1">
                  {kpi.note}
                </p>
              </DataCard>
            );
          })}
        </div>

        <DataCard className="p-6 mb-6">
          <h4 className="font-serif font-bold text-ink mb-4">
            {t.comparatorTitle}
          </h4>
          <SoilChart
            type="column"
            categories={coverSpecies.map((c) => c.name)}
            series={[
              {
                name: t.series.cover,
                data: coverSpecies.map((c) => c.cover),
                color: SOIL_COLORS.chloro,
              },
              {
                name: t.series.biomass,
                data: coverSpecies.map((c) => c.biomass),
                color: SOIL_COLORS.solar,
              },
              {
                name: t.series.nitrogen,
                data: coverSpecies.map((c) => c.n),
                color: SOIL_COLORS.ink,
              },
            ]}
            yAxisLabel="Valor"
            height={320}
            legend
          />
        </DataCard>

        <DataCard className="p-0 overflow-hidden">
          <div className="grid grid-cols-6 gap-2 p-3 bg-paper/50 border-b border-ink/10 font-mono text-[10px] uppercase tracking-wider text-ink/60 font-bold">
            {t.tableHeaders.map((header, i) => (
              <span key={i}>{header}</span>
            ))}
          </div>
          {coverSpecies.map((c) => (
            <div
              key={c.id}
              className="grid grid-cols-6 gap-2 p-3 border-t border-ink/10 text-sm items-center hover:bg-paper/30 transition-colors"
            >
              <span className="flex items-center gap-2 font-serif font-bold text-ink">
                <span className="text-lg">{c.icon}</span> {c.name}
              </span>
              <span className="font-mono text-ink/70">{c.cover}%</span>
              <span className="font-mono text-ink/70">{c.biomass} t/ha</span>
              <span className="font-mono text-chloro font-bold">
                {c.n} kg/ha
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                {c.season}
              </span>
              <span
                className={`font-mono text-[10px] px-2 py-0.5 border uppercase tracking-wider font-bold ${c.status === "Activo" ? "bg-chloro/10 border-chloro/20 text-chloro" : "bg-solar/10 border-solar/20 text-solar"}`}
              >
                {c.status}
              </span>
            </div>
          ))}
        </DataCard>
      </section>

      {/* Barbecho */}
      <section>
        <h3 className="text-xl font-serif font-bold text-ink mb-4 flex items-center gap-2 border-b border-ink/20 pb-2">
          <RotateCcw className="w-5 h-5 text-ink/60" />
          {t.fallowTitle}
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {fallowKpis.map((kpi) => (
            <DataCard key={kpi.label} className="p-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
                {kpi.label}
              </p>
              <p className="font-mono text-2xl font-bold text-ink">
                {kpi.value}
              </p>
              <p className="font-sans text-[10px] text-ink/50 mt-1">
                {kpi.note}
              </p>
            </DataCard>
          ))}
        </div>

        <DataCard className="p-6">
          <h4 className="font-serif font-bold text-ink mb-4">
            {t.rotationTitle}
          </h4>
          <SoilChart
            type="bar"
            categories={fallowTimeline.map((t) => t.month)}
            series={[
              {
                name: t.rotationLabel,
                data: fallowTimeline.map((t) =>
                  t.state === "done" ? 100 : t.state === "active" ? 60 : 20,
                ),
                color: SOIL_COLORS.chloro,
              },
            ]}
            yAxisLabel="Progreso"
            yAxisUnit="%"
            height={280}
            legend={false}
          />
        </DataCard>
      </section>

      {/* Recomendaciones */}
      <DataCard className="p-6">
        <h3 className="font-serif font-bold text-ink mb-3">{t.recsTitle}</h3>
        <ul className="space-y-2 font-sans text-sm text-ink/70">
          {t.recs.map((rec, i) => (
            <li
              key={i}
              dangerouslySetInnerHTML={{
                __html: rec.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
              }}
            />
          ))}
        </ul>
      </DataCard>
    </div>
  );
}
