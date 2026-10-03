// ============================================================================
// Soil Health Types – T2 Module (Nutrient & Soil Health Management)
// ============================================================================

export interface TimeSeriesPoint {
  timestamp: string;
  value: number;
}

export interface MushroomData {
  humidity: TimeSeriesPoint[];
  temperature: TimeSeriesPoint[];
  co2: TimeSeriesPoint[];
}

export interface MushroomOptimal {
  humidity: [number, number];
  temperature: [number, number];
  co2: [number, number];
}

export interface Mushroom {
  id: string;
  name: string;
  scientificName: string;
  icon: string;
  description: string;
  habitat: string;
  season: string[];
  isEndemic: boolean;
  data: MushroomData;
  optimal: MushroomOptimal;
}

export type MushroomStage = "growth" | "fruiting" | "harvest";
export type MushroomStatus = "optimal" | "excellent" | "good" | "ready";

export interface CultivationZone {
  id: string;
  name: string;
  scientificName: string;
  icon: string;
  location: string;
  humidity: number;
  temperature: number;
  co2: number;
  stage: MushroomStage;
  harvestIn: string;
  status: MushroomStatus;
}
