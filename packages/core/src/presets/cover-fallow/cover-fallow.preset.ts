// packages/core/src/presets/cover-fallow/cover-fallow.preset.ts
import type {
  CropObservation,
  CropSystem,
  KpiItem,
} from "../../domain/crop-system";
import {
  COVER_KPIS,
  COVER_SPECIES,
  FALLOW_KPIS,
  FALLOW_TIMELINE,
} from "../../data/coverFallow.data";
import { content } from "../../content/locales/es/content";

export function buildCoverFallowPreset(): CropSystem {
  const t = content.cropsPage.coverFallow;
  const now = new Date().toISOString();

  const observations: CropObservation[] = t.presetObservations.map((o) => ({
    id: o.id,
    key: o.key,
    level: o.level,
    systemId: o.systemId,
    text: o.text,
    meta: {
      source: o.meta.source,
      date: o.meta.date.replace("{date}", now),
    },
  }));

  const kpis: KpiItem[] = [
    ...COVER_KPIS.map((k) => ({
      label: k.label,
      value: k.value,
      note: k.note,
      icon: k.icon,
      level: "success" as const,
    })),
    ...FALLOW_KPIS.map((k) => ({
      label: k.label,
      value: k.value,
      note: k.note,
      icon: "leaf",
      level: "info" as const,
    })),
  ];

  return {
    id: "preset-barbecho-mediterraneo",
    name: "Barbecho mediterráneo",
    icon: "🌿",
    template: "cover-fallow",
    region: "mediterranean",
    description: "Cubierta de leguminosas con rotación de barbecho.",

    metrics: {
      coverageIndex: 78,
      aboveGroundBiomass: 2.4,
      biologicalNFixation: 18,
      waterRetention: 22,
      soilMoisture: 45,
      organicMatter: 1.8,
      organicMatterDelta: 0.2,
      restPeriodMonths: 6,
      phenologicalWindowMonth: 3,

      shi: 72,
      amf: 65,
      moisture: 45,
      glomalin: 1.2,
    },

    attributes: {
      restPeriod: "6 months",
      phenologicalWindow: "March",
    },

    kpis,

    subCrops: COVER_SPECIES.map((s) => ({
      id: s.id,
      name: s.name,
      icon: s.icon,
      area: `${s.cover}%`,
      residue: s.biomass,
      extraction: s.n,
      water: s.cover,
      stage: s.status,
      season: s.season,
    })),

    series: [
      {
        key: "rotation",
        name: t.rotationLabel,
        categories: FALLOW_TIMELINE.map((s) => s.month),
        data: FALLOW_TIMELINE.map((s) =>
          s.state === "done" ? 100 : s.state === "active" ? 60 : 20,
        ),
      },
    ],

    sensors: [],
    observations,
    createdAt: now,
    updatedAt: now,
  };
}
