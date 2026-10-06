"use client";

import Link from "next/link";
import { ArrowRight, TrendingDown } from "lucide-react";
import { calculateSymbiosisScore } from "@sicilia-soil/utils";
import { SymbiosisCard } from "@/components/features/shared";
import {
  MONITORING_ZONES,
  SOIL_CONTAMINATION,
  getRemediationProgress,
} from "@sicilia-soil/core";

export function SoilHealthSummary() {
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
  const avgColonisation = Math.round(
    MONITORING_ZONES.filter((z) => z.mycorrhizaType === "AMF").reduce(
      (acc, z) => acc + z.colonisation,
      0,
    ) / MONITORING_ZONES.filter((z) => z.mycorrhizaType === "AMF").length,
  );

  return (
    <div className="space-y-8">
      {/* Hero corto */}
      <div className="bg-gradient-to-r from-oliveGreen/10 to-wheatGold/10 rounded-2xl p-6 border border-oliveGreen/20">
        <h2 className="text-xl font-bold text-charcoalGray mb-2">
          La red invisible que regenera el suelo
        </h2>
        <p className="text-sm text-charcoalGray/80">
          El micelio trabaja todo el año conectando raíces. Las setas son su
          bioindicador estacional.
        </p>
      </div>

      {/* 3 métricas grandes */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-oliveGreen/15">
          <p className="text-xs text-oliveGreen/60 mb-1">
            Colonización AMF media
          </p>
          <p className="text-3xl font-bold text-charcoalGray">
            {avgColonisation}%
          </p>
          <p className="text-xs text-oliveGreen/60 mt-1">
            en{" "}
            {MONITORING_ZONES.filter((z) => z.mycorrhizaType === "AMF").length}{" "}
            cultivos
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-oliveGreen/15">
          <p className="text-xs text-oliveGreen/60 mb-1">Reducción de plomo</p>
          <p className="text-3xl font-bold text-emerald-700">
            −{progress.leadReduction}%
          </p>
          <p className="text-xs text-oliveGreen/60 mt-1">
            de 15.2 a {current.lead} mg/kg
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-oliveGreen/15">
          <p className="text-xs text-oliveGreen/60 mb-1">
            Reducción hidrocarburos
          </p>
          <p className="text-3xl font-bold text-emerald-700">
            −{progress.hydrocarbonsReduction}%
          </p>
          <p className="text-xs text-oliveGreen/60 mt-1">
            de 45 a {current.hydrocarbons} mg/kg
          </p>
        </div>
      </div>

      {/* Symbiosis */}
      <SymbiosisCard result={symbiosis} />

      {/* CTA a otros tabs */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link
          href="#"
          className="bg-white/50 rounded-xl p-4 border border-oliveGreen/15 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">♻️</span>
            <ArrowRight className="w-4 h-4 text-oliveGreen" />
          </div>
          <p className="font-bold text-charcoalGray text-sm">Biorremediación</p>
          <p className="text-xs text-oliveGreen/70">
            Plan de recuperación de la zona noreste
          </p>
        </Link>

        <Link
          href="#"
          className="bg-white/50 rounded-xl p-4 border border-oliveGreen/15 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">🔬</span>
            <ArrowRight className="w-4 h-4 text-oliveGreen" />
          </div>
          <p className="font-bold text-charcoalGray text-sm">Redes activas</p>
          <p className="text-xs text-oliveGreen/70">
            {MONITORING_ZONES.length} hosts monitorizados
          </p>
        </Link>

        <Link
          href="#"
          className="bg-white/50 rounded-xl p-4 border border-oliveGreen/15 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">🍄</span>
            <ArrowRight className="w-4 h-4 text-oliveGreen" />
          </div>
          <p className="font-bold text-charcoalGray text-sm">Bioindicadores</p>
          <p className="text-xs text-oliveGreen/70">
            Setas de otoño y seguimiento
          </p>
        </Link>
      </div>
    </div>
  );
}
