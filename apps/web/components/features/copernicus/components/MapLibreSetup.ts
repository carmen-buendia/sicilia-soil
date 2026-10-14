"use client";

import { setWorkerUrl, getVersion } from "maplibre-gl";

let initialized = false;

export function initMapLibreWorker() {
  if (initialized) return;

  // Ruta servida desde /public/maplibre/
  const workerUrl = "/maplibre/maplibre-gl-worker.mjs";

  console.log(
    `[MapLibre] Setting worker URL to ${workerUrl} (v${getVersion()})`,
  );
  setWorkerUrl(workerUrl);

  initialized = true;
}
