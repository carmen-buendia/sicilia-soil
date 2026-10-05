"use client";

import { Bell, CheckCheck, Trash2 } from "lucide-react";
import type { Notification } from "@sicilia-soil/core";
import { NotificationItem } from "./NotificationItem";

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
  return (
    <div
      className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-oliveGreen/15 overflow-hidden z-50"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-oliveGreen/10 bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-oliveGreen" />
          <span className="font-bold text-charcoalGray text-sm">
            Notificaciones
          </span>
          {unreadCount > 0 && (
            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className="p-1.5 rounded-lg hover:bg-oliveGreen/10 text-oliveGreen/60 hover:text-oliveGreen transition-colors"
              title="Marcar todas como leídas"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
          )}
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="p-1.5 rounded-lg hover:bg-red-50 text-oliveGreen/60 hover:text-red-600 transition-colors"
              title="Limpiar todo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="max-h-96 overflow-y-auto p-3 space-y-2">
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 text-oliveGreen/20 mx-auto mb-2" />
            <p className="text-sm text-oliveGreen/60">No hay notificaciones</p>
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
        <div className="px-4 py-2 border-t border-oliveGreen/10 bg-oliveGreen/5">
          <a
            href="/notifications"
            onClick={onClose}
            className="block text-center text-xs text-oliveGreen font-medium hover:text-sicilian-red transition-colors"
          >
            Ver todas las notificaciones →
          </a>
        </div>
      )}
    </div>
  );
}
