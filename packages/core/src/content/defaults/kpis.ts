export interface KpiDefault {
  id: string;
  value: string;
  icon: string;
}

export const KPIS_DEFAULT: KpiDefault[] = [
  { id: "kpi-soil-health", value: "88/100", icon: "leaf" },
  { id: "kpi-water-stress", value: "0.18", icon: "droplet" },
  { id: "kpi-soil-moisture", value: "31%", icon: "gauge" },
  { id: "kpi-organic-carbon", value: "2.5%", icon: "trees" },
  { id: "kpi-co2", value: "33 t/ha", icon: "trees" },
  { id: "kpi-mycorrhiza", value: "4", icon: "mycorrhiza" },
];
