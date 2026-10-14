"use client";

import { Droplets, Thermometer, Sun, Wind } from "lucide-react";
import { getLocale } from "@sicilia-soil/core";
import { formatRelativeTime } from "@sicilia-soil/utils";
import { Button } from "@sicilia-soil/ui";

interface ZoneData {
  id: string;
  icon: string;
  moisture: number;
  temperature: number;
  light: number;
  wind: number;
  statusKey: string;
  typeKey: string;
  locationKey: string;
  lastUpdate?: string;
}

interface ZoneCardProps {
  zone: ZoneData;
  onViewHistory: (id: string) => void;
}

export function ZoneCard({ zone, onViewHistory }: ZoneCardProps) {
  const t = getLocale("es");

  const zoneName = t.zones[zone.id as keyof typeof t.zones] ?? zone.id;
  const zoneType =
    t.enums.zoneType[zone.typeKey as keyof typeof t.enums.zoneType] ??
    zone.typeKey;
  const zoneLocation =
    t.enums.zoneLocation[
      zone.locationKey as keyof typeof t.enums.zoneLocation
    ] ?? zone.locationKey;
  const zoneStatus =
    t.enums.zoneStatus[zone.statusKey as keyof typeof t.enums.zoneStatus] ??
    zone.statusKey;

  const getStatusColor = (statusKey: string) => {
    switch (statusKey) {
      case "optimal":
        return "bg-green-100 text-green-700";
      case "healthy":
        return "bg-blue-100 text-blue-700";
      case "needsWater":
        return "bg-red-100 text-red-700";
      case "active":
        return "bg-yellow-100 text-yellow-700";
      case "full":
        return "bg-cyan-100 text-cyan-700";
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
          <span className="text-3xl">{zone.icon}</span>
          <div>
            <h3 className="text-lg font-bold text-charcoalGray">{zoneName}</h3>
            <p className="text-xs text-oliveGreen/60">{zoneType}</p>
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
            {t.ui.dashboard.moisture}
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
            {t.ui.dashboard.temperature}
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
            {t.ui.dashboard.light}
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
            {t.ui.dashboard.wind}
          </span>
          <span className="text-sm font-semibold ml-auto">
            {zone.wind} km/h
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-oliveGreen/10">
        <div className="flex flex-col">
          <span className="text-xs text-oliveGreen/50">{zoneLocation}</span>
          {zone.lastUpdate && (
            <span className="text-xs text-oliveGreen/40 mt-0.5">
              {t.ui.dashboard.updated}: {formatRelativeTime(zone.lastUpdate)}
            </span>
          )}
        </div>
        <Button
          type="button"
          variant="link"
          onClick={() => onViewHistory(zone.id)}
          className="!text-xs !p-0 hover:!text-sicilian-red hover:!scale-100"
        >
          {t.ui.dashboard.viewHistory} →
        </Button>
      </div>
    </div>
  );
}
