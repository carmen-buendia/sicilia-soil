import type {
  ZoneStatusKey,
  ZoneTypeKey,
  ZoneLocationKey,
} from "../types/content.types";

export interface ZoneMock {
  id: string;
  icon: string;
  moisture: number;
  temperature: number;
  light: number;
  wind: number;
  statusKey: ZoneStatusKey;
  typeKey: ZoneTypeKey;
  locationKey: ZoneLocationKey;
}

export const ZONES_MOCK: ZoneMock[] = [
  {
    id: "zone-esparto",
    icon: "🌾",
    moisture: 65,
    temperature: 22.5,
    light: 85,
    wind: 12,
    statusKey: "healthy",
    typeKey: "fiber",
    locationKey: "north",
  },
  {
    id: "zone-tomates",
    icon: "🍅",
    moisture: 58,
    temperature: 24.2,
    light: 92,
    wind: 8,
    statusKey: "healthy",
    typeKey: "vegetables",
    locationKey: "south",
  },
  {
    id: "zone-olivar",
    icon: "🫒",
    moisture: 62,
    temperature: 23.1,
    light: 89,
    wind: 10,
    statusKey: "healthy",
    typeKey: "trees",
    locationKey: "east",
  },
  {
    id: "zone-hierbas",
    icon: "🌿",
    moisture: 68,
    temperature: 21.8,
    light: 78,
    wind: 7,
    statusKey: "healthy",
    typeKey: "aromatics",
    locationKey: "west",
  },
  {
    id: "zone-compost",
    icon: "♻️",
    moisture: 55,
    temperature: 28,
    light: 30,
    wind: 5,
    statusKey: "active",
    typeKey: "livingSoil",
    locationKey: "rear",
  },
  {
    id: "zone-agua",
    icon: "💧",
    moisture: 90,
    temperature: 18,
    light: 40,
    wind: 7,
    statusKey: "full",
    typeKey: "waterCollection",
    locationKey: "northeast",
  },
];
