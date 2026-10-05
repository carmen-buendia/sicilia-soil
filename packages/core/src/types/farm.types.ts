// packages/core/types/farm.ts

export type ParcelId =
  | "esparto"
  | "huerta-tomates"
  | "olivar"
  | "jardin-hierbas"
  | "compost"
  | "deposito-agua"
  | "cereal"
  | "barbecho";

export type ParcelCategory =
  | "textil"
  | "hortalizas"
  | "arboles"
  | "aromaticas"
  | "suelo-vivo"
  | "infraestructura"
  | "cereal"
  | "descanso";

export type LatLng = [number, number];

export type SensorRange = {
  min: number;
  max: number;
  optimal: number;
  unit: string;
};

export type ParcelSensors = {
  humidity?: SensorRange;
  temperature?: SensorRange;
  sunlight?: SensorRange;
  wind?: SensorRange;
};

export type Parcel = {
  id: ParcelId;
  name: string;
  category: ParcelCategory;
  description?: string;
  color: string;
  icon: string;
  center: LatLng;
  polygon: LatLng[];
  sensors: ParcelSensors;
  notes?: string;
};

export type FarmConfig = {
  name: string;
  location: string;
  coordinates: LatLng;
  defaultZoom: number;
  miniZoom: number;
  parcels: Parcel[];
};
