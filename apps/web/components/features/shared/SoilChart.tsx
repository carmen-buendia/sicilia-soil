"use client";

// apps/web/components/features/shared/SoilChart.tsx
// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Carmen Maria Buendia Sanchez

import ReactECharts from "echarts-for-react";
import type { EChartsOption, SeriesOption } from "echarts";

// ============================================================================
// Paleta MycoMesh Protocol (Sintropic UI)
// ============================================================================

export const SOIL_COLORS = {
  chloro: "#4F7A5C", // Verde salvia
  solar: "#E69A45", // Naranja dorado
  ink: "#2C352C", // Verde muy oscuro (texto)
  paper: "#F8F7F2", // Fondo crema
  border: "#E8E2D6", // Color de bordes
  red: "#ef4444", // Rojo alerta
  blue: "#3E7CB1", // Azul apagado (para datos de agua)
  stone: "#B8B8B8", // Gris neutro
  // ── Alias legacy (pendiente de migrar YearCycleChart en refactor/ui-cleanup) ──
  /** @deprecated usa `chloro` */
  olive: "#4F7A5C",
  /** @deprecated usa `blue` */
  green: "#3E7CB1",
  /** @deprecated usa `solar` */
  wheat: "#E69A45",
  /** @deprecated usa `red` */
  terracotta: "#ef4444",
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
// Helpers
// ============================================================================

const COLOR_VALUES = Object.values(SOIL_COLORS);

function toCartesianSeriesType(t: SoilChartType): "line" | "bar" {
  switch (t) {
    case "column":
    case "bar":
      return "bar";
    case "area":
    case "spline":
    case "line":
    default:
      return "line";
  }
}

// Estilo base para los ejes (Tipografía monoespaciada y colores de borde)
const axisStyle = {
  axisLine: { show: true, lineStyle: { color: SOIL_COLORS.border } },
  axisTick: { show: true, lineStyle: { color: SOIL_COLORS.border } },
  axisLabel: {
    color: SOIL_COLORS.ink,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    opacity: 0.7,
  },
  splitLine: {
    lineStyle: { color: SOIL_COLORS.border, type: "dashed" as const },
  },
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
  const isRadar = type === "radar";
  const isPie = type === "pie";
  const isArea = type === "area";
  const isSpline = type === "spline";

  // ---------------------------------------------------------------------------
  // Y axes (solo para gráficos cartesianos)
  // ---------------------------------------------------------------------------
  const yAxes: any[] = [];
  if (!isPie && !isRadar) {
    const primaryAxis: any = {
      type: "value",
      name: yAxisLabel,
      nameTextStyle: {
        color: SOIL_COLORS.ink,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        opacity: 0.6,
        padding: [0, 0, 8, 0],
      },
      max: yAxisMax,
      min: yAxisMin,
      ...axisStyle,
      axisLabel: {
        ...axisStyle.axisLabel,
        formatter: `{value}${yAxisUnit}`,
      },
    };
    yAxes.push(primaryAxis);

    if (secondaryYAxis) {
      yAxes.push({
        type: "value",
        name: secondaryYAxis.label,
        nameTextStyle: {
          color: SOIL_COLORS.ink,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          opacity: 0.6,
          padding: [0, 0, 8, 0],
        },
        position: secondaryYAxis.opposite === false ? "left" : "right",
        ...axisStyle,
        splitLine: { show: false },
        axisLabel: {
          ...axisStyle.axisLabel,
          formatter: `{value}${secondaryYAxis.unit ?? ""}`,
        },
      });
    }
  }

  // ---------------------------------------------------------------------------
  // Series
  // ---------------------------------------------------------------------------
  const echartsSeries: SeriesOption[] = series.map((s, i) => {
    const color = s.color ?? COLOR_VALUES[i % COLOR_VALUES.length];
    const chartType = s.type ?? type;

    // --- PIE ---
    if (isPie) {
      return {
        name: s.name,
        type: "pie",
        radius: ["45%", "75%"],
        center: ["50%", "55%"],
        data: (categories ?? []).map((cat, idx) => ({
          name: cat,
          value: s.data[idx] ?? 0,
        })),
        itemStyle: { borderColor: SOIL_COLORS.paper, borderWidth: 2 },
        label: {
          fontSize: 11,
          fontFamily: "'JetBrains Mono', monospace",
          color: SOIL_COLORS.ink,
        },
      } as SeriesOption;
    }

    // --- RADAR ---
    if (isRadar) {
      return {
        name: s.name,
        type: "radar",
        data: [
          {
            value: s.data,
            name: s.name,
            lineStyle: { width: 2, color },
            itemStyle: { color },
            areaStyle: { opacity: 0.15, color },
            symbol: "circle",
            symbolSize: 4,
          },
        ],
      } as SeriesOption;
    }

    // --- CARTESIAN (line, area, spline, bar, column) ---
    const echartsType = toCartesianSeriesType(chartType);
    const yAxisIndex = s.yAxis ?? 0;

    const markLine =
      thresholdLine && i === 0
        ? {
            silent: true,
            symbol: "none",
            lineStyle: {
              color: thresholdLine.color ?? SOIL_COLORS.red,
              type: "dashed",
              width: 1.5,
            },
            label: {
              formatter: thresholdLine.label ?? `Umbral ${thresholdLine.value}`,
              color: thresholdLine.color ?? SOIL_COLORS.red,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              position: "end",
            },
            data: [{ yAxis: thresholdLine.value }],
          }
        : undefined;

    return {
      name: s.name,
      type: echartsType,
      data: s.data,
      yAxisIndex,
      stack: stacked ? "total" : undefined,
      smooth: isSpline,
      areaStyle: isArea ? { opacity: 0.15 } : undefined,
      lineStyle: { width: 2, color },
      itemStyle: { color },
      showSymbol: series.length <= 2,
      symbolSize: 6,
      barMaxWidth: 32,
      markLine,
    } as SeriesOption;
  });

  // ---------------------------------------------------------------------------
  // Option
  // ---------------------------------------------------------------------------
  const option: EChartsOption = {
    animation: false,
    textStyle: {
      fontFamily: "'Inter', sans-serif",
    },
    title: title
      ? {
          text: title,
          subtext: subtitle,
          textStyle: {
            color: SOIL_COLORS.ink,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "'Lora', serif",
          },
          subtextStyle: { color: SOIL_COLORS.ink, opacity: 0.6, fontSize: 11 },
          left: 8,
          top: 4,
        }
      : undefined,
    grid:
      isPie || isRadar
        ? undefined
        : {
            left: 56,
            right: secondaryYAxis ? 56 : 24,
            top: title ? 56 : 32,
            bottom: legend ? 40 : 24,
            containLabel: true,
          },
    legend:
      legend && !isPie && !isRadar
        ? {
            bottom: 0,
            textStyle: {
              color: SOIL_COLORS.ink,
              fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace",
              opacity: 0.8,
            },
            icon: "rect",
            itemWidth: 12,
            itemHeight: 12,
          }
        : undefined,
    tooltip: {
      trigger: isPie ? "item" : isRadar ? "item" : "axis",
      backgroundColor: SOIL_COLORS.paper,
      borderColor: SOIL_COLORS.border,
      borderWidth: 1,
      textStyle: {
        fontSize: 12,
        color: SOIL_COLORS.ink,
        fontFamily: "'JetBrains Mono', monospace",
      },
      valueFormatter:
        isPie || isRadar ? undefined : (value) => `${value}${yAxisUnit}`,
    },
    ...(isRadar
      ? {
          radar: {
            indicator: (categories ?? []).map((name) => ({
              name,
              max: yAxisMax ?? 100,
              min: yAxisMin ?? 0,
            })),
            axisName: {
              color: SOIL_COLORS.ink,
              opacity: 0.7,
              fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace",
            },
            splitLine: { lineStyle: { color: SOIL_COLORS.border } },
            splitArea: {
              areaStyle: { color: [SOIL_COLORS.paper, "transparent"] },
            },
            radius: "65%",
            center: ["50%", "55%"],
          },
        }
      : isPie
        ? {}
        : {
            xAxis: {
              type: "category",
              data: categories,
              ...axisStyle,
              boundaryGap: type === "bar" || type === "column",
            },
            yAxis: yAxes,
          }),
    series: echartsSeries,
  };

  return (
    <div className="w-full" style={{ height }}>
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        opts={{ renderer: "canvas" }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
}
