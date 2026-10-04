"use client";

import { useState } from "react";
import {
  Droplets,
  Thermometer,
  Sun,
  Wind,
  Leaf,
  Sprout,
  Scissors,
  Package,
  TrendingUp,
  Award,
} from "lucide-react";
import { calculateSymbiosisScore } from "@sicilia-soil/utils";
import { SymbiosisCard } from "@/components/features/shared";
import { Button } from "@sicilia-soil/ui";
import {
  GROUND_COVER_INFO,
  GROUND_COVER_MONITORING,
  GROUND_COVER_HARVEST_CALENDAR,
  GROUND_COVER_MYCORRHIZAL_SYMBIOSIS,
  GROUND_COVER_TABS,
  MONITORING_CHART_CONFIG,
  type GroundCoverTabId,
  type MonitoringKey,
} from "@sicilia-soil/core";
import { getGroundCoverHealth } from "@sicilia-soil/utils";
import Link from "next/link";

export default function GroundCoverPage() {
  const [activeTab, setActiveTab] = useState<GroundCoverTabId>("info");

  const health = getGroundCoverHealth(GROUND_COVER_MONITORING);
  const symbiosis = calculateSymbiosisScore({
    espartoHealth: health.status === "Excelente" ? 92 : 70,
    coverDensity: 78,
    soilMoisture: 69,
    myceliumActivity: 85,
    fungalDiversity: 3,
    cosPercent: 2.5,
  });

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-gradient-to-br from-offWhite to-emerald-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-oliveGreen/20 to-wheatGold/20 rounded-xl">
                <span className="text-3xl">🌾</span>
              </div>
              Cubiertas Vegetales y Control de Erosión
            </h1>
            <span className="text-xs bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-medium">
              Módulo T3 · NOSTRADAMUS
            </span>
          </div>
          <p className="text-oliveGreen/70">
            Retención hídrica y prevención de erosión en suelos mediterráneos
            (Módulo T3)
          </p>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-oliveGreen/10 to-emerald-500/10 rounded-2xl p-6 md:p-8 my-12 border border-oliveGreen/20">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-charcoalGray mb-3">
                🌾 El Tesoro Fibroso del Mediterráneo
              </h2>
              <p className="text-charcoalGray/80 mb-4">
                El esparto <strong>({GROUND_COVER_INFO.scientificName})</strong>{" "}
                es una planta milenaria que ha moldeado la cultura y economía
                siciliana. Su fibra, resistente y versátil, representa un modelo
                de <strong>agricultura regenerativa y sostenible</strong>. Como
                cubierta vegetal mediterránea, retiene la humedad del suelo,
                previene la erosión y contribuye a la resiliencia hídrica del
                ecosistema (Módulo T3).
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
                  🌱 Sostenible
                </span>
                <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
                  💧 Bajo consumo hídrico
                </span>
                <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
                  🌍 Tradición siciliana
                </span>
                <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
                  🔄 Economía circular
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-2">{GROUND_COVER_INFO.icon}</div>
              <p className="text-sm text-oliveGreen/60">
                Símbolo de resistencia mediterránea
              </p>
            </div>
          </div>
        </div>
        {/* Symbiosis Card */}
        <div className="mb-8">
          <SymbiosisCard result={symbiosis} />
        </div>
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-oliveGreen/15 pb-2">
          {GROUND_COVER_TABS.map((tab) => (
            <Button
              key={tab.id}
              variant="tab"
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              icon={<span>{tab.icon}</span>}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab: Info */}
        {activeTab === "info" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <Sprout className="w-5 h-5 text-oliveGreen" />
                Historia y tradición
              </h3>
              <p className="text-oliveGreen/70 leading-relaxed">
                {GROUND_COVER_INFO.history}
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-oliveGreen" />
                Beneficios
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {GROUND_COVER_INFO.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-oliveGreen/70"
                  >
                    <span className="text-green-500">✓</span>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <Scissors className="w-5 h-5 text-oliveGreen" />
                Usos tradicionales y modernos
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {GROUND_COVER_INFO.uses.map((use, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-oliveGreen/70"
                  >
                    <span className="text-wheatGold">→</span>
                    {use}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-oliveGreen/5 to-emerald-500/5 rounded-2xl p-6 border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-wheatGold" />
                Reconocimientos
              </h3>
              <p className="text-sm text-oliveGreen/70 mb-3">
                El esparto siciliano es reconocido como patrimonio cultural
                inmaterial por la UNESCO.
              </p>
              <div className="flex items-center gap-3 text-sm">
                <span className="px-3 py-1 bg-white/50 rounded-full">
                  🏆 Denominación de origen
                </span>
                <span className="px-3 py-1 bg-white/50 rounded-full">
                  🌿 Producto ecológico
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Monitoring */}
        {activeTab === "monitoring" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              {(
                [
                  {
                    key: "moisture",
                    icon: Droplets,
                    color: "text-blue-500",
                    value: "69%",
                    note: "↑ Óptimo",
                    noteColor: "text-green-600",
                  },
                  {
                    key: "temperature",
                    icon: Thermometer,
                    color: "text-red-500",
                    value: "20°C",
                    note: "✓ Ideal",
                    noteColor: "text-green-600",
                  },
                  {
                    key: "light",
                    icon: Sun,
                    color: "text-yellow-500",
                    value: "64%",
                    note: "Buena exposición",
                    noteColor: "text-green-600",
                  },
                  {
                    key: "wind",
                    icon: Wind,
                    color: "text-gray-500",
                    value: "12 km/h",
                    note: "Moderado",
                    noteColor: "text-green-600",
                  },
                ] as const
              ).map((item) => {
                const Icon = item.icon;
                const cfg = MONITORING_CHART_CONFIG[item.key as MonitoringKey];
                return (
                  <div
                    key={item.key}
                    className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center border border-oliveGreen/15"
                  >
                    <Icon className={`w-8 h-8 ${item.color} mx-auto mb-2`} />
                    <p className="text-sm text-oliveGreen/60">
                      {cfg.label} media
                    </p>
                    <p className="text-2xl font-bold text-charcoalGray">
                      {item.value}
                    </p>
                    <p className={`text-xs ${item.noteColor}`}>{item.note}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4">
                Evolución de condiciones (últimos 14 días)
              </h3>
              <div className="space-y-6">
                {(Object.keys(GROUND_COVER_MONITORING) as MonitoringKey[]).map(
                  (key) => {
                    const values = GROUND_COVER_MONITORING[key];
                    const cfg = MONITORING_CHART_CONFIG[key];
                    return (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{cfg.label}</span>
                          <span>
                            {values[values.length - 1]}
                            {cfg.unit}
                          </span>
                        </div>
                        <div className="h-12 flex items-end gap-1">
                          {values.map((value, idx) => (
                            <div
                              key={idx}
                              className="flex-1 rounded-t transition-all hover:opacity-80"
                              style={{
                                height: `${(value / cfg.max) * 40}px`,
                                backgroundColor: cfg.color,
                                opacity: 0.3 + (idx / values.length) * 0.7,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-oliveGreen/5 to-emerald-500/5 rounded-2xl p-6 border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-oliveGreen" />
                Recomendaciones
              </h3>
              <ul className="space-y-2 text-sm text-oliveGreen/70">
                <li>
                  ✓ Mantener la humedad entre 65-75% para un crecimiento óptimo
                </li>
                <li>✓ La temperatura ideal está entre 18-25°C</li>
                <li>
                  ✓ La luz solar debe superar el 60% para buena fotosíntesis
                </li>
                <li>✓ Proteger de vientos superiores a 25 km/h</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab: Harvest Calendar */}
        {activeTab === "harvest" && (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
            {GROUND_COVER_HARVEST_CALENDAR.map((month) => (
              <div
                key={month.month}
                className={`${month.color} rounded-xl p-4 border border-oliveGreen/15 hover:shadow-md transition-all`}
              >
                <p className="font-bold text-charcoalGray">{month.month}</p>
                <p className="text-sm text-oliveGreen/70 mt-1">
                  {month.activity}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Symbiosis */}
        {activeTab === "symbiosis" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 rounded-2xl p-6 border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-3 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-oliveGreen" />
                La Red Subterránea: Esparto + Hongos
              </h3>
              <p className="text-oliveGreen/70">
                El esparto forma asociaciones simbióticas con hongos
                micorrícicos que mejoran su capacidad de absorción de agua y
                nutrientes. A cambio, el esparto proporciona carbohidratos a los
                hongos. Los restos de poda del esparto sirven como sustrato para
                el cultivo de setas comestibles.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {GROUND_COVER_MYCORRHIZAL_SYMBIOSIS.map((sym, idx) => (
                <div
                  key={idx}
                  className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15 hover:shadow-xl transition-all"
                >
                  <div className="text-center mb-4">
                    <span className="text-5xl">{sym.icon}</span>
                    <h3 className="text-lg font-bold text-charcoalGray mt-2">
                      {sym.mushroom}
                    </h3>
                  </div>
                  <p className="text-sm text-oliveGreen/70 text-center">
                    {sym.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-oliveGreen/10 to-wheatGold/10 rounded-2xl p-6 border border-oliveGreen/20">
              <h3 className="text-lg font-bold text-charcoalGray mb-3 flex items-center gap-2">
                🍄 + 🌾 = ♾️
              </h3>
              <p className="text-oliveGreen/70">
                El esparto y los hongos forman un sistema simbiótico perfecto.
                Los restos de esparto proporcionan el sustrato ideal para el
                cultivo de setas como el Cardonchello, mientras que el micelio
                de los hongos ayuda a descomponer la materia orgánica,
                enriqueciendo el suelo y mejorando las condiciones para el
                esparto.
              </p>
            </div>
          </div>
        )}
        {/* Cross-link a soil-health */}
        <div className="mt-8 p-6 bg-gradient-to-r from-oliveGreen/10 to-wheatGold/10 rounded-2xl border border-oliveGreen/20">
          <h3 className="font-bold text-charcoalGray mb-2">
            🔗 Ver el ciclo completo
          </h3>
          <p className="text-sm text-oliveGreen/70 mb-3">
            El esparto alimenta al micelio con su biomasa. El micelio fortalece
            al esparto con agua y nutrientes. Juntos regeneran el suelo.
          </p>
          <Link
            href="/soil-health"
            className="inline-flex items-center gap-2 text-oliveGreen font-medium hover:text-sicilian-red transition-colors"
          >
            Ver Salud Biológica del Suelo (T2) →
          </Link>
        </div>
        {/* Footer */}
        <div className="mt-12 p-6 bg-gradient-to-r from-oliveGreen/10 to-emerald-500/10 rounded-2xl border border-oliveGreen/15">
          <div className="flex flex-wrap gap-6 justify-between items-center">
            <div>
              <h3 className="font-bold text-charcoalGray mb-1">
                🌾 El Esparto Siciliano
              </h3>
              <p className="text-sm text-oliveGreen/70">
                Un patrimonio natural y cultural que conecta tradición,
                sostenibilidad e innovación
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white/50 rounded-full text-xs">
                🏺 Tradición milenaria
              </span>
              <span className="px-3 py-1 bg-white/50 rounded-full text-xs">
                🌍 Sostenibilidad
              </span>
              <span className="px-3 py-1 bg-white/50 rounded-full text-xs">
                🍄 Economía circular
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
