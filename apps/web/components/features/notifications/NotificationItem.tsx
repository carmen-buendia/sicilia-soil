"use client";

import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import Link from "next/link";
import type { Notification, NotificationSeverity } from "@sicilia-soil/core";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const SEVERITY_STYLES: Record<
  NotificationSeverity,
  { icon: typeof Info; color: string; bg: string; border: string }
> = {
  critical: {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
  },
  info: {
    icon: Info,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  success: {
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  },
};

export function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  const style = SEVERITY_STYLES[notification.severity];
  const Icon = style.icon;

  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div
      className={`p-3 rounded-lg border transition-colors cursor-pointer ${
        notification.read
          ? "bg-white border-oliveGreen/10 opacity-70"
          : `${style.bg} ${style.border}`
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <Icon
          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
            notification.read ? "text-oliveGreen/40" : style.color
          }`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <h4
              className={`text-sm font-semibold ${
                notification.read ? "text-charcoalGray/60" : "text-charcoalGray"
              }`}
            >
              {notification.title}
            </h4>
            {notification.topic && notification.topic !== "general" && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/70 border border-oliveGreen/15 text-oliveGreen font-medium">
                {notification.topic}
              </span>
            )}
            {!notification.read && (
              <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-oliveGreen/70 line-clamp-2 mb-1">
            {notification.message}
          </p>
          {notification.actionLabel && (
            <p className="text-xs font-medium text-oliveGreen">
              → {notification.actionLabel}
            </p>
          )}
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] text-oliveGreen/50">
              {notification.zoneName ?? "Sistema"}
            </span>
            {notification.actionUrl && (
              <Link
                href={notification.actionUrl}
                className="text-[10px] text-blue-600 hover:underline font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                Ver más →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
