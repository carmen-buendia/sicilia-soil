"use client";

import {
  COVER_KPIS,
  COVER_SPECIES,
  FALLOW_KPIS,
  FALLOW_TIMELINE,
} from "@sicilia-soil/core";

export function useCoverFallowData() {
  return {
    coverKpis: COVER_KPIS,
    coverSpecies: COVER_SPECIES,
    fallowKpis: FALLOW_KPIS,
    fallowTimeline: FALLOW_TIMELINE,
  };
}
