// packages/core/src/content/locales/es/kpis.ts
export const kpis = {
  "kpi-soil-health": {
    label: "Salud del suelo",
    subtext: "Índice SHI",
    help: "Índice de salud del suelo (SHI) de 0 a 100. Combina indicadores físicos, químicos y biológicos: cuanto más alto, más sano.",
  },
  "kpi-water-stress": {
    label: "Estrés hídrico",
    subtext: "Bajo · estable",
    help: "Falta de agua de las plantas en una escala de 0 (sin estrés) a 1 (estrés severo).",
  },
  "kpi-soil-moisture": {
    label: "Humedad del suelo",
    subtext: "Sentinel-1 SAR",
    help: "Agua en la capa superficial del suelo, estimada con el radar Sentinel-1 (SAR) de Copernicus.",
  },
  "kpi-organic-carbon": {
    label: "Carbono orgánico (COS)",
    subtext: "↑ +0.3% este ciclo",
    help: "Porcentaje de carbono orgánico en el suelo. Más carbono significa más fertilidad y mejor retención de agua.",
  },
  "kpi-co2": {
    label: "CO₂ secuestrado",
    subtext: "Captura estimada",
    help: "Toneladas de CO₂ por hectárea almacenadas en el suelo, estimadas a partir del COS, la densidad aparente y la profundidad.",
  },
  "kpi-mycorrhiza": {
    label: "Redes micorrícicas",
    subtext: "Red fúngica activa",
    help: "Redes de hongos micorrícicos activas. Conectan las raíces y ayudan a las plantas a absorber agua y nutrientes.",
  },
} as const;
