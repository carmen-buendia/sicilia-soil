// ============================================================================
// Environmental Status Colors – Shared utility
// ============================================================================

export type EnvironmentalStatus = "good" | "warning" | "danger";

/**
 * Returns Tailwind class strings for the given status.
 * Used for KPI cards with background + border + text.
 */
export function getStatusCardClasses(status: EnvironmentalStatus): string {
  if (status === "good") return "text-green-600 bg-green-50 border-green-200";
  if (status === "warning")
    return "text-yellow-600 bg-yellow-50 border-yellow-200";
  return "text-red-600 bg-red-50 border-red-200";
}

/**
 * Returns Tailwind class strings for a badge/pill.
 * Used for table cells and inline badges.
 */
export function getStatusBadgeClasses(status: EnvironmentalStatus): string {
  if (status === "good") return "bg-green-100 text-green-700";
  if (status === "warning") return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

/**
 * Returns the hex color for a status (used in charts).
 */
export function getStatusHexColor(status: EnvironmentalStatus): string {
  if (status === "good") return "#22c55e";
  if (status === "warning") return "#eab308";
  return "#ef4444";
}
