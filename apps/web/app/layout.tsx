"use client";

import { useEffect } from "react";
// @ts-ignore
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Sprout } from "lucide-react";
import { SicilianFlag } from "@/components/layout/SicilianFlag";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import Link from "next/link";
// @ts-ignore

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <title>MycoMesh Protocol - Crop-agnostic soil infrastructure</title>
        <meta
          name="description"
          content="Enabling soil recovery, water efficency and carbon sequstration through sovereign data infrastructure."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="min-h-screen bg-offWhite text-charcoalGray">
        <NotificationsProvider>
          {/* Navbar importado */}
          <Navbar />

          {/* Spacer para el navbar fijo */}
          <div className="h-14 sm:h-16 lg:h-20" />

          {/* Contenido principal */}
          <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
            {children}
          </main>
          {/* Footer */}
          <footer className="bg-gradient-to-b from-oliveGreen/5 to-transparent border-t border-oliveGreen/15 py-10 mt-16">
            <div className="max-w-4xl mx-auto px-4">
              {/* Fila 1: Logo + nombre (centrado) */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="p-1.5 bg-gradient-to-br from-oliveGreen to-wheatGold rounded-lg shadow-sm">
                  <Sprout className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-charcoalGray text-base">
                  MycoMesh<span className="text-sicilian-red">·</span>Protocol
                </span>
                <span className="hidden sm:inline text-xs text-oliveGreen/50 ml-2">
                  Crop-agnostic soil infrastructure
                </span>
              </div>

              {/* Fila 2: Links (centrados) */}
              <div className="flex items-center justify-center gap-4 text-xs text-oliveGreen/70 mb-4 flex-wrap">
                <Link
                  href="/about"
                  className="hover:text-oliveGreen transition-colors"
                >
                  About
                </Link>
                <span className="text-oliveGreen/30">·</span>
                <Link
                  href="/manifesto"
                  className="hover:text-oliveGreen transition-colors"
                >
                  Manifesto
                </Link>
                <span className="text-oliveGreen/30">·</span>
                <a
                  href="https://github.com/carmen-buendia/sicilia-soil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-oliveGreen transition-colors"
                >
                  GitHub
                </a>
                <span className="text-oliveGreen/30">·</span>
                <a
                  href="https://github.com/carmen-buendia/sicilia-soil/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-oliveGreen transition-colors"
                >
                  Apache 2.0
                </a>
              </div>

              {/* Fila 3: Autoría + copyright (centrado) */}
              <div className="text-center text-[11px] text-oliveGreen/50 leading-relaxed">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <SicilianFlag size="small" />
                  <span>Proyecto creado por Carmen María Buendía Sánchez</span>
                </div>
                <p>
                  © {new Date().getFullYear()} MycoMesh·Protocol · Hecho con 🌱
                  en Sicilia, Italy. Código abierto bajo licencia Apache 2.0.
                </p>
              </div>
            </div>
          </footer>
        </NotificationsProvider>
      </body>
    </html>
  );
}
