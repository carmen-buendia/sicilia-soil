// packages/core/src/data/copernicus.defaults.ts

import type {
  CopernicusData,
  CopernicusLayer,
  MapPlot,
} from "../types/copernicus.types";

// ============================================================================
// Farm location — fallback genérico
// ----------------------------------------------------------------------------
// Las coordenadas reales de la finca NO viven en el repositorio.
// Se añadirán cuando exista el sistema de autenticación (env vars servidas
// por el backend). Ver TODO.md.
//
// Este fallback apunta a un punto genérico en Sicilia para que los mapas
// rendericen en desarrollo sin exponer la ubicación real.
// ============================================================================

export const FARM_CENTER: [number, number] = [37.5, 14.0];
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
// Farm boundary — cuadrado genérico (~1 ha alrededor del centro)
// ----------------------------------------------------------------------------
// Placeholder hasta que exista el sistema de auth. Reemplazar por las
// coordenadas reales servidas desde el backend.
// ============================================================================

export const FARM_BOUNDARY: MapPlot[] = [
  {
    id: "farm",
    name: "MycoMesh Protocol",
    color: "#8B9D6B",
    center: FARM_CENTER,
    coordinates: [
      [FARM_CENTER[0] - 0.0005, FARM_CENTER[1] - 0.0005],
      [FARM_CENTER[0] - 0.0005, FARM_CENTER[1] + 0.0005],
      [FARM_CENTER[0] + 0.0005, FARM_CENTER[1] + 0.0005],
      [FARM_CENTER[0] + 0.0005, FARM_CENTER[1] - 0.0005],
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

export const DEFAULT_PLOT_NAME = "MycoMesh Protocol";
