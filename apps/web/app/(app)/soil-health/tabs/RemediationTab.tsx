"use client";

import {
  Recycle,
  Sprout,
  AlertTriangle,
  TrendingDown,
  FlaskConical,
} from "lucide-react";
import { SoilChart, SOIL_COLORS } from "@/components/features/shared";
import { SOIL_CONTAMINATION, getRemediationProgress } from "@sicilia-soil/core";

export function RemediationTab() {
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

  // Comparación actual vs umbral (normalizado a % del umbral)
  const pctOfThreshold = [
    {
      name: "Plomo",
      current: Math.round((current.lead / thresholds.lead) * 100),
      color: SOIL_COLORS.terracotta,
    },
    {
      name: "Cadmio",
      current: Math.round((current.cadmium / thresholds.cadmium) * 100),
      color: SOIL_COLORS.wheat,
    },
    {
      name: "Mercurio",
      current: Math.round((current.mercury / thresholds.mercury) * 100),
      color: SOIL_COLORS.stone,
    },
    {
      name: "Hidrocarburos",
      current: Math.round(
        (current.hydrocarbons / thresholds.hydrocarbons) * 100,
      ),
      color: SOIL_COLORS.oliveDark,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-red-50 rounded-2xl p-6 border border-amber-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/60 rounded-xl">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-charcoalGray mb-1">
              Contaminación histórica y biorremediación
            </h3>
            <p className="text-sm text-oliveGreen/70 mb-3">
              {strategy.affectedZone} · Inicio {strategy.startYear} · Meta{" "}
              {strategy.expectedCompletion}
            </p>
            <p className="text-sm text-charcoalGray/80">
              {strategy.description}
            </p>
          </div>
        </div>
      </div>

      {/* Progreso — 4 tarjetas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Plomo (Pb)"
          reduction={progress.leadReduction}
          from={initial.lead}
          to={current.lead}
        />
        <MetricCard
          label="Cadmio (Cd)"
          reduction={progress.cadmiumReduction}
          from={initial.cadmium}
          to={current.cadmium}
        />
        <MetricCard
          label="Mercurio (Hg)"
          reduction={progress.mercuryReduction}
          from={initial.mercury}
          to={current.mercury}
        />
        <MetricCard
          label="Hidrocarburos"
          reduction={progress.hydrocarbonsReduction}
          from={initial.hydrocarbons}
          to={current.hydrocarbons}
        />
      </div>

      {/* GRÁFICA 1 — Evolución de contaminantes */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
        <h4 className="font-bold text-charcoalGray mb-1">
          1. Evolución de contaminantes
        </h4>
        <p className="text-xs text-oliveGreen/60 mb-4">
          Niveles medidos trimestralmente vs umbral de referencia
        </p>
        <SoilChart
          type="spline"
          categories={periods}
          series={[
            {
              name: "Plomo (mg/kg)",
              data: measurements.map((m) => m.lead),
              color: SOIL_COLORS.terracotta,
            },
            {
              name: "Cadmio × 10 (mg/kg)",
              data: measurements.map((m) => m.cadmium * 10),
              color: SOIL_COLORS.wheat,
            },
            {
              name: "Hidrocarburos (mg/kg)",
              data: measurements.map((m) => m.hydrocarbons),
              color: SOIL_COLORS.stone,
            },
            {
              name: "Umbral Pb",
              data: measurements.map(() => thresholds.lead),
              color: SOIL_COLORS.red,
              type: "line",
            },
          ]}
          yAxisLabel="mg/kg"
          height={320}
          legend
        />
        <p className="text-xs text-oliveGreen/60 mt-3">
          Cadmio mostrado ×10 para visibilidad. Umbral de referencia (Pb):{" "}
          {thresholds.lead} mg/kg.
        </p>
      </div>

      {/* GRÁFICA 2 — Actual vs umbral */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
        <h4 className="font-bold text-charcoalGray mb-1">
          2. Estado actual vs umbral
        </h4>
        <p className="text-xs text-oliveGreen/60 mb-4">
          Cada contaminante expresado como % del umbral legal. 100% = en el
          límite, &lt;100% = dentro, &gt;100% = por encima
        </p>
        <SoilChart
          type="column"
          categories={pctOfThreshold.map((p) => p.name)}
          series={[
            {
              name: "Actual (% del umbral)",
              data: pctOfThreshold.map((p) => p.current),
              color: SOIL_COLORS.terracotta,
            },
            {
              name: "Umbral (100%)",
              data: pctOfThreshold.map(() => 100),
              color: SOIL_COLORS.stone,
              type: "line",
            },
          ]}
          yAxisLabel="% del umbral"
          yAxisUnit="%"
          height={280}
          legend
        />
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          {pctOfThreshold.map((p) => (
            <div
              key={p.name}
              className={`p-2 rounded-lg ${
                p.current <= 100
                  ? "bg-emerald-50 text-emerald-700"
                  : p.current <= 150
                    ? "bg-amber-50 text-amber-700"
                    : "bg-red-50 text-red-700"
              }`}
            >
              <span className="font-medium">{p.name}: </span>
              {p.current}% del umbral
            </div>
          ))}
        </div>
      </div>

      {/* GRÁFICA 3 — Progreso acumulado */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
        <h4 className="font-bold text-charcoalGray mb-1">
          3. Progreso acumulado
        </h4>
        <p className="text-xs text-oliveGreen/60 mb-4">
          Porcentaje de reducción respecto al baseline de {initial.period}
        </p>
        <SoilChart
          type="area"
          categories={periods}
          series={[
            {
              name: "Plomo reducido (%)",
              data: measurements.map((m) =>
                Math.round(((initial.lead - m.lead) / initial.lead) * 100),
              ),
              color: SOIL_COLORS.terracotta,
            },
            {
              name: "Cadmio reducido (%)",
              data: measurements.map((m) =>
                Math.round(
                  ((initial.cadmium - m.cadmium) / initial.cadmium) * 100,
                ),
              ),
              color: SOIL_COLORS.wheat,
            },
            {
              name: "Mercurio reducido (%)",
              data: measurements.map((m) =>
                Math.round(
                  ((initial.mercury - m.mercury) / initial.mercury) * 100,
                ),
              ),
              color: SOIL_COLORS.stone,
            },
            {
              name: "Hidrocarburos reducidos (%)",
              data: measurements.map((m) =>
                Math.round(
                  ((initial.hydrocarbons - m.hydrocarbons) /
                    initial.hydrocarbons) *
                    100,
                ),
              ),
              color: SOIL_COLORS.oliveDark,
            },
          ]}
          yAxisLabel="Reducción acumulada"
          yAxisUnit="%"
          yAxisMax={100}
          height={300}
          legend
        />
        <p className="text-xs text-oliveGreen/60 mt-3">
          Al ritmo actual, se espera alcanzar el umbral de Pb en{" "}
          {strategy.expectedCompletion}.
        </p>
      </div>

      {/* GRÁFICA 4 — Salud del suelo (solo si hay datos) */}
      {soilHealth.length > 0 && (
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
          <h4 className="font-bold text-charcoalGray mb-1 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-oliveGreen" />
            4. Salud del suelo en la zona contaminada
          </h4>
          <p className="text-xs text-oliveGreen/60 mb-4">
            El pH, la biomasa fúngica y la colonización micorrícica son los
            motores de la biorremediación
          </p>
          <SoilChart
            type="spline"
            categories={soilHealth.map((s) => s.period)}
            series={[
              {
                name: "Biomasa fúngica (µg/g)",
                data: soilHealth.map((s) => s.fungalBiomass),
                color: SOIL_COLORS.olive,
                yAxis: 0,
              },
              {
                name: "Glomalina × 10 (mg/g)",
                data: soilHealth.map((s) => s.glomalin * 10),
                color: SOIL_COLORS.green,
                yAxis: 0,
              },
              {
                name: "Colonización AMF (%)",
                data: soilHealth.map((s) => s.mycorrhizalColonisation),
                color: SOIL_COLORS.oliveDark,
                yAxis: 1,
              },
              {
                name: "pH × 10",
                data: soilHealth.map((s) => s.ph * 10),
                color: SOIL_COLORS.wheat,
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
          <p className="text-xs text-oliveGreen/60 mt-3">
            La biomasa fúngica sube de 18 a 38 µg/g, la glomalina de 0.8 a 1.7
            mg/g y la colonización AMF del 15 al 38%. El pH se acerca a neutro,
            lo que reduce la movilidad de metales pesados.
          </p>
        </div>
      )}

      {/* Estrategia */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
          <h4 className="font-bold text-charcoalGray mb-3 flex items-center gap-2">
            <Recycle className="w-5 h-5 text-oliveGreen" />
            Hongos biorremediadores
          </h4>
          <ul className="space-y-2 text-sm text-oliveGreen/70">
            {strategy.fungi.map((fungus) => (
              <li key={fungus} className="flex items-center gap-2">
                <span className="text-lg">🍄</span>
                <em>{fungus}</em>
              </li>
            ))}
          </ul>
          <p className="text-xs text-oliveGreen/60 mt-3">
            Los hongos saprófitos y micorrícicos acumulan metales pesados en su
            biomasa y degradan hidrocarburos por vías enzimáticas.
          </p>
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
          <h4 className="font-bold text-charcoalGray mb-3 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-oliveGreen" />
            Plantas fitorremediadoras
          </h4>
          <ul className="space-y-2 text-sm text-oliveGreen/70">
            {strategy.plants.map((plant) => (
              <li key={plant} className="flex items-center gap-2">
                <span className="text-lg">🌱</span>
                {plant}
              </li>
            ))}
          </ul>
          <p className="text-xs text-oliveGreen/60 mt-3">
            El esparto retiene el suelo, la mostaza bioacumula metales y el
            girasol extrae plomo y cadmio del perfil superficial.
          </p>
        </div>
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
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-oliveGreen/15">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs text-oliveGreen/60">{label}</span>
        <TrendingDown className="w-4 h-4 text-emerald-600" />
      </div>
      <p className="text-2xl font-bold text-emerald-700">−{reduction}%</p>
      <p className="text-xs text-oliveGreen/60 mt-1">
        de {from} a {to} mg/kg
      </p>
    </div>
  );
}
