"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation"; // <-- Importamos
import { useNotifications } from "@/hooks/useNotifications";
import Link from "next/link";
import { ArrowLeft, Brain, RefreshCw } from "lucide-react";
import { RecommendationsList } from "@/components/features/recommendations";
import { generateRecommendations } from "@sicilia-soil/utils";
import { getLocale, RECOMMENDATION_INPUT_DEFAULT } from "@sicilia-soil/core";
import { getZones } from "@sicilia-soil/core/site";
import { Button, DataCard } from "@sicilia-soil/ui";

// 1. Separamos el contenido en un componente interno
function EngineContent() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { addNotificationsFromRecommendations } = useNotifications();
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("highlight");

  const locale = getLocale("es");
  const t = locale.engine;

  const firstZone = getZones()[0];
  const zoneName = firstZone
    ? (locale.zones[firstZone.id as keyof typeof locale.zones] ?? firstZone.id)
    : "Unknown";

  const engineInput = useMemo(
    () => ({
      ...RECOMMENDATION_INPUT_DEFAULT,
      zoneId: firstZone?.id ?? "zone-unknown",
      zoneName,
    }),
    [firstZone?.id, zoneName],
  );

  const recommendations = useMemo(
    () => generateRecommendations(engineInput),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refreshKey, engineInput],
  );

  useEffect(() => {
    addNotificationsFromRecommendations(recommendations);
  }, [recommendations, addNotificationsFromRecommendations]);

  // 2. Efecto para hacer scroll a la tarjeta resaltada
  useEffect(() => {
    if (highlightId) {
      // Pequeño delay para asegurar que las tarjetas ya se renderizaron
      setTimeout(() => {
        const element = document.getElementById(highlightId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
    }
  }, [highlightId]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink/20 pb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 border border-ink/20 hover:bg-paper transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-ink/60" />
          </Link>
          <div>
            <h1 className="text-3xl font-serif font-bold text-ink flex items-center gap-3">
              <div className="w-12 h-12 bg-chloro/10 border border-chloro/20 flex items-center justify-center">
                <Brain className="w-6 h-6 text-chloro" />
              </div>
              {t.header.title}
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-chloro font-bold mt-1">
              {t.header.subtitle}
            </p>
          </div>
        </div>

        <Button
          variant="dark"
          onClick={() => setRefreshKey((k) => k + 1)}
          className="!rounded-none hover:!scale-100 flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest font-bold shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          {t.header.recalculate}
        </Button>
      </div>

      <DataCard className="p-6">
        <h2 className="text-lg font-serif font-bold text-ink mb-2">
          {t.infoBox.title}
        </h2>
        <p className="font-sans text-sm text-ink/70 leading-relaxed">
          {t.infoBox.description}
        </p>
      </DataCard>

      <RecommendationsList
        recommendations={recommendations}
        highlightId={highlightId}
      />
    </div>
  );
}

export default function EnginePage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center font-mono text-sm">
          Cargando motor...
        </div>
      }
    >
      <EngineContent />
    </Suspense>
  );
}
