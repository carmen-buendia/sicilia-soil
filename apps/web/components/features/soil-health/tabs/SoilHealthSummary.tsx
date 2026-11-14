// apps/web/components/features/soil-health/tabs/SoilHealthSummary.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { calculateSymbiosisScore } from "@sicilia-soil/utils";
import { SymbiosisCard } from "@/components/features/shared";
import type { CropSystem } from "@sicilia-soil/core";
import { getLocale } from "@sicilia-soil/core";
import { DataCard } from "@sicilia-soil/ui";

const locale = getLocale("es");
const summaryContent = locale.content.soilHealthTabs.summary;

export function SoilHealthSummary({ systems }: { systems: CropSystem[] }) {
  const totalSystems = systems.length;

  if (totalSystems === 0) {
    return (
      <DataCard className="p-12 text-center border-dashed border-ink/20">
        <p className="font-mono text-sm text-ink/50">
          {summaryContent.empty}
        </p>
      </DataCard>
    );
  }

  const avgAmf = Math.round(systems.reduce((acc, s) => acc + (s.metrics.amf ?? 0), 0) / totalSystems);
  const avgShi = Math.round(systems.reduce((acc, s) => acc + (s.metrics.shi ?? 0), 0) / totalSystems);
  const avgMoisture = Math.round(systems.reduce((acc, s) => acc + (s.metrics.moisture ?? 0), 0) / totalSystems);
  const avgGlomalin = Number((systems.reduce((acc, s) => acc + (s.metrics.glomalin ?? 0), 0) / totalSystems).toFixed(1));

  const lead = systems[0]?.metrics.lead ?? 0;
  const hydrocarbons = systems[0]?.metrics.hydrocarbons ?? 0;

  const symbiosis = calculateSymbiosisScore({
    espartoHealth: avgShi,
    coverDensity: 78,
    soilMoisture: avgMoisture,
    mycorrhizalColonisation: avgAmf,
    glomalin: avgGlomalin,
    fungalDiversity: 4,
    soilRespiration: 3.2,
    cosPercent: 2.5,
    aggregateStability: 34,
    mushroomOccurrence: 2,
    mushroomSeason: "otono",
  });

  return (
    <div className="space-y-8">
      <DataCard className="p-6">
        <h2 className="text-xl font-serif font-bold text-ink mb-2">{summaryContent.title}</h2>
        <p className="font-sans text-sm text-ink/70">{summaryContent.description}</p>
      </DataCard>

      <div className="grid md:grid-cols-3 gap-4">
        <DataCard className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink/60 mb-1">{summaryContent.avgColonisation}</p>
          <p className="font-mono text-3xl font-bold text-ink">{avgAmf}%</p>
          <p className="font-sans text-xs text-ink/50 mt-1">
            {summaryContent.inCrops.replace("{count}", String(totalSystems))}
          </p>
        </DataCard>

        <DataCard className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink/60 mb-1">{summaryContent.leadReduction}</p>
          <p className="font-mono text-3xl font-bold text-chloro">
            {lead > 0 ? `−${Math.round(lead)}%` : "—"}
          </p>
          <p className="font-sans text-xs text-ink/50 mt-1">
            {lead > 0 ? summaryContent.leadFromTo.replace("{to}", String(lead)) : summaryContent.noLeadData}
          </p>
        </DataCard>

        <DataCard className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink/60 mb-1">{summaryContent.hydroReduction}</p>
          <p className="font-mono text-3xl font-bold text-chloro">
            {hydrocarbons > 0 ? `−${Math.round(hydrocarbons)}%` : "—"}
          </p>
          <p className="font-sans text-xs text-ink/50 mt-1">
            {hydrocarbons > 0 ? summaryContent.hydroFromTo.replace("{to}", String(hydrocarbons)) : summaryContent.noHydroData}
          </p>
        </DataCard>
      </div>

      <SymbiosisCard result={symbiosis} />

      <div className="grid md:grid-cols-3 gap-4">
        <Link href="#" className="group">
          <DataCard className="p-4 h-full hover:bg-paper transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">♻️</span>
              <ArrowRight className="w-4 h-4 text-ink/40 group-hover:text-solar transition-colors" />
            </div>
            <p className="font-serif font-bold text-ink text-sm">{summaryContent.goToRemediation}</p>
            <p className="font-sans text-xs text-ink/60 mt-1">{summaryContent.goToRemediationDesc}</p>
          </DataCard>
        </Link>

        <Link href="#" className="group">
          <DataCard className="p-4 h-full hover:bg-paper transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🔬</span>
              <ArrowRight className="w-4 h-4 text-ink/40 group-hover:text-solar transition-colors" />
            </div>
            <p className="font-serif font-bold text-ink text-sm">{summaryContent.goToNetworks}</p>
            <p className="font-sans text-xs text-ink/60 mt-1">
              {summaryContent.goToNetworksDesc.replace("{count}", String(totalSystems))}
            </p>
          </DataCard>
        </Link>

        <Link href="#" className="group">
          <DataCard className="p-4 h-full hover:bg-paper transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🍄</span>
              <ArrowRight className="w-4 h-4 text-ink/40 group-hover:text-solar transition-colors" />
            </div>
            <p className="font-serif font-bold text-ink text-sm">{summaryContent.goToBioindicators}</p>
            <p className="font-sans text-xs text-ink/60 mt-1">{summaryContent.goToBioindicatorsDesc}</p>
          </DataCard>
        </Link>
      </div>
    </div>
  );
}