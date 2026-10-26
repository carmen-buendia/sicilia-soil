// apps/web/config/icon-maps.ts
import { RecommendationCategory } from "@sicilia-soil/core";
import {
  Leaf,
  TrendingUp,
  Droplets,
  TreeDeciduous,
  Thermometer,
  Recycle,
  type LucideIcon,
  Droplet,
  Gauge,
  Layers,
  Network,
  Sun,
  ThermometerSun,
  Trees,
  Wind,
  Activity,
  AlertTriangle,
  ShieldCheck,
  Sprout,
} from "lucide-react";

export const POLYCULTURE_ICONS: Record<string, LucideIcon> = {
  tree: TreeDeciduous,
  droplet: Droplets,
  thermometer: Thermometer,
  recycle: Recycle,
  leaf: TreeDeciduous,
};

export const COVER_FALLOW_ICONS: Record<string, LucideIcon> = {
  leaf: Leaf,
  "trending-up": TrendingUp,
  droplet: Droplets,
};

export const DASHBOARD_ICONS: Record<string, unknown> = {
  leaf: Layers,
  droplet: Droplet,
  gauge: Gauge,
  trees: Trees,
  mycorrhiza: Network,
  thermometer: ThermometerSun,
  sun: Sun,
  wind: Wind,
};

export const RECOMMENDATION_ICONS: Record<
  RecommendationCategory,
  typeof Droplets
> = {
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
