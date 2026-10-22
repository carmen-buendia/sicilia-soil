// packages/core/src/decision/sicilia-soil.adapter.ts
// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Carmen María Buendía Sánchez
// ============================================================================
// SikeliaSoil — Evidence Adapter
// ----------------------------------------------------------------------------
// Implements the generic EvidenceAdapter interface from @sicilia-soil/decision
// with agriculture-specific paths (sensors.soil_moisture, eoIndices.NDVI...).
// ============================================================================
import type { EvidenceAdapter, InputConflict } from "@isola-node/rule-engine";
import type { DecisionEvidence } from "../types/decision.types";

export const SiciliaSoilAdapter: EvidenceAdapter<DecisionEvidence> = {
  read(evidence: DecisionEvidence, path: string): number | undefined {
    if (path === "sensors.soil_moisture")
      return evidence.sensors.find((s) => s.sensorType === "soil_moisture")
        ?.value;
    if (path === "sensors.soil_temperature")
      return evidence.sensors.find((s) => s.sensorType === "soil_temperature")
        ?.value;
    if (path === "eoIndices.NDVI")
      return evidence.eoIndices.find((e) => e.indexType === "NDVI")?.value;
    if (path === "eoIndices.NDWI")
      return evidence.eoIndices.find((e) => e.indexType === "NDWI")?.value;
    if (path === "eoIndices.LST")
      return evidence.eoIndices.find((e) => e.indexType === "LST")?.value;
    if (path === "eoIndices.SSM")
      return evidence.eoIndices.find((e) => e.indexType === "SSM")?.value;
    if (path === "weather.rainNext72hMm")
      return evidence.weather?.rainNext72hMm;
    if (path === "kpis.mycorrhiza_colonisation")
      return evidence.kpis.find((k) => k.kpiKey === "mycorrhiza_colonisation")
        ?.value;
    if (path === "kpis.glomalin")
      return evidence.kpis.find((k) => k.kpiKey === "glomalin")?.value;
    return undefined;
  },

  detectConflicts(evidence: DecisionEvidence): InputConflict[] {
    const conflicts: InputConflict[] = [];
    const ssm = evidence.eoIndices.find((e) => e.indexType === "SSM")?.value;
    const iotMoisture = evidence.sensors.find(
      (s) => s.sensorType === "soil_moisture",
    )?.value;

    if (
      ssm !== undefined &&
      iotMoisture !== undefined &&
      Math.abs(ssm - iotMoisture) > 20
    ) {
      conflicts.push({
        sources: ["sentinel1", "iot"],
        description: `El satélite dice ${ssm.toFixed(0)}% de humedad y el sensor de campo dice ${iotMoisture.toFixed(0)}%`,
        resolution: "weighted",
      });
    }
    return conflicts;
  },

  sourcesUsed(evidence: DecisionEvidence): string[] {
    const sources: string[] = [];
    if (evidence.eoIndices.length) sources.push("sentinel2");
    if (evidence.sensors.length) sources.push("iot");
    if (evidence.weather) sources.push("weather");
    if (evidence.history) sources.push("historical");
    return sources;
  },
};
