"use client";

import { useState } from "react";
import {
  Thermometer,
  ArrowLeft,
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  Droplets,
  Wind,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@sicilia-soil/ui";
import { useTemperatureData } from "@/hooks/useTemperatureData";
import { getTempStatusColor, getTempStatusText } from "@sicilia-soil/core";

export default function TemperaturePage() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const { zones, climate, average, highZones, optimalZones } =
    useTemperatureData();

  const getTrendIcon = (trend: string) => {
    if (trend === "up")
      return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (trend === "down")
      return <TrendingDown className="w-3 h-3 text-red-500" />;
    return null;
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-gradient-to-br from-offWhite to-red-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-red-600" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl">
                  <Thermometer className="w-8 h-8 text-red-600" />
                </div>
                Temperatura del Suelo
              </h1>
              <p className="text-oliveGreen/70">
                Monitoreo detallado de temperatura por zona de cultivo
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
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-red-100 shadow-lg hover:shadow-xl transition-all">
            <p className="text-sm text-oliveGreen/60">Promedio general</p>
            <p className="text-3xl font-bold text-red-600">{average}°C</p>
            <p className="text-xs text-green-600 mt-1">↑ 1°C vs ayer</p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-red-100 shadow-lg hover:shadow-xl transition-all">
            <p className="text-sm text-oliveGreen/60">Zonas óptimas</p>
            <p className="text-3xl font-bold text-green-600">{optimalZones}</p>
            <p className="text-xs text-oliveGreen/60">
              de {zones.length} zonas
            </p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-red-100 shadow-lg hover:shadow-xl transition-all">
            <p className="text-sm text-oliveGreen/60">Temperatura alta</p>
            <p className="text-3xl font-bold text-red-600">{highZones}</p>
            <p className="text-xs text-orange-600">⚠️ Requiere atención</p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-red-100 shadow-lg hover:shadow-xl transition-all">
            <p className="text-sm text-oliveGreen/60">Última lectura</p>
            <p className="text-3xl font-bold text-purple-600">2 min</p>
            <p className="text-xs text-oliveGreen/60">sensores activos</p>
          </div>
        </div>

        {/* Dashboard Climático */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-200">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium">
                {climate.solarRadiation.label}
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {climate.solarRadiation.value} {climate.solarRadiation.unit}
            </p>
            <p className="text-xs text-oliveGreen/60">
              {climate.solarRadiation.status}
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">
                {climate.relativeHumidity.label}
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {climate.relativeHumidity.value} {climate.relativeHumidity.unit}
            </p>
            <p className="text-xs text-oliveGreen/60">
              {climate.relativeHumidity.status}
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl p-4 border border-green-200">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium">{climate.wind.label}</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {climate.wind.value} {climate.wind.unit}
            </p>
            <p className="text-xs text-oliveGreen/60">{climate.wind.status}</p>
          </div>
        </div>

        {/* Grid de Zonas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-charcoalGray mb-6 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl">
              <Thermometer className="w-5 h-5 text-red-600" />
            </div>
            Monitoreo por Zona
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zones.map((zone) => (
              <div
                key={zone.id}
                className={`group bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border transition-all duration-300 cursor-pointer hover:shadow-xl ${
                  zone.current > zone.optimal + 5
                    ? "border-red-200 hover:border-red-300"
                    : zone.current <= zone.optimal
                      ? "border-green-200 hover:border-green-300"
                      : "border-yellow-200 hover:border-yellow-300"
                }`}
                onClick={() =>
                  setSelectedZone(zone.id === selectedZone ? null : zone.id)
                }
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-charcoalGray flex items-center gap-2">
                      <span>{zone.icon}</span>
                      {zone.zone}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-oliveGreen/60">
                        {zone.soilType} · {zone.location}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getTempStatusColor(zone.current, zone.optimal)}`}
                  >
                    {getTempStatusText(zone.current, zone.optimal)}
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
                        stroke={
                          zone.current <= zone.optimal
                            ? "#22c55e"
                            : zone.current <= zone.optimal + 5
                              ? "#eab308"
                              : "#ef4444"
                        }
                        strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - zone.current / 50)}`}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                        className="transition-all duration-500"
                      />
                      <text
                        x="50"
                        y="45"
                        textAnchor="middle"
                        className="text-2xl font-bold"
                        fill="#1f2937"
                      >
                        {zone.current}°
                      </text>
                      <text
                        x="50"
                        y="60"
                        textAnchor="middle"
                        className="text-xs"
                        fill="#6b7280"
                      >
                        {zone.unit.replace("°", "")}
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Indicador de tendencia */}
                <div className="flex justify-center items-center gap-1 mb-3">
                  {getTrendIcon(zone.trend)}
                  <span className="text-xs text-oliveGreen/60">
                    {zone.trend === "up" && "Aumentando"}
                    {zone.trend === "down" && "Disminuyendo"}
                    {zone.trend === "stable" && "Estable"}
                  </span>
                </div>

                {/* Mini gráfico histórico */}
                <div className="mt-4">
                  <p className="text-xs text-oliveGreen/60 mb-2">
                    Evolución últimas 24h
                  </p>
                  <div className="flex items-end justify-between h-16 gap-1">
                    {zone.history.map((value, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-red-400 to-red-500 rounded-t transition-all duration-300 hover:from-red-500 hover:to-red-600"
                        style={{
                          height: `${(value / 40) * 100}%`,
                          opacity: 0.7 + (i / zone.history.length) * 0.3,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-red-100 flex justify-between text-sm">
                  <span className="text-oliveGreen/60">
                    Óptimo: ≤{zone.optimal}
                    {zone.unit}
                  </span>
                  <span className="font-medium text-charcoalGray">
                    Actual: {zone.current}
                    {zone.unit}
                  </span>
                </div>

                {/* Panel expandido */}
                {selectedZone === zone.id && (
                  <div className="mt-4 pt-4 border-t border-red-100">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-red-50/50 rounded-lg p-2">
                        <p className="text-xs text-oliveGreen/60">
                          Rango óptimo
                        </p>
                        <p className="font-medium text-charcoalGray">
                          {zone.min}
                          {zone.unit} - {zone.max}
                          {zone.unit}
                        </p>
                      </div>
                      <div className="bg-red-50/50 rounded-lg p-2">
                        <p className="text-xs text-oliveGreen/60">
                          Recomendación
                        </p>
                        <p className="font-medium text-charcoalGray">
                          {zone.current > zone.optimal
                            ? "Proteger del sol directo"
                            : "Temperatura adecuada"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-red-100 mt-8">
          <p className="text-sm text-oliveGreen/70">
            🌡️ Datos actualizados en tiempo real desde sensores IoT
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
