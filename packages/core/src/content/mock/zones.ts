import type { ZoneStatusKey } from "../types/content.types";

export interface ZoneMock {
  id: string;
  sensorId: string;
  location: string;
  moisture: number;
  temperature: number;
  light: number;
  wind: number;
  statusKey: ZoneStatusKey;
  currentCropId?: string;
}

export const ZONES_MOCK: ZoneMock[] = [
  {
    id: "zone-01",
    sensorId: "sensor-01",
    location: "Terraza alta",
    moisture: 65,
    temperature: 22.5,
    light: 85,
    wind: 12,
    statusKey: "optimal",
    currentCropId: "crop-esparto",
  },
  {
    id: "zone-02",
    sensorId: "sensor-02",
    location: "Terraza media",
    moisture: 58,
    temperature: 24.2,
    light: 92,
    wind: 8,
    statusKey: "optimal",
    currentCropId: "crop-tomate",
  },
  {
    id: "zone-03",
    sensorId: "sensor-03",
    location: "Terraza baja",
    moisture: 62,
    temperature: 23.1,
    light: 89,
    wind: 10,
    statusKey: "optimal",
    currentCropId: "crop-olivar",
  },
  {
    id: "zone-04",
    sensorId: "sensor-04",
    location: "Sector húmedo",
    moisture: 68,
    temperature: 21.8,
    light: 78,
    wind: 7,
    statusKey: "optimal",
    currentCropId: "crop-hierbas",
  },
  {
    id: "zone-05",
    sensorId: "sensor-05",
    location: "Sector seco",
    moisture: 55,
    temperature: 28,
    light: 30,
    wind: 5,
    statusKey: "optimal",
  },
  {
    id: "zone-06",
    sensorId: "sensor-06",
    location: "Zona de pruebas",
    moisture: 90,
    temperature: 18,
    light: 40,
    wind: 7,
    statusKey: "optimal",
  },
];
