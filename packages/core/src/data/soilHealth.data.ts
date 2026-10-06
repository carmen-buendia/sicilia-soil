// packages/core/src/data/soilHealth.data.ts

import type {
  Mushroom,
  MonitoringZone,
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
// MUSHROOMS — bioindicadores y producción secundaria
// ----------------------------------------------------------------------------
// El micelio trabaja todo el año. Las setas son la señal visible de que la
// red fúngica está activa. Algunas son comestibles y se aprovechan como
// subproducto del sistema regenerativo.
// ============================================================================

export const MUSHROOMS: Mushroom[] = [
  {
    id: "niccolo",
    name: "Níccolo",
    scientificName: "Lactarius sanguifluus",
    icon: "🍄",
    description:
      "Hongo ectomicorrícico asociado a pinos. Bioindicador de red ECM activa. Comestible muy apreciado en otoño.",
    habitat: "Bajo los dos pinos de la finca",
    season: ["Otoño"],
    isEndemic: false,
    role: "bioindicator",
    mycorrhizaType: "ECM",
    hostId: "pino",
    data: {
      humidity: generateTimeSeries(30, 82, 6),
      temperature: generateTimeSeries(30, 19, 2),
      co2: generateTimeSeries(30, 480, 35),
    },
    optimal: { humidity: [75, 85], temperature: [17, 21], co2: [400, 550] },
  },
  {
    id: "cardonchello",
    name: "Cardonchello",
    scientificName: "Pleurotus eryngii",
    icon: "🍄",
    description:
      "Seta saprófita, no micorrícica. Crece sobre restos vegetales y raíces de cañaheja. Se puede cultivar sobre residuos de poda como subproducto del sistema.",
    habitat: "Restos de poda, mulch leñoso, bordes de caminos",
    season: ["Otoño", "Invierno", "Primavera"],
    isEndemic: false,
    role: "cultivation",
    mycorrhizaType: "none",
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
      "Seta endémica de los montes Nebrodi. Rara y cotizada. Su conservación se apoya en sistemas sintrópicos que recrean su hábitat.",
    habitat: "Montañas de los Nebrodi, asociada a Cachrys ferulacea",
    season: ["Primavera"],
    isEndemic: true,
    role: "both",
    mycorrhizaType: "none",
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
      "Champiñón autóctono. Crece sobre compost maduro. Cierra el ciclo de restos de hortalizas y poda.",
    habitat: "Compost maduro, suelos ricos en materia orgánica",
    season: ["Primavera", "Otoño"],
    isEndemic: false,
    role: "cultivation",
    mycorrhizaType: "none",
    data: {
      humidity: generateTimeSeries(30, 75, 4),
      temperature: generateTimeSeries(30, 16, 2),
      co2: generateTimeSeries(30, 600, 50),
    },
    optimal: { humidity: [70, 80], temperature: [14, 18], co2: [500, 700] },
  },
];

// ============================================================================
// MONITORING ZONES — hosts micorrícicos reales de la finca
// ----------------------------------------------------------------------------
// Cada zona monitoriza un huésped micorrícico: árboles, esparto, cereal,
// cubiertas o los pinos. Los datos son mock hasta conectar sensores IoT.
// ============================================================================

export const MONITORING_ZONES: MonitoringZone[] = [
  {
    id: "zone-olivo",
    hostId: "olivo",
    name: "Olivar",
    scientificName: "Olea europaea",
    icon: "🫒",
    location: "Ladera Este",
    mycorrhizaType: "AMF",
    colonisation: 62,
    glomalin: 2.1,
    humidity: 62,
    temperature: 23,
    co2: 420,
    status: "optimal",
  },
  {
    id: "zone-almendro",
    hostId: "almendro",
    name: "Almendro",
    scientificName: "Prunus dulcis",
    icon: "🌰",
    location: "Parcela Este",
    mycorrhizaType: "AMF",
    colonisation: 50,
    glomalin: 1.9,
    humidity: 58,
    temperature: 24,
    co2: 430,
    status: "optimal",
  },
  {
    id: "zone-esparto",
    hostId: "esparto",
    name: "Esparto",
    scientificName: "Stipa tenacissima",
    icon: "🌾",
    location: "Linde noreste",
    mycorrhizaType: "AMF",
    colonisation: 45,
    glomalin: 2.1,
    humidity: 65,
    temperature: 22,
    co2: 410,
    status: "optimal",
  },
  {
    id: "zone-cereal",
    hostId: "cereal",
    name: "Cereal (trigo, cebada)",
    scientificName: "Triticum aestivum",
    icon: "🌾",
    location: "Parcela de pruebas 40–50 m²",
    mycorrhizaType: "AMF",
    colonisation: 30,
    glomalin: 1.5,
    humidity: 58,
    temperature: 24,
    co2: 430,
    status: "good",
  },
  {
    id: "zone-pino",
    hostId: "pino",
    name: "Pinos (2 ejemplares)",
    scientificName: "Pinus halepensis",
    icon: "🌲",
    location: "Junto a la casa",
    mycorrhizaType: "ECM",
    colonisation: 60,
    humidity: 55,
    temperature: 23,
    co2: 420,
    stage: "fruiting",
    harvestIn: "Otoño (tras lluvias)",
    status: "optimal",
  },
  {
    id: "zone-cubierta",
    hostId: "cubierta",
    name: "Cubiertas vegetales",
    scientificName: "Trifolium / Vicia / Avena",
    icon: "🌿",
    location: "Entre hileras de árboles",
    mycorrhizaType: "AMF",
    colonisation: 38,
    glomalin: 1.8,
    humidity: 68,
    temperature: 21,
    co2: 400,
    status: "good",
  },
];

// ----------------------------------------------------------------------------
// Alias retrocompatible (evita romper imports existentes)
// ----------------------------------------------------------------------------

/** @deprecated Usar MONITORING_ZONES */
export const CULTIVATION_ZONES = MONITORING_ZONES;

// ============================================================================
// Helpers
// ============================================================================

export const DEFAULT_MUSHROOM_ID = "niccolo";
