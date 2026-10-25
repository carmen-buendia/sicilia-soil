// apps/web/config/icon-maps.ts
import {
  Leaf,
  TrendingUp,
  Droplets,
  TreeDeciduous,
  Thermometer,
  Sun,
  Wind,
  Carrot,
  Recycle,
  type LucideIcon,
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
