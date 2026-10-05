"use client";

import { ArrowLeftRight, Sparkles, Info } from "lucide-react";
import type { SymbiosisResult } from "@sicilia-soil/core";

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

const BAR_COLORS: Record<SymbiosisResult["category"], string> = {
  Establecida: "#10b981",
  "En desarrollo": "#eab308",
  Inicial: "#f97316",
  Ausente: "#ef4444",
};

export function SymbiosisCard({
  result,
  variant = "full",
}: SymbiosisCardProps) {
  const style = CATEGORY_STYLES[result.category];
  const barColor = BAR_COLORS[result.category];

  // ---- Compact variant ----
  if (variant === "compact") {
    return (
      <div className={`rounded-xl p-4 border ${style}`}>
        <div className="flex items-center gap-2 mb-1">
          <ArrowLeftRight className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Simbiosis esparto ↔ micelio
          </span>
        </div>
        <p className="text-2xl font-bold">{result.score}/100</p>
        <p className="text-xs">{result.category}</p>
      </div>
    );
  }

  // ---- Full variant ----
  return (
    <div className={`rounded-2xl p-6 border shadow-sm ${style}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5" />
          <h3 className="text-lg font-bold">Simbiosis esparto ↔ micelio</h3>
        </div>
        <span className="text-xs font-medium bg-white/60 px-3 py-1 rounded-full">
          Indicador integrado T2+T3
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
          <p className="text-xs opacity-70 mb-1">Esparto → Micelio</p>
          <p className="text-2xl font-bold">
            {result.indicators.espartoToMycelium}
          </p>
          <p className="text-[10px] opacity-60 mt-1">Aporte de sustrato</p>
        </div>
        <div className="bg-white/70 rounded-lg p-3">
          <p className="text-xs opacity-70 mb-1">Micelio → Esparto</p>
          <p className="text-2xl font-bold">
            {result.indicators.myceliumToEsparto}
          </p>
          <p className="text-[10px] opacity-60 mt-1">Agua + nutrientes</p>
        </div>
        <div className="bg-white/70 rounded-lg p-3">
          <p className="text-xs opacity-70 mb-1">Captura C</p>
          <p className="text-2xl font-bold">{result.indicators.carbonFlow}</p>
          <p className="text-[10px] opacity-60 mt-1">COS del ciclo</p>
        </div>
      </div>

      {/* Progress bars */}
      <div className="space-y-2 mb-4">
        <ProgressBar
          label="Flujo esparto → micelio"
          value={result.indicators.espartoToMycelium}
          color={barColor}
        />
        <ProgressBar
          label="Flujo micelio → esparto"
          value={result.indicators.myceliumToEsparto}
          color={barColor}
        />
        <ProgressBar
          label="Captura de carbono"
          value={result.indicators.carbonFlow}
          color={barColor}
        />
      </div>

      {/* Interpretation */}
      <div className="flex items-start gap-2 bg-white/50 rounded-lg p-3">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p className="text-sm leading-relaxed">{result.interpretation}</p>
      </div>

      {/* Footer */}
      <p className="text-[10px] opacity-50 mt-3 text-right">
        Actualizado: {new Date(result.timestamp).toLocaleDateString("es-ES")}
      </p>
    </div>
  );
}

// ---- Progress bar helper ----
function ProgressBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="opacity-70">{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="w-full h-1.5 bg-white/50 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  );
}
