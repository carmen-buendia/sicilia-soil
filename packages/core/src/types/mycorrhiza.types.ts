// packages/core/src/types/mycorrhiza.types.ts

// ============================================================================
// Mycorrhizal network types — Sicilia Soil
// ============================================================================

export type MycorrhizaType =
  | "AMF" // arbuscular (mayoría de cultivos, gramíneas, frutales)
  | "ECM" // ectomicorriza (pinos, robles, castaños, abedules)
  | "ericoid" // ericoid (brezos, arándanos)
  | "orchid" // orquídeas
  | "none" // no micorrícica (brasicáceas, ciperáceas)
  | "unknown"; // aún no determinada

export type MycorrhizaHostId =
  | "olivo"
  | "almendro"
  | "ciruelo"
  | "algarrobo"
  | "esparto"
  | "cereal"
  | "hortaliza"
  | "cubierta"
  | "pino";

export type MycorrhizaHost = {
  id: MycorrhizaHostId;
  name: string;
  icon: string;
  type: MycorrhizaType;
  /** Géneros fúngicos dominantes en clima mediterráneo continental */
  genera: string[];
  /** Colonización media medida (%) */
  colonisation: number;
  /** Umbral mínimo aceptable (%) — por debajo hay que actuar */
  colonisationThreshold: number;
  /** Glomalina (mg/g) — solo aplica a AMF */
  glomalin?: number;
  /** Umbral mínimo de glomalina (mg/g) */
  glomalinThreshold?: number;
  /** Si el huésped produce setas comestibles o bioindicadoras */
  producesMushrooms: boolean;
  /** Setas asociadas más comunes en la zona */
  mushroomSpecies?: string[];
  /** Notas agronómicas */
  notes: string;
};

// ============================================================================
// Hosts de la finca (Sicilia interior, 800 m, colinas mediterráneas)
// ============================================================================

