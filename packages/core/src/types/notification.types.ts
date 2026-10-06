// ============================================================================
// Notification Types – Real-time alerts for decision support
// ============================================================================

export type NotificationSeverity = "info" | "success" | "warning" | "critical";

export type NotificationSourceType =
  | "recommendation"
  | "sensor"
  | "system"
  | "weather";

export type NotificationTopic = "soil" | "water" | "general";

export interface Notification {
  id: string;
  severity: NotificationSeverity;
  sourceType: NotificationSourceType;
  sourceId?: string;
  topic?: NotificationTopic;
  title: string;
  message: string;
  actionLabel?: string;
  actionUrl?: string;
  zoneId?: string;
  zoneName?: string;
  createdAt: string;
  read: boolean;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}
