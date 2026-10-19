"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { calculateSymbiosisScore } from "@sicilia-soil/utils";
import { SymbiosisCard } from "@/components/features/shared";
import {
  MONITORING_ZONES,
  SOIL_CONTAMINATION,
  getRemediationProgress,
  getLocale,
} from "@sicilia-soil/core";
import { DataCard } from "@sicilia-soil/ui"; // <-- Importamos DataCard

export function SoilHealthSummary() {
  const locale = getLocale("es");
  const t = locale.content.soilHealthTabs.summary;

  const symbiosis = calculateSymbiosisScore({
    espartoHealth: 92,
    coverDensity: 78,
    soilMoisture: 69,
    mycorrhizalColonisation: 45,
    glomalin: 2.1,
    fungalDiversity: 4,
    soilRespiration: 3.2,
    cosPercent: 2.5,
    aggregateStability: 34,
    mushroomOccurrence: 2,
    mushroomSeason: "otono",
  });

  const progress = getRemediationProgress();
  const current = SOIL_CONTAMINATION.measurements.at(-1)!;
  const amfZones = MONITORING_ZONES.filter((z) => z.mycorrhizaType === "AMF");
  const avgColonisation = Math.round(
    amfZones.reduce((acc, z) => acc + z.colonisation, 0) / amfZones.length,
  );

  return (
    <div className="space-y-8">
      {/* Intro */}
      <DataCard className="p-6">
        <h2 className="text-xl font-serif font-bold text-ink mb-2">
          {t.title}
        </h2>
        <p className="font-sans text-sm text-ink/70">{t.description}</p>
      </DataCard>

      {/* 3 métricas grandes */}
      <div className="grid md:grid-cols-3 gap-4">
        <DataCard className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink/60 mb-1">
            {t.avgColonisation}
          </p>
          <p className="font-mono text-3xl font-bold text-ink">
            {avgColonisation}%
          </p>
          <p className="font-sans text-xs text-ink/50 mt-1">
            {t.inCrops.replace("{count}", String(amfZones.length))}
          </p>
        </DataCard>

        <DataCard className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink/60 mb-1">
            {t.leadReduction}
          </p>
          <p className="font-mono text-3xl font-bold text-chloro">
            −{progress.leadReduction}%
          </p>
          <p className="font-sans text-xs text-ink/50 mt-1">
            {t.leadFromTo.replace("{to}", String(current.lead))}
          </p>
        </DataCard>

        <DataCard className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink/60 mb-1">
            {t.hydroReduction}
          </p>
          <p className="font-mono text-3xl font-bold text-chloro">
            −{progress.hydrocarbonsReduction}%
          </p>
          <p className="font-sans text-xs text-ink/50 mt-1">
            {t.hydroFromTo.replace("{to}", String(current.hydrocarbons))}
          </p>
        </DataCard>
      </div>

      {/* Symbiosis */}
      <SymbiosisCard result={symbiosis} />

      {/* CTA a otros tabs */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="#" className="group">
          <DataCard className="p-4 h-full hover:bg-paper transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">♻️</span>
              <ArrowRight className="w-4 h-4 text-ink/40 group-hover:text-solar transition-colors" />
            </div>
            <p className="font-serif font-bold text-ink text-sm">
              {t.goToRemediation}
            </p>
            <p className="font-sans text-xs text-ink/60 mt-1">
              {t.goToRemediationDesc}
            </p>
          </DataCard>
        </Link>

        <Link href="#" className="group">
          <DataCard className="p-4 h-full hover:bg-paper transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🔬</span>
              <ArrowRight className="w-4 h-4 text-ink/40 group-hover:text-solar transition-colors" />
            </div>
            <p className="font-serif font-bold text-ink text-sm">
              {t.goToNetworks}
            </p>
            <p className="font-sans text-xs text-ink/60 mt-1">
              {t.goToNetworksDesc.replace(
                "{count}",
                String(MONITORING_ZONES.length),
              )}
            </p>
          </DataCard>
        </Link>

        <Link href="#" className="group">
          <DataCard className="p-4 h-full hover:bg-paper transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🍄</span>
              <ArrowRight className="w-4 h-4 text-ink/40 group-hover:text-solar transition-colors" />
            </div>
            <p className="font-serif font-bold text-ink text-sm">
              {t.goToBioindicators}
            </p>
            <p className="font-sans text-xs text-ink/60 mt-1">
              {t.goToBioindicatorsDesc}
            </p>
          </DataCard>
        </Link>
      </div>
    </div>
  );
}
