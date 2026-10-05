"use client";

import { useEffect, useState, useCallback } from "react";
import {
  type CopernicusData,
  type UseCopernicusDataOptions,
  type UseCopernicusDataReturn,
} from "@sicilia-soil/core";
import { DEFAULT_PLOT_ID } from "@sicilia-soil/core/data/copernicus.defaults";

export function useCopernicusData({
  plotId = DEFAULT_PLOT_ID,
  apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
  pollIntervalMs = 5 * 60 * 1000,
  enabled = true,
}: UseCopernicusDataOptions = {}): UseCopernicusDataReturn {
  const [data, setData] = useState<CopernicusData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const url = `${apiUrl}/api/copernicus?plot=${encodeURIComponent(plotId)}`;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: ${response.statusText || "No se pudo obtener datos de Copernicus"}`,
        );
      }

      const json = (await response.json()) as CopernicusData;
      setData(json);
      setLastUpdated(new Date());
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Error desconocido al conectar con Copernicus";
      setError(message);
      console.warn("[useCopernicusData] Error:", message);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, plotId, enabled]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!enabled || pollIntervalMs <= 0) return;
    const interval = setInterval(() => {
      void fetchData();
    }, pollIntervalMs);
    return () => clearInterval(interval);
  }, [fetchData, enabled, pollIntervalMs]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    lastUpdated,
  };
}
