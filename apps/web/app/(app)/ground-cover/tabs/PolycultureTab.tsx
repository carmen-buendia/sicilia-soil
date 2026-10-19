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
import { DataCard } from "@sicilia-soil/ui";

const ICON_MAP: Record<string, any> = {
  tree: TreeDeciduous,
  droplet: Droplets,
  thermometer: Thermometer,
  recycle: Recycle,
  leaf: TreeDeciduous,
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
            <DataCard key={kpi.label} className="p-5">
              <div className="flex items-start justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                  {kpi.label}
                </span>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <p className="font-mono text-2xl font-bold text-ink">
                {kpi.value}
              </p>
              <p className="font-sans text-xs text-ink/50 mt-1">{kpi.note}</p>
            </DataCard>
          );
        })}
      </div>

      {/* Árboles */}
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-ink/20 pb-2">
          <h3 className="text-xl font-serif font-bold text-ink flex items-center gap-2">
            <TreeDeciduous className="w-5 h-5 text-chloro" />
            Árboles frutales
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
            {trees.length} parcelas
          </span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trees.map((tree) => (
            <DataCard key={tree.id} className="p-5 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{tree.icon}</span>
                <span
                  className={`font-mono text-[10px] px-2 py-0.5 border font-bold uppercase tracking-wider ${tree.statusColor}`}
                >
                  {tree.status}
                </span>
              </div>
              <h4 className="font-serif font-bold text-ink mb-3">
                {tree.name}
              </h4>

              <div className="space-y-2 font-mono text-xs flex-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink/50">
                    <Droplets className="w-3.5 h-3.5" /> Humedad
                  </span>
                  <span className="font-bold text-ink">{tree.moisture}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink/50">
                    <Thermometer className="w-3.5 h-3.5" /> Temp.
                  </span>
                  <span className="font-bold text-ink">
                    {tree.temperature}°C
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink/50">
                    <Sun className="w-3.5 h-3.5" /> Luz
                  </span>
                  <span className="font-bold text-ink">{tree.light}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink/50">
                    <Wind className="w-3.5 h-3.5" /> Viento
                  </span>
                  <span className="font-bold text-ink">{tree.wind} km/h</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-ink/10 font-mono text-[10px] text-ink/60 space-y-1">
                <p>🍄 {tree.mycorrhiza}</p>
                <p>⏱ {tree.stage}</p>
              </div>
            </DataCard>
          ))}
        </div>
      </section>

      {/* Comparador árboles */}
      <DataCard className="p-6">
        <h3 className="text-lg font-serif font-bold text-ink mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-chloro" />
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
              color: SOIL_COLORS.solar,
            },
            {
              name: "Luz (%)",
              data: trees.map((t) => t.light),
              color: SOIL_COLORS.chloro,
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
      </DataCard>

      {/* Hortalizas */}
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-ink/20 pb-2">
          <h3 className="text-xl font-serif font-bold text-ink flex items-center gap-2">
            <Carrot className="w-5 h-5 text-chloro" />
            Hortalizas para consumo propio
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
            30 m²
          </span>
        </div>

        <DataCard className="p-0 overflow-hidden mb-6">
          <div className="grid grid-cols-5 gap-2 p-3 bg-paper/50 border-b border-ink/10 text-[10px] font-mono uppercase tracking-wider text-ink/50 font-bold">
            <span>Cultivo</span>
            <span>Área</span>
            <span>Cosecha</span>
            <span>Desecho</span>
            <span>Agua</span>
          </div>
          {vegetables.map((veg) => (
            <div
              key={veg.id}
              className="grid grid-cols-5 gap-2 p-3 border-t border-ink/10 text-sm font-mono items-center hover:bg-paper/30 transition-colors"
            >
              <span className="flex items-center gap-2 font-serif font-bold text-ink">
                <span className="text-lg">{veg.icon}</span> {veg.name}
              </span>
              <span className="text-ink/60">{veg.area}</span>
              <span className="text-ink/60">{veg.harvest}</span>
              <span className="text-solar">{veg.residue} kg/sem</span>
              <span className="text-blue">{veg.water} L/sem</span>
            </div>
          ))}
        </DataCard>

        <DataCard className="p-6">
          <h4 className="font-serif font-bold text-ink mb-4">
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
                color: SOIL_COLORS.solar,
              },
            ]}
            yAxisLabel="Cantidad"
            height={280}
            legend
          />
        </DataCard>
      </section>

      {/* Ciclo compost */}
      <DataCard className="p-6">
        <h3 className="text-xl font-serif font-bold text-ink mb-4 flex items-center gap-2">
          <Recycle className="w-5 h-5 text-chloro" />
          Ciclo cerrado: hortalizas → compost → suelo
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {compostCycle.map((step, idx) => (
            <div
              key={idx}
              className="text-center bg-paper border border-ink/10 p-4"
            >
              <div className="text-4xl mb-2">{step.icon}</div>
              <p className="font-serif font-bold text-ink text-sm">
                {step.stage}
              </p>
              <p className="font-mono text-[10px] text-ink/50 mt-1 uppercase">
                {step.amount}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-paper border border-ink/10 font-sans text-sm text-ink/70">
          <strong className="text-ink">Balance semanal:</strong> 6.5 kg de
          restos → 4 kg de compost maduro → 16 kg/mes aplicados al suelo. Cierra
          el ciclo sin insumos externos.
        </div>
      </DataCard>
    </div>
  );
}
