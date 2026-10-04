import type { MapPlot } from "../types/copernicus.types";

export const FARM_CENTER: [number, number] = [37.6351353, 14.4113979];
export const FARM_DEFAULT_ZOOM = 19;
export const FARM_MINI_ZOOM = 18;

function polygonFromCenter(
  center: [number, number],
  bearingDeg: number,
  distanceM: number,
  sizeM: number,
): [number, number][] {
  const [lat0, lon0] = center;
  const earthR = 6378137;
  const rad = (bearingDeg * Math.PI) / 180;

  const dLat = ((distanceM * Math.cos(rad)) / earthR) * (180 / Math.PI);
  const dLon =
    ((distanceM * Math.sin(rad)) /
      (earthR * Math.cos((lat0 * Math.PI) / 180))) *
    (180 / Math.PI);

  const cLat = lat0 + dLat;
  const cLon = lon0 + dLon;

  const halfLat = (sizeM / 2 / earthR) * (180 / Math.PI);
  const halfLon =
    (sizeM / 2 / (earthR * Math.cos((lat0 * Math.PI) / 180))) * (180 / Math.PI);

  return [
    [cLat + halfLat, cLon - halfLon],
    [cLat + halfLat, cLon + halfLon],
    [cLat - halfLat, cLon + halfLon],
    [cLat - halfLat, cLon - halfLon],
  ];
}

export const DEFAULT_MAP_PLOTS: MapPlot[] = [
  {
    id: "esparto",
    name: "Zona de Esparto",
    color: "#8B9D6B",
    center: polygonFromCenter(FARM_CENTER, 0, 25, 12)[0],
    coordinates: polygonFromCenter(FARM_CENTER, 0, 25, 12),
    indices: { ndvi: 0.74, ndwi: 0.52, ssm: 31, lst: 24.8 },
  },
  {
    id: "huerta-tomates",
    name: "Huerta de Tomates",
    color: "#E07A5F",
    center: polygonFromCenter(FARM_CENTER, 180, 25, 12)[0],
    coordinates: polygonFromCenter(FARM_CENTER, 180, 25, 12),
    indices: { ndvi: 0.68, ndwi: 0.44, ssm: 38, lst: 24.2 },
  },
  {
    id: "olivar",
    name: "Olivar",
    color: "#6B8E23",
    center: polygonFromCenter(FARM_CENTER, 90, 30, 15)[0],
    coordinates: polygonFromCenter(FARM_CENTER, 90, 30, 15),
    indices: { ndvi: 0.61, ndwi: 0.33, ssm: 29, lst: 23.1 },
  },
  {
    id: "jardin-hierbas",
    name: "Jardín de Hierbas",
    color: "#A3B18A",
    center: polygonFromCenter(FARM_CENTER, 270, 25, 12)[0],
    coordinates: polygonFromCenter(FARM_CENTER, 270, 25, 12),
    indices: { ndvi: 0.72, ndwi: 0.48, ssm: 34, lst: 21.8 },
  },
  {
    id: "compost",
    name: "Zona Compost",
    color: "#8B6F47",
    center: polygonFromCenter(FARM_CENTER, 45, 28, 10)[0],
    coordinates: polygonFromCenter(FARM_CENTER, 45, 28, 10),
  },
  {
    id: "deposito-agua",
    name: "Depósito de Agua",
    color: "#3E7CB1",
    center: polygonFromCenter(FARM_CENTER, 315, 28, 8)[0],
    coordinates: polygonFromCenter(FARM_CENTER, 315, 28, 8),
  },
  {
    id: "cereal",
    name: "Parcela de Cereal (40–50 m²)",
    color: "#D4A574",
    center: polygonFromCenter(FARM_CENTER, 135, 22, 7)[0],
    coordinates: polygonFromCenter(FARM_CENTER, 135, 22, 7),
    indices: { ndvi: 0.58, ndwi: 0.36, ssm: 32, lst: 24.0 },
  },
  {
    id: "barbecho",
    name: "Barbecho",
    color: "#B8B8B8",
    center: polygonFromCenter(FARM_CENTER, 225, 22, 7)[0],
    coordinates: polygonFromCenter(FARM_CENTER, 225, 22, 7),
  },
];
