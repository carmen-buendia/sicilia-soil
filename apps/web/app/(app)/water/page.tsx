"use client";

import { useState } from "react";
import {
  Droplets,
  ArrowLeft,
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  Thermometer,
  Wind,
  Sun,
  Activity,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useWaterData } from "@/hooks/useWaterData";
import { getLocale, getZoneColor, getZoneStatus } from "@sicilia-soil/core";
import { Button } from "@sicilia-soil/ui";

const locale = getLocale("es");
const waterContent = locale.water;

function formatWateringAgo(hoursAgo: number | "auto"): string {
  if (hoursAgo === "auto") return waterContent.zones.wateringAuto;
  return waterContent.zones.wateringHoursAgo.replace(
    "{hours}",
    String(hoursAgo),
  );
}

export default function WaterPage() {
  const {
    zones,
    climate,
    waterControl,
    forecast,
    lastReadingMinutes,
    average,
    criticalZones,
    optimalZones,
  } = useWaterData();

  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [isWatering, setIsWatering] = useState<string | null>(null);

  const getTrendIcon = (trend: string) => {
    if (trend === "up")
      return <TrendingUp className="w-3.5 h-3.5 text-chloro" />;
    if (trend === "down")
      return <TrendingDown className="w-3.5 h-3.5 text-red-500" />;
    return null;
  };

  const getTrendLabel = (trend: string) => {
    if (trend === "up") return waterContent.zones.trendUp;
    if (trend === "down") return waterContent.zones.trendDown;
    return waterContent.zones.trendStable;
  };

  const consumptionPercent = Math.round(
    (waterControl.consumption.current / waterControl.consumption.limit) * 100,
  );

  const forecastText = waterContent.control.forecastTemplate
    .replace("{temp}", String(forecast.airTempC))
    .replace("{percent}", String(forecast.irrigationIncreasePercent));

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink/20 pb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 border border-ink/20 hover:bg-paper transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-ink/60" />
          </Link>
          <div>
            <h1 className="text-3xl font-serif font-bold text-ink flex items-center gap-3">
              <Droplets className="w-8 h-8 text-chloro" />
              {waterContent.header.title}
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mt-1">
              {waterContent.header.subtitle}
            </p>
          </div>
        </div>

        <div className="flex gap-2 font-mono text-xs uppercase tracking-widest font-bold">
          <Button
            variant="bare"
            className="!rounded-none flex items-center gap-2 border border-ink/20 bg-card px-4 py-2 hover:bg-paper transition-colors"
          >
            <Calendar className="w-4 h-4" />
            {waterContent.header.rangeLastWeek}
          </Button>
          <Button
            variant="bare"
            className="!rounded-none flex items-center gap-2 border border-ink/20 bg-ink text-paper px-4 py-2 hover:bg-chloro transition-colors"
          >
            <Download className="w-4 h-4" />
            {waterContent.header.exportData}
          </Button>
        </div>
      </div>

      <div className="bg-card border border-ink/20">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-ink/10">
          <div className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
              {waterContent.stats.average}
            </p>
            <p className="font-mono text-3xl font-bold text-ink">{average}%</p>
            <p className="font-sans text-xs text-chloro mt-1">
              {waterContent.stats.averageTrend}
            </p>
          </div>
          <div className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
              {waterContent.stats.optimalZones}
            </p>
            <p className="font-mono text-3xl font-bold text-chloro">
              {optimalZones}
            </p>
            <p className="font-sans text-xs text-ink/50 mt-1">
              {waterContent.stats.ofZones.replace(
                "{count}",
                String(zones.length),
              )}
            </p>
          </div>
          <div className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
              {waterContent.stats.needsWater}
            </p>
            <p className="font-mono text-3xl font-bold text-red-500">
              {criticalZones}
            </p>
            <p className="font-sans text-xs text-solar mt-1">
              {waterContent.stats.urgentAttention}
            </p>
          </div>
          <div className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
              {waterContent.stats.lastReading}
            </p>
            <p className="font-mono text-3xl font-bold text-ink">
              {lastReadingMinutes} min
            </p>
            <p className="font-sans text-xs text-ink/50 mt-1">
              {waterContent.stats.activeSensors}
            </p>
          </div>
        </div>
      </div>

      {/* 3. CLIMATE */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-card border border-ink/20 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-5 h-5 text-solar" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink/60">
              {waterContent.climate.temperatureLabel}
            </span>
          </div>
          <p className="font-mono text-3xl font-bold text-ink">
            {climate.temperature.value}
            {climate.temperature.unit}
          </p>
          <p className="font-sans text-xs text-ink/50 mt-1">
            {waterContent.climate.temperatureNote.replace(
              "{feelsLike}",
              String(climate.temperature.feelsLike),
            )}
          </p>
        </div>

        <div className="bg-card border border-ink/20 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-5 h-5 text-chloro" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink/60">
              {waterContent.climate.humidityLabel}
            </span>
          </div>
          <p className="font-mono text-3xl font-bold text-ink">
            {climate.ambientHumidity.value}
            {climate.ambientHumidity.unit}
          </p>
          <p className="font-sans text-xs text-ink/50 mt-1">
            {waterContent.climate.humidityNote.replace(
              "{windKmh}",
              String(climate.ambientHumidity.windKmh),
            )}
          </p>
        </div>

        <div className="bg-card border border-ink/20 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="w-5 h-5 text-chloro" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink/60">
              {waterContent.climate.evapotranspirationLabel}
            </span>
          </div>
          <p className="font-mono text-3xl font-bold text-ink">
            {climate.evapotranspiration.value} {climate.evapotranspiration.unit}
          </p>
          <p className="font-sans text-xs text-ink/50 mt-1">
            {waterContent.climate.evapotranspirationNote.replace(
              "{hint}",
              String(climate.evapotranspiration.irrigationHint),
            )}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tabla de Balance Hídrico por Zona */}
        <div className="lg:col-span-2 bg-card border border-ink/20 flex flex-col">
          <div className="flex items-center justify-between p-5 border-b border-ink/10 bg-paper/30">
            <h2 className="text-xl font-serif font-bold text-ink flex items-center gap-2">
              <Activity className="w-5 h-5 text-chloro" />
              {waterContent.tableTitle}
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50 bg-paper px-2 py-1 border border-ink/20">
              {waterContent.tableBadge}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-sm">
              <thead className="bg-paper/50 border-b border-ink/20 text-ink/60 text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3 font-bold">
                    {waterContent.tableHeaders.zone}
                  </th>
                  <th className="px-5 py-3 font-bold">
                    {waterContent.tableHeaders.current}
                  </th>
                  <th className="px-5 py-3 font-bold">
                    {waterContent.tableHeaders.optimal}
                  </th>
                  <th className="px-5 py-3 font-bold">
                    {waterContent.tableHeaders.balance}
                  </th>
                  <th className="px-5 py-3 font-bold">
                    {waterContent.tableHeaders.status}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {zones.map((zone) => {
                  const deficit = zone.optimal - zone.current;
                  const isDeficit = deficit > 0;
                  const zoneName =
                    locale.zones[zone.id as keyof typeof locale.zones] ??
                    zone.id;

                  return (
                    <tr
                      key={zone.id}
                      className="hover:bg-paper/30 transition-colors"
                    >
                      <td className="px-5 py-4 text-ink font-bold">
                        {zoneName}
                      </td>
                      <td className="px-5 py-4 text-ink">{zone.current}%</td>
                      <td className="px-5 py-4 text-ink/60">{zone.optimal}%</td>
                      <td className="px-5 py-4">
                        <span
                          className={`font-bold ${isDeficit ? "text-solar" : "text-chloro"}`}
                        >
                          {isDeficit
                            ? `-${deficit}% (${waterContent.deficit})`
                            : `+${Math.abs(deficit)}% (${waterContent.surplus})`}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2 py-1 border text-[10px] uppercase font-bold ${
                            zone.current < zone.optimal
                              ? "border-solar/30 bg-solar/5 text-solar"
                              : "border-chloro/30 bg-chloro/5 text-chloro"
                          }`}
                        >
                          {zone.current < zone.optimal
                            ? waterContent.statusRequiresWater
                            : waterContent.statusOptimal}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card border border-ink/20 p-5 flex flex-col">
          <h2 className="text-xl font-serif font-bold text-ink mb-5 border-b border-ink/10 pb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-solar" />
            {waterContent.globalEfficiency}
          </h2>

          <div className="space-y-6 flex-1">
            <div>
              <p className="font-mono text-[10px] text-ink/50 uppercase tracking-wider mb-2">
                {waterContent.reserveUsage}
              </p>
              <div className="flex justify-between items-end mb-1">
                <span className="font-mono text-3xl font-bold text-ink">
                  {consumptionPercent}%
                </span>
                <span className="font-mono text-xs text-ink/50">
                  {waterControl.consumption.current} /{" "}
                  {waterControl.consumption.limit}{" "}
                  {waterControl.consumption.unit}
                </span>
              </div>
              <div className="w-full h-2 bg-ink/10 border border-ink/20 overflow-hidden">
                <div
                  className="h-full bg-solar"
                  style={{ width: `${consumptionPercent}%` }}
                />
              </div>
              <p className="font-sans text-xs text-ink/60 mt-2">
                {consumptionPercent > 80
                  ? waterContent.reserveWarning
                  : waterContent.reserveNormal}
              </p>
            </div>

            <div className="border-t border-ink/10 pt-4">
              <p className="font-mono text-[10px] text-ink/50 uppercase tracking-wider mb-2">
                {waterContent.systemStress}
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${criticalZones > 2 ? "bg-red-500" : criticalZones > 0 ? "bg-solar" : "bg-chloro"}`}
                />
                <span className="font-mono text-lg font-bold text-ink uppercase">
                  {criticalZones > 2
                    ? waterContent.stressCritical
                    : criticalZones > 0
                      ? waterContent.stressModerate
                      : waterContent.stressLow}
                </span>
              </div>
              <p className="font-sans text-xs text-ink/60 mt-2 leading-relaxed">
                {waterContent.stressDesc
                  .replace("{critical}", String(criticalZones))
                  .replace("{total}", String(zones.length))
                  .replace("{average}", String(average))}
              </p>
            </div>

            <div className="border-t border-ink/10 pt-4">
              <p className="font-mono text-[10px] text-ink/50 uppercase tracking-wider mb-2">
                {waterContent.atmosphericDemand}
              </p>
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-solar" />
                <span className="font-mono text-lg font-bold text-ink">
                  {climate.evapotranspiration.value}{" "}
                  {climate.evapotranspiration.unit}
                </span>
              </div>
              <p className="font-sans text-xs text-ink/60 mt-2">
                {climate.evapotranspiration.irrigationHint === 1
                  ? waterContent.etHigh
                  : waterContent.etModerate}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6" id="zones">
        <div className="flex items-center justify-between border-b border-ink/20 pb-4">
          <h2 className="text-xl font-serif font-bold text-ink flex items-center gap-2">
            <Droplets className="w-5 h-5 text-chloro" />
            {waterContent.zones.sectionTitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zones.map((zone) => {
            const status = getZoneStatus(zone.current, zone.optimal);
            const color = getZoneColor(zone.current, zone.optimal);
            const zoneName =
              locale.zones[zone.id as keyof typeof locale.zones] ?? zone.id;

            return (
              <div
                key={zone.id}
                className={`bg-card border flex flex-col transition-colors cursor-pointer group hover:bg-paper/50 ${
                  status.status === "critical"
                    ? "border-red-500/30"
                    : status.status === "optimal"
                      ? "border-chloro/30"
                      : "border-solar/30"
                }`}
                onClick={() => {
                  const newZone = zone.id === selectedZone ? null : zone.id;
                  setSelectedZone(newZone);
                }}
              >
                <div className="p-4 border-b border-ink/10 flex justify-between items-start bg-paper/30">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-ink">
                      {zoneName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 font-mono text-[10px] uppercase tracking-wider text-ink/50">
                      <span>{zone.location}</span>
                      <span>•</span>
                      <span>{zone.soilType}</span>
                    </div>
                    <div className="font-mono text-[10px] text-ink/60 mt-2">
                      {waterContent.zones.watering}:{" "}
                      {formatWateringAgo(zone.lastWateringHoursAgo)}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 border font-mono text-[10px] uppercase tracking-widest font-bold ${status.colorClass.replace("bg-", "bg-opacity-10 bg-").replace("text-", "text-").replace("rounded-full", "")}`}
                  >
                    {status.label}
                  </span>
                </div>

                <div className="flex justify-center py-6 border-b border-ink/10">
                  <div className="relative w-28 h-28">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#E8E2D6"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={color}
                        strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - zone.current / 100)}`}
                        strokeLinecap="square"
                        transform="rotate(-90 50 50)"
                      />
                      <text
                        x="50"
                        y="50"
                        textAnchor="middle"
                        dy="0.3em"
                        className="font-mono text-2xl font-bold"
                        fill="#2C352C"
                      >
                        {zone.current}%
                      </text>
                    </svg>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-end">
                  <div className="flex justify-center items-center gap-1 mb-4">
                    {getTrendIcon(zone.trend)}
                    <span className="font-mono text-xs text-ink/60 uppercase tracking-widest">
                      {getTrendLabel(zone.trend)}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="font-mono text-[10px] text-ink/50 uppercase tracking-wider mb-2">
                      {waterContent.zones.evolution24h}
                    </p>
                    <div className="flex items-end justify-between h-12 gap-1">
                      {zone.history.map((value, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-chloro/60"
                          style={{ height: `${value}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-ink/10 flex justify-between font-mono text-xs">
                    <span className="text-ink/50">
                      {waterContent.zones.optimal}: {zone.optimal}%
                    </span>
                    <span className="font-bold text-ink">
                      {waterContent.zones.current}: {zone.current}%
                    </span>
                  </div>
                </div>

                {selectedZone === zone.id && (
                  <div className="p-4 border-t border-ink/20 bg-paper/40">
                    <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                      <div className="bg-card border border-ink/20 p-2">
                        <p className="text-[10px] text-ink/50 uppercase mb-1">
                          {waterContent.zones.recommendation}
                        </p>
                        <p className="font-bold text-ink">
                          {zone.current < zone.optimal
                            ? waterContent.zones.recommendationWater.replace(
                                "{liters}",
                                String(
                                  Math.round(
                                    (zone.optimal - zone.current) * 0.5,
                                  ),
                                ),
                              )
                            : waterContent.zones.recommendationKeep}
                        </p>
                      </div>
                      <div className="bg-card border border-ink/20 p-2">
                        <p className="text-[10px] text-ink/50 uppercase mb-1">
                          {waterContent.zones.nextWatering}
                        </p>
                        <p className="font-bold text-ink">
                          {zone.current < zone.optimal
                            ? waterContent.zones.nextWateringNow
                            : waterContent.zones.nextWateringLater}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="bare"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsWatering(zone.id);
                        setTimeout(() => setIsWatering(null), 3000);
                      }}
                      disabled={isWatering === zone.id}
                      className={`!rounded-none w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest font-bold transition-colors ${
                        isWatering === zone.id
                          ? "bg-chloro text-paper cursor-wait"
                          : "bg-ink text-paper hover:bg-chloro"
                      }`}
                    >
                      {isWatering === zone.id
                        ? waterContent.wateringInProgress
                        : waterContent.zones.manualWatering}
                      <Droplets
                        className={`w-3.5 h-3.5 ${isWatering === zone.id ? "animate-bounce" : ""}`}
                      />
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-card border border-ink/20 p-6">
        <h2 className="text-xl font-serif font-bold text-ink mb-6 flex items-center gap-2 border-b border-ink/10 pb-4">
          <Droplets className="w-5 h-5 text-chloro" />
          {waterContent.control.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-paper border border-ink/20 p-5">
            <h3 className="font-serif text-base font-bold mb-4 flex items-center gap-2 text-ink">
              <div className="w-2 h-2 bg-chloro animate-pulse"></div>
              {waterContent.control.autoIrrigation}
            </h3>
            <div className="flex items-center justify-between mb-4 border-b border-ink/10 pb-3">
              <span className="font-mono text-xs text-ink/60 uppercase">
                {waterContent.control.status}
              </span>
              <span
                className={`px-2 py-1 border font-mono text-[10px] uppercase font-bold ${waterControl.autoIrrigation.enabled ? "bg-chloro/10 border-chloro/20 text-chloro" : "bg-paper border-ink/20 text-ink/50"}`}
              >
                {waterControl.autoIrrigation.enabled
                  ? waterContent.control.statusOn
                  : waterContent.control.statusOff}
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="font-mono text-[10px] text-ink/50 uppercase tracking-wider">
                  {waterContent.control.nextScheduled}
                </p>
                <p className="font-mono text-lg font-bold text-ink">
                  {waterContent.control.nextInHours.replace(
                    "{hours}",
                    String(waterControl.autoIrrigation.nextInHours),
                  )}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-ink/50 uppercase tracking-wider">
                  {waterContent.control.duration}
                </p>
                <p className="font-mono text-sm text-ink">
                  {waterContent.control.durationMinutes.replace(
                    "{minutes}",
                    String(waterControl.autoIrrigation.durationMinutes),
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-paper border border-ink/20 p-5">
            <h3 className="font-serif text-base font-bold mb-4 text-ink">
              {waterContent.control.consumptionTitle}
            </h3>
            <p className="font-mono text-4xl font-bold text-ink mb-1">
              {waterControl.consumption.current}
              <span className="text-lg text-ink/50 ml-1">
                {waterControl.consumption.unit}
              </span>
            </p>
            <p className="font-mono text-[10px] text-ink/50 uppercase tracking-wider mb-4">
              {waterContent.control.consumptionPeriod.replace(
                "{hours}",
                String(waterControl.consumption.periodHours),
              )}
            </p>
            <div className="w-full h-2 bg-ink/10 border border-ink/20 overflow-hidden mb-2">
              <div
                className="h-full bg-solar"
                style={{ width: `${consumptionPercent}%` }}
              />
            </div>
            <div className="flex justify-between font-mono text-[10px] text-ink/50 uppercase tracking-wider">
              <span>0{waterControl.consumption.unit}</span>
              <span>
                {waterControl.consumption.current}
                {waterControl.consumption.unit}
              </span>
              <span>
                {waterControl.consumption.limit}
                {waterControl.consumption.unit} (
                {waterContent.control.consumptionLimit})
              </span>
            </div>
          </div>

          <div className="bg-paper border border-ink/20 p-5 flex flex-col justify-between">
            <h3 className="font-serif text-base font-bold mb-4 text-ink">
              {waterContent.control.quickActions}
            </h3>
            <div className="space-y-2">
              <Link
                href="#zones"
                className="block w-full text-center bg-ink text-paper px-4 py-2 font-mono text-xs uppercase tracking-widest font-bold hover:bg-chloro transition-colors"
              >
                {waterContent.zones.manualWatering}
              </Link>
              <Link
                href="/configuration"
                className="block w-full text-center bg-transparent border border-ink/20 text-ink px-4 py-2 font-mono text-xs uppercase tracking-widest font-bold hover:bg-card transition-colors"
              >
                {waterContent.control.scheduleWatering}
              </Link>
              <Link
                href="/configuration"
                className="block w-full text-center text-ink/50 px-4 py-2 font-mono text-xs uppercase tracking-widest font-bold hover:text-ink transition-colors"
              >
                {waterContent.control.advancedConfig}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 border-l-4 border-solar bg-solar/5">
          <p className="font-mono text-xs text-ink/80 flex items-center gap-2">
            <Sun className="w-4 h-4 text-solar" />
            <span className="font-bold uppercase tracking-wider">
              {waterContent.control.forecast}:
            </span>{" "}
            {forecastText}
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center pt-8 border-t border-ink/20 mt-8">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
          {waterContent.footer.realtime}
        </p>
        <p className="font-mono text-[10px] text-ink/40 mt-1 uppercase tracking-widest">
          {waterContent.footer.syncMinutesAgo.replace(
            "{minutes}",
            String(lastReadingMinutes),
          )}{" "}
          · {waterContent.footer.allOperational}
        </p>
      </div>
    </div>
  );
}
