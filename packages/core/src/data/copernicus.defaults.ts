// packages/core/data/copernicus.defaults.ts

import type {
  CopernicusData,
  CopernicusLayer,
  MapPlot,
} from "../types/copernicus.types";

// ============================================================================
// Farm center (Assoro, Sicilia)
// ----------------------------------------------------------------------------
// PLACEHOLDER: centro aproximado de la finca.
// Sustituir por las coordenadas reales cuando las midas.
// ============================================================================

export const FARM_CENTER: [number, number] = [37.63541, 14.41143];
export const FARM_DEFAULT_ZOOM = 19;
export const FARM_MINI_ZOOM = 18;

// ============================================================================
// Default Copernicus Data (fallback when API is unavailable)
// ============================================================================

export const DEFAULT_COPERNICUS_DATA: CopernicusData = {
  lastPass: "2026-09-29 10:42 UTC",
  satellite: "Sentinel-2B / Sentinel-1A",
  cloudCover: "2.1%",
  resolution: "10m x 10m",
  indices: {
    ndvi: { value: 0.74, status: "Óptimo", color: "text-emerald-600" },
    ndwi: { value: 0.52, status: "Adecuado", color: "text-blue-600" },
    ssm: {
      value: "31%",
      status: "Buena penetración SAR",
      color: "text-cyan-600",
    },
    lst: {
      value: "24.8 °C",
      status: "Sin estrés térmico",
      color: "text-amber-600",
    },
  },
  nostradamusScores: {
    droughtRisk: {
      score: "Bajo (18%)",
      status: "Estable",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    soilHealth: {
      score: "88/100",
      status: "Excelente",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
  },
};

// ============================================================================
// Default Map Plots — Cross-country view (NOSTRADAMUS / transferability)
// ============================================================================

export const DEFAULT_MAP_PLOTS: MapPlot[] = [
  {
    id: "sicilia-food-forest",
    name: "Sicilia — Food Forest (Assoro)",
    color: "#8B9D6B",
    // Pin pequeño (2 × 2 m) alrededor del centro de la finca
    coordinates: [
      [FARM_CENTER[0] + 0.00001, FARM_CENTER[1] - 0.00001],
      [FARM_CENTER[0] + 0.00001, FARM_CENTER[1] + 0.00001],
      [FARM_CENTER[0] - 0.00001, FARM_CENTER[1] + 0.00001],
      [FARM_CENTER[0] - 0.00001, FARM_CENTER[1] - 0.00001],
    ],
    center: FARM_CENTER,
    indices: { ndvi: 0.74, ndwi: 0.52, ssm: 31, lst: 24.8 },
  },
  {
    id: "serbia-cereals",
    name: "Serbia — Vojvodina (Cereales)",
    color: "#D4A574",
    coordinates: [
      [45.2671, 19.8335],
      [45.2671, 19.8395],
      [45.2621, 19.8395],
      [45.2621, 19.8335],
    ],
    center: [45.2646, 19.8365],
    indices: { ndvi: 0.71, ndwi: 0.48, ssm: 28, lst: 22.1 },
  },
  {
    id: "slovenia-validation",
    name: "Slovenia — Pomurje (Validación)",
    color: "#6B8E23",
    coordinates: [
      [46.6625, 16.1663],
      [46.6625, 16.1723],
      [46.6585, 16.1723],
      [46.6585, 16.1663],
    ],
    center: [46.6605, 16.1693],
    indices: { ndvi: 0.69, ndwi: 0.52, ssm: 38, lst: 19.8 },
  },
];

// ============================================================================
// Default Farm Plots — Living lab in Assoro (Sicily)
// ----------------------------------------------------------------------------
// PLACEHOLDER: pin en el centro de la finca.
// Sustituir por los polígonos reales cuando estén medidos con GPS.
// ============================================================================

export const DEFAULT_FARM_PLOTS: MapPlot[] = [
  {
    id: "farm-pin",
    name: "Sicilia Soil — Finca (Assoro)",
    color: "#8B9D6B",
    center: FARM_CENTER,
    coordinates: [
      [FARM_CENTER[0] + 0.00001, FARM_CENTER[1] - 0.00001],
      [FARM_CENTER[0] + 0.00001, FARM_CENTER[1] + 0.00001],
      [FARM_CENTER[0] - 0.00001, FARM_CENTER[1] + 0.00001],
      [FARM_CENTER[0] - 0.00001, FARM_CENTER[1] - 0.00001],
    ],
    indices: { ndvi: 0.74, ndwi: 0.52, ssm: 31, lst: 24.8 },
  },
];

// ============================================================================
// Layer Configuration for the Map
// ============================================================================

export interface LayerConfig {
  label: string;
  url: string;
  attribution: string;
  opacity: number;
  maxNativeZoom: number;
  maxZoom: number;
}

export const COPERNICUS_LAYER_CONFIG: Record<CopernicusLayer, LayerConfig> = {
  satellite: {
    label: "Satélite (ESRI World Imagery)",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri",
    opacity: 1,
    maxNativeZoom: 19,
    maxZoom: 22,
  },
  ndvi: {
    label: "NDVI (Vigor Vegetal)",
    url: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg",
    attribution: "NASA GIBS",
    opacity: 0.75,
    maxNativeZoom: 9,
    maxZoom: 22,
  },
  ndwi: {
    label: "NDWI (Agua Foliar)",
    url: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_L3_Land_Water_Mask/default/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png",
    attribution: "NASA GIBS",
    opacity: 0.7,
    maxNativeZoom: 9,
    maxZoom: 22,
  },
  ssm: {
    label: "Humedad del Suelo (SAR)",
    url: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/SMAP_L3_Soil_Moisture/default/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png",
    attribution: "NASA GIBS / SMAP",
    opacity: 0.75,
    maxNativeZoom: 9,
    maxZoom: 22,
  },
  lst: {
    label: "Temperatura Superficie (LST)",
    url: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_L3_Land_Surface_Temp_Daily_Day/default/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png",
    attribution: "NASA GIBS / MODIS",
    opacity: 0.7,
    maxNativeZoom: 7,
    maxZoom: 22,
  },
};

// ============================================================================
// Demo Constants
// ============================================================================

export const DEFAULT_PLOT_ID = "farm-pin";
export const DEFAULT_PLOT_NAME = "Sicilia Soil — Finca (Assoro)";
