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
} from "lucide-react";
import Link from "next/link";
import { Button } from "@sicilia-soil/ui";
import { useWaterData } from "@/hooks/useWaterData";
import {
  getLocale,
  getZoneColor,
  getZoneStatus,
  FARM_CENTER,
  FARM_DEFAULT_ZOOM,
} from "@sicilia-soil/core";
import {
  CopernicusWidget,
  CopernicusMap,
} from "@/components/features/copernicus/components";

function formatWateringAgo(
  hoursAgo: number | "auto",
  t: ReturnType<typeof getLocale>["water"],
): string {
  if (hoursAgo === "auto") return t.zones.wateringAuto;
  return t.zones.wateringHoursAgo.replace("{hours}", String(hoursAgo));
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

  const locale = getLocale("es");
  const t = locale.water;

  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedPlot, setSelectedPlot] = useState<string>("");

  const getTrendIcon = (trend: string) => {
    if (trend === "up")
      return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (trend === "down")
      return <TrendingDown className="w-3 h-3 text-red-500" />;
    return null;
  };

  const getTrendLabel = (trend: string) => {
    if (trend === "up") return t.zones.trendUp;
    if (trend === "down") return t.zones.trendDown;
    return t.zones.trendStable;
  };

  const consumptionPercent = Math.round(
    (waterControl.consumption.current / waterControl.consumption.limit) * 100,
  );

  const forecastText = t.control.forecastTemplate
    .replace("{temp}", String(forecast.airTempC))
    .replace("{percent}", String(forecast.irrigationIncreasePercent));

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-gradient-to-br from-offWhite to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
                  <Droplets className="w-8 h-8 text-blue-600" />
                </div>
                {t.header.title}
              </h1>
              <p className="text-oliveGreen/70">{t.header.subtitle}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="glass-red"
              size="md"
              icon={<Calendar className="w-4 h-4" />}
            >
              {t.header.rangeLastWeek}
            </Button>
            <Button
              variant="glass-red"
              size="md"
              icon={<Download className="w-4 h-4" />}
            >
              {t.header.exportData}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-blue-100 shadow-lg">
            <p className="text-sm text-oliveGreen/60">{t.stats.average}</p>
            <p className="text-3xl font-bold text-blue-600">{average}%</p>
            <p className="text-xs text-green-600 mt-1">
              {t.stats.averageTrend}
            </p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-blue-100 shadow-lg">
            <p className="text-sm text-oliveGreen/60">{t.stats.optimalZones}</p>
            <p className="text-3xl font-bold text-green-600">{optimalZones}</p>
            <p className="text-xs text-oliveGreen/60">
              {t.stats.ofZones.replace("{count}", String(zones.length))}
            </p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-blue-100 shadow-lg">
            <p className="text-sm text-oliveGreen/60">{t.stats.needsWater}</p>
            <p className="text-3xl font-bold text-red-600">{criticalZones}</p>
            <p className="text-xs text-orange-600">{t.stats.urgentAttention}</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-blue-100 shadow-lg">
            <p className="text-sm text-oliveGreen/60">{t.stats.lastReading}</p>
            <p className="text-3xl font-bold text-purple-600">
              {lastReadingMinutes} min
            </p>
            <p className="text-xs text-oliveGreen/60">
              {t.stats.activeSensors}
            </p>
          </div>
        </div>

        {/* Climate */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-200">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium">
                {t.climate.temperatureLabel}
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {climate.temperature.value}
              {climate.temperature.unit}
            </p>
            <p className="text-xs text-oliveGreen/60">
              {t.climate.temperatureNote.replace(
                "{feelsLike}",
                String(climate.temperature.feelsLike),
              )}
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">
                {t.climate.humidityLabel}
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {climate.ambientHumidity.value}
              {climate.ambientHumidity.unit}
            </p>
            <p className="text-xs text-oliveGreen/60">
              {t.climate.humidityNote.replace(
                "{windKmh}",
                String(climate.ambientHumidity.windKmh),
              )}
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl p-4 border border-green-200">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium">
                {t.climate.evapotranspirationLabel}
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {climate.evapotranspiration.value}{" "}
              {climate.evapotranspiration.unit}
            </p>
            <p className="text-xs text-oliveGreen/60">
              {t.climate.evapotranspirationNote.replace(
                "{hint}",
                String(climate.evapotranspiration.irrigationHint),
              )}
            </p>
          </div>
        </div>

        {/* Copernicus */}
        <div className="mb-8">
          <CopernicusWidget selectedPlot={selectedPlot} />
        </div>

        <div className="mb-8">
          <CopernicusMap
            initialLayer="satellite"
            initialCenter={FARM_CENTER}
            initialZoom={FARM_DEFAULT_ZOOM}
            height="500px"
          />
        </div>

        {/* Zones */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-charcoalGray mb-6 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
              <Droplets className="w-5 h-5 text-blue-600" />
            </div>
            {t.zones.sectionTitle}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zones.map((zone) => {
              const status = getZoneStatus(zone.current, zone.optimal);
              const color = getZoneColor(zone.current, zone.optimal);
              const zoneName =
                locale.zones[zone.id as keyof typeof locale.zones] ?? zone.id;

              return (
                <div
                  key={zone.id}
                  className={`group bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border transition-all duration-300 cursor-pointer hover:shadow-xl ${
                    status.status === "critical"
                      ? "border-red-200"
                      : status.status === "optimal"
                        ? "border-green-200"
                        : "border-yellow-200"
                  }`}
                  onClick={() => {
                    const newZone = zone.id === selectedZone ? null : zone.id;
                    setSelectedZone(newZone);
                    if (newZone) setSelectedPlot(zone.location);
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-charcoalGray">
                        {zoneName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-oliveGreen/60">
                          {zone.location}
                        </span>
                        <span className="text-xs text-oliveGreen/40">•</span>
                        <span className="text-xs text-oliveGreen/60">
                          {zone.soilType}
                        </span>
                      </div>
                      <div className="text-xs text-oliveGreen/60 mt-1">
                        {t.zones.watering}:{" "}
                        {formatWateringAgo(zone.lastWateringHoursAgo, t)}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${status.colorClass}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  {/* Circular meter */}
                  <div className="flex justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e5e7eb"
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
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                        <text
                          x="50"
                          y="50"
                          textAnchor="middle"
                          dy="0.3em"
                          className="text-2xl font-bold"
                          fill={color}
                        >
                          {zone.current}%
                        </text>
                      </svg>
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-1 mb-3">
                    {getTrendIcon(zone.trend)}
                    <span className="text-xs text-oliveGreen/60">
                      {getTrendLabel(zone.trend)}
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs text-oliveGreen/60 mb-2">
                      {t.zones.evolution24h}
                    </p>
                    <div className="flex items-end justify-between h-16 gap-1">
                      {zone.history.map((value, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-blue-400 to-blue-500 rounded-t"
                          style={{
                            height: `${value}%`,
                            opacity: 0.7 + (i / zone.history.length) * 0.3,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-blue-100 flex justify-between text-sm">
                    <span className="text-oliveGreen/60">
                      {t.zones.optimal}: {zone.optimal}%
                    </span>
                    <span className="font-medium text-charcoalGray">
                      {t.zones.current}: {zone.current}%
                    </span>
                  </div>

                  {selectedZone === zone.id && (
                    <div className="mt-4 pt-4 border-t border-blue-100">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-blue-50/50 rounded-lg p-2">
                          <p className="text-xs text-oliveGreen/60">
                            {t.zones.recommendation}
                          </p>
                          <p className="font-medium text-charcoalGray">
                            {zone.current < zone.optimal
                              ? t.zones.recommendationWater.replace(
                                  "{liters}",
                                  String(
                                    Math.round(
                                      (zone.optimal - zone.current) * 0.5,
                                    ),
                                  ),
                                )
                              : t.zones.recommendationKeep}
                          </p>
                        </div>
                        <div className="bg-blue-50/50 rounded-lg p-2">
                          <p className="text-xs text-oliveGreen/60">
                            {t.zones.nextWatering}
                          </p>
                          <p className="font-medium text-charcoalGray">
                            {zone.current < zone.optimal
                              ? t.zones.nextWateringNow
                              : t.zones.nextWateringLater}
                          </p>
                        </div>
                      </div>
                      <Button variant="blue" size="sm" className="w-full mt-3">
                        {t.zones.manualWatering}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Control */}
        <div className="bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-blue-200 shadow-xl">
          <h2 className="text-2xl font-bold text-charcoalGray mb-6 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
              <Droplets className="w-6 h-6 text-blue-600" />
            </div>
            {t.control.title}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {t.control.autoIrrigation}
              </h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-oliveGreen/70">{t.control.status}</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {waterControl.autoIrrigation.enabled
                    ? t.control.statusOn
                    : t.control.statusOff}
                </span>
              </div>
              <div>
                <p className="text-sm text-oliveGreen/60">
                  {t.control.nextScheduled}
                </p>
                <p className="text-xl font-bold text-charcoalGray">
                  {t.control.nextInHours.replace(
                    "{hours}",
                    String(waterControl.autoIrrigation.nextInHours),
                  )}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-100">
                <p className="text-xs text-oliveGreen/60">
                  {t.control.duration}
                </p>
                <p className="font-medium">
                  {t.control.durationMinutes.replace(
                    "{minutes}",
                    String(waterControl.autoIrrigation.durationMinutes),
                  )}
                </p>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-lg mb-4">
                {t.control.consumptionTitle}
              </h3>
              <p className="text-4xl font-bold text-blue-600">
                {waterControl.consumption.current}
                <span className="text-lg">{waterControl.consumption.unit}</span>
              </p>
              <p className="text-sm text-oliveGreen/60 mb-3">
                {t.control.consumptionPeriod.replace(
                  "{hours}",
                  String(waterControl.consumption.periodHours),
                )}
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                  style={{ width: `${consumptionPercent}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-oliveGreen/60">
                <span>0{waterControl.consumption.unit}</span>
                <span>
                  {waterControl.consumption.current}
                  {waterControl.consumption.unit}
                </span>
                <span>
                  {waterControl.consumption.limit}
                  {waterControl.consumption.unit} ({t.control.consumptionLimit})
                </span>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-lg mb-4">
                {t.control.quickActions}
              </h3>
              <Button variant="gradient-blue" className="w-full mb-2">
                {t.zones.manualWatering}
              </Button>
              <Button variant="outline-blue" className="w-full">
                {t.control.scheduleWatering}
              </Button>
              <Button variant="ghost" size="sm" className="w-full mt-2">
                {t.control.advancedConfig}
              </Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50/50 rounded-xl border border-yellow-200">
            <p className="text-sm text-oliveGreen/70 flex items-center gap-2">
              <Sun className="w-4 h-4 text-yellow-600" />
              {t.control.forecast}: {forecastText}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-blue-100 mt-8">
          <p className="text-sm text-oliveGreen/70">{t.footer.realtime}</p>
          <p className="text-xs text-oliveGreen/50 mt-2">
            {t.footer.syncMinutesAgo.replace(
              "{minutes}",
              String(lastReadingMinutes),
            )}{" "}
            · {t.footer.allOperational}
          </p>
        </div>
      </div>
    </div>
  );
}
