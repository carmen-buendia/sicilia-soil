// apps/web/hooks/useAnalyticsData.ts
"use client";

import { useMemo } from "react";
import { getLocale } from "@sicilia-soil/core";
import type { SystemTemplate } from "@sicilia-soil/core";
import { useCropSystemsContext } from "@/components/features/crops/CropSystemsProvider";

export interface AnalyticsRow {
  id: string;
  name: string;
  icon: string;
  template: SystemTemplate;
  shi: number;
  amf: number;
  glomalin: number;
  interpretation: string;
}

export function useAnalyticsData() {
  const { systems } = useCropSystemsContext();
  const t = getLocale("es").content.cropsPage.analytics;

  return useMemo(() => {
    const rows: AnalyticsRow[] = systems.map((s) => {
      // Usamos el template del sistema para buscar su texto de interpretación
      const templateText = t.interpretationTemplates[s.template] || "";

      return {
        id: s.id,
        name: s.name,
        icon: s.icon,
        template: s.template,
        // Usamos ?? 0 por si el sistema aún no tiene estas métricas guardadas
        shi: s.metrics.shi ?? 0,
        amf: s.metrics.amf ?? 0,
        glomalin: s.metrics.glomalin ?? 0,
        // Reemplazamos el placeholder "{name}" con el nombre real del sistema
        interpretation: templateText.replace("{name}", s.name),
      };
    });

    return {
      rows,
      hasData: rows.length > 0,
      series: t.series,
      thresholds: t.thresholds,
      cycle: { title: t.cycleTitle, desc: t.cycleDesc },
    };
  }, [systems, t]);
}
