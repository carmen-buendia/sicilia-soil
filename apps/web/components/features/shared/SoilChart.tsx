"use client";

// apps/web/components/features/shared/SoilChart.tsx
// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Carmen Maria Buendia Sanchez

import ReactECharts from "echarts-for-react";
import type { EChartsOption, SeriesOption } from "echarts";

// ============================================================================
// Paleta MycoMesh Protocol
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
  // Y axes (only for cartesian charts)
  // ---------------------------------------------------------------------------

  const yAxes: any[] = [];
  if (!isPie && !isRadar) {
    const primaryAxis: any = {
      type: "value",
      name: yAxisLabel,
      nameTextStyle: { color: "#6b7280", fontSize: 11 },
      max: yAxisMax,
      min: yAxisMin,
      axisLine: { show: true, lineStyle: { color: "#e5e7eb" } },
      axisLabel: {
        color: "#6b7280",
        fontSize: 11,
        formatter: `{value}${yAxisUnit}`,
      },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    };

    // Threshold line (as markLine on the axis — ECharts doesn't support directly)
    // We attach it via markLine on each series below instead.

    yAxes.push(primaryAxis);

    if (secondaryYAxis) {
      yAxes.push({
        type: "value",
        name: secondaryYAxis.label,
        nameTextStyle: { color: "#6b7280", fontSize: 11 },
        position: secondaryYAxis.opposite === false ? "left" : "right",
        axisLine: { show: true, lineStyle: { color: "#e5e7eb" } },
        axisLabel: {
          color: "#6b7280",
          fontSize: 11,
          formatter: `{value}${secondaryYAxis.unit ?? ""}`,
        },
        splitLine: { show: false },
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
        itemStyle: { borderColor: "#ffffff", borderWidth: 2 },
        label: { fontSize: 11 },
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

    // Threshold line as markLine on this series
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
      areaStyle: isArea ? { opacity: 0.2 } : undefined,
      lineStyle: { width: 2, color },
      itemStyle: { color },
      showSymbol: series.length <= 2,
      barMaxWidth: 40,
      markLine,
    } as SeriesOption;
  });

  // ---------------------------------------------------------------------------
  // Option
  // ---------------------------------------------------------------------------

  const option: EChartsOption = {
    animation: false,
    title: title
      ? {
          text: title,
          subtext: subtitle,
          textStyle: {
            color: SOIL_COLORS.charcoal,
            fontSize: 14,
            fontWeight: 600,
          },
          subtextStyle: { color: "#6b7280", fontSize: 11 },
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
            top: title ? 48 : 24,
            bottom: legend ? 40 : 24,
          },
    legend:
      legend && !isPie && !isRadar
        ? {
            bottom: 0,
            textStyle: { color: SOIL_COLORS.charcoal, fontSize: 11 },
            icon: "circle",
          }
        : undefined,
    tooltip: {
      trigger: isPie ? "item" : isRadar ? "item" : "axis",
      backgroundColor: "rgba(255,255,255,0.98)",
      borderColor: "#e5e7eb",
      textStyle: { fontSize: 12 },
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
            axisName: { color: "#6b7280", fontSize: 11 },
            splitLine: { lineStyle: { color: "#f3f4f6" } },
            splitArea: { areaStyle: { color: ["#ffffff", "#fafafa"] } },
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
              axisLine: { lineStyle: { color: "#e5e7eb" } },
              axisLabel: { color: "#6b7280", fontSize: 11 },
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
