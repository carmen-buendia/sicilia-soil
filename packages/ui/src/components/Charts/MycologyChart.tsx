"use client";

// packages/ui/src/components/Charts/MycologyChart.tsx
// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Carmen Maria Buendia Sanchez

import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface MycologyChartProps {
  mushroomName: string;
  data: { timestamp: string; value: number }[];
  metric: "humidity" | "temperature" | "co2";
  height?: number;
}

const getMetricConfig = (metric: string) => {
  switch (metric) {
    case "humidity":
      return { title: "Humedad", unit: "%", color: "#3B82F6" };
    case "temperature":
      return { title: "Temperatura", unit: "°C", color: "#F97316" };
    case "co2":
      return { title: "CO₂", unit: "ppm", color: "#8B5CF6" };
    default:
      return { title: "Valor", unit: "", color: "#B43F2B" };
  }
};

export const MycologyChart = ({
  mushroomName,
  data,
  metric,
  height = 320,
}: MycologyChartProps) => {
  const config = getMetricConfig(metric);

  const option: EChartsOption = {
    animation: false,
    title: {
      text: `${config.title} · ${mushroomName}`,
      textStyle: { color: "#3A3A3A", fontSize: 14, fontWeight: 600 },
      left: 8,
      top: 4,
    },
    grid: { left: 48, right: 24, top: 48, bottom: 40 },
    xAxis: {
      type: "category",
      data: data.map((d) => d.timestamp),
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      axisLabel: { color: "#6b7280", fontSize: 11 },
    },
    yAxis: {
      type: "value",
      name: config.title,
      nameTextStyle: { color: "#6b7280", fontSize: 11 },
      axisLine: { show: true, lineStyle: { color: "#e5e7eb" } },
      axisLabel: {
        color: "#6b7280",
        fontSize: 11,
        formatter: `{value}${config.unit}`,
      },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255,255,255,0.98)",
      borderColor: "#e5e7eb",
      textStyle: { fontSize: 12 },
      valueFormatter: (value) => `${value}${config.unit}`,
    },
    series: [
      {
        name: config.title,
        type: "line",
        smooth: true,
        data: data.map((d) => d.value),
        lineStyle: { width: 2, color: config.color },
        itemStyle: { color: config.color },
        showSymbol: false,
      },
    ],
  };

  return (
    <div className="w-full" style={{ height }}>
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
};
