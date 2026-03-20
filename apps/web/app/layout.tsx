"use client";

import { useState } from "react";
import {
  Home,
  Droplets,
  Thermometer,
  Sun,
  LineChart,
  Settings,
  Menu,
  X,
  Bell,
  User,
  Sprout,
  Leaf,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

// Component sicilian Flag
const SicilianFlag = ({ size = "small" }) => {
  const sizeClass = size === "small" ? "w-6 h-6" : "w-8 h-8";
  const triangleSize = size === "small" ? "w-3 h-3" : "w-4 h-4";

  return (
    <div className={`relative ${sizeClass}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full"></div>
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${triangleSize}`}
      >
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-white"></div>
      </div>
    </div>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { id: "/", label: "Dashboard", icon: Home },
    { id: "/humedity", label: "Humedad", icon: Droplets },
    { id: "/temperature", label: "Temperatura", icon: Thermometer },
    { id: "/light", label: "Luz Solar", icon: Sun },
    { id: "/analysis", label: "Análisis", icon: LineChart },
    { id: "/configuration", label: "Configuración", icon: Settings },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <html lang="it">
      <head>
        <title>Sicilia Soil - Permacultura en tiempo real</title>
        <meta
          name="description"
          content="Monitoreo de huerto de permacultura en Sicilia con sensores inteligentes"
        />
        <meta
          name="keywords"
          content="permacultura, sicilia, huerto, esparto, micología, sensores"
        />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-50">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-red-200 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-600 to-yellow-500 rounded-lg">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    Sicilia Soil <span className="text-lg">🌱</span>
                  </h1>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.id}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        isActive(item.id)
                          ? "bg-gradient-to-r from-red-50 to-yellow-50 text-red-700 border border-red-200"
                          : "text-gray-600 hover:bg-red-50/50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:bg-red-50 rounded-full relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="hidden md:flex items-center space-x-3 bg-gradient-to-r from-red-50 to-yellow-50 rounded-full pl-1 pr-4 py-1 border border-red-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Carmen</p>
                    <p className="text-xs text-gray-500">Huerto en Sicilia</p>
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-gray-600 hover:bg-red-50 rounded-lg"
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t border-red-200">
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.id}
                        href={item.id}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${
                          isActive(item.id)
                            ? "bg-gradient-to-r from-red-50 to-yellow-50 text-red-700"
                            : "text-gray-600"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-16">{children}</main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-red-900 to-yellow-900 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <SicilianFlag size="small" />
              <h3 className="text-xl font-bold flex items-center gap-2">
                Sicilia Soil <span>🌱</span>
              </h3>
            </div>

            <p className="text-amber-100 mb-2">
              © {new Date().getFullYear()} Sicilia Soil - Permacultura,
              Micología y Esparto
            </p>

            <p className="text-amber-200/70 text-sm mb-6 max-w-2xl mx-auto">
              Monitoreo de huerto con React, TypeScript y sensores inteligentes.
              Proyecto personal de permacultura y tecnología.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <Link
                href="/"
                className="text-amber-300 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/humedity"
                className="text-amber-300 hover:text-white transition-colors"
              >
                Humedad
              </Link>
              <Link
                href="/temperature"
                className="text-amber-300 hover:text-white transition-colors"
              >
                Temperatura
              </Link>
              <Link
                href="/light"
                className="text-amber-300 hover:text-white transition-colors"
              >
                Luz Solar
              </Link>
              <Link
                href="/analysis"
                className="text-amber-300 hover:text-white transition-colors"
              >
                Análisis
              </Link>
              <Link
                href="/configuration"
                className="text-amber-300 hover:text-white transition-colors"
              >
                Configuración
              </Link>
            </div>

            <div className="border-t border-amber-800/50 pt-6 mt-6">
              <p className="text-amber-300/60 text-sm flex items-center justify-center gap-2">
                <Leaf className="w-4 h-4" />
                Hecho con ❤️, 🌱, 🍄 y 🌾 en Sicilia
                <Leaf className="w-4 h-4" />
              </p>
              <p className="text-amber-300/40 text-xs mt-2">
                React • TypeScript • Tailwind • AG-Grid • HighCharts • Micología
                • Esparto
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
