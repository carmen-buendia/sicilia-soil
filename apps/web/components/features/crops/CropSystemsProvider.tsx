// apps/web/components/features/crops/CropSystemsProvider.tsx
"use client";

import { createContext, useContext } from "react";
import { useCropSystems } from "@/hooks/useCropSystems";

type CropSystemsStore = ReturnType<typeof useCropSystems>;

const CropSystemsContext = createContext<CropSystemsStore | null>(null);

export function CropSystemsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useCropSystems();
  return (
    <CropSystemsContext.Provider value={store}>
      {children}
    </CropSystemsContext.Provider>
  );
}

export function useCropSystemsContext(): CropSystemsStore {
  const ctx = useContext(CropSystemsContext);
  if (!ctx) {
    throw new Error(
      "useCropSystemsContext must be used within <CropSystemsProvider>",
    );
  }
  return ctx;
}
