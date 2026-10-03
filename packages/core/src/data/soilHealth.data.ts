import type {
  Mushroom,
  CultivationZone,
  TimeSeriesPoint,
} from "../types/soilHealth.types";

// ============================================================================
// Mock Time Series Generator (private – do not export)
// ============================================================================

function generateTimeSeries(
  days: number,
  baseValue: number,
  variance: number,
): TimeSeriesPoint[] {
  const data: TimeSeriesPoint[] = [];
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const variation = Math.sin((i / 7) * Math.PI) * variance;
    const randomVar = (Math.random() - 0.5) * variance;
    const value = baseValue + variation + randomVar;

    data.push({
      timestamp: date.toISOString().split("T")[0],
      value: Math.round(value * 10) / 10,
    });
  }

  return data;
}

// ============================================================================
// Mushrooms Mock Data
// ============================================================================

export const MUSHROOMS: Mushroom[] = [
  {
    id: "cardonchello",
    name: "Cardonchello",
    scientificName: "Pleurotus eryngii",
    icon: "🍄",
    description:
      "Seta emblemática de Sicilia, crece sobre raíces de cañaheja. Muy apreciada en la gastronomía local.",
    habitat: "Pastizales, bordes de caminos, asociada a Ferula communis",
    season: ["Otoño", "Invierno", "Primavera"],
    isEndemic: false,
    data: {
      humidity: generateTimeSeries(30, 85, 5),
      temperature: generateTimeSeries(30, 18, 3),
      co2: generateTimeSeries(30, 450, 30),
    },
    optimal: { humidity: [75, 85], temperature: [16, 22], co2: [400, 600] },
  },
  {
    id: "cardoncello-nebrodi",
    name: "Cardoncello di Nebrodi",
    scientificName: "Pleurotus nebrodensis",
    icon: "🍄",
    description:
      "Seta endémica de los montes Nebrodi en Sicilia. Una de las setas más raras y cotizadas del mundo.",
    habitat: "Montañas de los Nebrodi, asociada a Cachrys ferulacea",
    season: ["Primavera"],
    isEndemic: true,
    data: {
      humidity: generateTimeSeries(30, 80, 5),
      temperature: generateTimeSeries(30, 20, 3),
      co2: generateTimeSeries(30, 500, 40),
    },
    optimal: { humidity: [70, 85], temperature: [18, 24], co2: [400, 700] },
  },
  {
    id: "prataiolo",
    name: "Prataiolo Siciliano",
    scientificName: "Agaricus bitorquis",
    icon: "🍄",
    description:
      "Variedad autóctona del champiñón, muy valorada en la cocina tradicional siciliana.",
    habitat: "Suelos ricos en materia orgánica, compost",
    season: ["Primavera", "Otoño"],
    isEndemic: false,
    data: {
      humidity: generateTimeSeries(30, 75, 4),
      temperature: generateTimeSeries(30, 16, 2),
      co2: generateTimeSeries(30, 600, 50),
    },
    optimal: { humidity: [70, 80], temperature: [14, 18], co2: [500, 700] },
  },
  {
    id: "niccolo",
    name: "Níccolo",
    scientificName: "Lactarius sanguifluus",
    icon: "🍄",
    description:
      "Hongo micorrícico autóctono que crece asociado a encinas y pinos.",
    habitat: "Bosques de encinas y pinos",
    season: ["Otoño"],
    isEndemic: false,
    data: {
      humidity: generateTimeSeries(30, 82, 6),
      temperature: generateTimeSeries(30, 19, 2),
      co2: generateTimeSeries(30, 480, 35),
    },
    optimal: { humidity: [75, 85], temperature: [17, 21], co2: [400, 550] },
  },
];

// ============================================================================
// Cultivation Zones Mock Data (from IoT sensors)
// ============================================================================

export const CULTIVATION_ZONES: CultivationZone[] = [
  {
    id: "zone-cardonchello",
    name: "Cardonchello",
    scientificName: "Pleurotus eryngii",
    icon: "🍄",
    location: "Invernadero Norte",
    humidity: 82,
    temperature: 19,
    co2: 480,
    stage: "fruiting",
    harvestIn: "5 días",
    status: "optimal",
  },
  {
    id: "zone-nebrodi",
    name: "Cardoncello di Nebrodi",
    scientificName: "Pleurotus nebrodensis",
    icon: "🍄",
    location: "Cámara climática",
    humidity: 78,
    temperature: 21,
    co2: 520,
    stage: "growth",
    harvestIn: "12 días",
    status: "excellent",
  },
  {
    id: "zone-prataiolo",
    name: "Prataiolo Siciliano",
    scientificName: "Agaricus bitorquis",
    icon: "🍄",
    location: "Bandeja de compost",
    humidity: 74,
    temperature: 17,
    co2: 580,
    stage: "harvest",
    harvestIn: "Listo hoy",
    status: "ready",
  },
];

// ============================================================================
// Helpers
// ============================================================================

export const DEFAULT_MUSHROOM_ID = "cardonchello";
