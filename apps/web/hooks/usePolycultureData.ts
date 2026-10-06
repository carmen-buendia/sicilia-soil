"use client";

import {
  POLYCULTURE_KPIS,
  POLYCULTURE_TREES,
  POLYCULTURE_VEGETABLES,
  COMPOST_CYCLE,
} from "@sicilia-soil/core";

export function usePolycultureData() {
  return {
    kpis: POLYCULTURE_KPIS,
    trees: POLYCULTURE_TREES,
    vegetables: POLYCULTURE_VEGETABLES,
    compostCycle: COMPOST_CYCLE,
  };
}
