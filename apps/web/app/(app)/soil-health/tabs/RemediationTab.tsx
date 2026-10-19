"use client";

import {
  Recycle,
  Sprout,
  AlertTriangle,
  TrendingDown,
  FlaskConical,
} from "lucide-react";
import { SoilChart, SOIL_COLORS } from "@/components/features/shared";
import {
  SOIL_CONTAMINATION,
  getRemediationProgress,
  getLocale,
} from "@sicilia-soil/core";
import { DataCard } from "@sicilia-soil/ui"; // <-- Importamos el wrapper

export function RemediationTab() {
  const locale = getLocale("es");
  const t = locale.content.soilHealthTabs.remediation;

  const progress = getRemediationProgress();
  const {
    measurements,
    thresholds,
    strategy,
    soilHealth = [],
  } = SOIL_CONTAMINATION;

  const periods = measurements.map((m) => m.period);
  const current = measurements[measurements.length - 1];
  const initial = measurements[0];

  const pctOfThreshold = [
    {
      name: t.lead,
      current: Math.round((current.lead / thresholds.lead) * 100),
      color: SOIL_COLORS.chloro,
    },
    {
      name: t.cadmium,
      current: Math.round((current.cadmium / thresholds.cadmium) * 100),
      color: SOIL_COLORS.solar,
    },
    {
      name: t.mercury,
      current: Math.round((current.mercury / thresholds.mercury) * 100),
      color: SOIL_COLORS.stone,
    },
    {
      name: t.hydrocarbons,
      current: Math.round(
        (current.hydrocarbons / thresholds.hydrocarbons) * 100,
      ),
      color: SOIL_COLORS.ink,
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
            {strategy.affectedZone} · {t.startYear} {strategy.startYear} ·{" "}
            {t.expectedCompletion} {strategy.expectedCompletion}
          </p>
          <p className="font-sans text-sm text-ink/80">
            {strategy.description}
          </p>
        </div>
      </DataCard>

      {/* Progreso — 4 tarjetas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label={t.lead}
          reduction={progress.leadReduction}
          from={initial.lead}
          to={current.lead}
        />
        <MetricCard
          label={t.cadmium}
          reduction={progress.cadmiumReduction}
          from={initial.cadmium}
          to={current.cadmium}
        />
        <MetricCard
          label={t.mercury}
          reduction={progress.mercuryReduction}
          from={initial.mercury}
          to={current.mercury}
        />
        <MetricCard
          label={t.hydrocarbons}
          reduction={progress.hydrocarbonsReduction}
          from={initial.hydrocarbons}
          to={current.hydrocarbons}
        />
      </div>

      {/* GRÁFICA 1 — Evolución de contaminantes */}
      <DataCard className="p-6">
        <h4 className="font-serif font-bold text-ink mb-1">{t.chart1Title}</h4>
        <p className="font-mono text-xs text-ink/60 mb-4">{t.chart1Desc}</p>
        <SoilChart
          type="spline"
          categories={periods}
          series={[
            {
              name: t.series.lead,
              data: measurements.map((m) => m.lead),
              color: SOIL_COLORS.chloro,
            },
            {
              name: t.series.cadmium,
              data: measurements.map((m) => m.cadmium * 10),
              color: SOIL_COLORS.solar,
            },
            {
              name: t.series.hydrocarbons,
              data: measurements.map((m) => m.hydrocarbons),
              color: SOIL_COLORS.stone,
            },
            {
              name: t.series.leadThreshold,
              data: measurements.map(() => thresholds.lead),
              color: SOIL_COLORS.red,
              type: "line",
            },
          ]}
          yAxisLabel="mg/kg"
          height={320}
          legend
        />
        <p className="font-sans text-xs text-ink/50 mt-4 pt-3 border-t border-ink/10">
          {t.chart1Note.replace("{lead}", String(thresholds.lead))}
        </p>
      </DataCard>

      {/* GRÁFICA 2 — Actual vs umbral */}
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
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-xs">
          {pctOfThreshold.map((p) => (
            <div
              key={p.name}
              className={`p-2 border ${p.current <= 100 ? "bg-chloro/5 border-chloro/20 text-chloro" : "bg-solar/5 border-solar/20 text-solar"}`}
            >
              <span className="font-bold">{p.name}: </span>
              {p.current}%
            </div>
          ))}
        </div>
      </DataCard>

      {/* GRÁFICA 3 — Progreso acumulado */}
      <DataCard className="p-6">
        <h4 className="font-serif font-bold text-ink mb-1">{t.chart3Title}</h4>
        <p className="font-mono text-xs text-ink/60 mb-4">
          {t.chart3Desc.replace("{period}", initial.period)}
        </p>
        <SoilChart
          type="area"
          categories={periods}
          series={[
            {
              name: t.series.leadReduced,
              data: measurements.map((m) =>
                Math.round(((initial.lead - m.lead) / initial.lead) * 100),
              ),
              color: SOIL_COLORS.chloro,
            },
            {
              name: t.series.cadmiumReduced,
              data: measurements.map((m) =>
                Math.round(
                  ((initial.cadmium - m.cadmium) / initial.cadmium) * 100,
                ),
              ),
              color: SOIL_COLORS.solar,
            },
            {
              name: t.series.mercuryReduced,
              data: measurements.map((m) =>
                Math.round(
                  ((initial.mercury - m.mercury) / initial.mercury) * 100,
                ),
              ),
              color: SOIL_COLORS.stone,
            },
            {
              name: t.series.hydrocarbonsReduced,
              data: measurements.map((m) =>
                Math.round(
                  ((initial.hydrocarbons - m.hydrocarbons) /
                    initial.hydrocarbons) *
                    100,
                ),
              ),
              color: SOIL_COLORS.ink,
            },
          ]}
          yAxisLabel="%"
          yAxisUnit="%"
          yAxisMax={100}
          height={300}
          legend
        />
        <p className="font-sans text-xs text-ink/50 mt-4 pt-3 border-t border-ink/10">
          {t.chart3Note.replace("{date}", strategy.expectedCompletion)}
        </p>
      </DataCard>

      {/* GRÁFICA 4 — Salud del suelo */}
      {soilHealth.length > 0 && (
        <DataCard className="p-6">
          <h4 className="font-serif font-bold text-ink mb-1 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-chloro" /> {t.chart4Title}
          </h4>
          <p className="font-mono text-xs text-ink/60 mb-4">{t.chart4Desc}</p>
          <SoilChart
            type="spline"
            categories={soilHealth.map((s) => s.period)}
            series={[
              {
                name: t.series.fungalBiomass,
                data: soilHealth.map((s) => s.fungalBiomass),
                color: SOIL_COLORS.chloro,
                yAxis: 0,
              },
              {
                name: t.series.glomalin,
                data: soilHealth.map((s) => s.glomalin * 10),
                color: SOIL_COLORS.solar,
                yAxis: 0,
              },
              {
                name: t.series.amfColonisation,
                data: soilHealth.map((s) => s.mycorrhizalColonisation),
                color: SOIL_COLORS.ink,
                yAxis: 1,
              },
              {
                name: t.series.ph,
                data: soilHealth.map((s) => s.ph * 10),
                color: SOIL_COLORS.stone,
                yAxis: 0,
              },
            ]}
            yAxisLabel="Biomasa / Glomalina / pH"
            secondaryYAxis={{
              label: "Colonización",
              unit: "%",
              opposite: true,
            }}
            height={320}
            legend
          />
          <p className="font-sans text-xs text-ink/50 mt-4 pt-3 border-t border-ink/10">
            {t.chart4Note}
          </p>
        </DataCard>
      )}

      {/* Estrategia */}
      <div className="grid md:grid-cols-2 gap-4">
        <DataCard className="p-6">
          <h4 className="font-serif font-bold text-ink mb-4 flex items-center gap-2">
            <Recycle className="w-5 h-5 text-chloro" /> {t.fungiTitle}
          </h4>
          <ul className="space-y-2 font-mono text-xs text-ink/70 mb-4">
            {strategy.fungi.map((fungus) => (
              <li key={fungus} className="flex items-center gap-2">
                <span className="text-base">🍄</span> <em>{fungus}</em>
              </li>
            ))}
          </ul>
          <p className="font-sans text-xs text-ink/50 leading-relaxed">
            {t.fungiDesc}
          </p>
        </DataCard>

        <DataCard className="p-6">
          <h4 className="font-serif font-bold text-ink mb-4 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-chloro" /> {t.plantsTitle}
          </h4>
          <ul className="space-y-2 font-mono text-xs text-ink/70 mb-4">
            {strategy.plants.map((plant) => (
              <li key={plant} className="flex items-center gap-2">
                <span className="text-base">🌱</span> {plant}
              </li>
            ))}
          </ul>
          <p className="font-sans text-xs text-ink/50 leading-relaxed">
            {t.plantsDesc}
          </p>
        </DataCard>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  reduction,
  from,
  to,
}: {
  label: string;
  reduction: number;
  from: number;
  to: number;
}) {
  return (
    <DataCard
      variant="bare"
      className="bg-card border border-ink/20 p-5 flex flex-col"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink/60">
          {label}
        </span>
        <TrendingDown className="w-4 h-4 text-chloro" />
      </div>
      <p className="font-mono text-2xl font-bold text-chloro">−{reduction}%</p>
      <p className="font-sans text-[10px] text-ink/50 mt-1">
        de {from} a {to} mg/kg
      </p>
    </DataCard>
  );
}
