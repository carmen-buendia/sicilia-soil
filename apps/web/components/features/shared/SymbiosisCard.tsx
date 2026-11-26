// apps/web/components/features/shared/SymbiosisCard.tsx
"use client";

import { ArrowLeftRight, Info } from "lucide-react";
import type { SymbiosisResult } from "@sicilia-soil/core";
import { getLocale } from "@sicilia-soil/core";
import { DataCard } from "@sicilia-soil/ui";

import { SoilChart, SOIL_COLORS } from "@/components/features/shared/SoilChart";

const locale = getLocale("es");
const symbiosisContent = locale.ui.symbiosis;

const CATEGORY_STYLES: Record<string, string> = {
  Establecida: "border-chloro/30 text-chloro bg-chloro/5",
  "En desarrollo": "border-solar/30 text-solar bg-solar/5",
  Inicial: "border-amber-500/30 text-amber-600 bg-amber-500/5",
  Ausente: "border-red-500/30 text-red-600 bg-red-500/5",
};
const DEFAULT_CATEGORY_STYLE = "border-ink/20 text-ink bg-paper";

const CATEGORY_COLORS: Record<string, string> = {
  Establecida: SOIL_COLORS.chloro,
  "En desarrollo": SOIL_COLORS.solar,
  Inicial: SOIL_COLORS.ink,
  Ausente: SOIL_COLORS.red,
};
const DEFAULT_CATEGORY_COLOR = SOIL_COLORS.stone;

interface SymbiosisCardProps {
  result: SymbiosisResult;
  variant?: "compact" | "full";
}

export function SymbiosisCard({
  result,
  variant = "full",
}: SymbiosisCardProps) {
  const style = CATEGORY_STYLES[result.category] ?? DEFAULT_CATEGORY_STYLE;
  const barColor = CATEGORY_COLORS[result.category] ?? DEFAULT_CATEGORY_COLOR;

  if (variant === "compact") {
    return (
      <DataCard className={`p-4 ${style}`}>
        <div className="flex items-center gap-2 mb-2">
          <ArrowLeftRight className="w-4 h-4" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
            {symbiosisContent.title}
          </span>
        </div>
        <p className="font-mono text-2xl font-bold">{result.score}/100</p>
        <p className="font-sans text-xs mt-1">{result.category}</p>
      </DataCard>
    );
  }

  const radarData = [
    result.indicators.substrateFlow,
    result.indicators.nutrientFlow,
    result.indicators.carbonFlow,
    result.indicators.structuralStability,
  ];

  const hostsAmf = result.hosts.filter((h) => h.type === "AMF");
  const hostsEcm = result.hosts.filter((h) => h.type === "ECM");
  const allHosts = [...hostsAmf, ...hostsEcm];

  const hostSeries = [
    {
      name: "AMF",
      data: allHosts.map((h) => (h.type === "AMF" ? h.colonisation : null)),
      color: SOIL_COLORS.chloro,
    },
    {
      name: "ECM",
      data: allHosts.map((h) => (h.type === "ECM" ? h.colonisation : null)),
      color: SOIL_COLORS.solar,
    },
  ];

  return (
    <DataCard className="p-0 flex flex-col bg-card">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between p-5 border-b border-ink/10 bg-paper/50 gap-4">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-ink/60" />
          <h3 className="text-xl font-serif font-bold text-ink">
            {symbiosisContent.title}
          </h3>
        </div>
        <span
          className={`font-mono text-[10px] uppercase tracking-widest font-bold px-2 py-1 border ${style}`}
        >
          {symbiosisContent.badge}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-ink/10 border-b border-ink/10">
        <div className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
            {symbiosisContent.score}
          </p>
          <p className="font-mono text-3xl font-bold text-ink">
            {result.score}/100
          </p>
          <p
            className={`font-sans text-xs mt-1 font-bold ${style.split(" ")[1]}`}
          >
            {result.category}
          </p>
        </div>
        <div className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
            {symbiosisContent.networkAmf}
          </p>
          <p className="font-mono text-2xl font-bold text-ink">
            {result.networks.amf}
          </p>
          <p className="font-sans text-xs text-ink/60 mt-1">
            {symbiosisContent.networkAmfSub}
          </p>
        </div>
        <div className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
            {symbiosisContent.networkEcm}
          </p>
          <p className="font-mono text-2xl font-bold text-ink">
            {result.networks.ecm}
          </p>
          <p className="font-sans text-xs text-ink/60 mt-1">
            {symbiosisContent.networkEcmSub}
          </p>
        </div>
        <div className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
            {symbiosisContent.carbon}
          </p>
          <p className="font-mono text-2xl font-bold text-ink">
            {result.indicators.carbonFlow}
          </p>
          <p className="font-sans text-xs text-ink/60 mt-1">
            {symbiosisContent.carbonSub}
          </p>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Radar */}
        <div className="border border-ink/10 bg-paper/30 p-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/60 mb-4 border-b border-ink/10 pb-2">
            {symbiosisContent.radarTitle}
          </p>
          <SoilChart
            type="radar"
            categories={[
              symbiosisContent.radarSubstrate,
              symbiosisContent.radarReturn,
              symbiosisContent.radarCarbon,
              symbiosisContent.radarStructure,
            ]}
            series={[{ name: "Red actual", data: radarData, color: barColor }]}
            yAxisMax={100}
            height={280}
            legend={false}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 font-mono text-xs border-t border-ink/10 pt-4">
            <div className="text-center">
              <p className="text-ink/50 uppercase tracking-wider mb-1 text-[10px]">
                {symbiosisContent.radarSubstrate}
              </p>
              <p className="font-bold text-ink">
                {result.indicators.substrateFlow}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-ink/50 uppercase tracking-wider mb-1 text-[10px]">
                {symbiosisContent.radarReturn}
              </p>
              <p className="font-bold text-ink">
                {result.indicators.nutrientFlow}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-ink/50 uppercase tracking-wider mb-1 text-[10px]">
                {symbiosisContent.radarCarbon}
              </p>
              <p className="font-bold text-ink">
                {result.indicators.carbonFlow}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-ink/50 uppercase tracking-wider mb-1 text-[10px]">
                {symbiosisContent.radarStructure}
              </p>
              <p className="font-bold text-ink">
                {result.indicators.structuralStability}%
              </p>
            </div>
          </div>
        </div>

        {allHosts.length > 0 && (
          <div className="border border-ink/10 bg-paper/30 p-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/60 mb-4 border-b border-ink/10 pb-2">
              {symbiosisContent.hostsTitle}
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
            <div className="flex items-center gap-6 mt-4 font-mono text-[10px] uppercase tracking-wider text-ink/60">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-chloro" />
                {symbiosisContent.hostsAmf}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-solar" />
                {symbiosisContent.hostsEcm}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-ink/10 bg-paper/30 p-5 space-y-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-ink/40 shrink-0 mt-0.5" />
          <p className="font-sans text-sm text-ink/80 leading-relaxed">
            {result.interpretation}
          </p>
        </div>

        <div className="flex items-start gap-3 border-l-2 border-solar/50 pl-3 py-1">
          <span className="text-base shrink-0">🍄</span>
          <p className="font-serif text-sm italic text-ink/70 leading-relaxed">
            {result.mushroomNote}
          </p>
        </div>

        <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40 text-right mt-2 pt-2 border-t border-ink/10">
          {symbiosisContent.updated}:{" "}
          {new Date(result.timestamp).toLocaleDateString("es-ES")}
        </p>
      </div>
    </DataCard>
  );
}
