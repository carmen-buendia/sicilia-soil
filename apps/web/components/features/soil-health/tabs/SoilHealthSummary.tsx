// apps/web/components/features/soil-health/tabs/SoilHealthSummary.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { calculateSymbiosisScore } from "@sicilia-soil/utils";
import { SymbiosisCard } from "@/components/features/shared";
import type { CropSystem } from "@sicilia-soil/core";
import { getLocale } from "@sicilia-soil/core";
import { DataCard } from "@sicilia-soil/ui";

export function SoilHealthSummary({ systems }: { systems: CropSystem[] }) {
  const locale = getLocale("es");
  const t = locale.content.soilHealthTabs.summary;

  const totalSystems = systems.length;

  if (totalSystems === 0) {
    return (
      <DataCard className="p-12 text-center border-dashed border-ink/20">
        <p className="font-mono text-sm text-ink/50">
          No hay sistemas registrados. Añade un cultivo en el CRUD para ver el
          resumen de salud del suelo.
        </p>
      </DataCard>
    );
  }

  // 1. Calculamos las medias de las métricas de los sistemas
  const avgAmf = Math.round(
    systems.reduce((acc, s) => acc + (s.metrics.amf ?? 0), 0) / totalSystems,
  );
  const avgShi = Math.round(
    systems.reduce((acc, s) => acc + (s.metrics.shi ?? 0), 0) / totalSystems,
  );
  const avgMoisture = Math.round(
    systems.reduce((acc, s) => acc + (s.metrics.moisture ?? 0), 0) /
      totalSystems,
  );
  const avgGlomalin = Number(
    (
      systems.reduce((acc, s) => acc + (s.metrics.glomalin ?? 0), 0) /
      totalSystems
    ).toFixed(1),
  );

  // 2. Buscamos datos de remediación (si el usuario los ha registrado en algún sistema)
  const lead = systems[0]?.metrics.lead ?? 0;
  const hydrocarbons = systems[0]?.metrics.hydrocarbons ?? 0;

  // 3. Calculamos el índice de simbiosis con los datos reales
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
          <p className="font-mono text-3xl font-bold text-ink">{avgAmf}%</p>
          <p className="font-sans text-xs text-ink/50 mt-1">
            {t.inCrops.replace("{count}", String(totalSystems))}
          </p>
        </DataCard>

        <DataCard className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink/60 mb-1">
            {t.leadReduction}
          </p>
          <p className="font-mono text-3xl font-bold text-chloro">
            {lead > 0 ? `−${Math.round(lead)}%` : "—"}
          </p>
          <p className="font-sans text-xs text-ink/50 mt-1">
            {lead > 0
              ? t.leadFromTo.replace("{to}", String(lead))
              : "Sin datos de plomo"}
          </p>
        </DataCard>

        <DataCard className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink/60 mb-1">
            {t.hydroReduction}
          </p>
          <p className="font-mono text-3xl font-bold text-chloro">
            {hydrocarbons > 0 ? `−${Math.round(hydrocarbons)}%` : "—"}
          </p>
          <p className="font-sans text-xs text-ink/50 mt-1">
            {hydrocarbons > 0
              ? t.hydroFromTo.replace("{to}", String(hydrocarbons))
              : "Sin datos de hidrocarburos"}
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
              {t.goToNetworksDesc.replace("{count}", String(totalSystems))}
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
