"use client";

import {
  AlertTriangle,
  Droplets,
  Leaf,
  Sprout,
  Activity,
  TrendingUp,
  ShieldCheck,
  Zap,
  Recycle,
} from "lucide-react";
import type {
  RecommendationItem,
  RecommendationPriority,
  RecommendationCategory,
} from "@sicilia-soil/core";
import { getLocale } from "@sicilia-soil/core";
import { Button, DataCard } from "@sicilia-soil/ui";

interface RecommendationCardProps {
  recommendation: RecommendationItem;
  onAction?: (id: string) => void;
  highlightId?: string | null; // <-- AÑADIDO
}

const CATEGORY_ICONS: Record<RecommendationCategory, typeof Droplets> = {
  irrigation: Droplets,
  fertilization: Sprout,
  "soil-health": Leaf,
  "pest-control": AlertTriangle,
  "erosion-control": ShieldCheck,
  "carbon-sequestration": TrendingUp,
  harvest: Sprout,
  regeneration: Recycle,
  general: Activity,
};

export function RecommendationCard({
  recommendation,
  onAction,
  highlightId, // <-- AÑADIDO
}: RecommendationCardProps) {
  const locale = getLocale("es");
  const t = locale.ui.recommendations;
  const Icon = CATEGORY_ICONS[recommendation.category];

  const isHighlighted = recommendation.id === highlightId; // <-- COMPROBAMOS

  const variantMap: Record<RecommendationPriority, any> = {
    urgent: "critical",
    high: "warning",
    medium: "warning",
    low: "info",
    info: "success",
  };
  const colorMap: Record<RecommendationPriority, string> = {
    urgent: "text-red-500",
    high: "text-solar",
    medium: "text-solar",
    low: "text-ink/70",
    info: "text-chloro",
  };

  return (
    // Añadimos el ID aquí para que el scroll funcione
    <div id={recommendation.id} className="h-full">
      <DataCard
        variant={variantMap[recommendation.priority]}
        // Añadimos las clases de resaltado si isHighlighted es true
        className={`flex flex-col h-full bg-card transition-all duration-500 ${
          isHighlighted
            ? "ring-2 ring-solar ring-offset-4 ring-offset-paper shadow-xl scale-[1.02]"
            : ""
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3 border-b border-ink/10 pb-3">
          <div className="flex items-start gap-3">
            <div
              className={`p-2 border border-ink/10 bg-paper ${colorMap[recommendation.priority]}`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1 font-mono text-[10px] uppercase tracking-wider font-bold">
                <span className="px-2 py-0.5 border border-ink/20 text-ink/60">
                  {t[recommendation.topic as keyof typeof t] || t.general}
                </span>
                <span className={colorMap[recommendation.priority]}>
                  {t[recommendation.priority as keyof typeof t]}
                </span>
                {recommendation.zoneName && (
                  <span className="text-ink/40">
                    · {recommendation.zoneName}
                  </span>
                )}
              </div>
              <h3
                className={`font-serif text-lg font-bold ${colorMap[recommendation.priority]}`}
              >
                {recommendation.title}
              </h3>
            </div>
          </div>
          <div className="font-mono text-sm font-bold text-ink/60">
            {recommendation.confidence}%
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-sm text-ink/70 mb-4 leading-relaxed flex-1">
          {recommendation.description}
        </p>

        {/* Action */}
        <div className="bg-paper/50 border border-ink/10 p-3 mb-4">
          <p className="font-mono text-[10px] text-ink/50 uppercase tracking-wider mb-1 font-bold">
            {t.action}
          </p>
          <p className="font-sans text-sm font-bold text-ink flex items-start gap-2">
            <Zap className="w-4 h-4 text-solar flex-shrink-0 mt-0.5" />
            {recommendation.action}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between font-mono text-[10px] text-ink/50 mt-auto pt-3 border-t border-ink/10">
          <span className="flex items-center gap-1 uppercase tracking-wider">
            <Activity className="w-3 h-3" />
            {t.source}: {recommendation.dataSource}
          </span>
          {onAction && (
            <Button
              type="button"
              onClick={() => onAction(recommendation.id)}
              className="text-solar hover:text-ink font-bold uppercase tracking-wider transition-colors"
            >
              {t.markDone} →
            </Button>
          )}
        </div>
      </DataCard>
    </div>
  );
}
