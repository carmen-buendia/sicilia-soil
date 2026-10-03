"use client";

import { useEffect } from "react";
// @ts-ignore
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Flower2, Sprout } from "lucide-react";
import { SicilianFlag } from "@/components/layout/SicilianFlag";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
// @ts-ignore

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <title>Sicilia Soil - Permacultura Sintrópica en el Mediterráneo</title>
        <meta
          name="description"
          content="Monitoreo de huerto de permacultura sintrópica en la región del Mediterráneo"
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
          <footer className="bg-gradient-to-b from-oliveGreen/5 to-transparent border-t border-oliveGreen/15 py-8 mt-12">
            <div className="max-w-4xl mx-auto px-4">
              {/* Fila superior: logo + tagline corto */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gradient-to-br from-oliveGreen to-wheatGold rounded-lg shadow-sm">
                    <Sprout className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-charcoalGray">
                    Sicilia<span className="text-sicilian-red">·</span>Soil
                  </span>
                  <span className="hidden sm:inline text-xs text-oliveGreen/50 ml-2">
                    Crop-agnostic decision support
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-oliveGreen/60">
                  <span className="flex items-center gap-1.5">
                    <SicilianFlag size="small" />
                    <strong className="text-charcoalGray font-medium">
                      Carmen María Buendía Sánchez
                    </strong>
                  </span>
                  <span className="text-oliveGreen/30">·</span>
                  <a
                    href="https://github.com/carmen-buendia/sicilia-soil/blob/main/LICENSE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-oliveGreen transition-colors underline decoration-dotted underline-offset-2"
                  >
                    Apache 2.0
                  </a>
                </div>
              </div>

              {/* Fila inferior: copyright */}
              <p className="text-center text-[11px] text-oliveGreen/40">
                © {new Date().getFullYear()} Sicilia·Soil · Hecho con 🌱 en
                Sicilia
              </p>
            </div>
          </footer>
        </NotificationsProvider>
      </body>
    </html>
  );
}
