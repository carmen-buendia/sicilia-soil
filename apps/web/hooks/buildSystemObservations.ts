// apps/web/hooks/buildSystemObservations.ts
import type { CropSystem, CropObservation } from "@sicilia-soil/core";

export function buildSystemObservations(
  system: CropSystem,
  now: string = new Date().toISOString(),
): CropObservation[] {
  const obs: CropObservation[] = [];
  const sensor = system.sensors?.[0];

  // 1. Humedad edáfica vs umbral
  if (
    system.metrics.moisture !== undefined &&
    system.metrics.moistureThreshold !== undefined
  ) {
    const isBelow = system.metrics.moisture < system.metrics.moistureThreshold;
    obs.push({
      id: `${system.id}-moisture`,
      systemId: system.id,
      key: "moisture",
      text: `Humedad edáfica ${system.metrics.moisture}% — umbral de referencia ${system.metrics.moistureThreshold}%`,
      level: isBelow ? "warning" : "success",
      value: system.metrics.moisture,
      threshold: system.metrics.moistureThreshold,
      meta: {
        source: sensor?.label ?? "sensor",
        sensorId: sensor?.id,
        date: now,
      },
    });
  }

  // 2. Colonización AMF
  if (system.metrics.amf !== undefined) {
    obs.push({
      id: `${system.id}-amf`,
      systemId: system.id,
      key: "amf",
      text: `Colonización AMF ${system.metrics.amf}% — hipótesis: el inóculo post-cosecha podría elevar la colonización (pendiente de validación)`,
      level: "info",
      value: system.metrics.amf,
      meta: {
        source: "muestra n=3",
        date: now,
      },
    });
  }

  // 3. Índice NDVI
  if (system.metrics.ndvi !== undefined) {
    obs.push({
      id: `${system.id}-ndvi`,
      systemId: system.id,
      key: "ndvi",
      text: `NDVI ${system.metrics.ndvi.toFixed(2)} — tendencia registrada`,
      level: "success",
      value: system.metrics.ndvi,
      meta: {
        source: "satélite",
        date: now,
      },
    });
  }

  // 4. Índice SHI (Soil Health Index)
  if (system.metrics.shi !== undefined) {
    const shi = system.metrics.shi;
    obs.push({
      id: `${system.id}-shi`,
      systemId: system.id,
      key: "shi",
      text: `SHI ${shi} (0–100) — índice de salud del suelo`,
      level: shi >= 75 ? "success" : shi >= 50 ? "info" : "warning",
      value: shi,
      meta: {
        source: "cálculo interno",
        date: now,
      },
    });
  }

  // 5. Observaciones manuales guardadas por el usuario en el sistema
  if (system.observations) {
    obs.push(...system.observations);
  }

  return obs;
}
