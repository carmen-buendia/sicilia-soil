"use client";

import { useState, useEffect } from "react";
import {
  SENSOR_READINGS_DEFAULT,
  KPIS_DEFAULT,
  CARBON_DEFAULT,
} from "@sicilia-soil/core";
import { getZones } from "@sicilia-soil/core/site";
import { createAdapter } from "@isola-node/adapters";

// 1. Creamos el adaptador una sola vez, fuera del hook.
// Usamos los datos antiguos como "mock" para no romper nada.
const sensorAdapter = createAdapter({
  kind: "mock",
  metadata: { id: "sicilia-soil", kind: "mock", name: "Sensores Sikelia" },
  data: SENSOR_READINGS_DEFAULT,
  getTimestamp: () => new Date().toISOString(), 
});

export function useDashboardData() {
  const [zones, setZones] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // 2. Usamos TU adaptador para obtener los datos
      const readings = await sensorAdapter.getReadings({
        from: "2020-01-01T00:00:00Z",
        to: "2030-01-01T00:00:00Z",
      });

      // 3. Mapeamos los datos exactamente igual que antes
      const mappedZones = getZones().map((config) => {
        const reading = readings.find((r) => r.sensorId === config.sensorId);

        return {
          id: config.id,
          sensorId: config.sensorId,
          location: config.location,
          currentCropId: config.currentCropId,
          moisture: reading?.moisture ?? 0,
          temperature: reading?.temperature ?? 0,
          light: reading?.light ?? 0,
          wind: reading?.wind ?? 0,
          statusKey: reading?.statusKey ?? "offline",
        };
      });

      setZones(mappedZones);
      setIsLoading(false);
    }

    loadData();
  }, []);

  return { zones, kpis: KPIS_DEFAULT, carbon: CARBON_DEFAULT, isLoading };
}
