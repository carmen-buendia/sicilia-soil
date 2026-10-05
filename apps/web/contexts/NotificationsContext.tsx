"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { Notification, RecommendationItem } from "@sicilia-soil/core";
import {
  notificationsFromRecommendations,
  countUnread,
  markAsRead as markAsReadUtil,
  markAllAsRead as markAllAsReadUtil,
} from "@sicilia-soil/utils";

const STORAGE_KEY = "sicilia-soil-notifications";

interface NotificationsContextValue {
  notifications: Notification[];
  unreadCount: number;
  addNotificationsFromRecommendations: (
    recommendations: RecommendationItem[],
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(
  null,
);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setNotifications(JSON.parse(stored) as Notification[]);
      }
    } catch {
      // ignore
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    } catch {
      // ignore
    }
  }, [notifications, isHydrated]);

  const addNotificationsFromRecommendations = useCallback(
    (recommendations: RecommendationItem[]) => {
      const incoming = notificationsFromRecommendations(recommendations);
      setNotifications((prev) => {
        const existingIds = new Set(prev.map((n) => n.id));
        const fresh = incoming.filter((n) => !existingIds.has(n.id));
        if (fresh.length === 0) return prev;
        return [...fresh, ...prev].slice(0, 50);
      });
    },
    [],
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => markAsReadUtil(prev, id));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => markAllAsReadUtil(prev));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = useMemo(
    () => countUnread(notifications),
    [notifications],
  );

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      addNotificationsFromRecommendations,
      markAsRead,
      markAllAsRead,
      clearAll,
    }),
    [
      notifications,
      unreadCount,
      addNotificationsFromRecommendations,
      markAsRead,
      markAllAsRead,
      clearAll,
    ],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotificationsContext(): NotificationsContextValue {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error(
      "useNotificationsContext must be used within a NotificationsProvider",
    );
  }
  return ctx;
}
