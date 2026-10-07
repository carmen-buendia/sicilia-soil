"use client";

import { Badge, Button } from "@sicilia-soil/ui";
import type { MonitoringZone } from "@sicilia-soil/core";

interface MushroomCardProps {
  zone: MonitoringZone;
  onViewDetails?: (id: string) => void;
}

const STATUS_VARIANT: Record<
  MonitoringZone["status"],
  "success" | "warning" | "info" | "default"
> = {
  optimal: "success",
  excellent: "success",
  good: "info",
  ready: "warning",
};

const STATUS_LABEL: Record<MonitoringZone["status"], string> = {
  optimal: "Óptimo",
  excellent: "Excelente",
  good: "Bueno",
  ready: "Listo",
};

const MYCORRHIZA_LABEL: Partial<
  Record<MonitoringZone["mycorrhizaType"], string>
> = {
  AMF: "AMF · Arbuscular",
  ECM: "ECM · Ectomicorrícica",
  none: "Sin micorriza",
};

const MYCORRHIZA_BADGE: Partial<
  Record<MonitoringZone["mycorrhizaType"], string>
> = {
  AMF: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ECM: "bg-amber-50 text-amber-700 border-amber-200",
  none: "bg-gray-50 text-gray-700 border-gray-200",
};

export const MushroomCard = ({ zone, onViewDetails }: MushroomCardProps) => {
  const statusVariant = STATUS_VARIANT[zone.status] ?? "default";
  const mycorrhizaBadge =
    MYCORRHIZA_BADGE[zone.mycorrhizaType] ?? MYCORRHIZA_BADGE.none;

  return (
    <div className="bg-white rounded-xl p-5 shadow-lg border border-oliveGreen/15 hover:border-oliveGreen/30 transition-all hover:shadow-xl group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{zone.icon}</span>
        <Badge variant={statusVariant} size="sm">
          {STATUS_LABEL[zone.status]}
        </Badge>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-charcoalGray group-hover:text-oliveGreen">
        {zone.name}
      </h3>
      {zone.scientificName && (
        <p className="text-xs text-oliveGreen/60 italic mb-2">
          {zone.scientificName}
        </p>
      )}

      {/* Location + mycorrhiza type */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-xs text-oliveGreen/70 flex items-center gap-1">
          📍 {zone.location}
        </span>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${mycorrhizaBadge}`}
        >
          {MYCORRHIZA_LABEL[zone.mycorrhizaType] ?? zone.mycorrhizaType}
        </span>
      </div>

      {/* Mycorrhizal indicators */}
      {zone.mycorrhizaType !== "none" && (
        <div className="space-y-2 mb-3">
          {/* Colonisation bar */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-oliveGreen/70">Colonización</span>
              <span className="font-bold text-charcoalGray">
                {zone.colonisation}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-oliveGreen/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-oliveGreen rounded-full transition-all"
                style={{ width: `${Math.min(zone.colonisation, 100)}%` }}
              />
            </div>
          </div>

          {/* Glomalin (solo AMF) */}
          {zone.glomalin !== undefined && (
            <div className="flex justify-between text-xs">
              <span className="text-oliveGreen/70">Glomalina</span>
              <span className="font-bold text-charcoalGray">
                {zone.glomalin} mg/g
              </span>
            </div>
          )}
        </div>
      )}

      {/* Environmental conditions */}
      <div className="space-y-1 text-xs border-t border-oliveGreen/10 pt-3 mb-3">
        <div className="flex justify-between">
          <span className="text-oliveGreen/60">Humedad</span>
          <span className="font-medium text-charcoalGray">
            {zone.humidity}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-oliveGreen/60">Temperatura</span>
          <span className="font-medium text-charcoalGray">
            {zone.temperature}°C
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-oliveGreen/60">CO₂</span>
          <span className="font-medium text-charcoalGray">{zone.co2} ppm</span>
        </div>
      </div>

      {/* Fruiting info (solo ECM con setas) */}
      {zone.harvestIn && (
        <div className="border-t border-oliveGreen/10 pt-3 mb-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-oliveGreen/60">Fructificación</span>
            <span className="font-medium text-wheatGold">{zone.harvestIn}</span>
          </div>
        </div>
      )}

      {/* Action */}
      <Button
        onClick={() => onViewDetails?.(zone.id)}
        className="w-full mt-2 px-3 py-2 !bg-oliveGreen/10 !text-oliveGreen rounded-lg text-sm font-medium hover:bg-oliveGreen/20 transition-colors"
      >
        Ver detalles
      </Button>
    </div>
  );
};
