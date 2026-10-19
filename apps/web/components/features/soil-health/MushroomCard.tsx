"use client";

import type { MonitoringZone } from "@sicilia-soil/core";
import { getLocale } from "@sicilia-soil/core";
import { ArrowRight } from "lucide-react";
import { DataCard } from "@sicilia-soil/ui"; // <-- Importamos el wrapper

interface MushroomCardProps {
  zone: MonitoringZone;
  onViewDetails?: (id: string) => void;
}

export const MushroomCard = ({ zone, onViewDetails }: MushroomCardProps) => {
  const locale = getLocale("es");
  const t = locale.ui.mushroomCard;

  const getStatusStyle = (status: MonitoringZone["status"]) => {
    switch (status) {
      case "optimal":
      case "excellent":
        return "border-chloro/30 text-chloro bg-chloro/5";
      case "ready":
        return "border-solar/30 text-solar bg-solar/5";
      default:
        return "border-ink/20 text-ink/60 bg-paper";
    }
  };

  const getMycorrhizaStyle = (type: MonitoringZone["mycorrhizaType"]) => {
    switch (type) {
      case "AMF":
        return "text-chloro border-chloro/20 bg-chloro/5";
      case "ECM":
        return "text-solar border-solar/20 bg-solar/5";
      default:
        return "text-ink/50 border-ink/20 bg-paper";
    }
  };

  const mycorrhizaLabels = t.mycorrhiza as Record<string, string>;
  const mycorrhizaText =
    mycorrhizaLabels[zone.mycorrhizaType] ?? zone.mycorrhizaType;

  return (
    // Usamos DataCard con p-0 para que los bordes internos fluyan sin padding externo
    <DataCard className="p-0 flex flex-col group hover:bg-paper/30 overflow-hidden">
      {/* HEADER: Icono y Estado */}
      <div className="flex items-center justify-between p-4 border-b border-ink/10 bg-paper/50">
        <span className="text-3xl">{zone.icon}</span>
        <span
          className={`px-2 py-1 border font-mono text-[10px] uppercase tracking-widest font-bold ${getStatusStyle(zone.status)}`}
        >
          {t.status[zone.status] ?? zone.status}
        </span>
      </div>

      {/* TÍTULO Y NOMBRE CIENTÍFICO */}
      <div className="p-4 pb-2">
        <h3 className="text-xl font-serif font-bold text-ink leading-tight group-hover:text-chloro transition-colors">
          {zone.name}
        </h3>
        {zone.scientificName && (
          <p className="font-serif text-xs italic text-ink/60 mt-1">
            {zone.scientificName}
          </p>
        )}
      </div>

      {/* UBICACIÓN Y TIPO DE MICORRIZA */}
      <div className="px-4 pb-4 flex items-center gap-2 flex-wrap">
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50 flex items-center gap-1">
          📍 {zone.location}
        </span>
        <span
          className={`px-1.5 py-0.5 border font-mono text-[9px] uppercase tracking-widest font-bold ${getMycorrhizaStyle(zone.mycorrhizaType)}`}
        >
          {mycorrhizaText}
        </span>
      </div>

      {/* DATOS (Si tiene micorriza) */}
      {zone.mycorrhizaType !== "none" && (
        <div className="px-4 pb-4 space-y-3">
          <div>
            <div className="flex justify-between font-mono text-xs mb-1">
              <span className="text-ink/60 uppercase tracking-wider">
                {t.colonisation}
              </span>
              <span className="font-bold text-ink">{zone.colonisation}%</span>
            </div>
            <div className="w-full h-1.5 bg-ink/5 border border-ink/10 overflow-hidden">
              <div
                className="h-full bg-chloro transition-all"
                style={{ width: `${Math.min(zone.colonisation, 100)}%` }}
              />
            </div>
          </div>

          {zone.glomalin !== undefined && (
            <div className="flex justify-between font-mono text-xs">
              <span className="text-ink/60 uppercase tracking-wider">
                {t.glomalin}
              </span>
              <span className="font-bold text-ink">{zone.glomalin} mg/g</span>
            </div>
          )}
        </div>
      )}

      {/* CONDICIONES AMBIENTALES */}
      <div className="px-4 py-3 border-t border-ink/10 space-y-1.5 mt-auto">
        <div className="flex justify-between font-mono text-[11px]">
          <span className="text-ink/50 uppercase tracking-wider">
            {t.humidity}
          </span>
          <span className="font-bold text-ink">{zone.humidity}%</span>
        </div>
        <div className="flex justify-between font-mono text-[11px]">
          <span className="text-ink/50 uppercase tracking-wider">
            {t.temperature}
          </span>
          <span className="font-bold text-ink">{zone.temperature}°C</span>
        </div>
        <div className="flex justify-between font-mono text-[11px]">
          <span className="text-ink/50 uppercase tracking-wider">{t.co2}</span>
          <span className="font-bold text-ink">{zone.co2} ppm</span>
        </div>
      </div>

      {/* FRUCTIFICACIÓN (Si aplica) */}
      {zone.harvestIn && (
        <div className="px-4 py-2 border-t border-ink/10 bg-paper/30">
          <div className="flex justify-between font-mono text-[11px]">
            <span className="text-ink/50 uppercase tracking-wider">
              {t.fruiting}
            </span>
            <span className="font-bold text-solar">{zone.harvestIn}</span>
          </div>
        </div>
      )}

      {/* ACCIÓN */}
      <div className="border-t border-ink/10 p-3">
        <button
          onClick={() => onViewDetails?.(zone.id)}
          className="w-full flex items-center justify-between px-3 py-2 font-mono text-xs uppercase tracking-widest font-bold text-ink/70 hover:text-solar hover:bg-paper transition-colors"
        >
          {t.viewDetails}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </DataCard>
  );
};
