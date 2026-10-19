"use client";

import Link from "next/link";
import { ArrowLeft, Bell, CheckCheck, Trash2 } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationItem } from "@/components/features/notifications";
import { getLocale } from "@sicilia-soil/core";
import { Button, DataCard } from "@sicilia-soil/ui";

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } =
    useNotifications();

  const locale = getLocale("es");
  const t = locale.ui.notificationsPage;

  const criticalCount = notifications.filter(
    (n) => n.severity === "critical",
  ).length;
  const warningCount = notifications.filter(
    (n) => n.severity === "warning",
  ).length;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink/20 pb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 border border-ink/20 hover:bg-paper transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-ink/60" />
          </Link>
          <div>
            <h1 className="text-3xl font-serif font-bold text-ink flex items-center gap-3">
              <div className="w-12 h-12 bg-chloro/10 border border-chloro/20 flex items-center justify-center">
                <Bell className="w-6 h-6 text-chloro" />
              </div>
              {t.title}
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-chloro font-bold mt-1">
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              className="flex items-center gap-2 border border-ink/20 bg-ink text-paper px-4 py-2 font-mono text-xs uppercase tracking-widest font-bold hover:bg-chloro hover:border-chloro transition-colors shadow-sm"
            >
              <CheckCheck className="w-4 h-4" />
              {t.markAll}
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              onClick={clearAll}
              className="flex items-center gap-2 border border-red-500/30 bg-transparent text-red-500 px-4 py-2 font-mono text-xs uppercase tracking-widest font-bold hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              {t.clear}
            </Button>
          )}
        </div>
      </div>

      {/* STATS (Data Panel) */}
      <div className="bg-card border border-ink/20">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-ink/10">
          <div className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
              {t.stats.total}
            </p>
            <p className="font-mono text-3xl font-bold text-ink">
              {notifications.length}
            </p>
          </div>
          <div className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
              {t.stats.unread}
            </p>
            <p className="font-mono text-3xl font-bold text-chloro">
              {unreadCount}
            </p>
          </div>
          <div className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
              {t.stats.critical}
            </p>
            <p className="font-mono text-3xl font-bold text-red-500">
              {criticalCount}
            </p>
          </div>
          <div className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
              {t.stats.warning}
            </p>
            <p className="font-mono text-3xl font-bold text-solar">
              {warningCount}
            </p>
          </div>
        </div>
      </div>

      {/* LIST OF NOTIFICATIONS */}
      <DataCard className="p-4">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 text-ink/10 mx-auto mb-4" />
            <h2 className="text-xl font-serif font-bold text-ink mb-2">
              {t.emptyTitle}
            </h2>
            <p className="font-sans text-sm text-ink/60 mb-6 max-w-md mx-auto">
              {t.emptyDesc}
            </p>
            <Link
              href="/engine"
              className="inline-flex items-center gap-2 border border-ink/20 bg-paper text-ink px-4 py-2 font-mono text-xs uppercase tracking-widest font-bold hover:bg-ink hover:text-paper transition-colors"
            >
              {t.goToRecs} →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <NotificationItem
                key={notif.id}
                notification={notif}
                onMarkAsRead={markAsRead}
              />
            ))}
          </div>
        )}
      </DataCard>

      {/* INFO FOOTER */}
      <DataCard className="p-4 border-l-4 border-solar bg-solar/5">
        <p className="font-sans text-sm text-ink/80 leading-relaxed">
          💡 <strong className="text-ink">{t.infoTitle}</strong> {t.infoDesc}
        </p>
      </DataCard>
    </div>
  );
}
