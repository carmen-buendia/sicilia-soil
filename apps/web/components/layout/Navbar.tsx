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
import { SicilianFlag } from "./SicilianFlag";
import { Button } from "@sicilia-soil/ui";
import { NotificationBell } from "@/components/features/notifications";
import { getLocale } from "@sicilia-soil/core";
import { logout } from "@/app/(auth)/login/actions";

const t = getLocale("es");

const navItems = [
  { id: "/dashboard", label: t.ui.nav.dashboard, icon: Home },
  { id: "/soil-health", label: t.ui.nav.soilHealth, icon: Layers },
  { id: "/water", label: t.ui.nav.water, icon: Droplets },
  { id: "/ground-cover", label: t.ui.nav.groundCover, icon: Sprout },
  { id: "/engine", label: t.ui.nav.engine || "Motor", icon: Brain },
];

export function Navbar({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Para cerrar el menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-offWhite/98 backdrop-blur-xl shadow-xl border-b border-oliveGreen/15"
          : "bg-offWhite/85 backdrop-blur-md border-b border-oliveGreen/10"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 sm:gap-3 group transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="relative">
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-oliveGreen via-sicilian-red to-wheatGold rounded-xl shadow-md">
                <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-offWhite" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-wheatGold rounded-full ring-2 ring-offWhite animate-pulse" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base sm:text-xl font-bold">
                <span className="text-charcoalGray">MycoMesh</span>
                <span className="text-sicilian-red ml-1">Protocol</span>
              </h1>
              <div className="hidden sm:flex items-center gap-2 mr-2 text-xs text-oliveGreen/70 whitespace-nowrap">
                <SicilianFlag size="small" className="flex-shrink-0" />
                <span className="whitespace-normal">{t.ui.app.subtitle}</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-oliveGreen/5 backdrop-blur-sm rounded-full p-1 border border-oliveGreen/15">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.id);
              return (
                <Link
                  key={item.id}
                  href={item.id}
                  className={`flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 rounded-full transition-all duration-300 text-sm lg:text-base ${
                    active
                      ? "bg-oliveGreen text-offWhite shadow-md shadow-oliveGreen/30"
                      : "text-charcoalGray/60 hover:bg-oliveGreen/10 hover:text-oliveGreen"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu + Iconos */}
          <div className="flex items-center gap-2 sm:gap-3">
            <NotificationBell />

            <Link
              href="/configuration"
              className={`hidden sm:flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
                pathname === "/configuration"
                  ? "bg-oliveGreen text-offWhite shadow-md"
                  : "text-oliveGreen/70 hover:bg-oliveGreen/10 hover:text-oliveGreen"
              }`}
              aria-label={t.ui.nav.configuration}
              title={t.ui.nav.configuration}
            >
              <Settings className="w-5 h-5" />
            </Link>

            {/* Perfil de Usuario (Desktop) */}
            <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-oliveGreen/10 to-wheatGold/10 rounded-full pl-2 pr-1 py-1 border border-oliveGreen/20">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-oliveGreen to-wheatGold rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-offWhite" />
              </div>
              <div className="flex flex-col mr-2">
                <p className="text-xs sm:text-sm font-semibold text-charcoalGray whitespace-nowrap leading-tight">
                  {userName}
                </p>
                <p className="text-[10px] text-oliveGreen/60 whitespace-nowrap leading-tight">
                  {userEmail}
                </p>
              </div>
              {/* Botón de Logout */}
              <form action={logout}>
                <button
                  type="submit"
                  className="p-1.5 text-red-500/70 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title={t.ui.nav.logout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Botón Menú Móvil */}
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-xl text-oliveGreen hover:text-wheatGold transition-all duration-300 hover:bg-oliveGreen/10"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-oliveGreen/15 max-h-[80vh] overflow-y-auto">
            {/* Perfil de Usuario (Móvil) */}
            <div className="flex items-center justify-between bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 p-3 rounded-xl border border-oliveGreen/10 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-oliveGreen to-wheatGold rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-offWhite" />
                </div>
                <div>
                  <p className="text-sm font-bold text-charcoalGray">
                    {userName}
                  </p>
                  <p className="text-xs text-oliveGreen/70">{userEmail}</p>
                </div>
              </div>
              <form action={logout}>
                <button
                  type="submit"
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title={t.ui.nav.logout}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </form>
            </div>

            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.id);
                return (
                  <Link
                    key={item.id}
                    href={item.id}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                      active
                        ? "bg-oliveGreen text-offWhite shadow-md"
                        : "text-charcoalGray/60 hover:bg-oliveGreen/10 hover:text-oliveGreen"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {active && (
                      <div className="ml-auto w-1.5 h-1.5 bg-wheatGold rounded-full animate-pulse" />
                    )}
                  </Link>
                );
              })}

              {/* Configuración en mobile menu */}
              <Link
                href="/configuration"
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                  pathname === "/configuration"
                    ? "bg-oliveGreen text-offWhite shadow-md"
                    : "text-charcoalGray/60 hover:bg-oliveGreen/10 hover:text-oliveGreen"
                }`}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">{t.ui.nav.configuration}</span>
                {pathname === "/configuration" && (
                  <div className="ml-auto w-1.5 h-1.5 bg-wheatGold rounded-full animate-pulse" />
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
