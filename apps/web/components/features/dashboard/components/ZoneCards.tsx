"use client";

import { Droplets, Thermometer, Sun, Wind, ArrowRight } from "lucide-react";
import { getLocale } from "@sicilia-soil/core";
import { Button, DataCard } from "@sicilia-soil/ui";

const locale = getLocale("es");
const dashboardContent = locale.ui.dashboard;

const STATUS_STYLES: Record<string, string> = {
  optimal: "text-chloro border-chloro/30 bg-chloro/5",
  needsWater: "text-solar border-solar/30 bg-solar/5",
  needsAttention: "text-amber-600 border-amber-600/30 bg-amber-600/5",
  offline: "text-ink/50 border-ink/20 bg-ink/5",
};
const DEFAULT_STATUS_STYLE = "text-ink/50 border-ink/20 bg-ink/5";

// 👇 Helper para los colores de los valores
function getValueColor(
  value: number,
  type: "moisture" | "temp" | "light",
): string {
  if (type === "moisture") {
    if (value >= 70) return "text-chloro";
    if (value >= 50) return "text-solar";
    return "text-red-500";
  }
  if (type === "temp") {
    if (value >= 20 && value <= 25) return "text-chloro";
    if (value >= 15 && value <= 30) return "text-solar";
    return "text-red-500";
  }
  if (type === "light") {
    if (value >= 60) return "text-chloro";
    if (value >= 40) return "text-solar";
    return "text-red-500";
  }
  return "text-ink";
}

interface ZoneData {
  id: string;
  sensorId: string;
  location: string;
  moisture: number;
  temperature: number;
  light: number;
  wind: number;
  statusKey: string;
  currentCropId?: string;
  lastUpdate?: string;
}

interface ZoneCardProps {
  zone: ZoneData;
  onViewHistory: (id: string) => void;
}

export function ZoneCard({ zone, onViewHistory }: ZoneCardProps) {
  const zoneName =
    locale.zones[zone.id as keyof typeof locale.zones] ?? zone.id;
  const zoneStatus =
    locale.enums.zoneStatus[
      zone.statusKey as keyof typeof locale.enums.zoneStatus
    ] ?? zone.statusKey;
  const currentCrop = zone.currentCropId
    ? (locale.crops[zone.currentCropId as keyof typeof locale.crops] ??
      zone.currentCropId)
    : null;

  const zoneNumber = zone.id.replace(/^zone-/, "");
  const statusStyle = STATUS_STYLES[zone.statusKey] ?? DEFAULT_STATUS_STYLE;

  return (
    <DataCard className="p-0 flex flex-col group hover:bg-paper/30 overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border flex items-center justify-center font-mono text-sm font-bold text-ink group-hover:bg-solar group-hover:text-ink transition-colors">
            {zoneNumber}
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-ink leading-tight">
              {zoneName}
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mt-0.5">
              {zone.sensorId}
            </p>
          </div>
        </div>
        <span
          className={`px-2 py-0.5 border font-mono text-[10px] uppercase tracking-widest font-bold ${statusStyle}`}
        >
          {zoneStatus}
        </span>
      </div>

      {/* DATOS */}
      <div className="p-4 flex-1 grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <Droplets className="w-3.5 h-3.5 text-chloro/70" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink/60">
              {dashboardContent.moisture}
            </span>
          </div>
          <span
            className={`font-mono text-xl font-bold ${getValueColor(zone.moisture, "moisture")}`}
          >
            {zone.moisture}%
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <Thermometer className="w-3.5 h-3.5 text-solar/70" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink/60">
              {dashboardContent.temperature}
            </span>
          </div>
          <span
            className={`font-mono text-xl font-bold ${getValueColor(zone.temperature, "temp")}`}
          >
            {zone.temperature}°C
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <Sun className="w-3.5 h-3.5 text-solar/70" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink/60">
              {dashboardContent.light}
            </span>
          </div>
          <span
            className={`font-mono text-xl font-bold ${getValueColor(zone.light, "light")}`}
          >
            {zone.light}%
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <Wind className="w-3.5 h-3.5 text-ink/40" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink/60">
              {dashboardContent.wind}
            </span>
          </div>
          <span className="font-mono text-xl font-bold text-ink">
            {zone.wind}{" "}
            <span className="text-xs text-ink/50 font-sans">km/h</span>
          </span>
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-4 py-3 border-t border-ink/10 flex items-center justify-between bg-card mt-auto">
        <div>
          {currentCrop ? (
            <div className="font-mono text-[10px] uppercase tracking-wider text-ink/70">
              {currentCrop}
            </div>
          ) : (
            <div className="font-mono text-[10px] text-ink/30">---</div>
          )}
        </div>

        <Button
          type="button"
          variant="bare"
          onClick={() => onViewHistory(zone.id)}
          className="font-mono text-[10px] uppercase tracking-widest font-bold text-solar hover:text-ink transition-colors flex items-center gap-1"
        >
          {dashboardContent.viewHistory} <ArrowRight className="w-3 h-3" />
        </Button>
      </div>
    </DataCard>
  );
}
