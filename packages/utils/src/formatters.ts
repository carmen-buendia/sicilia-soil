// packages/utils/src/formatters.ts

// ============================================================================
// Formatters — Fechas, números, unidades y estado
// ============================================================================

// ----------------------------------------------------------------------------
// Fechas
// ----------------------------------------------------------------------------

export const formatRelativeTime = (date: Date | string): string => {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "hace un momento";
  if (diffMins < 60) return `hace ${diffMins} min`;
  if (diffHours < 24) return `hace ${diffHours} h`;
  if (diffDays === 1) return "hace 1 día";
  return `hace ${diffDays} días`;
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatDateTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ----------------------------------------------------------------------------
// Números y unidades
// ----------------------------------------------------------------------------

export const calculatePercentage = (
  value: number,
  max: number = 100,
): number => {
  return Math.min(100, Math.max(0, (value / max) * 100));
};

export const formatWithUnit = (value: number, unit: string): string => {
  return `${value}${unit}`;
};

// ----------------------------------------------------------------------------
// Estado
// ----------------------------------------------------------------------------

export const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    healthy: "bg-green-100 text-green-800",
    optimal: "bg-blue-100 text-blue-800",
    needs_water: "bg-red-100 text-red-800",
    active: "bg-purple-100 text-purple-800",
    full: "bg-cyan-100 text-cyan-800",
    saludable: "bg-blue-100 text-blue-700",
    óptimo: "bg-green-100 text-green-700",
    "necesita riego": "bg-red-100 text-red-700",
    activo: "bg-yellow-100 text-yellow-700",
    lleno: "bg-cyan-100 text-cyan-700",
  };
  return statusMap[status] || "bg-gray-100 text-gray-800";
};
