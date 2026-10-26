// apps/web/hooks/useCropSystems.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import type { CropSystem } from "@sicilia-soil/core";
import { buildCoverFallowPreset } from "@sicilia-soil/core";

const STORAGE_KEY = "sicilia-soil:crop-systems";
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

function getDefaultState(): CropSystem[] {
  return isDemoMode ? [buildCoverFallowPreset()] : [];
}

function readFromStorage(): CropSystem[] | null {
  if (typeof window === "undefined") return null;
  try {
    const item = window.localStorage.getItem(STORAGE_KEY);
    if (!item) return null;
    return JSON.parse(item) as CropSystem[];
  } catch (error) {
    console.warn(`Error reading localStorage key "${STORAGE_KEY}":`, error);
    return null;
  }
}

export function useCropSystems() {
  const [systems, setSystems] = useState<CropSystem[]>(getDefaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readFromStorage();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSystems(stored);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(systems));
    } catch (error) {
      console.warn(`Error setting localStorage key "${STORAGE_KEY}":`, error);
    }
  }, [systems, hydrated]);

  const addSystem = useCallback((s: CropSystem) => {
    setSystems((prev) => [...prev, s]);
  }, []);

  const updateSystem = useCallback((id: string, patch: Partial<CropSystem>) => {
    setSystems((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, ...patch, updatedAt: new Date().toISOString() }
          : s,
      ),
    );
  }, []);

  const removeSystem = useCallback((id: string) => {
    setSystems((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const getSystem = useCallback(
    (id: string) => systems.find((s) => s.id === id),
    [systems],
  );

  return {
    systems,
    addSystem,
    updateSystem,
    removeSystem,
    getSystem,
    hydrated,
  };
}
