"use client";

import {
  AlertTriangle,
  Droplets,
  Leaf,
  Wind,
  Sprout,
  Activity,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type {
  RecommendationItem,
  RecommendationPriority,
  RecommendationCategory,
} from "@sicilia-soil/core";

interface RecommendationCardProps {
  recommendation: RecommendationItem;
  onAction?: (id: string) => void;
}

const PRIORITY_STYLES: Record<
  RecommendationPriority,
  { bg: string; border: string; text: string; badge: string; label: string }
> = {
  urgent: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    badge: "bg-red-100 text-red-800 border-red-200",
    label: "Urgente",
  },
  high: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    badge: "bg-orange-100 text-orange-800 border-orange-200",
    label: "Alta",
  },
  medium: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
    label: "Media",
  },
  low: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-800 border-blue-200",
    label: "Baja",
  },
  info: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    badge: "bg-green-100 text-green-800 border-green-200",
    label: "Info",
  },
};

const CATEGORY_ICONS: Record<RecommendationCategory, typeof Droplets> = {
  irrigation: Droplets,
  fertilization: Sprout,
  "soil-health": Leaf,
  "pest-control": AlertTriangle,
  "erosion-control": ShieldCheck,
  "carbon-sequestration": TrendingUp,
  harvest: Sprout,
  general: Activity,
};

const TOPIC_BADGES: Record<string, string> = {
  T2: "bg-oliveGreen/10 text-oliveGreen border-oliveGreen/20",
  T3: "bg-blue-100 text-blue-700 border-blue-200",
  general: "bg-gray-100 text-gray-700 border-gray-200",
};

export function RecommendationCard({
  recommendation,
  onAction,
}: RecommendationCardProps) {
  const style = PRIORITY_STYLES[recommendation.priority];
  const Icon = CATEGORY_ICONS[recommendation.category];
  const topicClass = TOPIC_BADGES[recommendation.topic] ?? TOPIC_BADGES.general;

  return (
    <div
      className={`rounded-xl p-5 border shadow-sm hover:shadow-md transition-all ${style.bg} ${style.border}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg bg-white/70 ${style.text}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-medium ${topicClass}`}
              >
                {recommendation.topic}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-medium ${style.badge}`}
              >
                {style.label}
              </span>
              {recommendation.zoneName && (
                <span className="text-xs text-oliveGreen/70">
                  · {recommendation.zoneName}
                </span>
              )}
            </div>
            <h3 className={`text-base font-bold ${style.text}`}>
              {recommendation.title}
            </h3>
          </div>
        </div>
        <div className={`text-xs font-medium ${style.text}`}>
          {recommendation.confidence}%
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-charcoalGray/80 mb-3 leading-relaxed">
        {recommendation.description}
      </p>

      {/* Action */}
      <div className="bg-white/60 rounded-lg p-3 mb-3 border border-white/80">
        <p className="text-xs text-oliveGreen/60 mb-1 font-medium uppercase tracking-wider">
          Acción recomendada
        </p>
        <p className="text-sm font-semibold text-charcoalGray flex items-start gap-2">
          <Zap className="w-4 h-4 text-wheatGold flex-shrink-0 mt-0.5" />
          {recommendation.action}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-oliveGreen/60">
        <span className="flex items-center gap-1">
          <Activity className="w-3 h-3" />
          Fuente: {recommendation.dataSource}
        </span>
        {onAction && (
          <button
            type="button"
            onClick={() => onAction(recommendation.id)}
            className="text-oliveGreen hover:text-sicilian-red font-medium transition-colors"
          >
            Marcar como hecho →
          </button>
        )}
      </div>
    </div>
  );
}
