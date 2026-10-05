"use client";

import { useState } from "react";
import {
  Satellite,
  Cloud,
  Droplets,
  Thermometer,
  ShieldCheck,
  RefreshCw,
  Eye,
} from "lucide-react";
import {
  type CopernicusData,
  type CopernicusTabType,
  type CopernicusWidgetProps,
} from "@sicilia-soil/core";
import {
  DEFAULT_PLOT_NAME,
  DEFAULT_COPERNICUS_DATA,
} from "@sicilia-soil/core/data/copernicus.defaults";

export function CopernicusWidget({
  selectedPlot = DEFAULT_PLOT_NAME,
  data = DEFAULT_COPERNICUS_DATA,
}: CopernicusWidgetProps) {
  const [activeTab, setActiveTab] = useState<CopernicusTabType>("indices");

  return (
    <div className="bg-white/50 backdrop-blur-sm border border-blue-100 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all text-charcoalGray">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-blue-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg text-blue-600">
            <Satellite className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-lg text-charcoalGray">
                Copernicus Earth Observation
              </h3>
              <span className="text-xs bg-blue-100 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
                Data Cube Engine
              </span>
            </div>
            <p className="text-xs text-oliveGreen/70">
              Monitoreo Satelital · {selectedPlot}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-oliveGreen/70 bg-blue-50/70 px-3 py-1.5 rounded-lg border border-blue-100">
          <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
          <span>
            Última pasada:{" "}
            <strong className="text-charcoalGray font-semibold">
              {data.lastPass}
            </strong>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 my-4 border-b border-blue-100 pb-2 text-sm">
        <button
          type="button"
          onClick={() => setActiveTab("indices")}
          className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
            activeTab === "indices"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-oliveGreen/70 hover:text-charcoalGray hover:bg-blue-50"
          }`}
        >
          Índices de Satélite
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("analysis")}
          className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
            activeTab === "analysis"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-oliveGreen/70 hover:text-charcoalGray hover:bg-blue-50"
          }`}
        >
          Análisis
        </button>
      </div>

      {/* Tab 1: Índices */}
      {activeTab === "indices" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-lg hover:border-blue-200 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-oliveGreen/70">
                NDVI (Vigor)
              </span>
              <Eye className="w-4 h-4 text-emerald-600" />
            </div>
            <div className={`text-2xl font-bold ${data.indices.ndvi.color}`}>
              {data.indices.ndvi.value}
            </div>
            <span className="text-xs text-oliveGreen/60">
              {data.indices.ndvi.status} · Sentinel-2
            </span>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-lg hover:border-blue-200 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-oliveGreen/70">
                NDWI (Agua Foliar)
              </span>
              <Droplets className="w-4 h-4 text-blue-600" />
            </div>
            <div className={`text-2xl font-bold ${data.indices.ndwi.color}`}>
              {data.indices.ndwi.value}
            </div>
            <span className="text-xs text-oliveGreen/60">
              {data.indices.ndwi.status} · Sentinel-2
            </span>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-lg hover:border-blue-200 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-oliveGreen/70">
                Humedad Suelo (SAR)
              </span>
              <Satellite className="w-4 h-4 text-cyan-600" />
            </div>
            <div className={`text-2xl font-bold ${data.indices.ssm.color}`}>
              {data.indices.ssm.value}
            </div>
            <span className="text-xs text-oliveGreen/60">
              {data.indices.ssm.status} · Sentinel-1
            </span>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-lg hover:border-blue-200 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-oliveGreen/70">
                Temp. Superficie (LST)
              </span>
              <Thermometer className="w-4 h-4 text-amber-600" />
            </div>
            <div className={`text-2xl font-bold ${data.indices.lst.color}`}>
              {data.indices.lst.value}
            </div>
            <span className="text-xs text-oliveGreen/60">
              {data.indices.lst.status} · Sentinel-3
            </span>
          </div>
        </div>
      )}

      {/* Tab 2: Análisis */}
      {activeTab === "analysis" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-lg border ${data.analysisScores.droughtRisk.color}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Estrés por Sequía (DSI)
              </span>
              <Cloud className="w-4 h-4" />
            </div>
            <div className="text-3xl font-extrabold my-1">
              {data.analysisScores.droughtRisk.score}
            </div>
            <p className="text-xs opacity-80">
              Fusión en la nube: Sensores IoT in-situ + Retrodispersión
              Sentinel-1 SAR.
            </p>
          </div>

          <div
            className={`p-4 rounded-lg border ${data.analysisScores.soilHealth.color}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Salud del Suelo (SHI)
              </span>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-3xl font-extrabold my-1">
              {data.analysisScores.soilHealth.score}
            </div>
            <p className="text-xs opacity-80">
              Nivel de materia orgánica y estructura biológica evaluada por
              espectrometría.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-blue-100 flex flex-wrap justify-between items-center text-xs text-oliveGreen/70 gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span>
            Cobertura de Nubes:{" "}
            <strong className="text-charcoalGray font-semibold">
              {data.cloudCover}
            </strong>
          </span>
          <span>
            Resolución:{" "}
            <strong className="text-charcoalGray font-semibold">
              {data.resolution}
            </strong>
          </span>
        </div>
        <span className="text-blue-600 font-medium cursor-pointer hover:underline">
          Ver mapa de capas en Data Cube Ecosystem →
        </span>
      </div>
    </div>
  );
}
