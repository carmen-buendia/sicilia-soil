import type { CopernicusLayer } from "../types/copernicus.types";

export interface CopernicusLayerConfig {
  label: string;
  url: string;
  attribution: string;
  opacity?: number;
}

export const COPERNICUS_LAYER_CONFIG: Record<
  CopernicusLayer,
  CopernicusLayerConfig
> = {
  satellite: {
    label: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri · World Imagery",
    opacity: 1,
  },
  ndvi: {
    label: "NDVI",
    url: "https://your-backend/api/tiles/ndvi/{z}/{x}/{y}.png",
    attribution: "Sentinel-2 · Copernicus",
    opacity: 0.7,
  },
  ndwi: {
    label: "NDWI",
    url: "https://your-backend/api/tiles/ndwi/{z}/{x}/{y}.png",
    attribution: "Sentinel-2 · Copernicus",
    opacity: 0.7,
  },
  ssm: {
    label: "SSM",
    url: "https://your-backend/api/tiles/ssm/{z}/{x}/{y}.png",
    attribution: "Sentinel-1 SAR · Copernicus",
    opacity: 0.7,
  },
  lst: {
    label: "LST",
    url: "https://your-backend/api/tiles/lst/{z}/{x}/{y}.png",
    attribution: "Sentinel-3 · Copernicus",
    opacity: 0.7,
  },
};
