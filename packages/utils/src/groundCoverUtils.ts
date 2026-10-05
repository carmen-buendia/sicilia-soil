import type {} from "@sicilia-soil/core";
import {
  GroundCoverMonitoring,
  GroundCoverHealth,
} from "@sicilia-soil/core/types/groundCover.types";

// ============================================================================
// Average Helper
// ============================================================================

export function getAverage(values: number[]): number {
  if (values.length === 0) return 0;
  let total = 0;
  for (const v of values) total += v;
  return total / values.length;
}

// ============================================================================
// Health Status
// ============================================================================

/**
 * Computes the health status of the ground cover (T3) based on monitoring data.
 *
 * Thresholds:
 * - Excellent: moisture ≥ 65%, temperature 18-25°C, light ≥ 60%
 * - Good:      moisture ≥ 50%, temperature 15-30°C
 * - Attention: otherwise
 */
export function getGroundCoverHealth(
  monitoring: GroundCoverMonitoring,
): GroundCoverHealth {
  const avgMoisture = getAverage(monitoring.moisture);
  const avgTemp = getAverage(monitoring.temperature);
  const avgLight = getAverage(monitoring.light);

  if (avgMoisture >= 65 && avgTemp >= 18 && avgTemp <= 25 && avgLight >= 60) {
    return {
      status: "Excelente",
      color: "bg-green-100 text-green-700",
      icon: "✅",
    };
  }

  if (avgMoisture >= 50 && avgTemp >= 15 && avgTemp <= 30) {
    return {
      status: "Buena",
      color: "bg-yellow-100 text-yellow-700",
      icon: "⚠️",
    };
  }

  return {
    status: "Requiere atención",
    color: "bg-red-100 text-red-700",
    icon: "🔴",
  };
}
