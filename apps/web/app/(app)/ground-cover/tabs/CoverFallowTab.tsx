"use client";

import { RotateCcw, Leaf, TrendingUp, Droplets } from "lucide-react";
import { SoilChart, SOIL_COLORS } from "@/components/features/shared";
import { useCoverFallowData } from "@/hooks/useCoverFallowData";

const ICON_MAP: Record<string, any> = {
  leaf: Leaf,
  "trending-up": TrendingUp,
  droplet: Droplets,
};

export function CoverFallowTab() {
  const { coverKpis, coverSpecies, fallowKpis, fallowTimeline } =
    useCoverFallowData();

  return (
    <div className="space-y-8">
      {/* Cubiertas */}
      <section>
        <h3 className="text-xl font-bold text-charcoalGray mb-4 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-oliveGreen" />
          Cubiertas vegetales entre árboles
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {coverKpis.map((kpi) => {
            const Icon = ICON_MAP[kpi.icon] ?? Leaf;
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

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15 mb-6">
          <h4 className="font-bold text-charcoalGray mb-4">
            Comparador de cubiertas
          </h4>
          <SoilChart
            type="column"
            categories={coverSpecies.map((c) => c.name)}
            series={[
              {
                name: "Cobertura (%)",
                data: coverSpecies.map((c) => c.cover),
                color: SOIL_COLORS.olive,
              },
              {
                name: "Biomasa (t/ha)",
                data: coverSpecies.map((c) => c.biomass),
                color: SOIL_COLORS.wheat,
              },
              {
                name: "N fijado (kg/ha)",
                data: coverSpecies.map((c) => c.n),
                color: SOIL_COLORS.green,
              },
            ]}
            yAxisLabel="Valor"
            height={320}
            legend
          />
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
          {coverSpecies.map((c) => (
            <div
              key={c.id}
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
          {fallowKpis.map((kpi) => (
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

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
          <h4 className="font-bold text-charcoalGray mb-4">
            Rotación planificada
          </h4>
          <SoilChart
            type="bar"
            categories={fallowTimeline.map((t) => t.month)}
            series={[
              {
                name: "Estado del ciclo",
                data: fallowTimeline.map((t) =>
                  t.state === "done" ? 100 : t.state === "active" ? 60 : 20,
                ),
                color: SOIL_COLORS.olive,
              },
            ]}
            yAxisLabel="Progreso"
            yAxisUnit="%"
            height={280}
            legend={false}
          />
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
