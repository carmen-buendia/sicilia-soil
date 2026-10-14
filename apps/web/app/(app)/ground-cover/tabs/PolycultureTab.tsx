"use client";

import {
  Droplets,
  Thermometer,
  Sun,
  Wind,
  TreeDeciduous,
  Carrot,
  Recycle,
  TrendingUp,
} from "lucide-react";
import { SoilChart, SOIL_COLORS } from "@/components/features/shared";
import { usePolycultureData } from "@/hooks/usePolycultureData";

// Mapa string → componente Lucide
const ICON_MAP: Record<string, any> = {
  tree: TreeDeciduous,
  droplet: Droplets,
  thermometer: Thermometer,
  recycle: Recycle,
  leaf: TreeDeciduous, // fallback
};

export function PolycultureTab() {
  const { kpis, trees, vegetables, compostCycle } = usePolycultureData();

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = ICON_MAP[kpi.icon] ?? TreeDeciduous;
          return (
            <div
              key={kpi.label}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-oliveGreen/15"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs text-oliveGreen/60">{kpi.label}</span>
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

      {/* Árboles */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-charcoalGray flex items-center gap-2">
            <TreeDeciduous className="w-5 h-5 text-oliveGreen" />
            Árboles frutales
          </h3>
          <span className="text-xs text-oliveGreen/60">
            {trees.length} parcelas monitorizadas
          </span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trees.map((tree) => (
            <div
              key={tree.id}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-oliveGreen/15 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{tree.icon}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${tree.statusColor}`}
                >
                  {tree.status}
                </span>
              </div>
              <h4 className="font-bold text-charcoalGray mb-3">{tree.name}</h4>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-oliveGreen/60">
                    <Droplets className="w-3.5 h-3.5" /> Humedad
                  </span>
                  <span className="font-medium text-charcoalGray">
                    {tree.moisture}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-oliveGreen/60">
                    <Thermometer className="w-3.5 h-3.5" /> Temperatura
                  </span>
                  <span className="font-medium text-charcoalGray">
                    {tree.temperature}°C
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-oliveGreen/60">
                    <Sun className="w-3.5 h-3.5" /> Luz
                  </span>
                  <span className="font-medium text-charcoalGray">
                    {tree.light}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-oliveGreen/60">
                    <Wind className="w-3.5 h-3.5" /> Viento
                  </span>
                  <span className="font-medium text-charcoalGray">
                    {tree.wind} km/h
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-oliveGreen/10 text-xs text-oliveGreen/60 space-y-1">
                <p>🍄 {tree.mycorrhiza}</p>
                <p>⏱ {tree.stage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparador árboles */}
      <section className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
        <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-oliveGreen" />
          Comparador de condiciones por árbol
        </h3>
        <SoilChart
          type="column"
          categories={trees.map((t) => t.name)}
          series={[
            {
              name: "Humedad (%)",
              data: trees.map((t) => t.moisture),
              color: SOIL_COLORS.blue,
            },
            {
              name: "Temperatura (°C)",
              data: trees.map((t) => t.temperature),
              color: SOIL_COLORS.terracotta,
            },
            {
              name: "Luz (%)",
              data: trees.map((t) => t.light),
              color: SOIL_COLORS.wheat,
            },
            {
              name: "Viento (km/h)",
              data: trees.map((t) => t.wind),
              color: SOIL_COLORS.stone,
            },
          ]}
          yAxisLabel="Valor"
          height={320}
          legend
        />
      </section>

      {/* Hortalizas */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-charcoalGray flex items-center gap-2">
            <Carrot className="w-5 h-5 text-oliveGreen" />
            Hortalizas para consumo propio
          </h3>
          <span className="text-xs text-oliveGreen/60">30 m² cultivados</span>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-oliveGreen/15 overflow-hidden mb-6">
          <div className="grid grid-cols-5 gap-2 p-3 bg-oliveGreen/5 text-xs font-medium text-oliveGreen/70">
            <span>Cultivo</span>
            <span>Área</span>
            <span>Cosecha</span>
            <span>Desecho</span>
            <span>Agua</span>
          </div>
          {vegetables.map((veg) => (
            <div
              key={veg.id}
              className="grid grid-cols-5 gap-2 p-3 border-t border-oliveGreen/10 text-sm"
            >
              <span className="flex items-center gap-2 font-medium text-charcoalGray">
                <span className="text-lg">{veg.icon}</span>
                {veg.name}
              </span>
              <span className="text-oliveGreen/70">{veg.area}</span>
              <span className="text-oliveGreen/70">{veg.harvest}</span>
              <span className="text-amber-700">{veg.residue} kg/sem</span>
              <span className="text-blue-600">{veg.water} L/sem</span>
            </div>
          ))}
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
          <h4 className="font-bold text-charcoalGray mb-4">
            Balance hídrico y residuos por cultivo
          </h4>
          <SoilChart
            type="column"
            categories={vegetables.map((v) => v.name)}
            series={[
              {
                name: "Agua (L/semana)",
                data: vegetables.map((v) => v.water),
                color: SOIL_COLORS.blue,
              },
              {
                name: "Residuos (kg/semana)",
                data: vegetables.map((v) => v.residue),
                color: SOIL_COLORS.terracotta,
              },
            ]}
            yAxisLabel="Cantidad"
            height={280}
            legend
          />
        </div>
      </section>

      {/* Ciclo compost */}
      <section className="bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 rounded-2xl p-6 border border-oliveGreen/15">
        <h3 className="text-xl font-bold text-charcoalGray mb-4 flex items-center gap-2">
          <Recycle className="w-5 h-5 text-oliveGreen" />
          Ciclo cerrado: hortalizas → compost → suelo
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {compostCycle.map((step, idx) => (
            <div key={idx} className="text-center bg-white/50 rounded-xl p-4">
              <div className="text-4xl mb-2">{step.icon}</div>
              <p className="font-medium text-charcoalGray text-sm">
                {step.stage}
              </p>
              <p className="text-xs text-oliveGreen/70 mt-1">{step.amount}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-white/50 rounded-xl text-sm text-oliveGreen/70">
          <strong className="text-charcoalGray">Balance semanal:</strong> 6.5 kg
          de restos → 4 kg de compost maduro → 16 kg/mes aplicados al suelo.
          Cierra el ciclo sin insumos externos.
        </div>
      </section>

      {/* Recomendaciones */}
      <section className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
        <h3 className="text-lg font-bold text-charcoalGray mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-oliveGreen" />
          Recomendaciones activas
        </h3>
        <ul className="space-y-2 text-sm text-oliveGreen/70">
          <li>
            ⚠️ <strong>Olivar:</strong> humedad al 62%, por debajo del óptimo
            (65%). Riego en 12 h.
          </li>
          <li>
            ✓ <strong>Almendro:</strong> post-cosecha estable. Poda de formación
            en 2 semanas.
          </li>
          <li>
            ✓ <strong>Compost:</strong> fase termófila activa. Voltear en 3
            días.
          </li>
          <li>
            💧 <strong>Hortalizas:</strong> consumo total de 103 L/semana.
            Optimizar goteo en calabacín.
          </li>
        </ul>
      </section>
    </div>
  );
}
