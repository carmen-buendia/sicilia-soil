"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import Link from "next/link";
import { ArrowLeft, Brain } from "lucide-react";
import { RecommendationsList } from "@/components/features/recommendations";
import { useRecommendations } from "@/hooks/useRecommendations";
import { getLocale } from "@sicilia-soil/core";
import { DataCard } from "@sicilia-soil/ui";

// Handles the scroll to a highlighted card.
// Isolated with its own Suspense to avoid hydration errors from useSearchParams.
function HighlightHandler() {
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("highlight");

  useEffect(() => {
    if (highlightId) {
      const timer = setTimeout(() => {
        const element = document.getElementById(highlightId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [highlightId]);

  return null;
}

function EngineContent() {
  const { addNotificationsFromRecommendations } = useNotifications();
  const recommendations = useRecommendations();
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("highlight");

  const locale = getLocale("es");
  const t = locale.engine;

  useEffect(() => {
    addNotificationsFromRecommendations(recommendations);
  }, [recommendations, addNotificationsFromRecommendations]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
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
    <>
      <Suspense fallback={null}>
        <HighlightHandler />
      </Suspense>

      <Suspense
        fallback={
          <div className="p-8 text-center font-mono text-sm">
            Cargando motor...
          </div>
        }
      >
        <EngineContent />
      </Suspense>
    </>
  );
}
