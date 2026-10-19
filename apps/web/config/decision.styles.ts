// apps/web/config/decision.styles.ts

// ============================================================================
// MycoMesh Protocol — Decision UI styles
// ----------------------------------------------------------------------------
// Tailwind palettes + icon metadata for the Decision layer.
// Web-specific: lives in apps/web, not in packages.
// ============================================================================

import { Satellite, Wifi, Cloud, History, Info } from "lucide-react";
import type { DecisionState, EvidenceSource } from "@sicilia-soil/core";

// ---------------------------------------------------------------------------
// State palettes (green / yellow / red / unknown)
// ---------------------------------------------------------------------------

export interface StateStyle {
  bg: string;
  border: string;
  text: string;
  badge: string;
  dot: string;
  label: string;
}

export const DECISION_STATE_THEME: Record<DecisionState, StateStyle> = {
  green: {
    bg: "bg-gradient-to-br from-emerald-50 via-emerald-50/70 to-white",
    border: "border-emerald-200",
    text: "text-emerald-950",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    dot: "bg-emerald-500",
    label: "Todo en orden",
  },
  yellow: {
    bg: "bg-gradient-to-br from-amber-50 via-amber-50/70 to-white",
    border: "border-amber-200",
    text: "text-amber-950",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    dot: "bg-amber-500",
    label: "Atención",
  },
  red: {
    bg: "bg-gradient-to-br from-red-50 via-red-50/70 to-white",
    border: "border-red-200",
    text: "text-red-950",
    badge: "bg-red-100 text-red-800 border-red-200",
    dot: "bg-red-500",
    label: "Acción requerida",
  },
  unknown: {
    bg: "bg-gradient-to-br from-gray-50 via-gray-50/70 to-white",
    border: "border-gray-200",
    text: "text-ink-800",
    badge: "bg-gray-100 text-ink-700 border-gray-200",
    dot: "bg-gray-400",
    label: "Sin datos",
  },
};

// ---------------------------------------------------------------------------
// Evidence source icons
// ---------------------------------------------------------------------------

export interface SourceMeta {
  label: string;
  Icon: typeof Satellite;
}

export const SOURCE_META: Record<string, SourceMeta> = {
  sentinel1: { label: "Sentinel-1", Icon: Satellite },
  sentinel2: { label: "Sentinel-2", Icon: Satellite },
  sentinel3: { label: "Sentinel-3", Icon: Satellite },
  iot: { label: "Sensor IoT", Icon: Wifi },
  weather: { label: "Meteo", Icon: Cloud },
  historical: { label: "Histórico", Icon: History },
  observation: { label: "Observación", Icon: Info },
};

export const DEFAULT_SOURCE_META: SourceMeta = {
  label: "Desconocido",
  Icon: Info,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export const VOTE_DOT_COLOR: Record<DecisionState, string> = {
  green: "bg-emerald-500",
  yellow: "bg-amber-500",
  red: "bg-red-500",
  unknown: "bg-gray-400",
};

export function weightTextColor(weight: number): string {
  if (weight > 1.15) return "text-emerald-700";
  if (weight < 0.9) return "text-red-600";
  return "text-charcoalGray/70";
}
