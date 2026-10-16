// apps/web/config/recommendation.styles.ts

// ============================================================================
// MycoMesh Protocol — Recommendation UI styles
// ----------------------------------------------------------------------------
// Shared palettes for recommendation priorities (urgent/high/medium/low/info).
// Used by:
//   • /app/page.tsx (Alertas)
//   • /features/recommendations/RecommendationCard
//   • /features/recommendations/RecommendationsList (filters)
// ============================================================================

import type { RecommendationPriority } from "@sicilia-soil/core";

/**
 * Full palette — includes all fields any consumer might need.
 */
export interface PriorityStyle {
  bg: string;
  border: string;
  text: string;
  badge: string;
  label: string;
}

export const PRIORITY_STYLES: Record<RecommendationPriority, PriorityStyle> = {
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
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
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
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    label: "Info",
  },
};
