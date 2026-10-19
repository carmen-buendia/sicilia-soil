"use client";

import { SoilChart, SOIL_COLORS } from "./SoilChart";
import type { YearCycleData } from "@sicilia-soil/core";

interface YearCycleLegendItem {
  key: string;
  label: string;
  color: string;
}

interface YearCycleChartProps {
  months: string[];
  data: YearCycleData;
  legend: YearCycleLegendItem[];
  note?: string;
  height?: number;
}

export function YearCycleChart({
  months,
  data,
  legend,
  note,
  height = 360,
}: YearCycleChartProps) {
  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-charcoalGray flex items-center gap-2">
          📅 Ciclo anual del sistema
        </h3>
        <p className="text-sm text-oliveGreen/70 mt-1">
          Crecimiento vegetal, actividad micorrícica, cosecha y ventana de
          fructificación de setas a lo largo del año
        </p>
      </div>

      <SoilChart
        type="spline"
        categories={months}
        series={[
          {
            name: "Crecimiento vegetal",
            data: data.growth,
            color: SOIL_COLORS.olive,
            type: "area",
          },
          {
            name: "Actividad micorrícica",
            data: data.mycorrhiza,
            color: SOIL_COLORS.green,
          },
          {
            name: "Cosecha",
            data: data.harvest,
            color: SOIL_COLORS.wheat,
            type: "column",
          },
          {
            name: "Ventana de setas",
            data: data.mushroom,
            color: SOIL_COLORS.terracotta,
            type: "column",
          },
        ]}
        yAxisLabel="Intensidad relativa"
        yAxisUnit="%"
        yAxisMax={110}
        height={height}
        legend
      />

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        {legend.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: item.color }}
            />
            <span className="text-oliveGreen/70">{item.label}</span>
          </div>
        ))}
      </div>

      {note && (
        <p className="text-xs text-oliveGreen/60 mt-4">
          <strong className="text-charcoalGray">Lectura:</strong> {note}
        </p>
      )}
    </div>
  );
}