export const MYCORRHIZA_HOSTS: MycorrhizaHost[] = [
  // -------------------------------------------------------------------------
  // AMF — micorrizas arbusculares (mayoría del sistema)
  // -------------------------------------------------------------------------
  {
    id: "olivo",
    name: "Olivar",
    icon: "🫒",
    type: "AMF",
    genera: ["Glomus", "Rhizophagus", "Funneliformis"],
    colonisation: 62,
    colonisationThreshold: 50,
    glomalin: 2.1,
    glomalinThreshold: 1.5,
    producesMushrooms: false,
    notes:
      "Simbiosis arbuscular estable. Responde bien a cubiertas de leguminosas entre hileras.",
  },
  {
    id: "almendro",
    name: "Almendro",
    icon: "🌰",
    type: "AMF",
    genera: ["Glomus", "Gigaspora", "Scutellospora"],
    colonisation: 50,
    colonisationThreshold: 40,
    glomalin: 1.9,
    glomalinThreshold: 1.4,
    producesMushrooms: false,
    notes:
      "Sensible al estrés hídrico. La micorrización mejora la captación de agua en verano.",
  },
  {
    id: "ciruelo",
    name: "Ciruelo",
    icon: "🍑",
    type: "AMF",
    genera: ["Glomus", "Paraglomus"],
    colonisation: 45,
    colonisationThreshold: 35,
    glomalin: 1.7,
    glomalinThreshold: 1.3,
    producesMushrooms: false,
    notes: "Frutal de hueso. Buena respuesta a compost y mulch leñoso.",
  },
  {
    id: "algarrobo",
    name: "Algarrobo",
    icon: "🌳",
    type: "AMF",
    genera: ["Glomus", "Acaulospora"],
    colonisation: 48,
    colonisationThreshold: 38,
    glomalin: 1.8,
    glomalinThreshold: 1.4,
    producesMushrooms: false,
    notes:
      "Consumo propio. Sus restos alimentan el compost, que devuelve la materia orgánica al suelo.",
  },
  {
    id: "esparto",
    name: "Esparto",
    icon: "🌾",
    type: "AMF",
    genera: ["Glomus", "Acaulospora", "Scutellospora"],
    colonisation: 45,
    colonisationThreshold: 35,
    glomalin: 2.1,
    glomalinThreshold: 1.5,
    producesMushrooms: false,
    notes:
      "Cubierta clave en la linde. Sistema radical profundo que alimenta la red micorrícica del resto del sistema.",
  },
  {
    id: "cereal",
    name: "Cereal (trigo, cebada)",
    icon: "🌾",
    type: "AMF",
    genera: ["Glomus", "Rhizophagus", "Funneliformis"],
    colonisation: 30,
    colonisationThreshold: 25,
    glomalin: 1.5,
    glomalinThreshold: 1.2,
    producesMushrooms: false,
    notes:
      "Ciclo corto. La micorrización baja tras la cosecha; conviene sembrar cubierta inmediatamente.",
  },
  {
    id: "hortaliza",
    name: "Hortalizas",
    icon: "🥬",
    type: "AMF",
    genera: ["Glomus", "Rhizophagus"],
    colonisation: 35,
    colonisationThreshold: 28,
    glomalin: 1.6,
    glomalinThreshold: 1.2,
    producesMushrooms: false,
    notes:
      "Consumo propio. Sus restos alimentan el compost, que devuelve la materia orgánica al suelo.",
  },
  {
    id: "cubierta",
    name: "Cubiertas vegetales",
    icon: "🌿",
    type: "AMF",
    genera: ["Glomus", "Acaulospora"],
    colonisation: 38,
    colonisationThreshold: 30,
    glomalin: 1.8,
    glomalinThreshold: 1.4,
    producesMushrooms: false,
    notes:
      "Trébol, veza, avena, mostaza. Fijan N, previenen erosión y alimentan la red fúngica.",
  },

  // -------------------------------------------------------------------------
  // ECM — ectomicorrizas (solo en los dos pinos)
  // -------------------------------------------------------------------------
  {
    id: "pino",
    name: "Pinos (2 ejemplares)",
    icon: "🌲",
    type: "ECM",
    genera: ["Lactarius", "Suillus", "Rhizopogon", "Amanita"],
    colonisation: 60,
    colonisationThreshold: 40,
    producesMushrooms: true,
    mushroomSpecies: [
      "Suillus granulatus",
      "Lactarius deliciosus",
      "Rhizopogon roseolus",
    ],
    notes:
      "Únicos hospedadores ECM del sistema. Producen setas comestibles en otoño (níscalos, babosas). Bioindicador de red ectomicorrícica activa.",
  },
];

// ============================================================================
// Helpers
// ============================================================================

export const AMF_HOSTS = MYCORRHIZA_HOSTS.filter((h) => h.type === "AMF");
export const ECM_HOSTS = MYCORRHIZA_HOSTS.filter((h) => h.type === "ECM");
export const MUSHROOM_HOSTS = MYCORRHIZA_HOSTS.filter(
  (h) => h.producesMushrooms,
);

export function getHostById(id: MycorrhizaHostId): MycorrhizaHost | undefined {
  return MYCORRHIZA_HOSTS.find((h) => h.id === id);
}

export function getHostsByType(type: MycorrhizaType): MycorrhizaHost[] {
  return MYCORRHIZA_HOSTS.filter((h) => h.type === type);
}

/**
 * Evalúa el estado de un huésped micorrícico.
 * Devuelve: óptimo, aceptable, o deficitario (necesita acción).
 */
export function evaluateHostStatus(
  host: MycorrhizaHost,
  measuredColonisation: number,
  measuredGlomalin?: number,
): "optimal" | "acceptable" | "deficient" {
  const colonisationOk = measuredColonisation >= host.colonisationThreshold;
  const glomalinOk =
    host.glomalinThreshold === undefined ||
    measuredGlomalin === undefined ||
    measuredGlomalin >= host.glomalinThreshold;

  if (colonisationOk && glomalinOk) return "optimal";
  if (colonisationOk || glomalinOk) return "acceptable";
  return "deficient";
}
