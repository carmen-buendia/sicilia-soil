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
import type { MonitoringKey } from "@sicilia-soil/core";

const KPI_ICONS: Record<string, any> = {
  moisture: Droplets,
  temperature: Thermometer,
  light: Sun,
  wind: Wind,
};

const KPI_COLORS: Record<string, string> = {
  moisture: "text-blue-500",
  temperature: "text-red-500",
  light: "text-yellow-500",
  wind: "text-gray-500",
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

  const health = getGroundCoverHealth(monitoring);

  const symbiosis = calculateSymbiosisScore({
    espartoHealth: health.status === "Excelente" ? 92 : 70,
    ...symbiosisInput,
  });

  // Prepara las series de ECharts desde monitoring
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
      <div className="bg-gradient-to-r from-oliveGreen/10 to-emerald-500/10 rounded-2xl p-6 md:p-8 border border-oliveGreen/20">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-charcoalGray mb-3">
              🌾 El Tesoro Fibroso del Mediterráneo
            </h2>
            <p className="text-charcoalGray/80 mb-4">
              El esparto <strong>({info.scientificName})</strong> es una planta
              milenaria que ha moldeado la cultura siciliana. Su fibra,
              resistente y versátil, representa un modelo de{" "}
              <strong>agricultura regenerativa y sostenible</strong>.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
                🌱 Sostenible
              </span>
              <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
                💧 Bajo consumo hídrico
              </span>
              <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
                🌍 Tradición siciliana
              </span>
              <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
                🔄 Economía circular
              </span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-8xl mb-2">{info.icon}</div>
            <p className="text-sm text-oliveGreen/60">
              Símbolo de resistencia mediterránea
            </p>
          </div>
        </div>
      </div>

      {/* Symbiosis */}
      <SymbiosisCard result={symbiosis} />

      {/* Info cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
          <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-oliveGreen" />
            Historia y tradición
          </h3>
          <p className="text-oliveGreen/70 leading-relaxed">{info.history}</p>
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
          <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-oliveGreen" />
            Beneficios
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {info.benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-oliveGreen/70"
              >
                <span className="text-green-500">✓</span>
                {benefit}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
          <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
            <Scissors className="w-5 h-5 text-oliveGreen" />
            Usos tradicionales y modernos
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {info.uses.map((use, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-oliveGreen/70"
              >
                <span className="text-wheatGold">→</span>
                {use}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-oliveGreen/5 to-emerald-500/5 rounded-2xl p-6 border border-oliveGreen/15">
          <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-wheatGold" />
            Reconocimientos
          </h3>
          <p className="text-sm text-oliveGreen/70 mb-3">
            El esparto siciliano es reconocido como patrimonio cultural
            inmaterial por la UNESCO.
          </p>
          <div className="flex items-center gap-3 text-sm">
            <span className="px-3 py-1 bg-white/50 rounded-full">
              🏆 Denominación de origen
            </span>
            <span className="px-3 py-1 bg-white/50 rounded-full">
              🌿 Producto ecológico
            </span>
          </div>
        </div>
      </div>

      {/* Monitoring KPIs */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-charcoalGray">
          📊 Monitoreo del esparto
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = KPI_ICONS[kpi.key];
            const color = KPI_COLORS[kpi.key];
            const cfg = chartConfig[kpi.key];
            return (
              <div
                key={kpi.key}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center border border-oliveGreen/15"
              >
                <Icon className={`w-8 h-8 ${color} mx-auto mb-2`} />
                <p className="text-sm text-oliveGreen/60">{cfg.label} media</p>
                <p className="text-2xl font-bold text-charcoalGray">
                  {kpi.value}
                </p>
                <p className={`text-xs ${kpi.noteColor}`}>{kpi.note}</p>
              </div>
            );
          })}
        </div>

        {/* Evolución con ECharts */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
          <h3 className="text-lg font-bold text-charcoalGray mb-4">
            Evolución de condiciones (últimos 14 días)
          </h3>
          <SoilChart
            type="spline"
            categories={days}
            series={chartSeries}
            yAxisLabel="Valor"
            height={340}
            legend
          />
          <p className="text-xs text-oliveGreen/60 mt-3">
            Series temporales de humedad, temperatura, luz y viento. La red
            micorrícica mantiene la actividad biológica incluso cuando bajan las
            condiciones ambientales.
          </p>
        </div>
      </div>

      {/* Ciclo anual del sistema (reemplaza Calendario) */}
      <YearCycleChart
        months={yearCycle.months}
        data={yearCycle.data}
        legend={yearCycle.legend}
        note={yearCycle.note}
      />

      {/* Ciclo regenerativo (reemplaza Simbiosis esparto-micelio) */}
      <CycleDiagram
        stages={cycleStages}
        closingNote={cycleClosingNote}
        title="Ciclo regenerativo del esparto"
        subtitle="De la biomasa al bioindicador, pasando por la red micorrícica"
      />
    </div>
  );
}
