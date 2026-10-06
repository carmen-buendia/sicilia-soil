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
import { CopernicusWidget } from "@/components/features/analysis/components/CopernicusWidget";
import { CopernicusMap } from "@/components/features/analysis/components/CopernicusMap";
import { useHumidityData } from "@/hooks/useHumidityData";
import { getZoneStatus, getZoneColor } from "@sicilia-soil/core";
import { FARM_CENTER, FARM_DEFAULT_ZOOM } from "@sicilia-soil/core";

export default function HumedadPage() {
  const {
    zones,
    climate,
    waterControl,
    forecast,
    lastReading,
    average,
    criticalZones,
    optimalZones,
  } = useHumidityData();

  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedPlot, setSelectedPlot] = useState<string>(
    "Sicilia — Food Forest (Assoro)",
  );

  const getTrendIcon = (trend: string) => {
    if (trend === "up")
      return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (trend === "down")
      return <TrendingDown className="w-3 h-3 text-red-500" />;
    return null;
  };

  const consumptionPercent = Math.round(
    (waterControl.consumption.current / waterControl.consumption.limit) * 100,
  );

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-gradient-to-br from-offWhite to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
                  <Droplets className="w-8 h-8 text-blue-600" />
                </div>
                Humedad del Suelo
              </h1>
              <p className="text-oliveGreen/70">
                Monitoreo detallado de humedad por zona de cultivo
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="glass-red"
              size="md"
              icon={<Calendar className="w-4 h-4" />}
            >
              Última semana
            </Button>
            <Button
              variant="glass-red"
              size="md"
              icon={<Download className="w-4 h-4" />}
            >
              Exportar datos
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-blue-100 shadow-lg hover:shadow-xl transition-all">
            <p className="text-sm text-oliveGreen/60">Promedio general</p>
            <p className="text-3xl font-bold text-blue-600">{average}%</p>
            <p className="text-xs text-green-600 mt-1">↑ 2% vs ayer</p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-blue-100 shadow-lg hover:shadow-xl transition-all">
            <p className="text-sm text-oliveGreen/60">Zonas óptimas</p>
            <p className="text-3xl font-bold text-green-600">{optimalZones}</p>
            <p className="text-xs text-oliveGreen/60">
              de {zones.length} zonas
            </p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-blue-100 shadow-lg hover:shadow-xl transition-all">
            <p className="text-sm text-oliveGreen/60">Necesitan riego</p>
            <p className="text-3xl font-bold text-red-600">{criticalZones}</p>
            <p className="text-xs text-orange-600">⚠️ Atención urgente</p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-blue-100 shadow-lg hover:shadow-xl transition-all">
            <p className="text-sm text-oliveGreen/60">Última lectura</p>
            <p className="text-3xl font-bold text-purple-600">{lastReading}</p>
            <p className="text-xs text-oliveGreen/60">sensores activos</p>
          </div>
        </div>

        {/* Dashboard Climático */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-200">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium">
                {climate.temperature.label}
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {climate.temperature.value}
              {climate.temperature.unit}
            </p>
            <p className="text-xs text-oliveGreen/60">
              {climate.temperature.note}
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">
                {climate.ambientHumidity.label}
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {climate.ambientHumidity.value}
              {climate.ambientHumidity.unit}
            </p>
            <p className="text-xs text-oliveGreen/60">
              {climate.ambientHumidity.note}
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl p-4 border border-green-200">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium">
                {climate.evapotranspiration.label}
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {climate.evapotranspiration.value}{" "}
              {climate.evapotranspiration.unit}
            </p>
            <p className="text-xs text-oliveGreen/60">
              {climate.evapotranspiration.note}
            </p>
          </div>
        </div>

        {/* Copernicus Widget */}
        <div className="mb-8">
          <CopernicusWidget selectedPlot={selectedPlot} />
        </div>

        {/* Copernicus Map — CORREGIDO */}
        <div className="mb-8">
          <CopernicusMap
            initialLayer="satellite"
            initialCenter={FARM_CENTER}
            initialZoom={FARM_DEFAULT_ZOOM}
            height="500px"
          />
        </div>

        {/* Grid de Zonas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-charcoalGray mb-6 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
              <Droplets className="w-5 h-5 text-blue-600" />
            </div>
            Monitoreo por Zona
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zones.map((zone) => {
              const status = getZoneStatus(zone.current, zone.optimal);
              const color = getZoneColor(zone.current, zone.optimal);

              return (
                <div
                  key={zone.id}
                  className={`group bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border transition-all duration-300 cursor-pointer hover:shadow-xl ${
                    status.status === "critical"
                      ? "border-red-200 hover:border-red-300"
                      : status.status === "optimal"
                        ? "border-green-200 hover:border-green-300"
                        : "border-yellow-200 hover:border-yellow-300"
                  }`}
                  onClick={() => {
                    const newZone = zone.id === selectedZone ? null : zone.id;
                    setSelectedZone(newZone);
                    if (newZone) setSelectedPlot(`Sicilia — ${zone.zone}`);
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-charcoalGray flex items-center gap-2">
                        <span>{zone.icon}</span>
                        {zone.zone}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-oliveGreen/60">
                          {zone.soilType}
                        </span>
                        <span className="text-xs text-oliveGreen/40">•</span>
                        <span className="text-xs text-oliveGreen/60">
                          Riego: {zone.lastWatering}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${status.colorClass}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  {/* Medidor circular */}
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
                          className="transition-all duration-500"
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
                      {zone.trend === "up" && "Aumentando"}
                      {zone.trend === "down" && "Disminuyendo"}
                      {zone.trend === "stable" && "Estable"}
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs text-oliveGreen/60 mb-2">
                      Evolución últimas 24h
                    </p>
                    <div className="flex items-end justify-between h-16 gap-1">
                      {zone.history.map((value, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-blue-400 to-blue-500 rounded-t transition-all duration-300 hover:from-blue-500 hover:to-blue-600"
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
                      Óptimo: {zone.optimal}%
                    </span>
                    <span className="font-medium text-charcoalGray">
                      Actual: {zone.current}%
                    </span>
                  </div>

                  {selectedZone === zone.id && (
                    <div className="mt-4 pt-4 border-t border-blue-100">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-blue-50/50 rounded-lg p-2">
                          <p className="text-xs text-oliveGreen/60">
                            Recomendación
                          </p>
                          <p className="font-medium text-charcoalGray">
                            {zone.current < zone.optimal
                              ? `Regar ${Math.round((zone.optimal - zone.current) * 0.5)}L/m²`
                              : "Mantener nivel actual"}
                          </p>
                        </div>
                        <div className="bg-blue-50/50 rounded-lg p-2">
                          <p className="text-xs text-oliveGreen/60">
                            Próximo riego
                          </p>
                          <p className="font-medium text-charcoalGray">
                            {zone.current < zone.optimal
                              ? "Inmediato"
                              : "En 6-8 horas"}
                          </p>
                        </div>
                      </div>
                      <Button variant="blue" size="sm" className="w-full mt-3">
                        💧 Riego manual ahora
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel de Control de Riego */}
        <div className="bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-blue-200 shadow-xl">
          <h2 className="text-2xl font-bold text-charcoalGray mb-6 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
              <Droplets className="w-6 h-6 text-blue-600" />
            </div>
            Control de Riego Inteligente
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Riego automático
              </h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-oliveGreen/70">Estado</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {waterControl.autoIrrigation.statusLabel}
                </span>
              </div>
              <div>
                <p className="text-sm text-oliveGreen/60">
                  Próximo riego programado
                </p>
                <p className="text-xl font-bold text-charcoalGray">
                  {waterControl.autoIrrigation.nextIn}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-100">
                <p className="text-xs text-oliveGreen/60">Duración estimada</p>
                <p className="font-medium">
                  {waterControl.autoIrrigation.duration}
                </p>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-lg mb-4">Consumo de agua</h3>
              <p className="text-4xl font-bold text-blue-600">
                {waterControl.consumption.current}
                <span className="text-lg">{waterControl.consumption.unit}</span>
              </p>
              <p className="text-sm text-oliveGreen/60 mb-3">
                {waterControl.consumption.period}
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
                  {waterControl.consumption.unit} (límite)
                </span>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-lg mb-4">Acciones rápidas</h3>
              <Button variant="gradient-blue" className="w-full mb-2">
                💧 Riego manual ahora
              </Button>
              <Button variant="outline-blue" className="w-full">
                📅 Programar riego
              </Button>
              <Button variant="ghost" size="sm" className="w-full mt-2">
                ⚙️ Configuración avanzada
              </Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50/50 rounded-xl border border-yellow-200">
            <p className="text-sm text-oliveGreen/70 flex items-center gap-2">
              <Sun className="w-4 h-4 text-yellow-600" />
              Pronóstico: {forecast}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-blue-100 mt-8">
          <p className="text-sm text-oliveGreen/70">
            💧 Datos actualizados en tiempo real desde sensores IoT
          </p>
          <p className="text-xs text-oliveGreen/50 mt-2">
            Última sincronización: hace 2 minutos · Todos los sensores
            operativos
          </p>
        </div>
      </div>
    </div>
  );
}
