import type { EnvironmentalStatus } from "../utils/statusColors";
import { getStatusBadgeClasses } from "../utils/statusColors";

interface StatusBadgeProps {
  status: EnvironmentalStatus;
}

/**
 * Small pill showing the status of an environmental parameter.
 * Used in tables and inline badges.
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadgeClasses(status)}`}
    >
      {status}
    </span>
  );
}
