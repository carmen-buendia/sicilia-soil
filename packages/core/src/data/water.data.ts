// packages/core/src/data/water.data.ts

// ============================================================================
// Water helpers — pure functions, no data
// All water default data lives in content/defaults/water.ts
// Zone metadata lives in site/site.config.ts
// ============================================================================

export function getZoneStatus(
  current: number,
  optimal: number,
): { status: string; label: string; colorClass: string } {
  if (current < optimal - 10) {
    return {
      status: "critical",
      label: "Necesita riego",
      colorClass: "bg-red-100 text-red-700",
    };
  }
  if (current < optimal - 5) {
    return {
      status: "warning",
      label: "Bajo",
      colorClass: "bg-yellow-100 text-yellow-700",
    };
  }
  return {
    status: "optimal",
    label: "Óptimo",
    colorClass: "bg-green-100 text-green-700",
  };
}

export function getZoneColor(current: number, optimal: number): string {
  if (current < optimal - 10) return "#ef4444";
  if (current < optimal - 5) return "#eab308";
  return "#10b981";
}
