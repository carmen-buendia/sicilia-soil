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
  TreeDeciduous,
  Wheat,
} from "lucide-react";
import { calculateSymbiosisScore } from "@sicilia-soil/utils";
import { SymbiosisCard } from "@/components/features/shared";
import Link from "next/link";
import { MycologyChart } from "@sicilia-soil/ui";
import { MushroomChip } from "./components/MushroomChip";
import { MushroomCard } from "@/components/features/soil-health";
import {
  MUSHROOMS,
  MONITORING_ZONES,
  DEFAULT_MUSHROOM_ID,
} from "@sicilia-soil/core";

export default function SoilHealthPage() {
  const [selectedMushroom, setSelectedMushroom] = useState(DEFAULT_MUSHROOM_ID);

  const current = MUSHROOMS.find((m) => m.id === selectedMushroom);
  if (!current) return null;

  const symbiosis = calculateSymbiosisScore({
    espartoHealth: 92,
    coverDensity: 78,
    soilMoisture: 69,
    mycorrhizalColonisation: 45,
    glomalin: 2.1,
    fungalDiversity: 4,
    soilRespiration: 3.2,
    cosPercent: 2.5,
    aggregateStability: 34,
    mushroomOccurrence: 2,
    mushroomSeason: "otono",
  });

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-offWhite">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-oliveGreen/20 to-wheatGold/20 rounded-xl">
                <span className="text-2xl">🍄</span>
              </div>
              Salud Biológica del Suelo
            </h1>
            <span className="text-xs bg-oliveGreen/15 text-oliveGreen border border-oliveGreen/20 px-3 py-1 rounded-full font-medium">
              Red micorrícica
            </span>
          </div>
          <p className="text-oliveGreen/70">
            Redes AMF y ECM, glomalina y bioindicadores estacionales
          </p>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-oliveGreen/10 to-wheatGold/10 rounded-2xl p-6 md:p-8 my-12 border border-oliveGreen/20">
          <h2 className="text-2xl font-bold text-charcoalGray mb-3">
            La red que trabaja todo el año
          </h2>
          <p className="text-charcoalGray/80 mb-4">
            La <strong>red micorrícica</strong> conecta las raíces de olivos,
            almendros, esparto, cereal y cubiertas. Trabaja{" "}
            <strong>365 días al año</strong>: capta agua y nutrientes para las
            plantas, recibe azúcares a cambio, y produce{" "}
            <strong>glomalina</strong>, la proteína que estructura el suelo y
            fija carbono. Las <strong>setas</strong> son la parte visible de esa
            red y aparecen principalmente en otoño — un{" "}
            <strong>bioindicador estacional</strong> de que el sistema está
            sano.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
              🔬 AMF en la mayoría de cultivos
            </span>
            <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
              🌲 ECM en los dos pinos
            </span>
            <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
              ♻️ Glomalina y estructura
            </span>
            <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
              🍄 Setas: bioindicador
            </span>
          </div>
        </div>

        {/* Symbiosis Card */}
        <div className="mb-8">
          <SymbiosisCard result={symbiosis} />
        </div>

        {/* Hosts micorrícicos monitorizados */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-xl font-bold text-charcoalGray flex items-center gap-2">
              🌱 Redes activas del sistema
            </h2>
            <span className="text-xs text-oliveGreen/60">
              {MONITORING_ZONES.length} hosts monitorizados
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MONITORING_ZONES.map((zone) => (
              <MushroomCard
                key={zone.id}
                zone={zone}
                onViewDetails={(id: string) => console.log("Ver detalles:", id)}
              />
            ))}
          </div>
        </section>

        {/* Selector de setas (bioindicador estacional) */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-xl font-bold text-charcoalGray flex items-center gap-2">
              🍄 Bioindicadores estacionales
            </h2>
            <span className="text-xs text-oliveGreen/60">
              Pico en otoño · el micelio trabaja todo el año
            </span>
          </div>
          <p className="text-sm text-oliveGreen/70 mb-4">
            Las setas son la parte visible de la red fúngica. No son el objetivo
            principal — son una <strong>señal</strong> de que el micelio está
            activo. Algunas se aprovechan como subproducto gastronómico.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {MUSHROOMS.map((m) => (
              <MushroomChip
                key={m.id}
                mushroom={m}
                active={selectedMushroom === m.id}
                onClick={() => setSelectedMushroom(m.id)}
              />
            ))}
          </div>
        </section>

        {/* Info de la seta seleccionada */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-oliveGreen" />
              <h3 className="text-lg font-bold text-charcoalGray">
                Descripción
              </h3>
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
              {current.hostId && (
                <span className="px-3 py-1 bg-white/70 rounded-full text-xs font-medium text-charcoalGray">
                  Host: {current.hostId}
                </span>
              )}
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-oliveGreen" />
                <span className="text-sm text-oliveGreen/70">Hábitat:</span>
                <span className="text-sm font-medium text-charcoalGray">
                  {current.habitat}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-oliveGreen" />
                <span className="text-sm text-oliveGreen/70">Temporada:</span>
                <span className="text-sm font-medium text-charcoalGray">
                  {current.season.join(", ")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-oliveGreen" />
                <span className="text-sm text-oliveGreen/70">Endemismo:</span>
                <span
                  className={`text-sm font-medium ${
                    current.isEndemic ? "text-wheatGold" : "text-oliveGreen/60"
                  }`}
                >
                  {current.isEndemic ? "Endémica de Sicilia 🌍" : "Cosmopolita"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-charcoalGray mb-4 flex items-center gap-2">
            📊 Seguimiento de condiciones
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <MycologyChart
                mushroomName={current.name}
                data={current.data.humidity}
                metric="humidity"
                height={350}
              />
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <MycologyChart
                mushroomName={current.name}
                data={current.data.temperature}
                metric="temperature"
                height={350}
              />
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15 md:col-span-2">
              <MycologyChart
                mushroomName={current.name}
                data={current.data.co2}
                metric="co2"
                height={350}
              />
            </div>
          </div>
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
                  {current.optimal.humidity[0]}% - {current.optimal.humidity[1]}
                  %
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

        {/* Cross-link a ground-cover */}
        <div className="mt-8 p-6 bg-gradient-to-r from-oliveGreen/10 to-wheatGold/10 rounded-2xl border border-oliveGreen/20">
          <h3 className="font-bold text-charcoalGray mb-2">
            🔗 Ver el ciclo completo
          </h3>
          <p className="text-sm text-oliveGreen/70 mb-3">
            Esparto, cereal y árboles alimentan al micelio con su biomasa. El
            micelio devuelve agua, nutrientes y estructura. Juntos regeneran el
            suelo.
          </p>
          <Link
            href="/ground-cover"
            className="inline-flex items-center gap-2 text-oliveGreen font-medium hover:text-sicilian-red transition-colors"
          >
            Ver Cultivos →
          </Link>
        </div>

        {/* Footer educativo */}
        <div className="mt-12 p-6 bg-oliveGreen/5 rounded-2xl border border-oliveGreen/15">
          <h3 className="text-lg font-bold text-charcoalGray mb-3 flex items-center gap-2">
            📚 Sabías que...
          </h3>
          <div className="space-y-3 text-sm text-oliveGreen/70">
            <p>
              <strong className="text-charcoalGray">
                El micelio trabaja todo el año.
              </strong>{" "}
              Las setas son solo su órgano reproductivo, visible en otoño tras
              las lluvias. Que no veas setas no significa que la red esté
              inactiva.
            </p>
            <p>
              <strong className="text-charcoalGray">AMF vs. ECM:</strong> la
              mayoría de tus cultivos (olivo, almendro, esparto, cereal) forman
              micorrizas arbusculares (AMF). Los dos pinos forman ectomicorrizas
              (ECM) y producen setas como el níccolo.
            </p>
            <p>
              <strong className="text-charcoalGray">Glomalina:</strong> la
              proteína que pega las partículas del suelo. A más glomalina, más
              estructura, más retención de agua y más carbono fijado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
