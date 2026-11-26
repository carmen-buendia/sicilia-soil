"use client";

import { useEffect, useState } from "react";

export type ServerStatusValue = "checking" | "online" | "offline";

const SENSORS_ENDPOINT = "https://sicilia-soil-backend.onrender.com/api/zones";
const TIMEOUT_MS = 8000;

/**
 * Comprueba si el backend de sensores responde.
 * Vive en el Navbar para que el estado se vea en todas las páginas.
 */
export function useServerStatus(): ServerStatusValue {
  const [status, setStatus] = useState<ServerStatusValue>("checking");

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    fetch(SENSORS_ENDPOINT, { signal: controller.signal })
      .then((response) => setStatus(response.ok ? "online" : "offline"))
      .catch(() => setStatus("offline"))
      .finally(() => clearTimeout(timeoutId));

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return status;
}
