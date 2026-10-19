"use client";

import {
  Droplets,
  Thermometer,
  Sun,
  Wind,
  Sprout,
  Scissors,
  Package,
  Award,
} from "lucide-react";
import {
  calculateSymbiosisScore,
  getGroundCoverHealth,
} from "@sicilia-soil/utils";
import {
  SymbiosisCard,
  SoilChart,
  SOIL_COLORS,
  CycleDiagram,
  YearCycleChart,
} from "@/components/features/shared";
import { useEspartoData } from "@/hooks/useEspartoData";
import { getLocale, type MonitoringKey } from "@sicilia-soil/core";
import { DataCard } from "@sicilia-soil/ui";

const KPI_ICONS: Record<string, any> = {
  moisture: Droplets,
  temperature: Thermometer,
  light: Sun,
  wind: Wind,
};

const KPI_COLORS: Record<string, string> = {
  moisture: "text-chloro",
  temperature: "text-red-500",
  light: "text-solar",
  wind: "text-ink/60",
};

export function EspartoTab() {
  const {
    kpis,
    symbiosisInput,
    info,
    monitoring,
    chartConfig,
    yearCycle,
    cycleStages,
    cycleClosingNote,
  } = useEspartoData();

  const locale = getLocale("es");
  const t = locale.content.cropsPage.esparto; // <-- Extraemos los textos

  const health = getGroundCoverHealth(monitoring);

  const symbiosis = calculateSymbiosisScore({
    espartoHealth: health.status === "Excelente" ? 92 : 70,
    ...symbiosisInput,
  });

  const monitoringKeys = Object.keys(monitoring) as MonitoringKey[];
  const days = monitoring[monitoringKeys[0]].map((_, i) => `D${i + 1}`);

  const chartSeries = monitoringKeys.map((key, i) => {
    const cfg = chartConfig[key];
    return {
      name: cfg.label,
      data: monitoring[key],
      color: Object.values(SOIL_COLORS)[i % 8],
    };
  });

  return (
    <div className="space-y-8">
      {/* Hero */}
      <DataCard className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h2 className="text-2xl font-serif font-bold text-ink mb-3">
              {t.heroTitle}
            </h2>
            <p className="text-ink/80 mb-4 font-sans leading-relaxed">
              El esparto <strong>({info.scientificName})</strong> es una planta
              milenaria que ha moldeado la cultura siciliana. Su fibra,
              resistente y versátil, representa un modelo de{" "}
              <strong>agricultura regenerativa y sostenible</strong>.
            </p>
            <div className="flex flex-wrap gap-3 mt-4 font-mono text-xs uppercase tracking-wider font-bold">
              {t.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-chloro/5 border border-chloro/20 text-chloro"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-8xl mb-2">{info.icon}</div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
              {t.heroSubtitle}
            </p>
          </div>
        </div>
      </DataCard>

      {/* Symbiosis */}
      <SymbiosisCard result={symbiosis} />

      {/* Info cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <DataCard className="p-6">
          <h3 className="text-lg font-serif font-bold text-ink mb-4 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-chloro" />
            {t.historyTitle}
          </h3>
          <p className="font-sans text-sm text-ink/70 leading-relaxed">
            {info.history}
          </p>
        </DataCard>

        <DataCard className="p-6">
          <h3 className="text-lg font-serif font-bold text-ink mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-chloro" />
            {t.benefitsTitle}
          </h3>
          <div className="grid grid-cols-2 gap-2 font-mono text-xs text-ink/70">
            {info.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-chloro">✓</span> {benefit}
              </div>
            ))}
          </div>
        </DataCard>

        <DataCard className="p-6">
          <h3 className="text-lg font-serif font-bold text-ink mb-4 flex items-center gap-2">
            <Scissors className="w-5 h-5 text-chloro" />
            {t.usesTitle}
          </h3>
          <div className="grid grid-cols-2 gap-2 font-mono text-xs text-ink/70">
            {info.uses.map((use, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-solar">→</span> {use}
              </div>
            ))}
          </div>
        </DataCard>

        <DataCard className="p-6">
          <h3 className="text-lg font-serif font-bold text-ink mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-solar" />
            {t.awardsTitle}
          </h3>
          <p className="font-sans text-sm text-ink/70 mb-4 leading-relaxed">
            {t.awardsDesc}
          </p>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider font-bold">
            {t.awardsBadges.map((badge, i) => (
              <span
                key={i}
                className={`px-3 py-1 border ${i === 0 ? "bg-solar/10 border-solar/20 text-solar" : "bg-chloro/10 border-chloro/20 text-chloro"}`}
              >
                {badge}
              </span>
            ))}
          </div>
        </DataCard>
      </div>

      {/* Monitoring KPIs */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif font-bold text-ink border-b border-ink/20 pb-2">
          {t.monitoringTitle}
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = KPI_ICONS[kpi.key];
            const color = KPI_COLORS[kpi.key];
            const cfg = chartConfig[kpi.key];
            return (
              <DataCard key={kpi.key} className="p-4 text-center">
                <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
                <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
                  {cfg.label} {t.avgLabel}
                </p>
                <p className="font-mono text-2xl font-bold text-ink">
                  {kpi.value}
                </p>
                <p className={`font-sans text-[10px] mt-1 ${kpi.noteColor}`}>
                  {kpi.note}
                </p>
              </DataCard>
            );
          })}
        </div>

        {/* Evolución con ECharts */}
        <DataCard className="p-6">
          <h3 className="text-lg font-serif font-bold text-ink mb-4">
            {t.chartTitle}
          </h3>
          <SoilChart
            type="spline"
            categories={days}
            series={chartSeries}
            yAxisLabel="Valor"
            height={340}
            legend
          />
          <p className="font-sans text-xs text-ink/50 mt-3 leading-relaxed">
            {t.chartNote}
          </p>
        </DataCard>
      </div>

      <YearCycleChart
        months={yearCycle.months}
        data={yearCycle.data}
        legend={yearCycle.legend}
        note={yearCycle.note}
      />

      <CycleDiagram
        stages={cycleStages}
        closingNote={cycleClosingNote}
        title={t.cycleTitle}
        subtitle={t.cycleSubtitle}
      />
    </div>
  );
}
