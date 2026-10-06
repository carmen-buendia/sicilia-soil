"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

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

  const options: Highcharts.Options = {
    accessibility: { enabled: false },
    chart: {
      type: "line",
      height,
      backgroundColor: "transparent",
      style: { fontFamily: "inherit" },
      spacing: [10, 10, 15, 10],
    },
    title: {
      text: `${config.title} · ${mushroomName}`,
      style: { color: "#3A3A3A", fontSize: "14px", fontWeight: "600" },
    },
    xAxis: {
      categories: data.map((d) => d.timestamp),
      labels: { style: { color: "#6b7280", fontSize: "11px" } },
      lineColor: "#e5e7eb",
      tickColor: "#e5e7eb",
    },
    yAxis: {
      title: {
        text: config.title,
        style: { color: "#6b7280", fontSize: "11px" },
      },
      labels: {
        format: `{value}${config.unit}`,
        style: { color: "#6b7280", fontSize: "11px" },
      },
      gridLineColor: "#f3f4f6",
    },
    legend: { enabled: false },
    plotOptions: {
      series: {
        marker: { enabled: false, radius: 3 },
        lineWidth: 2,
      },
    },
    series: [
      {
        name: config.title,
        data: data.map((d) => d.value),
        type: "line",
        color: config.color,
      },
    ],
    credits: { enabled: false },
    tooltip: {
      backgroundColor: "rgba(255,255,255,0.98)",
      borderColor: "#e5e7eb",
      borderRadius: 8,
      style: { fontSize: "12px" },
      valueSuffix: config.unit,
    },
  };

  return (
    <div className="w-full">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
