"use client";

import { Droplets, Thermometer, Sun, Wind } from "lucide-react";
import { getLocale } from "@sicilia-soil/core";
import { formatRelativeTime } from "@sicilia-soil/utils";
import { Button } from "@sicilia-soil/ui";

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
  const locale = getLocale("es");

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

  const getStatusColor = (statusKey: string) => {
    switch (statusKey) {
      case "optimal":
        return "bg-green-100 text-green-700";
      case "needsWater":
        return "bg-red-100 text-red-700";
      case "needsAttention":
        return "bg-yellow-100 text-yellow-700";
      case "offline":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getMoistureColor = (value: number) => {
    if (value >= 70) return "text-green-600";
    if (value >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getTempColor = (value: number) => {
    if (value >= 20 && value <= 25) return "text-green-600";
    if (value >= 15 && value <= 30) return "text-yellow-600";
    return "text-red-600";
  };

  const getLightColor = (value: number) => {
    if (value >= 60) return "text-green-600";
    if (value >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-lg border border-oliveGreen/15 hover:shadow-xl transition-all hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-oliveGreen/10 flex items-center justify-center text-lg font-bold text-oliveGreen">
            {zoneNumber}
          </span>
          <div>
            <h3 className="text-lg font-bold text-charcoalGray">{zoneName}</h3>
            <p className="text-xs text-oliveGreen/60">
              {zone.sensorId} · {zone.location}
            </p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(zone.statusKey)}`}
        >
          {zoneStatus}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-blue-500" />
          <span className="text-xs text-oliveGreen/60">
            {locale.ui.dashboard.moisture}
          </span>
          <span
            className={`text-sm font-semibold ml-auto ${getMoistureColor(zone.moisture)}`}
          >
            {zone.moisture}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-red-500" />
          <span className="text-xs text-oliveGreen/60">
            {locale.ui.dashboard.temperature}
          </span>
          <span
            className={`text-sm font-semibold ml-auto ${getTempColor(zone.temperature)}`}
          >
            {zone.temperature}°C
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-yellow-500" />
          <span className="text-xs text-oliveGreen/60">
            {locale.ui.dashboard.light}
          </span>
          <span
            className={`text-sm font-semibold ml-auto ${getLightColor(zone.light)}`}
          >
            {zone.light}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-oliveGreen/60">
            {locale.ui.dashboard.wind}
          </span>
          <span className="text-sm font-semibold ml-auto">
            {zone.wind} km/h
          </span>
        </div>
      </div>

      {currentCrop && (
        <div className="mb-3 text-xs text-oliveGreen/50">
          {locale.ui.dashboard.currentCrop}: {currentCrop}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-oliveGreen/10">
        <div className="flex flex-col">
          {zone.lastUpdate && (
            <span className="text-xs text-oliveGreen/40">
              {locale.ui.dashboard.updated}:{" "}
              {formatRelativeTime(zone.lastUpdate)}
            </span>
          )}
        </div>
        <Button
          type="button"
          variant="link"
          onClick={() => onViewHistory(zone.id)}
          className="!text-xs !p-0 hover:!text-sicilian-red hover:!scale-100"
        >
          {locale.ui.dashboard.viewHistory} →
        </Button>
      </div>
    </div>
  );
}
