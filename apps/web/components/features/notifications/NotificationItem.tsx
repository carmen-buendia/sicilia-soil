"use client";

import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import Link from "next/link";
import type { Notification, NotificationSeverity } from "@sicilia-soil/core";
import { getLocale } from "@sicilia-soil/core";
import { DataCard } from "@sicilia-soil/ui";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const SEVERITY_MAP: Record<
  NotificationSeverity,
  { icon: typeof Info; color: string; variant: any }
> = {
  critical: { icon: XCircle, color: "text-red-500", variant: "critical" },
  warning: { icon: AlertTriangle, color: "text-solar", variant: "warning" },
  info: { icon: Info, color: "text-ink/70", variant: "info" },
  success: { icon: CheckCircle2, color: "text-chloro", variant: "success" },
};

export function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  const locale = getLocale("es");
  const t = locale.ui.notifications;
  const style = SEVERITY_MAP[notification.severity];
  const Icon = style.icon;

  return (
    <DataCard
      variant={style.variant}
      isRead={notification.read}
      onClick={() => !notification.read && onMarkAsRead(notification.id)}
    >
      <div className="flex items-start gap-4">
        <Icon
          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${notification.read ? "text-ink/30" : style.color}`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4
              className={`font-serif text-base font-bold ${notification.read ? "text-ink/50" : "text-ink"}`}
            >
              {notification.title}
            </h4>
            {notification.topic && notification.topic !== "general" && (
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-ink/20 text-ink/60">
                {notification.topic}
              </span>
            )}
            {!notification.read && (
              <span className="w-2 h-2 rounded-full bg-solar flex-shrink-0" />
            )}
          </div>
          <p className="font-sans text-sm text-ink/70 line-clamp-2 mb-2">
            {notification.message}
          </p>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-ink/10">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
              {notification.zoneName ?? t.system}
            </span>
            {notification.actionUrl && (
              <Link
                href={notification.actionUrl}
                className="font-mono text-[10px] uppercase tracking-wider font-bold text-solar hover:text-ink transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {t.viewMore} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </DataCard>
  );
}
