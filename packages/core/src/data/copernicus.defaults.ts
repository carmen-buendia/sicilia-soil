// packages/core/src/data/copernicus.defaults.ts

import type {
  CopernicusData,
  CopernicusLayer,
  MapPlot,
} from "../types/copernicus.types";

// ============================================================================
// Farm center (Assoro, Sicilia)
// ----------------------------------------------------------------------------
// Medido con GPS. Finca ~100m × 52m (~1 ha).
// ============================================================================

export const FARM_CENTER: [number, number] = [37.6353, 14.41153];
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
  analysisScores: {
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
// Farm boundary — Real measured perimeter (Assoro, Sicily)
// ----------------------------------------------------------------------------
// 10 vértices medidos con GPS. Leaflet cierra el polígono automáticamente.
// Las parcelas productivas y la zona habitable se añadirán en una branch
// posterior (feat/farm-parcels) cuando estén medidas.
// ============================================================================

export const FARM_BOUNDARY: MapPlot[] = [
  {
    id: "farm",
    name: "Sicilia Soil — Assoro",
    color: "#8B9D6B",
    center: FARM_CENTER,
    coordinates: [
      [37.63539, 14.41096], // SW
      [37.63545, 14.41102], // W
      [37.63552, 14.41114], // NW
      [37.63553, 14.41114], // N
      [37.63546, 14.41151], // NE
      [37.63529, 14.41203], // E
      [37.63517, 14.41206], // SE
      [37.63506, 14.41209], // S
      [37.63513, 14.4118], //  entre S y SW
      [37.63521, 14.41152], //  entre S y SW
    ],
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

export const DEFAULT_PLOT_ID = "farm";
export const DEFAULT_PLOT_NAME = "Sicilia Soil — Assoro";
