// apps/web/components/features/recommendations/RecommendationCard.tsx
"use client";

import { Zap, Activity } from "lucide-react";
import type { RecommendationItem } from "@sicilia-soil/core";
import { getLocale } from "@sicilia-soil/core";
import { Button, DataCard } from "@sicilia-soil/ui";
import { PRIORITY_STYLES } from "@/config/recommendation.styles";
import { RECOMMENDATION_ICONS } from "@/config/icon-map"; 

interface RecommendationCardProps {
  recommendation: RecommendationItem;
  onAction?: (id: string) => void;
  highlightId?: string | null;
}

export function RecommendationCard({
  recommendation,
  onAction,
  highlightId,
}: RecommendationCardProps) {
  const locale = getLocale("es");
  const t = locale.ui.recommendations;

  // Usamos el mapa importado
  const Icon = RECOMMENDATION_ICONS[recommendation.category] || Activity;
  const isHighlighted = recommendation.id === highlightId;
  const style = PRIORITY_STYLES[recommendation.priority];

  return (
    <div id={recommendation.id} className="h-full">
      <DataCard
        variant={style.variant}
        className={`flex flex-col h-full bg-card transition-all duration-500 ${
          isHighlighted
            ? "ring-2 ring-solar ring-offset-4 ring-offset-paper shadow-xl scale-[1.02]"
            : ""
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3 border-b border-ink/10 pb-3">
          <div className="flex items-start gap-3">
            <div className={`p-2 border border-ink/10 bg-paper ${style.text}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1 font-mono text-[10px] uppercase tracking-wider font-bold">
                <span className="px-2 py-0.5 border border-ink/20 text-ink/60">
                  {t[recommendation.topic as keyof typeof t] || t.general}
                </span>
                <span className={style.text}>
                  {t[recommendation.priority as keyof typeof t]}
                </span>
                {recommendation.zoneName && (
                  <span className="text-ink/40">
                    · {recommendation.zoneName}
                  </span>
                )}
              </div>
              <h3 className={`font-serif text-lg font-bold ${style.text}`}>
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
