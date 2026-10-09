"use client";

import { ArrowLeftRight, Info } from "lucide-react";
import type { SymbiosisResult } from "@sicilia-soil/core";
import { SoilChart, SOIL_COLORS } from "@/components/features/shared";

interface SymbiosisCardProps {
  result: SymbiosisResult;
  variant?: "compact" | "full";
}

const CATEGORY_STYLES: Record<SymbiosisResult["category"], string> = {
  Establecida: "bg-emerald-50 border-emerald-200 text-emerald-800",
  "En desarrollo": "bg-yellow-50 border-yellow-200 text-yellow-800",
  Inicial: "bg-orange-50 border-orange-200 text-orange-800",
  Ausente: "bg-red-50 border-red-200 text-red-800",
};

const CATEGORY_COLOR: Record<SymbiosisResult["category"], string> = {
  Establecida: SOIL_COLORS.green,
  "En desarrollo": SOIL_COLORS.amber,
  Inicial: SOIL_COLORS.orange,
  Ausente: SOIL_COLORS.red,
};

export function SymbiosisCard({
  result,
  variant = "full",
}: SymbiosisCardProps) {
  const style = CATEGORY_STYLES[result.category];
  const barColor = CATEGORY_COLOR[result.category];

  // ---- Compact variant ----
  if (variant === "compact") {
    return (
      <div className={`rounded-xl p-4 border ${style}`}>
        <div className="flex items-center gap-2 mb-1">
          <ArrowLeftRight className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Simbiosis planta ↔ micelio
          </span>
        </div>
        <p className="text-2xl font-bold">{result.score}/100</p>
        <p className="text-xs">{result.category}</p>
      </div>
    );
  }

  // ---- Datos para el radar de indicadores ----
  const radarData = [
    result.indicators.substrateFlow,
    result.indicators.nutrientFlow,
    result.indicators.carbonFlow,
    result.indicators.structuralStability,
  ];

  // ---- Datos para el bar de hosts ----
  const hostsAmf = result.hosts.filter((h) => h.type === "AMF");
  const hostsEcm = result.hosts.filter((h) => h.type === "ECM");
  const allHosts = [...hostsAmf, ...hostsEcm];

  const hostSeries = [
    {
      name: "AMF",
      data: allHosts.map((h) =>
        h.type === "AMF" ? h.colonisation : null,
      ) as any[],
      color: SOIL_COLORS.olive,
    },
    {
      name: "ECM",
      data: allHosts.map((h) =>
        h.type === "ECM" ? h.colonisation : null,
      ) as any[],
      color: SOIL_COLORS.amber,
    },
  ];

  // ---- Full variant ----
  return (
    <div className={`rounded-2xl p-6 border shadow-sm ${style}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5" />
          <h3 className="text-lg font-bold">Simbiosis planta ↔ micelio</h3>
        </div>
        <span className="text-xs font-medium bg-white/60 px-3 py-1 rounded-full">
          Ciclo regenerativo
        </span>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-white/70 rounded-lg p-3">
          <p className="text-xs opacity-70 mb-1">Score global</p>
          <p className="text-3xl font-bold">{result.score}/100</p>
          <p className="text-[10px] opacity-60 mt-1">{result.category}</p>
        </div>
        <div className="bg-white/70 rounded-lg p-3">
          <p className="text-xs opacity-70 mb-1">Red AMF</p>
          <p className="text-2xl font-bold">{result.networks.amf}</p>
          <p className="text-[10px] opacity-60 mt-1">Arbuscular</p>
        </div>
        <div className="bg-white/70 rounded-lg p-3">
          <p className="text-xs opacity-70 mb-1">Red ECM</p>
          <p className="text-2xl font-bold">{result.networks.ecm}</p>
          <p className="text-[10px] opacity-60 mt-1">Pinos</p>
        </div>
        <div className="bg-white/70 rounded-lg p-3">
          <p className="text-xs opacity-70 mb-1">Carbono</p>
          <p className="text-2xl font-bold">{result.indicators.carbonFlow}</p>
          <p className="text-[10px] opacity-60 mt-1">Glomalina + COS</p>
        </div>
      </div>

      {/* Radar de indicadores con ECharts */}
      <div className="bg-white/40 rounded-xl p-4 mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">
          Indicadores del ciclo
        </p>
        <SoilChart
          type="radar"
          categories={["Sustrato", "Retorno", "Carbono", "Estructura"]}
          series={[
            {
              name: "Red actual",
              data: radarData,
              color: barColor,
            },
          ]}
          yAxisMax={100}
          height={300}
          legend={false}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 text-xs">
          <div className="text-center">
            <p className="opacity-60">Sustrato</p>
            <p className="font-bold">{result.indicators.substrateFlow}%</p>
          </div>
          <div className="text-center">
            <p className="opacity-60">Retorno</p>
            <p className="font-bold">{result.indicators.nutrientFlow}%</p>
          </div>
          <div className="text-center">
            <p className="opacity-60">Carbono</p>
            <p className="font-bold">{result.indicators.carbonFlow}%</p>
          </div>
          <div className="text-center">
            <p className="opacity-60">Estructura</p>
            <p className="font-bold">
              {result.indicators.structuralStability}%
            </p>
          </div>
        </div>
      </div>

      {/* Bar chart de hosts con ECharts */}
      {allHosts.length > 0 && (
        <div className="bg-white/40 rounded-xl p-4 mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">
            Colonización por huésped
          </p>
          <SoilChart
            type="bar"
            categories={allHosts.map((h) => h.name)}
            series={hostSeries}
            yAxisLabel="Colonización"
            yAxisUnit="%"
            yAxisMax={100}
            height={Math.max(220, allHosts.length * 34)}
            legend
          />
          <div className="flex items-center gap-4 mt-3 text-xs opacity-70">
            <span className="flex items-center gap-1">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: SOIL_COLORS.olive }}
              />
              AMF · Arbuscular
            </span>
            <span className="flex items-center gap-1">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: SOIL_COLORS.amber }}
              />
              ECM · Ectomicorrícica
            </span>
          </div>
        </div>
      )}

      {/* Interpretation */}
      <div className="flex items-start gap-2 bg-white/50 rounded-lg p-3 mb-3">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p className="text-sm leading-relaxed">{result.interpretation}</p>
      </div>

      {/* Mushroom note */}
      <div className="flex items-start gap-2 bg-white/40 rounded-lg p-3 border border-white/60">
        <span className="text-base flex-shrink-0">🍄</span>
        <p className="text-xs leading-relaxed italic opacity-80">
          {result.mushroomNote}
        </p>
      </div>

      {/* Footer */}
      <p className="text-[10px] opacity-50 mt-3 text-right">
        Actualizado: {new Date(result.timestamp).toLocaleDateString("es-ES")}
      </p>
    </div>
  );
}
