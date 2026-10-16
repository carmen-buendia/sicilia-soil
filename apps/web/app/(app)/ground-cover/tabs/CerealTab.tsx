"use client";

import { Wheat, TrendingUp, BarChart3 } from "lucide-react";
import { SoilChart, SOIL_COLORS } from "@/components/features/shared";
import { useCerealData } from "@/hooks/useCerealData";

export function CerealTab() {
  const { kpis, growth, comparison, plotInfo } = useCerealData();

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-oliveGreen/15"
          >
            <p className="text-xs text-oliveGreen/60 mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold text-charcoalGray">{kpi.value}</p>
            <p className="text-xs text-oliveGreen/60 mt-1">{kpi.note}</p>
          </div>
        ))}
      </div>

      {/* Parcela */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/60 rounded-xl">
            <Wheat className="w-8 h-8 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-charcoalGray mb-1">
              {plotInfo.name}
            </h3>
            <p className="text-sm text-oliveGreen/70 mb-3">{plotInfo.role}</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/70 rounded-full text-xs">
                📐 {plotInfo.area}
              </span>
              <span className="px-3 py-1 bg-white/70 rounded-full text-xs">
                🌱 {plotInfo.crops.join(" · ")}
              </span>
              <span className="px-3 py-1 bg-white/70 rounded-full text-xs font-medium text-amber-700">
                ⏱ {plotInfo.stage}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Evolución NDVI + humedad */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
        <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-oliveGreen" />
          Evolución NDVI y humedad
        </h3>
        <SoilChart
          type="spline"
          categories={growth.map((g) => g.week)}
          series={[
            {
              name: "NDVI",
              data: growth.map((g) => g.ndvi),
              color: SOIL_COLORS.green,
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
      </div>

      {/* Comparación cereal vs esparto */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
        <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-oliveGreen" />
          Comparación interna: Cereal vs Esparto
        </h3>
        <SoilChart
          type="column"
          categories={comparison.map((c) => c.metric)}
          series={[
            {
              name: "Cereal",
              data: comparison.map((c) => c.cereal),
              color: SOIL_COLORS.wheat,
            },
            {
              name: "Esparto",
              data: comparison.map((c) => c.esparto),
              color: SOIL_COLORS.olive,
            },
          ]}
          yAxisLabel="Valor"
          height={300}
          legend
        />
      </div>

      {/* Recomendaciones */}
      <div className="bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 rounded-2xl p-6 border border-oliveGreen/15">
        <h3 className="text-lg font-bold text-charcoalGray mb-3">
          Recomendaciones activas
        </h3>
        <ul className="space-y-2 text-sm text-oliveGreen/70">
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
      </div>
    </div>
  );
}
