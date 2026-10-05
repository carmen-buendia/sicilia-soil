import type Highcharts from "highcharts";

export interface EnvChartData {
  name: string;
  value: number;
  threshold: number;
}

/**
 * Creates a reusable Highcharts config for environmental parameters
 * (heavy metals, air quality, water quality, soil quality).
 *
 * Displays two series: current value (column) and threshold (dashed line).
 */
export function createEnvChart(
  title: string,
  data: EnvChartData[],
  unit: string,
  color: string,
): Highcharts.Options {
  return {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: 250,
    },
    title: {
      text: title,
      style: { fontSize: "14px", fontWeight: "bold" },
    },
    xAxis: {
      categories: data.map((d) => d.name),
    },
    yAxis: {
      title: { text: unit },
    },
    series: [
      {
        name: "Valor actual",
        data: data.map((d) => d.value),
        color: color,
        dataLabels: { enabled: true, format: `{y} ${unit}` },
        type: "column",
      },
      {
        name: "Umbral",
        data: data.map((d) => d.threshold),
        color: "#ff6b6b",
        type: "line",
        dashStyle: "Dash",
        dataLabels: { enabled: false },
      },
    ],
    credits: { enabled: false },
  };
}
