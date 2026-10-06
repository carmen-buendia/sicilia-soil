// packages/utils/src/symbiosis.engine.ts

import type {
  SymbiosisInput,
  SymbiosisResult,
  SymbiosisCategory,
  SymbiosisHostState,
} from "@sicilia-soil/core";
import {
  MYCORRHIZA_HOSTS,
  evaluateHostStatus,
  getHostById,
} from "@sicilia-soil/core";

// ============================================================================
// Symbiosis Engine — Mide el ciclo regenerativo entre cubierta vegetal
// (esparto, cereal, etc.) y la red micorrícica del suelo.
//
// Base científica:
// - Las plantas producen biomasa → sustrato para hongos
// - Las micorrizas extienden las raíces → +agua y nutrientes para las plantas
// - El ciclo combinado → +COS, +retención hídrica, +biodiversidad
//
// Nota: el micelio trabaja todo el año. Las setas son un bioindicador
// estacional de la salud de la red fúngica, no el objetivo principal.
// ============================================================================

/**
 * Colonización medida por host (mock hasta tener sensores reales).
 * Cuando haya datos reales, sustituir por el hook de sensores.
 */
const HOST_COLONISATION_MOCK: Record<string, number> = {
  olivo: 62,
  almendro: 50,
  ciruelo: 45,
  algarrobo: 48,
  esparto: 45,
  cereal: 30,
  hortaliza: 35,
  cubierta: 38,
  pino: 60,
};

const HOST_GLOMALIN_MOCK: Record<string, number> = {
  olivo: 2.1,
  almendro: 1.9,
  ciruelo: 1.7,
  algarrobo: 1.8,
  esparto: 2.1,
  cereal: 1.5,
  hortaliza: 1.6,
  cubierta: 1.8,
};

export function calculateSymbiosisScore(
  input: SymbiosisInput,
): SymbiosisResult {
  // 1. Flujo sustrato: raíces → micelio (biomasa vegetal que alimenta la red)
  const substrateFlow = clamp(
    input.espartoHealth * 0.4 + input.coverDensity * 0.6,
  );

  // 2. Flujo nutrientes: micelio → plantas (agua + nutrientes)
  const nutrientFlow = clamp(
    input.mycorrhizalColonisation * 0.5 +
      input.soilMoisture * 0.2 +
      input.soilRespiration * 0.2 +
      Math.min(input.fungalDiversity * 5, 100) * 0.1,
  );

  // 3. Flujo carbono: glomalina + COS
  const carbonFlow = clamp(
    Math.min(input.glomalin * 30, 100) * 0.6 +
      Math.min(input.cosPercent * 20, 100) * 0.4,
  );

  // 4. Estabilidad estructural del suelo
  const structuralStability = clamp(input.aggregateStability);

  // 5. Red AMF global (mayoría del sistema)
  const amfScore = clamp(
    input.mycorrhizalColonisation * 0.5 +
      Math.min(input.glomalin * 25, 100) * 0.3 +
      Math.min(input.fungalDiversity * 8, 100) * 0.2,
  );

  // 6. Red ECM (solo pinos) — mock hasta tener sensores en los pinos
  const ecmScore = clamp(
    (HOST_COLONISATION_MOCK.pino ?? 60) * 0.7 +
      Math.min(input.fungalDiversity * 8, 100) * 0.3,
  );

  // 7. Score global ponderado
  const balance = 100 - Math.abs(substrateFlow - nutrientFlow);
  const score = clamp(
    substrateFlow * 0.25 +
      nutrientFlow * 0.25 +
      carbonFlow * 0.2 +
      structuralStability * 0.15 +
      balance * 0.15,
  );

  // 8. Categoría e interpretación
  const { category, interpretation } = interpretScore(score);

  // 9. Estado por host
  const hosts: SymbiosisHostState[] = MYCORRHIZA_HOSTS.map((host) => {
    const colonisation = HOST_COLONISATION_MOCK[host.id] ?? host.colonisation;
    const glomalin =
      host.type === "AMF"
        ? (HOST_GLOMALIN_MOCK[host.id] ?? host.glomalin)
        : undefined;
    const status = evaluateHostStatus(host, colonisation, glomalin);
    return {
      id: host.id,
      name: host.name,
      icon: host.icon,
      type: host.type,
      colonisation,
      threshold: host.colonisationThreshold,
      status,
      glomalin,
      mushroomsObserved: host.producesMushrooms
        ? host.mushroomSpecies?.slice(0, 2)
        : undefined,
    };
  });

  // 10. Nota sobre setas
  const mushroomNote = buildMushroomNote(input);

  return {
    score: Math.round(score),
    category,
    indicators: {
      substrateFlow: Math.round(substrateFlow),
      nutrientFlow: Math.round(nutrientFlow),
      carbonFlow: Math.round(carbonFlow),
      structuralStability: Math.round(structuralStability),
    },
    networks: {
      amf: Math.round(amfScore),
      ecm: Math.round(ecmScore),
    },
    hosts,
    interpretation,
    mushroomNote,
    timestamp: new Date().toISOString(),
  };
}

// ============================================================================
// Helpers
// ============================================================================

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function buildMushroomNote(input: SymbiosisInput): string {
  const season = input.mushroomSeason ?? currentSeason();
  const occurrence = input.mushroomOccurrence ?? 0;

  if (season === "otono" && occurrence > 0) {
    return `Otoño: ${occurrence} especie${occurrence > 1 ? "s" : ""} observada${occurrence > 1 ? "s" : ""}. Bioindicador de red fúngica activa.`;
  }
  if (season === "otono") {
    return "Otoño: temporada de fructificación. La ausencia de setas no implica red inactiva — el micelio trabaja todo el año.";
  }
  return `Fuera de temporada de fructificación (${season}). El micelio sigue activo bajo tierra; las setas aparecerán principalmente en otoño tras las lluvias.`;
}

function currentSeason(): "primavera" | "verano" | "otono" | "invierno" {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return "primavera";
  if (month >= 6 && month <= 8) return "verano";
  if (month >= 9 && month <= 11) return "otono";
  return "invierno";
}

function interpretScore(score: number): {
  category: SymbiosisCategory;
  interpretation: string;
} {
  if (score >= 80) {
    return {
      category: "Establecida",
      interpretation:
        "Red micorrícica madura. Las plantas alimentan al micelio, el micelio fortalece a las plantas. Captura de carbono óptima.",
    };
  }
  if (score >= 60) {
    return {
      category: "En desarrollo",
      interpretation:
        "Red funcional con margen de mejora. Aumentar cobertura vegetal o diversidad fúngica aceleraría la regeneración.",
    };
  }
  if (score >= 40) {
    return {
      category: "Inicial",
      interpretation:
        "Simbiosis incipiente. El sistema necesita más biomasa o inoculación de micorrizas para consolidarse.",
    };
  }
  return {
    category: "Ausente",
    interpretation:
      "Sin simbiosis detectable. Priorizar implantación de cubierta vegetal antes de inocular hongos.",
  };
}
