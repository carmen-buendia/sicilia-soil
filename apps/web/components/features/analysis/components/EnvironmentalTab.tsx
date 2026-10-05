"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Activity, Droplets, Wind } from "lucide-react";
import type {
  HeavyMetal,
  AirQuality,
  WaterQuality,
  SoilQuality,
} from "@/lib/data/ambientalData";
import { MetricCard } from "./MetricCard";
import { EnvironmentalTable } from "./EnvironmentalTable";
import { createEnvChart } from "../utils/chartConfigs";

interface EnvironmentalTabProps {
  heavyMetals: HeavyMetal[];
  airQuality: AirQuality[];
  waterQuality: WaterQuality[];
  soilQuality: SoilQuality[];
}

export function EnvironmentalTab({
  heavyMetals,
  airQuality,
  waterQuality,
  soilQuality,
}: EnvironmentalTabProps) {
  const lead = heavyMetals.find((m) => m.id === "pb");
  const co2 = airQuality.find((a) => a.id === "co2");
  const ph = waterQuality.find((w) => w.id === "ph");
  const moisture = soilQuality.find((s) => s.id === "moisture");

  const heavyMetalsChart = createEnvChart(
    "Metales pesados vs umbrales",
    heavyMetals.map((m) => ({
      name: m.symbol,
      value: m.value,
      threshold: m.threshold,
    })),
    "µg/L",
    "#e74c3c",
  );

  const airQualityChart = createEnvChart(
    "Calidad del aire vs umbrales",
    airQuality.map((a) => ({
      name: a.name,
      value: a.value,
      threshold: a.threshold,
    })),
    "µg/m³",
    "#3498db",
  );

  const waterQualityChart = createEnvChart(
    "Calidad del agua vs umbrales",
    waterQuality.map((w) => ({
      name: w.name,
      value: w.value,
      threshold: w.threshold,
    })),
    "unidades",
    "#2ecc71",
  );

  const soilQualityChart = createEnvChart(
    "Calidad del suelo vs umbrales",
    soilQuality.map((s) => ({
      name: s.name,
      value: s.value,
      threshold: s.threshold,
    })),
    "unidades",
    "#f39c12",
  );

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {lead && (
          <MetricCard
            icon={Activity}
            title="Metales pesados (Pb)"
            value={lead.value}
            unit="µg/L"
            status={lead.status}
            threshold={lead.threshold}
          />
        )}
        {co2 && (
          <MetricCard
            icon={Wind}
            title="CO₂ en aire"
            value={co2.value}
            unit="ppm"
            status={co2.status}
            threshold={co2.threshold}
          />
        )}
        {ph && (
          <MetricCard
            icon={Droplets}
            title="pH agua"
            value={ph.value}
            unit="pH"
            status={ph.status}
            threshold={ph.threshold}
          />
        )}
        {moisture && (
          <MetricCard
            icon={Droplets}
            title="Humedad suelo"
            value={moisture.value}
            unit="%"
            status={moisture.status}
            threshold={moisture.threshold}
          />
        )}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
          <HighchartsReact highcharts={Highcharts} options={heavyMetalsChart} />
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
          <HighchartsReact highcharts={Highcharts} options={airQualityChart} />
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
          <HighchartsReact
            highcharts={Highcharts}
            options={waterQualityChart}
          />
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
          <HighchartsReact highcharts={Highcharts} options={soilQualityChart} />
        </div>
      </div>

      {/* Table */}
      <EnvironmentalTable
        heavyMetals={heavyMetals}
        airQuality={airQuality}
        waterQuality={waterQuality}
        soilQuality={soilQuality}
      />

      {/* Legend */}
      <div className="bg-gradient-to-r from-red-50 via-yellow-50 to-green-50 rounded-xl p-4 border border-oliveGreen/10 flex flex-wrap items-center gap-4 text-xs">
        <span className="font-medium text-charcoalGray">
          Niveles de riesgo:
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-500"></span> Bajo
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span> Moderado
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-500"></span> Alto
        </span>
        <span className="text-oliveGreen/50 ml-auto">
          Basado en umbrales de referencia
        </span>
      </div>
    </div>
  );
}
