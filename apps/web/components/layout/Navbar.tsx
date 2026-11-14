// apps/web/components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Droplets,
  Settings,
  Menu,
  X,
  User,
  Sprout,
  Brain,
  Layers,
  LogOut,
} from "lucide-react";
import { BrandLogo, Button } from "@sicilia-soil/ui";
import { NotificationBell } from "@/components/features/notifications";
import { getLocale } from "@sicilia-soil/core";
import { logout } from "@/app/(auth)/login/actions";

const locale = getLocale("es");
const appContent = locale.ui.app;
const navContent = locale.ui.nav;

const NAV_ITEMS = [
  { id: "/dashboard", label: navContent.dashboard, icon: Home },
  { id: "/soil-health", label: navContent.soilHealth, icon: Layers },
  { id: "/water", label: navContent.water, icon: Droplets },
  { id: "/crops", label: navContent.groundCover, icon: Sprout },
  { id: "/engine", label: navContent.engine || "Motor", icon: Brain },
];

export function Navbar({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link
            href="/dashboard"
            className="flex flex-col items-start gap-1 group"
          >
            <BrandLogo />
            <span className="font-mono text-[9px] uppercase tracking-widest text-ink/50 hidden sm:block">
              {appContent.subtitle}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.id);
              return (
                <Link
                  key={item.id}
                  href={item.id}
                  className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest font-bold transition-colors ${
                    active
                      ? "bg-ink text-paper"
                      : "text-ink/60 hover:text-ink hover:bg-ink/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <NotificationBell />

            <Link
              href="/configuration"
              className={`hidden sm:flex items-center justify-center w-8 h-8 transition-colors ${
                pathname === "/configuration"
                  ? "text-solar"
                  : "text-ink/60 hover:text-ink"
              }`}
              aria-label={navContent.configuration}
              title={navContent.configuration}
            >
              <Settings className="w-5 h-5" />
            </Link>

            <div className="hidden sm:flex items-center gap-3 border-l-2 border-ink/10 pl-4">
              <div className="flex flex-col items-end">
                <p className="font-mono text-xs font-bold text-ink uppercase tracking-wider leading-tight">
                  {userName}
                </p>
                <p className="font-sans text-[10px] text-ink/50 leading-tight">
                  {userEmail}
                </p>
              </div>
              <form action={logout}>
                <Button
                  type="submit"
                  variant="bare"
                  size="none"
                  className="!rounded-none hover:scale-100 p-2 text-ink/50 hover:text-solar transition-colors"
                  title={navContent.logout}
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </form>
            </div>

            <Button
              variant="bare"
              size="none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="!rounded-none hover:scale-100 md:hidden p-2 text-ink"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-ink/10 bg-paper">
            <div className="flex items-center justify-between border-2 border-ink/10 p-3 mb-4 bg-paper-dark/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-ink text-paper rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-mono text-xs font-bold text-ink uppercase">
                    {userName}
                  </p>
                  <p className="font-sans text-[10px] text-ink/50">
                    {userEmail}
                  </p>
                </div>
              </div>
              <form action={logout}>
                <Button
                  type="submit"
                  variant="bare"
                  size="none"
                  className="!rounded-none hover:scale-100 p-2 text-solar"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </form>
            </div>

            <div className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.id);
                return (
                  <Link
                    key={item.id}
                    href={item.id}
                    className={`flex items-center gap-3 w-full px-4 py-3 font-mono text-sm uppercase tracking-widest font-bold transition-all ${
                      active
                        ? "bg-ink text-paper"
                        : "text-ink/60 hover:bg-ink/5 hover:text-ink"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
