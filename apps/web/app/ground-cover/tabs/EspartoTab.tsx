"use client";

import {
  Droplets,
  Thermometer,
  Sun,
  Wind,
  Leaf,
  Sprout,
  Scissors,
  Package,
  Award,
} from "lucide-react";
import {
  calculateSymbiosisScore,
  getGroundCoverHealth,
} from "@sicilia-soil/utils";
import { SymbiosisCard } from "@/components/features/shared";
import {
  GROUND_COVER_INFO,
  GROUND_COVER_MONITORING,
  GROUND_COVER_HARVEST_CALENDAR,
  GROUND_COVER_MYCORRHIZAL_SYMBIOSIS,
  MONITORING_CHART_CONFIG,
  type MonitoringKey,
} from "@sicilia-soil/core";

export function EspartoTab() {
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
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-oliveGreen/10 to-emerald-500/10 rounded-2xl p-6 md:p-8 border border-oliveGreen/20">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-charcoalGray mb-3">
              🌾 El Tesoro Fibroso del Mediterráneo
            </h2>
            <p className="text-charcoalGray/80 mb-4">
              El esparto <strong>({GROUND_COVER_INFO.scientificName})</strong>{" "}
              es una planta milenaria que ha moldeado la cultura siciliana. Su
              fibra, resistente y versátil, representa un modelo de{" "}
              <strong>agricultura regenerativa y sostenible</strong>.
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

      {/* Symbiosis */}
      <SymbiosisCard result={symbiosis} />

      {/* Info cards */}
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

      {/* Monitoring */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-charcoalGray">
          📊 Monitoreo del esparto
        </h3>
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
                <p className="text-sm text-oliveGreen/60">{cfg.label} media</p>
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
      </div>

      {/* Harvest Calendar */}
      <div>
        <h3 className="text-xl font-bold text-charcoalGray mb-4">
          📅 Calendario de aprovechamiento
        </h3>
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
      </div>

      {/* Symbiosis with mushrooms */}
      <div>
        <h3 className="text-xl font-bold text-charcoalGray mb-4">
          🍄 Simbiosis esparto–micelio
        </h3>
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
      </div>

      <div className="bg-gradient-to-r from-oliveGreen/10 to-wheatGold/10 rounded-2xl p-6 border border-oliveGreen/20">
        <h3 className="text-lg font-bold text-charcoalGray mb-3">
          🍄 + 🌾 = ♾️
        </h3>
        <p className="text-oliveGreen/70">
          El esparto y los hongos forman un sistema simbiótico perfecto. Los
          restos de esparto proporcionan el sustrato ideal para el cultivo de
          setas, mientras que el micelio ayuda a descomponer la materia
          orgánica, enriqueciendo el suelo y mejorando las condiciones para el
          esparto.
        </p>
      </div>
    </div>
  );
}
