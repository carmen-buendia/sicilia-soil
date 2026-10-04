import type {
  SymbiosisInput,
  SymbiosisResult,
  SymbiosisCategory,
} from "@sicilia-soil/core";

// ============================================================================
// Symbiosis Engine – Measures the regenerative cycle between ground cover
// (esparto, T3) and soil biology (mycology, T2).
//
// Scientific basis:
// - Esparto produces biomass → substrate for fungi
// - Mycorrhizae extend roots → +water and nutrients for esparto
// - Combined cycle → +COS, +water retention, +biodiversity
// ============================================================================

export function calculateSymbiosisScore(
  input: SymbiosisInput,
): SymbiosisResult {
  // 1. Flow esparto → mycelium (substrate supply)
  const espartoToMycelium = clamp(
    input.espartoHealth * 0.4 + input.coverDensity * 0.6,
  );

  // 2. Flow mycelium → esparto (water and nutrients supply)
  const myceliumToEsparto = clamp(
    input.myceliumActivity * 0.5 +
      input.soilMoisture * 0.3 +
      Math.min(input.fungalDiversity * 5, 100) * 0.2,
  );

  // 3. Carbon flow (COS is the output of the cycle)
  const carbonFlow = clamp(Math.min(input.cosPercent * 20, 100));

  // 4. Combined score (symmetry = better)
  const balance = 100 - Math.abs(espartoToMycelium - myceliumToEsparto);
  const score = clamp(
    espartoToMycelium * 0.3 +
      myceliumToEsparto * 0.3 +
      carbonFlow * 0.2 +
      balance * 0.2,
  );

  // 5. Category and interpretation
  const { category, interpretation } = interpretScore(score);

  return {
    score: Math.round(score),
    category,
    indicators: {
      espartoToMycelium: Math.round(espartoToMycelium),
      myceliumToEsparto: Math.round(myceliumToEsparto),
      carbonFlow: Math.round(carbonFlow),
    },
    interpretation,
    timestamp: new Date().toISOString(),
  };
}

// ============================================================================
// Helpers
// ============================================================================

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function interpretScore(score: number): {
  category: SymbiosisCategory;
  interpretation: string;
} {
  if (score >= 80) {
    return {
      category: "Establecida",
      interpretation:
        "Ciclo regenerativo maduro. El esparto alimenta al micelio, el " +
        "micelio fortalece al esparto. Captura de carbono óptima.",
    };
  }
  if (score >= 60) {
    return {
      category: "En desarrollo",
      interpretation:
        "Ciclo funcional pero con margen de mejora. Aumentar cobertura " +
        "vegetal o diversidad fúngica aceleraría la regeneración.",
    };
  }
  if (score >= 40) {
    return {
      category: "Inicial",
      interpretation:
        "Simbiosis incipiente. El sistema necesita más biomasa o " +
        "inoculación de micorrizas para consolidarse.",
    };
  }
  return {
    category: "Ausente",
    interpretation:
      "Sin simbiosis detectable. Priorizar implantación de cubierta " +
      "vegetal antes de inocular hongos.",
  };
}
