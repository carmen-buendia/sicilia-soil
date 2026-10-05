"use client";

import { RotateCcw, Leaf, TrendingUp, Droplets } from "lucide-react";

const COVER_KPIS = [
  {
    label: "Cobertura del suelo",
    value: "78%",
    note: "↑ Óptimo",
    icon: Leaf,
    color: "text-emerald-600",
  },
  {
    label: "Biomasa aérea",
    value: "2.4 t/ha",
    note: "Estimada por NDVI",
    icon: TrendingUp,
    color: "text-oliveGreen",
  },
  {
    label: "N fijado (leguminosas)",
    value: "18 kg/ha",
    note: "Trébol + veza",
    icon: Leaf,
    color: "text-green-600",
  },
  {
    label: "Ahorro de agua",
    value: "22%",
    note: "vs. suelo desnudo",
    icon: Droplets,
    color: "text-blue-500",
  },
];

const COVERS = [
  {
    name: "Trébol subterráneo",
    icon: "🍀",
    cover: 82,
    biomass: "2.8",
    n: "22",
    season: "Otoño-invierno",
    status: "Activo",
  },
  {
    name: "Veza",
    icon: "🌿",
    cover: 76,
    biomass: "2.5",
    n: "20",
    season: "Otoño-invierno",
    status: "Activo",
  },
  {
    name: "Avena",
    icon: "🌾",
    cover: 85,
    biomass: "3.1",
    n: "0",
    season: "Otoño",
    status: "Activo",
  },
  {
    name: "Mostaza",
    icon: "🌼",
    cover: 68,
    biomass: "2.0",
    n: "0",
    season: "Otoño",
    status: "Terminando",
  },
];

const FALLOW_KPIS = [
  { label: "Duración", value: "6 meses", note: "rotación planificada" },
  { label: "Humedad del suelo", value: "45%", note: "recuperando" },
  { label: "Materia orgánica", value: "1.8%", note: "↑ 0.2 este ciclo" },
  { label: "Próxima siembra", value: "Marzo", note: "cereal de primavera" },
];

const FALLOW_TIMELINE = [
  { month: "Sep", stage: "Terminación de cereal", state: "done" },
  { month: "Oct", stage: "Reposo inicial", state: "done" },
  { month: "Nov", stage: "Recuperación de humedad", state: "active" },
  { month: "Dic", stage: "Recuperación de nutrientes", state: "pending" },
  { month: "Ene", stage: "Reposo profundo", state: "pending" },
  { month: "Feb", stage: "Preparación siembra", state: "pending" },
  { month: "Mar", stage: "Siembra de cereal", state: "pending" },
];

export function CoverFallowTab() {
  return (
    <div className="space-y-8">
      {/* Cubiertas */}
      <section>
        <h3 className="text-xl font-bold text-charcoalGray mb-4 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-oliveGreen" />
          Cubiertas vegetales entre árboles
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {COVER_KPIS.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-oliveGreen/15"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs text-oliveGreen/60">
                    {kpi.label}
                  </span>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
                <p className="text-2xl font-bold text-charcoalGray">
                  {kpi.value}
                </p>
                <p className="text-xs text-oliveGreen/60 mt-1">{kpi.note}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-oliveGreen/15 overflow-hidden">
          <div className="grid grid-cols-6 gap-2 p-3 bg-oliveGreen/5 text-xs font-medium text-oliveGreen/70">
            <span>Especie</span>
            <span>Cobertura</span>
            <span>Biomasa</span>
            <span>N fijado</span>
            <span>Temporada</span>
            <span>Estado</span>
          </div>
          {COVERS.map((c) => (
            <div
              key={c.name}
              className="grid grid-cols-6 gap-2 p-3 border-t border-oliveGreen/10 text-sm items-center"
            >
              <span className="flex items-center gap-2 font-medium text-charcoalGray">
                <span className="text-lg">{c.icon}</span>
                {c.name}
              </span>
              <span className="text-oliveGreen/70">{c.cover}%</span>
              <span className="text-oliveGreen/70">{c.biomass} t/ha</span>
              <span className="text-green-600">{c.n} kg/ha</span>
              <span className="text-oliveGreen/60 text-xs">{c.season}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  c.status === "Activo"
                    ? "bg-green-50 text-green-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Barbecho */}
      <section>
        <h3 className="text-xl font-bold text-charcoalGray mb-4 flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-stone-600" />
          Barbecho
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {FALLOW_KPIS.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-oliveGreen/15"
            >
              <p className="text-xs text-oliveGreen/60 mb-1">{kpi.label}</p>
              <p className="text-2xl font-bold text-charcoalGray">
                {kpi.value}
              </p>
              <p className="text-xs text-oliveGreen/60 mt-1">{kpi.note}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
          <h4 className="font-bold text-charcoalGray mb-4">
            Rotación planificada
          </h4>
          <div className="flex items-center gap-1">
            {FALLOW_TIMELINE.map((step, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.state === "done"
                      ? "bg-oliveGreen text-white"
                      : step.state === "active"
                        ? "bg-wheatGold text-white animate-pulse"
                        : "bg-oliveGreen/20 text-oliveGreen/60"
                  }`}
                >
                  {step.state === "done" ? "✓" : idx + 1}
                </div>
                <span className="text-xs font-medium text-charcoalGray">
                  {step.month}
                </span>
                <span className="text-xs text-oliveGreen/60 text-center leading-tight">
                  {step.stage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recomendaciones */}
      <div className="bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 rounded-2xl p-6 border border-oliveGreen/15">
        <h3 className="text-lg font-bold text-charcoalGray mb-3">
          Recomendaciones activas
        </h3>
        <ul className="space-y-2 text-sm text-oliveGreen/70">
          <li>
            🌼 <strong>Mostaza:</strong> terminando. Incorporar como abono verde
            en 5 días.
          </li>
          <li>
            🍀 <strong>Trébol:</strong> cobertura al 82%. Excelente para
            fijación de N.
          </li>
          <li>
            🪨 <strong>Barbecho:</strong> humedad recuperándose (45%). Sin
            intervención por 3 semanas.
          </li>
          <li>📅 Próxima siembra de cereal de primavera: mediados de marzo.</li>
        </ul>
      </div>
    </div>
  );
}
