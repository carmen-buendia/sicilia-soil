"use client";

import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// ============================================================================
// Paleta Sicilia Soil
// ============================================================================

export const SOIL_COLORS = {
  olive: "#8B9D6B",
  oliveDark: "#6B8E23",
  wheat: "#D4A574",
  terracotta: "#E07A5F",
  blue: "#3E7CB1",
  green: "#10b981",
  amber: "#eab308",
  orange: "#f97316",
  red: "#ef4444",
  stone: "#B8B8B8",
  charcoal: "#3A3A3A",
} as const;

// ============================================================================
// Tipos
// ============================================================================

export type SoilChartType =
  | "line"
  | "area"
  | "column"
  | "spline"
  | "bar"
  | "radar"
  | "pie";

export type SoilChartSeries = {
  name: string;
  data: any[];
  color?: string;
  type?: SoilChartType;
  yAxis?: number;
};

export type SoilChartProps = {
  type?: SoilChartType;
  series: SoilChartSeries[];
  categories?: string[];
  title?: string;
  subtitle?: string;
  yAxisLabel?: string;
  yAxisUnit?: string;
  yAxisMax?: number;
  yAxisMin?: number;
  height?: number;
  stacked?: boolean;
  legend?: boolean;
  secondaryYAxis?: {
    label: string;
    unit?: string;
    opposite?: boolean;
  };
  thresholdLine?: {
    value: number;
    color?: string;
    label?: string;
  };
};

// ============================================================================
// Componente
// ============================================================================

export function SoilChart({
  type = "line",
  series,
  categories,
  title,
  subtitle,
  yAxisLabel,
  yAxisUnit = "",
  yAxisMax,
  yAxisMin,
  height = 320,
  stacked = false,
  legend = true,
  secondaryYAxis,
  thresholdLine,
}: SoilChartProps) {
  const [modulesReady, setModulesReady] = useState(false);
  const isRadar = type === "radar";
  const isPie = type === "pie";

  // Carga el módulo polar solo en cliente (necesario para radar)
  useEffect(() => {
    if (isRadar) {
      import("highcharts/highcharts-more")
        .then(() => setModulesReady(true))
        .catch(() => setModulesReady(true));
    } else {
      setModulesReady(true);
    }
  }, [isRadar]);

  if (!modulesReady) {
    return (
      <div
        className="flex items-center justify-center text-xs text-oliveGreen/60"
        style={{ height }}
      >
        Cargando gráfico…
      </div>
    );
  }

  const yAxis: Highcharts.YAxisOptions[] = [
    {
      title: yAxisLabel
        ? {
            text: yAxisLabel,
            style: { color: "#6b7280", fontSize: "11px" },
          }
        : undefined,
      labels: {
        format: `{value}${yAxisUnit}`,
        style: { color: "#6b7280", fontSize: "11px" },
      },
      gridLineColor: "#f3f4f6",
      stackLabels: stacked ? { enabled: false } : undefined,
      max: isRadar ? (yAxisMax ?? 100) : yAxisMax,
      min: yAxisMin,
      plotLines:
        thresholdLine && !isRadar && !isPie
          ? [
              {
                value: thresholdLine.value,
                color: thresholdLine.color ?? SOIL_COLORS.red,
                width: 1.5,
                dashStyle: "Dash",
                label: {
                  text: thresholdLine.label ?? `Umbral ${thresholdLine.value}`,
                  style: {
                    color: thresholdLine.color ?? SOIL_COLORS.red,
                    fontSize: "10px",
                  },
                },
                zIndex: 5,
              },
            ]
          : undefined,
    },
  ];

  if (secondaryYAxis && !isRadar && !isPie) {
    yAxis.push({
      title: {
        text: secondaryYAxis.label,
        style: { color: "#6b7280", fontSize: "11px" },
      },
      labels: {
        format: `{value}${secondaryYAxis.unit ?? ""}`,
        style: { color: "#6b7280", fontSize: "11px" },
      },
      opposite: secondaryYAxis.opposite ?? true,
      gridLineWidth: 0,
    });
  }

  const options: Highcharts.Options = {
    chart: {
      type: isRadar ? "line" : type,
      polar: isRadar,
      height,
      backgroundColor: "transparent",
      style: { fontFamily: "inherit" },
      spacing: [10, 10, 15, 10],
    },
    title: title
      ? {
          text: title,
          style: {
            color: SOIL_COLORS.charcoal,
            fontSize: "14px",
            fontWeight: "600",
          },
        }
      : undefined,
    subtitle: subtitle
      ? {
          text: subtitle,
          style: { color: "#6b7280", fontSize: "11px" },
        }
      : undefined,
    xAxis: {
      categories,
      labels: {
        style: { color: "#6b7280", fontSize: "11px" },
      },
      lineColor: "#e5e7eb",
      tickColor: "#e5e7eb",
      gridLineColor: isRadar ? "#f3f4f6" : undefined,
    },
    yAxis: isPie ? undefined : yAxis,
    legend: {
      enabled: legend,
      itemStyle: { color: SOIL_COLORS.charcoal, fontSize: "11px" },
      symbolRadius: 3,
    },
    plotOptions: {
      series: {
        stacking: stacked ? "normal" : undefined,
        marker: {
          enabled: series.length <= 2 || isRadar,
          radius: 3,
        },
        lineWidth: 2,
      },
      column: { borderRadius: 3, borderWidth: 0 },
      bar: { borderRadius: 3, borderWidth: 0 },
      pie: {
        innerSize: "55%",
        borderWidth: 2,
        borderColor: "#ffffff",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b><br>{point.y}",
          style: { fontSize: "11px" },
        },
      },
    },
    series: series.map((s, i) => {
      const base = {
        name: s.name,
        data: s.data,
        type: (s.type ?? (isRadar ? "line" : type)) as any,
        color:
          s.color ??
          Object.values(SOIL_COLORS)[i % Object.values(SOIL_COLORS).length],
        yAxis: s.yAxis ?? 0,
        ...(isRadar ? { fillOpacity: 0.15 } : {}),
      };
      return base;
    }) as Highcharts.SeriesOptionsType[],
    credits: { enabled: false },
    tooltip: {
      shared: !isPie,
      backgroundColor: "rgba(255,255,255,0.98)",
      borderColor: "#e5e7eb",
      borderRadius: 8,
      style: { fontSize: "12px" },
      valueSuffix: isPie ? "" : yAxisUnit,
    },
  };

  return (
    <div className="w-full">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
