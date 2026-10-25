// apps/web/config/monitoring.styles.ts
import {
  Droplets,
  Thermometer,
  Sun,
  Wind,
  type LucideIcon,
} from "lucide-react";

export const KPI_ICONS: Record<string, LucideIcon> = {
  moisture: Droplets,
  temperature: Thermometer,
  light: Sun,
  wind: Wind,
};

export const KPI_COLORS: Record<string, string> = {
  moisture: "text-chloro",
  temperature: "text-red-500",
  light: "text-solar",
  wind: "text-ink/60",
};

export const COVER_STATUS_CONFIG: Record<
  string,
  { key: string; style: string }
> = {
  "High density": {
    key: "highDensity",
    style: "bg-chloro/10 border-chloro/20 text-chloro",
  },
  Emergence: {
    key: "emergence",
    style: "bg-chloro/10 border-chloro/20 text-chloro",
  },
  Senescence: {
    key: "senescence",
    style: "bg-solar/10 border-solar/20 text-solar",
  },
};
export const FALLBACK_STATUS_STYLE = "bg-solar/10 border-solar/20 text-solar";
