"use client";

import { useState } from "react";
import {
  Droplets,
  Thermometer,
  Wind,
  Calendar,
  MapPin,
  Leaf,
  Info,
} from "lucide-react";
import { MycologyChart } from "@sicilia-soil/ui";
import { MushroomChip } from "../components/MushroomChip";
import { MUSHROOMS, DEFAULT_MUSHROOM_ID } from "@sicilia-soil/core";

export function BioindicatorsTab() {
  const [selectedMushroom, setSelectedMushroom] = useState(DEFAULT_MUSHROOM_ID);
  const current = MUSHROOMS.find((m) => m.id === selectedMushroom);
  if (!current) return null;

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="bg-gradient-to-r from-oliveGreen/10 to-wheatGold/10 rounded-2xl p-6 border border-oliveGreen/20">
        <h2 className="text-xl font-bold text-charcoalGray mb-2">
          Bioindicadores estacionales
        </h2>
        <p className="text-sm text-charcoalGray/80">
          Pico en otoño. El micelio trabaja todo el año. Las setas son la{" "}
          <strong>señal</strong> de que la red fúngica está activa, no el
          objetivo principal.
        </p>
      </div>

      {/* Selector */}
      <div className="flex flex-wrap gap-3">
        {MUSHROOMS.map((m) => (
          <MushroomChip
            key={m.id}
            mushroom={m}
            active={selectedMushroom === m.id}
            onClick={() => setSelectedMushroom(m.id)}
          />
        ))}
      </div>

      {/* Info de la seta */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-oliveGreen" />
            <h3 className="text-lg font-bold text-charcoalGray">Descripción</h3>
          </div>
          <p className="text-oliveGreen/70 leading-relaxed">
            {current.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-oliveGreen/10 text-oliveGreen rounded-full text-xs font-medium">
              {current.role === "bioindicator" && "🔬 Bioindicador"}
              {current.role === "cultivation" && "🍽 Subproducto"}
              {current.role === "both" && "🔬 + 🍽 Ambos"}
            </span>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              {current.mycorrhizaType === "AMF" && "AMF · Arbuscular"}
              {current.mycorrhizaType === "ECM" && "ECM · Ectomicorrícica"}
              {current.mycorrhizaType === "none" && "Saprófita"}
            </span>
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-oliveGreen" />
              <span className="text-oliveGreen/70">Hábitat:</span>
              <span className="font-medium text-charcoalGray">
                {current.habitat}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-oliveGreen" />
              <span className="text-oliveGreen/70">Temporada:</span>
              <span className="font-medium text-charcoalGray">
                {current.season.join(", ")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-oliveGreen" />
              <span className="text-oliveGreen/70">Endemismo:</span>
              <span
                className={`font-medium ${
                  current.isEndemic ? "text-wheatGold" : "text-oliveGreen/60"
                }`}
              >
                {current.isEndemic ? "Endémica de Sicilia 🌍" : "Cosmopolita"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos de seguimiento */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-charcoalGray">
          Seguimiento de condiciones · {current.name}
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
            <MycologyChart
              mushroomName={current.name}
              data={current.data.humidity}
              metric="humidity"
              height={320}
            />
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
            <MycologyChart
              mushroomName={current.name}
              data={current.data.temperature}
              metric="temperature"
              height={320}
            />
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15 md:col-span-2">
            <MycologyChart
              mushroomName={current.name}
              data={current.data.co2}
              metric="co2"
              height={320}
            />
          </div>
        </div>

        <p className="text-xs text-oliveGreen/60">
          Estas condiciones reflejan la ventana de fructificación
          (principalmente otoño). El micelio, sin embargo, permanece activo todo
          el año bajo tierra.
        </p>
      </div>

      {/* Condiciones óptimas */}
      <div className="bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 rounded-2xl p-6 border border-oliveGreen/15">
        <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
          <Droplets className="w-5 h-5 text-oliveGreen" />
          Condiciones de fructificación
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
            <div className="w-10 h-10 bg-oliveGreen/20 rounded-full flex items-center justify-center">
              <Droplets className="w-5 h-5 text-oliveGreen" />
            </div>
            <div>
              <p className="text-sm text-oliveGreen/60">Humedad ideal</p>
              <p className="font-medium text-charcoalGray">
                {current.optimal.humidity[0]}% - {current.optimal.humidity[1]}%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
            <div className="w-10 h-10 bg-sicilian-red/20 rounded-full flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-sicilian-red" />
            </div>
            <div>
              <p className="text-sm text-oliveGreen/60">Temperatura ideal</p>
              <p className="font-medium text-charcoalGray">
                {current.optimal.temperature[0]}°C -{" "}
                {current.optimal.temperature[1]}°C
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
            <div className="w-10 h-10 bg-wheatGold/20 rounded-full flex items-center justify-center">
              <Wind className="w-5 h-5 text-wheatGold" />
            </div>
            <div>
              <p className="text-sm text-oliveGreen/60">CO₂ ideal</p>
              <p className="font-medium text-charcoalGray">
                {current.optimal.co2[0]} - {current.optimal.co2[1]} ppm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
