// apps/web/hooks/useAllObservations.ts
"use client";

import { useMemo } from "react";
import type { CropObservation } from "@sicilia-soil/core";
import { useCropSystemsContext } from "@/components/features/crops/CropSystemsProvider";
import { buildSystemObservations } from "./buildSystemObservations";

export interface SystemObservation extends CropObservation {
  systemName: string;
  systemIcon: string;
  template: string;
}

export function useAllObservations(): SystemObservation[] {
  const { systems } = useCropSystemsContext();

  return useMemo(() => {
    const now = new Date().toISOString();
    return systems.flatMap((system) =>
      buildSystemObservations(system, now).map((o) => ({
        ...o,
        systemName: system.name,
        systemIcon: system.icon,
        template: system.template,
      })),
    );
  }, [systems]);
}
