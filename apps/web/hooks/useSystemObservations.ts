// apps/web/hooks/useSystemObservations.ts
"use client";

import { useMemo } from "react";
import type { CropSystem, CropObservation } from "@sicilia-soil/core";
import { buildSystemObservations } from "./buildSystemObservations";

export function useSystemObservations(system: CropSystem): CropObservation[] {
  return useMemo(() => buildSystemObservations(system), [system]);
}
