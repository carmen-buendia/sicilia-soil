"use client";

import { Bell, CheckCheck, Trash2 } from "lucide-react";
import type { Notification } from "@sicilia-soil/core";
import { getLocale } from "@sicilia-soil/core";
import { NotificationItem } from "./NotificationItem";
import Link from "next/link";
import { Button } from "@sicilia-soil/ui";

interface NotificationPanelProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onClose: () => void;
}

export function NotificationPanel({
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onClose,
}: NotificationPanelProps) {
  const locale = getLocale("es");
  const t = locale.ui.notifications;

  return (
    <div
      className="absolute right-0 mt-2 w-80 sm:w-96 bg-card border border-ink/20 shadow-xl overflow-hidden z-50 !rounded-none"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-ink/10 bg-paper/50">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-chloro" />
          <span className="font-serif font-bold text-ink text-sm">
            {t.title}
          </span>
          {unreadCount > 0 && (
            <span className="font-mono text-[10px] bg-solar text-ink px-2 py-0.5 font-bold">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <Button
              type="button"
              variant="bare"
              onClick={onMarkAllAsRead}
              className="p-1.5 text-ink/50 hover:text-chloro transition-colors"
              title={t.markAllAsRead}
            >
              <CheckCheck className="w-4 h-4" />
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              type="button"
              variant="bare"
              onClick={onClearAll}
              className="p-1.5 text-ink/50 hover:text-red-500 transition-colors"
              title={t.clearAll}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="max-h-96 overflow-y-auto p-3 space-y-2 bg-paper/30">
        {notifications.length === 0 ? (
          <div className="text-center py-10">
            <Bell className="w-10 h-10 text-ink/10 mx-auto mb-3" />
            <p className="font-mono text-xs uppercase tracking-widest text-ink/40">
              {t.empty}
            </p>
          </div>
        ) : (
          notifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onMarkAsRead={onMarkAsRead}
            />
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="px-4 py-3 border-t border-ink/10 bg-paper/50 text-center">
          <Link
            href="/notifications"
            onClick={onClose}
            className="font-mono text-[10px] uppercase tracking-widest font-bold text-solar hover:text-ink transition-colors"
          >
            {t.viewAll} →
          </Link>
        </div>
      )}
    </div>
  );
}
