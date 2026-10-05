import type { LucideIcon } from "lucide-react";
import type { EnvironmentalStatus } from "../utils/statusColors";
import { getStatusCardClasses, getStatusHexColor } from "../utils/statusColors";

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  unit: string;
  status: EnvironmentalStatus;
  threshold: number;
}

/**
 * KPI card for environmental parameters.
 * Shows value, threshold, and a progress bar colored by status.
 */
export function MetricCard({
  icon: Icon,
  title,
  value,
  unit,
  status,
  threshold,
}: MetricCardProps) {
  const percentage = Math.min(100, (value / threshold) * 100);

  return (
    <div
      className={`rounded-xl p-4 border shadow-sm ${getStatusCardClasses(status)}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider opacity-70">
            {title}
          </p>
          <p className="text-2xl font-bold mt-1">
            {value.toFixed(1)}
            <span className="text-sm font-normal ml-1 opacity-60">{unit}</span>
          </p>
        </div>
        <Icon className="w-5 h-5 opacity-70" />
      </div>
      <div className="mt-2">
        <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${percentage}%`,
              background: getStatusHexColor(status),
            }}
          />
        </div>
        <p className="text-[10px] mt-1 opacity-60">
          Umbral: {threshold} {unit}
        </p>
      </div>
    </div>
  );
}
