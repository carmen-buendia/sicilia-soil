import type {
  Notification,
  NotificationSeverity,
  RecommendationItem,
} from "@sicilia-soil/core";

const PRIORITY_TO_SEVERITY: Record<string, NotificationSeverity> = {
  urgent: "critical",
  high: "warning",
  medium: "info",
};

export function notificationsFromRecommendations(
  recommendations: RecommendationItem[],
): Notification[] {
  const notifications: Notification[] = [];

  for (const rec of recommendations) {
    const severity = PRIORITY_TO_SEVERITY[rec.priority];
    if (!severity) continue;

    notifications.push({
      id: `notif-${rec.id}`,
      severity,
      sourceType: "recommendation",
      sourceId: rec.id,
      topic:
        rec.topic === "soil" || rec.topic === "water" ? rec.topic : "general",
      title: rec.title,
      message: rec.description,
      actionLabel: rec.action,
      actionUrl: `/engine?highlight=${rec.id}`,
      zoneId: rec.zoneId,
      zoneName: rec.zoneName,
      createdAt: rec.createdAt,
      read: false,
    });
  }

  return sortBySeverity(notifications);
}

const SEVERITY_ORDER: Record<NotificationSeverity, number> = {
  critical: 4,
  warning: 3,
  info: 2,
  success: 1,
};

export function sortBySeverity(notifications: Notification[]): Notification[] {
  return [...notifications].sort((a, b) => {
    const s = SEVERITY_ORDER[b.severity] - SEVERITY_ORDER[a.severity];
    if (s !== 0) return s;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export function countUnread(notifications: Notification[]): number {
  return notifications.filter((n) => !n.read).length;
}

export function markAsRead(
  notifications: Notification[],
  id: string,
): Notification[] {
  return notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
}

export function markAllAsRead(notifications: Notification[]): Notification[] {
  return notifications.map((n) => ({ ...n, read: true }));
}
