// apps/web/components/features/soil-health/tabs/RemediationTab.tsx
"use client";

import { AlertTriangle, TrendingDown } from "lucide-react";
import { SoilChart, SOIL_COLORS } from "@/components/features/shared";
import type { CropSystem } from "@sicilia-soil/core";
import { getLocale } from "@sicilia-soil/core";
import { DataCard } from "@sicilia-soil/ui";

const DEFAULT_THRESHOLDS = { lead: 100, cadmium: 5, hydrocarbons: 50 };

export function RemediationTab({ systems }: { systems: CropSystem[] }) {
  const locale = getLocale("es");
  const t = locale.content.soilHealthTabs.remediation;

  // Si no hay ningún sistema en el CRUD, mostramos el estado vacío
  if (systems.length === 0) {
    return (
      <DataCard className="p-12 text-center border-dashed border-ink/20">
        <AlertTriangle className="w-8 h-8 text-solar mx-auto mb-3" />
        <p className="font-mono text-sm text-ink/50">
          No hay sistemas registrados. Crea uno en /crops para ver sus datos.
        </p>
      </DataCard>
    );
  }

  // Tomamos el primer sistema (tenga o no datos de contaminación)
  const currentSystem = systems[0];
  const metrics = currentSystem.metrics;

  const leadLimit = metrics.leadThreshold ?? DEFAULT_THRESHOLDS.lead;
  const cadmiumLimit = metrics.cadmiumThreshold ?? DEFAULT_THRESHOLDS.cadmium;
  const hydroLimit =
    metrics.hydrocarbonsThreshold ?? DEFAULT_THRESHOLDS.hydrocarbons;

  const pctOfThreshold = [
    {
      name: t.lead,
      current: Math.round(((metrics.lead ?? 0) / leadLimit) * 100),
      color: SOIL_COLORS.chloro,
    },
    {
      name: t.cadmium,
      current: Math.round(((metrics.cadmium ?? 0) / cadmiumLimit) * 100),
      color: SOIL_COLORS.solar,
    },
    {
      name: t.hydrocarbons,
      current: Math.round(((metrics.hydrocarbons ?? 0) / hydroLimit) * 100),
      color: SOIL_COLORS.stone,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <DataCard className="p-6 flex items-start gap-4">
        <div className="p-3 bg-solar/10 border border-solar/20">
          <AlertTriangle className="w-8 h-8 text-solar" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-serif font-bold text-ink mb-1">
            {t.title}
          </h3>
          <p className="font-mono text-xs uppercase tracking-wider text-ink/60 mb-3">
            {currentSystem.name} · {currentSystem.region ?? "Zona desconocida"}
          </p>
          <p className="font-sans text-sm text-ink/80">
            Estado actual de contaminantes frente a los umbrales de referencia.
          </p>
        </div>
      </DataCard>

      {/* Progreso */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          label={t.lead}
          current={metrics.lead ?? 0}
          limit={leadLimit}
        />
        <MetricCard
          label={t.cadmium}
          current={metrics.cadmium ?? 0}
          limit={cadmiumLimit}
        />
        <MetricCard
          label={t.hydrocarbons}
          current={metrics.hydrocarbons ?? 0}
          limit={hydroLimit}
        />
      </div>

      {/* GRÁFICA 2 */}
      <DataCard className="p-6">
        <h4 className="font-serif font-bold text-ink mb-1">{t.chart2Title}</h4>
        <p className="font-mono text-xs text-ink/60 mb-4">{t.chart2Desc}</p>
        <SoilChart
          type="column"
          categories={pctOfThreshold.map((p) => p.name)}
          series={[
            {
              name: t.series.currentPct,
              data: pctOfThreshold.map((p) => p.current),
              color: SOIL_COLORS.chloro,
            },
            {
              name: t.series.threshold100,
              data: pctOfThreshold.map(() => 100),
              color: SOIL_COLORS.stone,
              type: "line",
            },
          ]}
          yAxisLabel="%"
          yAxisUnit="%"
          height={280}
          legend
        />
      </DataCard>
    </div>
  );
}

function MetricCard({
  label,
  current,
  limit,
}: {
  label: string;
  current: number;
  limit: number;
}) {
  const isSafe = current <= limit;
  const pct = Math.round((current / limit) * 100);

  return (
    <DataCard
      variant="bare"
      className="bg-card border border-ink/20 p-5 flex flex-col"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink/60">
          {label}
        </span>
        {isSafe ? (
          <TrendingDown className="w-4 h-4 text-chloro" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-solar" />
        )}
      </div>
      <p
        className={`font-mono text-2xl font-bold ${isSafe ? "text-chloro" : "text-solar"}`}
      >
        {current} mg/kg
      </p>
      <p className="font-sans text-[10px] text-ink/50 mt-1">
        Límite: {limit} mg/kg ({pct}%)
      </p>
    </DataCard>
  );
}
