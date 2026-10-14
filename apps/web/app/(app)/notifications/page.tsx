"use client";

import Link from "next/link";
import { ArrowLeft, Bell, CheckCheck, Trash2 } from "lucide-react";
import { Button } from "@sicilia-soil/ui";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationItem } from "@/components/features/notifications";

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } =
    useNotifications();

  const criticalCount = notifications.filter(
    (n) => n.severity === "critical",
  ).length;
  const warningCount = notifications.filter(
    (n) => n.severity === "warning",
  ).length;

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-offWhite">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-oliveGreen/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-oliveGreen" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-oliveGreen/20 to-wheatGold/20 rounded-xl">
                  <Bell className="w-8 h-8 text-oliveGreen" />
                </div>
                Notificaciones
              </h1>
              <p className="text-oliveGreen/70">
                Alertas de sensores IoT y recomendaciones del sistema
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button
                variant="olive"
                onClick={markAllAsRead}
                icon={<CheckCheck className="w-4 h-4" />}
              >
                Marcar todas
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="glass-red"
                onClick={clearAll}
                icon={<Trash2 className="w-4 h-4" />}
              >
                Limpiar
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
            <p className="text-xs text-oliveGreen/60 uppercase tracking-wider">
              Total
            </p>
            <p className="text-3xl font-bold text-charcoalGray mt-1">
              {notifications.length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200">
            <p className="text-xs text-blue-600/70 uppercase tracking-wider">
              Sin leer
            </p>
            <p className="text-3xl font-bold text-blue-600 mt-1">
              {unreadCount}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-red-200">
            <p className="text-xs text-red-600/70 uppercase tracking-wider">
              Críticas
            </p>
            <p className="text-3xl font-bold text-red-600 mt-1">
              {criticalCount}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200">
            <p className="text-xs text-yellow-600/70 uppercase tracking-wider">
              Advertencias
            </p>
            <p className="text-3xl font-bold text-yellow-600 mt-1">
              {warningCount}
            </p>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
          {notifications.length === 0 ? (
            <div className="text-center py-16">
              <Bell className="w-16 h-16 text-oliveGreen/20 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-charcoalGray mb-2">
                No hay notificaciones
              </h2>
              <p className="text-oliveGreen/60 text-sm mb-4">
                Las notificaciones se generan automáticamente a partir de las
                recomendaciones urgentes, altas y medias.
              </p>
              <Link
                href="/recommendations"
                className="text-blue-600 font-medium hover:underline text-sm"
              >
                Ir a Recomendaciones →
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  notification={notif}
                  onMarkAsRead={markAsRead}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info footer */}
        <div className="mt-6 p-4 bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 rounded-xl border border-oliveGreen/15">
          <p className="text-xs text-oliveGreen/70">
            💡 <strong>Cómo funciona:</strong> El motor de recomendaciones
            analiza los datos IoT y Copernicus, y genera notificaciones
            automáticamente para las recomendaciones de prioridad urgente, alta
            o media. Las notificaciones se guardan localmente en tu navegador.
          </p>
        </div>
      </div>
    </div>
  );
}
