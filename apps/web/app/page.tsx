// apps/web/app/page.tsx

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
import { CopernicusMapMini } from "@/components/features/analysis/components/CopernicusMapMini";
import { useRecommendations } from "@/hooks/useRecommendations";
import type { RecommendationPriority } from "@sicilia-soil/core";

// ========== DATOS MOCK (FALLBACK) ==========
type GardenZone = {
  id: string;
  name: string;
  type: string;
  location: string;
  moisture: number;
  temperature: number;
  light: number;
  wind: number;
  status: string;
  icon: string;
  lastUpdate: string;
};

const mockZones: GardenZone[] = [
  {
    id: "norte",
    name: "Zona de Esparto",
    type: "Planta textil",
    location: "Parcela Norte",
    moisture: 65,
    temperature: 22.5,
    light: 85,
    wind: 12,
    status: "saludable",
    icon: "🌾",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "sur",
    name: "Huerta de Tomates",
    type: "Hortalizas",
    location: "Parcela Sur",
    moisture: 58,
    temperature: 24.2,
    light: 92,
    wind: 8,
    status: "saludable",
    icon: "🍅",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "este",
    name: "Olivar",
    type: "Árboles",
    location: "Ladera Este",
    moisture: 62,
    temperature: 23.1,
    light: 89,
    wind: 10,
    status: "saludable",
    icon: "🫒",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "oeste",
    name: "Jardín de Hierbas",
    type: "Aromáticas",
    location: "Parcela Oeste",
    moisture: 68,
    temperature: 21.8,
    light: 78,
    wind: 7,
    status: "saludable",
    icon: "🌿",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "compost",
    name: "Zona Compost",
    type: "Suelo vivo",
    location: "Trasera",
    moisture: 55,
    temperature: 28,
    light: 30,
    wind: 5,
    status: "activo",
    icon: "♻️",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "agua",
    name: "Depósito de Agua",
    type: "Recolección",
    location: "Noreste",
    moisture: 90,
    temperature: 18,
    light: 40,
    wind: 7,
    status: "lleno",
    icon: "💧",
    lastUpdate: new Date().toISOString(),
  },
];

// ========== KPIs ==========
const DASHBOARD_KPIS = [
  {
    value: "88/100",
    label: "Salud del suelo",
    icon: <Leaf className="w-5 h-5" />,
    subtext: "Índice SHI",
  },
  {
    value: "0.18",
    label: "Estrés hídrico",
    icon: <Droplet className="w-5 h-5" />,
    subtext: "Bajo · estable",
  },
  {
    value: "31%",
    label: "Humedad del suelo",
    icon: <Gauge className="w-5 h-5" />,
    subtext: "Sentinel-1 SAR",
  },
  {
    value: "2.5%",
    label: "Carbono orgánico (COS)",
    icon: <Trees className="w-5 h-5" />,
    subtext: "↑ +0.3% este ciclo",
  },
  {
    value: "33 t/ha",
    label: "CO₂ secuestrado",
    icon: <Trees className="w-5 h-5" />,
    subtext: "Captura estimada",
  },
  {
    value: "4",
    label: "Setas autóctonas",
    icon: <span className="text-xl">🍄</span>,
    subtext: "Red fúngica activa",
  },
];

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

const carbonSummary = {
  organicCarbonPercent: 2.5,
  bulkDensity: 1.2,
  depth: 30,
  co2Sequestration: 33.0,
};

export default function HomePage() {
  const [serverStatus, setServerStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");
  const [gardenZones, setGardenZones] = useState<GardenZone[]>(mockZones);

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
        if (response.ok) {
          const zonesData = await response.json();
          if (zonesData && zonesData.length > 0) {
            const convertedZones: GardenZone[] = zonesData.map((data: any) => ({
              id: data.zone,
              name: getZoneName(data.zone),
              type: getZoneType(data.zone),
              location: getZoneLocation(data.zone),
              moisture: data.humidity,
              temperature: data.temperature,
              light: data.light,
              wind: Math.floor(Math.random() * 15) + 5,
              status:
                data.humidity < 40
                  ? "necesita riego"
                  : data.humidity > 85
                    ? "exceso de agua"
                    : "saludable",
              icon: getZoneIcon(data.zone),
              lastUpdate: data.timestamp,
            }));
            setGardenZones(convertedZones);
            setServerStatus("online");
          }
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch {
        setServerStatus("offline");
      }
    }
    fetchRealData();
  }, []);

  const handleViewHistory = (zoneId: string) => {
    console.log(`Ver historial de zona: ${zoneId}`);
  };

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

      {/* 6 KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {DASHBOARD_KPIS.map((kpi, i) => (
          <StatsCard key={i} {...kpi} />
        ))}
      </div>

      {/* Mini-mapa */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-charcoalGray flex items-center gap-2">
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

      {/* Two column: Zones + Alerts */}
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
            {gardenZones.map((zone) => (
              <ZoneCard
                key={zone.id}
                zone={zone}
                onViewHistory={handleViewHistory}
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
                <p className="text-xs text-emerald-600/70 mt-1">
                  El sistema está en equilibrio
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
                  {carbonSummary.organicCarbonPercent}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoalGray/70">Densidad aparente</span>
                <span className="font-medium text-emerald-700">
                  {carbonSummary.bulkDensity} g/cm³
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoalGray/70">Profundidad</span>
                <span className="font-medium text-emerald-700">
                  {carbonSummary.depth} cm
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoalGray/70">CO₂ secuestrado</span>
                <span className="font-medium text-emerald-700">
                  {carbonSummary.co2Sequestration} t/ha
                </span>
              </div>
            </div>
            <div className="mt-2 text-[10px] text-emerald-600/60">
              Fórmula: CO₂ (t/ha) = (COS% × Densidad × Profundidad) / 10 × 3.67
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

function getZoneName(zone: string): string {
  const names: Record<string, string> = {
    norte: "Zona de Esparto",
    sur: "Huerta de Tomates",
    este: "Olivar",
    oeste: "Jardín de Hierbas",
  };
  return names[zone] || zone;
}
function getZoneType(zone: string): string {
  const types: Record<string, string> = {
    norte: "Planta textil",
    sur: "Hortalizas",
    este: "Árboles",
    oeste: "Aromáticas",
  };
  return types[zone] || "Cultivo";
}
function getZoneLocation(zone: string): string {
  const locations: Record<string, string> = {
    norte: "Parcela Norte",
    sur: "Parcela Sur",
    este: "Ladera Este",
    oeste: "Parcela Oeste",
  };
  return locations[zone] || `Parcela ${zone}`;
}
function getZoneIcon(zone: string): string {
  const icons: Record<string, string> = {
    norte: "🌾",
    sur: "🍅",
    este: "🫒",
    oeste: "🌿",
  };
  return icons[zone] || "🌱";
}
