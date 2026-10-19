"use client";

import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { getLocale } from "@sicilia-soil/core";
import { NotificationPanel } from "./NotificationPanel";
import { Button } from "@sicilia-soil/ui";

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } =
    useNotifications();

  const locale = getLocale("es");
  const t = locale.ui.notifications;

  // Cerrar al hacer clic fuera
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <Button
        type="button"
        variant="bare"
        size="none"
        onClick={() => setIsOpen((v) => !v)}
        className="!rounded-none hover:scale-100 relative p-2 ml-2 border border-transparent text-ink/60 hover:text-solar hover:bg-paper hover:border-ink/10 transition-all"
        aria-label={t.title}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-mono font-bold border border-ink px-1">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <NotificationPanel
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onClearAll={clearAll}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
