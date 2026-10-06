"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Trees,
  Droplet,
  ThermometerSun,
  Sun,
  Sprout,
  Wind,
  ArrowRight,
  AlertTriangle,
  Gauge,
  Leaf,
} from "lucide-react";
import { StatsCard } from "@/components/features/dashboard/components/StatsCards";
import { ZoneCard } from "@/components/features/dashboard/components/ZoneCards";
import { ServerStatus } from "@/components/features/dashboard/components/ServerStatus";
import { CopernicusMapMini } from "@/components/features/copernicus/components";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useDashboardData } from "@/hooks/useDashboardData";
import type { RecommendationPriority } from "@sicilia-soil/core";

const ICON_MAP: Record<string, any> = {
  leaf: Leaf,
  droplet: Droplet,
  gauge: Gauge,
  trees: Trees,
  mushroom: () => <span className="text-xl">🍄</span>,
  thermometer: ThermometerSun,
  sun: Sun,
  wind: Wind,
};

const PRIORITY_STYLE: Record<
  RecommendationPriority,
  { bg: string; text: string; label: string }
> = {
  urgent: {
    bg: "bg-red-50 border-red-200",
    text: "text-red-700",
    label: "Urgente",
  },
  high: {
    bg: "bg-orange-50 border-orange-200",
    text: "text-orange-700",
    label: "Alta",
  },
  medium: {
    bg: "bg-amber-50 border-amber-200",
    text: "text-amber-700",
    label: "Media",
  },
  low: {
    bg: "bg-blue-50 border-blue-200",
    text: "text-blue-700",
    label: "Baja",
  },
  info: {
    bg: "bg-emerald-50 border-emerald-200",
    text: "text-emerald-700",
    label: "Info",
  },
};

export default function HomePage() {
  const [serverStatus, setServerStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");
  const { zones, kpis, carbon } = useDashboardData();

  // DEBUG temporal
  console.log("ZONES:", zones);
  console.log("Length:", zones?.length);
  const recommendations = useRecommendations();

  const topAlerts = useMemo(
    () =>
      recommendations
        .filter((r) => r.priority === "urgent" || r.priority === "high")
        .slice(0, 3),
    [recommendations],
  );

  useEffect(() => {
    async function fetchRealData() {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        const response = await fetch(
          "https://sicilia-soil-backend.onrender.com/api/zones",
          { signal: controller.signal },
        );
        clearTimeout(timeoutId);
        if (response.ok) setServerStatus("online");
        else throw new Error();
      } catch {
        setServerStatus("offline");
      }
    }
    fetchRealData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-charcoalGray">
            🌱 Sicilia Soil
          </h1>
          <p className="text-oliveGreen flex items-center gap-2">
            <Trees className="w-4 h-4" /> Permacultura Sintrópica · Regeneración
            del suelo
          </p>
        </div>
        <ServerStatus status={serverStatus} />
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {kpis.map((kpi, i) => {
          const Icon = ICON_MAP[kpi.icon] ?? Leaf;
          return (
            <StatsCard
              key={i}
              value={kpi.value}
              label={kpi.label}
              icon={
                typeof Icon === "function" && Icon.name === "" ? (
                  Icon()
                ) : (
                  <Icon className="w-5 h-5" />
                )
              }
              subtext={kpi.subtext}
            />
          );
        })}
      </div>

      {/* Mini-mapa */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-charcoalGray">
            🗺️ Mapa de la finca
          </h2>
          <Link
            href="/humidity"
            className="text-sm text-oliveGreen hover:text-sicilian-red transition-colors flex items-center gap-1"
          >
            Ver completo <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <CopernicusMapMini
          height="260px"
          onExpand={() => (window.location.href = "/humidity")}
        />
      </div>

      {/* Zonas + Alertas */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-charcoalGray">
              Zonas del Huerto
            </h2>
            <Link
              href="/ground-cover"
              className="text-sm text-oliveGreen hover:text-sicilian-red transition-colors flex items-center gap-1"
            >
              Ver cultivos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {zones.map((zone) => (
              <ZoneCard
                key={zone.id}
                zone={{ ...zone, lastUpdate: new Date().toISOString() }}
                onViewHistory={(id) => console.log("Ver historial:", id)}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-charcoalGray flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-sicilian-red" />
              Alertas
            </h2>
            <Link
              href="/recommendations"
              className="text-sm text-oliveGreen hover:text-sicilian-red transition-colors flex items-center gap-1"
            >
              Ver todas <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {topAlerts.length === 0 ? (
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 text-center">
                <p className="text-sm text-emerald-700 font-medium">
                  ✓ Sin alertas urgentes
                </p>
              </div>
            ) : (
              topAlerts.map((alert) => {
                const style = PRIORITY_STYLE[alert.priority];
                return (
                  <Link
                    key={alert.id}
                    href="/recommendations"
                    className={`block rounded-xl p-4 border-2 ${style.bg} hover:shadow-md transition-all`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{alert.icon ?? "⚠️"}</span>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs font-bold ${style.text} uppercase tracking-wide`}
                        >
                          {style.label}
                        </p>
                        <p className="text-sm font-medium text-charcoalGray mt-0.5">
                          {alert.title}
                        </p>
                        <p className="text-xs text-oliveGreen/70 mt-1">
                          {alert.zoneName}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          {/* Captura de carbono */}
          <div className="mt-6 bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50/30 rounded-xl p-4 border border-emerald-200/40">
            <h4 className="text-xs font-semibold text-emerald-700/80 uppercase tracking-wider flex items-center gap-1 mb-3">
              <Trees className="w-3.5 h-3.5" /> Captura de carbono
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-charcoalGray/70">COS</span>
                <span className="font-medium text-emerald-700">
                  {carbon.organicCarbonPercent}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoalGray/70">Densidad aparente</span>
                <span className="font-medium text-emerald-700">
                  {carbon.bulkDensity} g/cm³
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoalGray/70">Profundidad</span>
                <span className="font-medium text-emerald-700">
                  {carbon.depth} cm
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoalGray/70">CO₂ secuestrado</span>
                <span className="font-medium text-emerald-700">
                  {carbon.co2Sequestration} t/ha
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Cultivos */}
      <div className="bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 rounded-2xl p-6 border border-oliveGreen/15">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-oliveGreen/10 rounded-xl">
            <Sprout className="w-6 h-6 text-oliveGreen" />
          </div>
          <h2 className="text-xl font-bold text-charcoalGray">
            Cultivos y coberturas
          </h2>
        </div>
        <p className="text-oliveGreen/70 mb-4">
          Esparto, policultivo, cereal, cubiertas y barbecho. Análisis
          agronómico y comparador de coberturas.
        </p>
        <Link
          href="/ground-cover"
          className="inline-flex items-center gap-2 text-oliveGreen hover:text-sicilian-red transition-colors font-medium"
        >
          Ver cultivos <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
