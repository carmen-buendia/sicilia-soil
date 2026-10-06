"use client";

import { useState, useEffect } from "react";
import {
  Sun,
  ArrowLeft,
  AlertCircle,
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  Clock,
  Droplets,
  Thermometer,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@sicilia-soil/ui";
import {
  getLightRecommendations,
  getLightStatusColor,
  getLightProgressColor,
  getRecommendedPlants,
} from "@sicilia-soil/utils";
import { useLightData } from "@/hooks/useLightData";

export default function LightPage() {
  const {
    zones,
    historical,
    forecast,
    climate,
    sunData,
    average,
    lowZones,
    optimalZones,
  } = useLightData();

  const [selectedZone, setSelectedZone] = useState(zones[0]);
  const [isLive, setIsLive] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const rec = getLightRecommendations(selectedZone.current);
  const progressColor = getLightProgressColor(selectedZone.current);

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-gradient-to-br from-offWhite to-yellow-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-yellow-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-yellow-600" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl">
                  <Sun className="w-8 h-8 text-yellow-600" />
                </div>
                Luz Solar
              </h1>
              <p className="text-oliveGreen/70">
                Monitoreo de radiación solar por zona de cultivo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/50 backdrop-blur-sm rounded-xl border border-yellow-200">
              <Clock className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium">
                {isClient ? currentTime : "--:--:--"}
              </span>
            </div>

            <Button
              variant="toggle-live"
              active={isLive}
              onClick={() => setIsLive(!isLive)}
              icon={
                <span
                  className={`w-2 h-2 rounded-full ${
                    isLive ? "bg-green-500 animate-pulse" : "bg-gray-500"
                  }`}
                />
              }
            >
              {isLive ? "Tiempo real" : "Pausado"}
            </Button>

            <Button
              variant="icon-glass-yellow"
              onClick={() => {}}
              aria-label="Calendario"
            >
              <Calendar className="w-5 h-5" />
            </Button>

            <Button
              variant="icon-glass-yellow"
              onClick={() => {}}
              aria-label="Descargar"
            >
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-yellow-100 shadow-lg hover:shadow-xl transition-all">
            <p className="text-sm text-oliveGreen/60">Promedio general</p>
            <p className="text-3xl font-bold text-yellow-600">{average}%</p>
            <p className="text-xs text-green-600 mt-1">↑ 2% vs ayer</p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-yellow-100 shadow-lg hover:shadow-xl transition-all">
            <p className="text-sm text-oliveGreen/60">Zonas óptimas</p>
            <p className="text-3xl font-bold text-green-600">{optimalZones}</p>
            <p className="text-xs text-oliveGreen/60">
              de {zones.length} zonas
            </p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-yellow-100 shadow-lg hover:shadow-xl transition-all">
            <p className="text-sm text-oliveGreen/60">Poca luz</p>
            <p className="text-3xl font-bold text-red-600">{lowZones}</p>
            <p className="text-xs text-orange-600">⚠️ Requiere atención</p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-yellow-100 shadow-lg hover:shadow-xl transition-all">
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
                {climate.ambientHumidity.label}
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {climate.ambientHumidity.value} {climate.ambientHumidity.unit}
            </p>
            <p className="text-xs text-oliveGreen/60">
              {climate.ambientHumidity.status}
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl p-4 border border-green-200">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium">
                {climate.temperature.label}
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {climate.temperature.value} {climate.temperature.unit}
            </p>
            <p className="text-xs text-oliveGreen/60">
              {climate.temperature.status}
            </p>
          </div>
        </div>

        {/* Selector de zonas */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
          {zones.map((zone) => (
            <Button
              key={zone.id}
              variant="chip-yellow"
              active={selectedZone.id === zone.id}
              onClick={() => setSelectedZone(zone)}
              icon={<span className="text-xl">{zone.icon}</span>}
              className="whitespace-nowrap"
            >
              <span className="font-medium">{zone.zone}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedZone.id === zone.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {zone.current}%
              </span>
            </Button>
          ))}
        </div>

        {/* Grid principal */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Columna izquierda */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tarjeta principal */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-yellow-200">
              <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-charcoalGray flex items-center gap-2">
                    <span className="text-3xl">{selectedZone.icon}</span>
                    {selectedZone.zone}
                  </h2>
                  <p className="text-oliveGreen/60">{selectedZone.location}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getLightStatusColor(selectedZone.status)}`}
                >
                  {selectedZone.status === "excelente"
                    ? "Óptimo"
                    : selectedZone.status === "buena"
                      ? "Bueno"
                      : selectedZone.status === "baja"
                        ? "Bajo"
                        : "Crítico"}
                </span>
              </div>

              {/* Medidor circular */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-48 h-48">
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
                      stroke={progressColor}
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - selectedZone.current / 100)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      className="transition-all duration-500"
                    />
                    <text
                      x="50"
                      y="45"
                      textAnchor="middle"
                      className="text-3xl font-bold"
                      fill="#1f2937"
                    >
                      {selectedZone.current}%
                    </text>
                    <text
                      x="50"
                      y="60"
                      textAnchor="middle"
                      className="text-xs"
                      fill="#6b7280"
                    >
                      radiación
                    </text>
                  </svg>
                </div>

                <div className="flex gap-8 mt-4">
                  <div className="text-center">
                    <p className="text-sm text-oliveGreen/60">Índice UV</p>
                    <p className="text-2xl font-bold text-charcoalGray">
                      {selectedZone.uv}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-oliveGreen/60">Horas sol</p>
                    <p className="text-2xl font-bold text-charcoalGray">
                      {selectedZone.hours}h
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-oliveGreen/60">Óptimo</p>
                    <p className="text-2xl font-bold text-charcoalGray">
                      {selectedZone.optimal}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Barra de rango */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-oliveGreen/60">Rango óptimo</span>
                  <span className="font-medium">
                    {selectedZone.optimal - 10}% - {selectedZone.optimal + 10}%
                  </span>
                </div>
                <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-gradient-to-r from-yellow-400 to-orange-400"
                    style={{ width: `${selectedZone.optimal}%` }}
                  />
                  <div
                    className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md transition-all duration-300"
                    style={{
                      left: `${selectedZone.current}%`,
                      top: "-2px",
                      transform: "translateX(-50%)",
                      backgroundColor: progressColor,
                    }}
                  />
                </div>
              </div>

              {/* Tendencia */}
              <div className="mt-4 flex items-center gap-2 text-sm">
                {selectedZone.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={
                    selectedZone.trend === "up"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {selectedZone.trend === "up" ? "Aumentando" : "Disminuyendo"}{" "}
                  vs ayer
                </span>
              </div>
            </div>

            {/* Gráfico histórico */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-yellow-200">
              <h3 className="text-lg font-bold text-charcoalGray mb-4">
                Últimos 7 días
              </h3>
              <div className="flex items-end justify-between h-48 gap-2">
                {historical.map((day, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center flex-1 group"
                  >
                    <div className="relative w-full flex justify-center gap-1">
                      <div
                        className="w-4 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t transition-all group-hover:from-yellow-500 group-hover:to-yellow-600"
                        style={{ height: `${day.value * 1.5}px` }}
                      />
                      <div
                        className="w-4 bg-gray-300 rounded-t opacity-50"
                        style={{ height: `${day.optimal * 1.5}px` }}
                      />
                    </div>
                    <span className="text-xs mt-2 text-oliveGreen/60">
                      {day.day}
                    </span>
                    <span className="text-xs font-bold">{day.value}%</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4 mt-4 text-xs text-oliveGreen/60">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-yellow-400 rounded"></span> Actual
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-gray-300 rounded"></span> Óptimo
                </span>
              </div>
            </div>

            {/* Previsión */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-yellow-200">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <Sun className="w-5 h-5 text-yellow-600" />
                Previsión próximos días
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {forecast.map((day, i) => (
                  <div key={i} className="text-center p-3 bg-white rounded-xl">
                    <p className="font-medium text-sm">{day.day}</p>
                    <p className="text-2xl mt-1">{day.value}%</p>
                    <p className="text-xs text-oliveGreen/60">UV {day.uv}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-6">
            {/* Recomendaciones */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-yellow-200">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                Recomendaciones
              </h3>

              <div className={`p-4 rounded-xl ${rec.bg} border ${rec.border}`}>
                <p className="text-charcoalGray mb-2">{rec.text}</p>
                <p className={`font-medium ${rec.color}`}>{rec.action}</p>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-charcoalGray mb-3">
                  Plantas recomendadas:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {getRecommendedPlants(selectedZone.current).map((plant) => (
                    <span
                      key={plant}
                      className="px-3 py-2 bg-yellow-50 rounded-lg text-sm"
                    >
                      {plant}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Control de iluminación */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-yellow-200">
              <h3 className="text-lg font-bold text-charcoalGray mb-4">
                Control de iluminación
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-charcoalGray">Notificaciones</span>
                    <button
                      onClick={() => setNotifications(!notifications)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications ? "bg-yellow-500" : "bg-gray-300"
                      }`}
                      aria-label="Notificaciones"
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications ? "translate-x-6" : ""
                        }`}
                      />
                    </button>
                  </label>
                  <p className="text-xs text-oliveGreen/60">
                    Alertas cuando la luz sea baja
                  </p>
                </div>

                <div className="border-t border-yellow-100 pt-4">
                  <p className="font-medium text-charcoalGray mb-2">
                    Programar alertas:
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-oliveGreen/70">
                      <input
                        type="checkbox"
                        className="rounded text-yellow-500"
                        defaultChecked
                      />
                      <span>Luz por debajo del 40%</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-oliveGreen/70">
                      <input
                        type="checkbox"
                        className="rounded text-yellow-500"
                        defaultChecked
                      />
                      <span>Exceso de UV (índice &gt; 6)</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-oliveGreen/70">
                      <input
                        type="checkbox"
                        className="rounded text-yellow-500"
                      />
                      <span>Horas de sol insuficientes</span>
                    </label>
                  </div>
                </div>

                <Button variant="gradient-yellow" className="w-full">
                  Guardar configuración
                </Button>
              </div>
            </div>

            {/* Datos adicionales */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-yellow-200">
              <h3 className="text-lg font-bold text-charcoalGray mb-4">
                Datos adicionales
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-oliveGreen/60">Amanecer</span>
                  <span className="font-medium">{sunData.sunrise}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-oliveGreen/60">Atardecer</span>
                  <span className="font-medium">{sunData.sunset}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-oliveGreen/60">Horas de luz</span>
                  <span className="font-medium">{sunData.dayLength}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-oliveGreen/60">Índice UV máximo</span>
                  <span className="font-medium text-yellow-600">
                    {sunData.maxUV.value} ({sunData.maxUV.label})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-oliveGreen/60">Próxima alarma</span>
                  <span className="font-medium">{sunData.nextAlarm}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-yellow-200">
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-bold text-charcoalGray mb-2">
                Sobre la luz solar
              </h4>
              <p className="text-oliveGreen/70">
                Los niveles óptimos varían según el tipo de planta. Consulta las
                recomendaciones para cada zona.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-charcoalGray mb-2">
                Próximas acciones
              </h4>
              <ul className="space-y-1 text-oliveGreen/70">
                <li>• Riego automático en zonas con poca luz</li>
                <li>• Revisar plantas en zona de olivar</li>
                <li>• Programar malla de sombreo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-charcoalGray mb-2">Estadísticas</h4>
              <p className="text-oliveGreen/70">Promedio general: {average}%</p>
              <p className="text-oliveGreen/70">
                Mejor zona: Huerta de Tomates (78%)
              </p>
              <p className="text-oliveGreen/70">Zona crítica: Compost (30%)</p>
            </div>
          </div>
          <p className="text-center text-xs text-oliveGreen/50 mt-6">
            Datos actualizados en tiempo real • Sensores de luz UV
          </p>
        </footer>
      </div>
    </div>
  );
}
