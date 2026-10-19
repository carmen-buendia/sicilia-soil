"use client";

import { Wheat, TrendingUp, BarChart3 } from "lucide-react";
import { SoilChart, SOIL_COLORS } from "@/components/features/shared";
import { useCerealData } from "@/hooks/useCerealData";
import { DataCard } from "@sicilia-soil/ui";

export function CerealTab() {
  const { kpis, growth, comparison, plotInfo } = useCerealData();

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <DataCard key={kpi.label} className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
              {kpi.label}
            </p>
            <p className="font-mono text-2xl font-bold text-ink">{kpi.value}</p>
            <p className="font-sans text-xs text-ink/50 mt-1">{kpi.note}</p>
          </DataCard>
        ))}
      </div>

      {/* Parcela */}
      <DataCard className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-solar/10 border border-solar/20">
            <Wheat className="w-8 h-8 text-solar" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-serif font-bold text-ink mb-1">
              {plotInfo.name}
            </h3>
            <p className="font-sans text-sm text-ink/70 mb-3">
              {plotInfo.role}
            </p>
            <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider font-bold">
              <span className="px-2 py-1 bg-paper border border-ink/20">
                📐 {plotInfo.area}
              </span>
              <span className="px-2 py-1 bg-paper border border-ink/20">
                🌱 {plotInfo.crops.join(" · ")}
              </span>
              <span className="px-2 py-1 bg-solar/10 border border-solar/20 text-solar">
                ⏱ {plotInfo.stage}
              </span>
            </div>
          </div>
        </div>
      </DataCard>

      {/* Evolución NDVI + humedad */}
      <DataCard className="p-6">
        <h3 className="text-lg font-serif font-bold text-ink mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-chloro" />
          Evolución NDVI y humedad
        </h3>
        <SoilChart
          type="spline"
          categories={growth.map((g) => g.week)}
          series={[
            {
              name: "NDVI",
              data: growth.map((g) => g.ndvi),
              color: SOIL_COLORS.chloro,
              yAxis: 0,
            },
            {
              name: "Humedad",
              data: growth.map((g) => g.moisture),
              color: SOIL_COLORS.blue,
              yAxis: 1,
            },
          ]}
          yAxisLabel="NDVI"
          secondaryYAxis={{ label: "Humedad", unit: "%", opposite: true }}
          height={320}
          legend
        />
      </DataCard>

      {/* Comparación cereal vs esparto */}
      <DataCard className="p-6">
        <h3 className="text-lg font-serif font-bold text-ink mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-chloro" />
          Comparación interna: Cereal vs Esparto
        </h3>
        <SoilChart
          type="column"
          categories={comparison.map((c) => c.metric)}
          series={[
            {
              name: "Cereal",
              data: comparison.map((c) => c.cereal),
              color: SOIL_COLORS.solar,
            },
            {
              name: "Esparto",
              data: comparison.map((c) => c.esparto),
              color: SOIL_COLORS.chloro,
            },
          ]}
          yAxisLabel="Valor"
          height={300}
          legend
        />
      </DataCard>

      {/* Recomendaciones */}
      <DataCard className="p-6">
        <h3 className="text-lg font-serif font-bold text-ink mb-3">
          Recomendaciones activas
        </h3>
        <ul className="space-y-2 font-sans text-sm text-ink/70">
          <li>
            💧 Riego programado en 3 días (humedad 58%, por debajo del óptimo).
          </li>
          <li>
            ✓ NDVI en curva ascendente: crecimiento normal para la semana 6.
          </li>
          <li>
            🍄 Colonización micorrícica al 30%. Aplicar inóculo tras la cosecha.
          </li>
          <li>
            🌾 Tras la cosecha, sembrar cubierta de trébol o veza para mantener
            la red micorrícica activa.
          </li>
        </ul>
      </DataCard>
    </div>
  );
}
