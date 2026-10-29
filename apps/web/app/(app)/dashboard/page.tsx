// apps/web/app/(app)/dashboard/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Trees,
  Sprout,
  ArrowRight,
  AlertTriangle,
  Leaf,
  Activity,
  Battery,
  Signal,
  type LucideIcon,
} from "lucide-react";
import { StatsCard } from "@/components/features/dashboard/components/StatsCards";
import { ZoneCard } from "@/components/features/dashboard/components/ZoneCards";
import { ServerStatus } from "@/components/features/dashboard/components/ServerStatus";
import { SystemStatusCard } from "@/components/features/decision";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useTodayDecision } from "@/hooks/useTodayDecision";
import { PRIORITY_STYLES } from "@/config/recommendation.styles";
import { DASHBOARD_ICONS } from "@/config/icon-map";
import { getLocale, TELEMETRY_MOCK_SENSORS } from "@sicilia-soil/core";

export default function HomePage() {
  const [serverStatus, setServerStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");
  const { zones, kpis, carbon } = useDashboardData();
  const locale = getLocale("es");
  const t = locale.ui.telemetry;

  const {
    output: decision,
    context: decisionContext,
    evidence: decisionEvidence,
  } = useTodayDecision();
  const recommendations = useRecommendations();

  const topAlerts = useMemo(
    () =>
      recommendations
        .filter((recommendation) => {
          return (
            recommendation.priority === "urgent" ||
            recommendation.priority === "high"
          );
        })
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
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-ink/20 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-ink mb-1">
            {locale.ui.app.name}
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-chloro font-bold flex items-center gap-2">
            <Trees className="w-4 h-4" /> {locale.ui.app.subtitle}
          </p>
        </div>
        <ServerStatus status={serverStatus} />
      </div>

      {/* 2. KPIs */}
      <div className="bg-card border border-ink/20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y md:divide-y-0 divide-ink/10">
          {kpis.map((kpi) => {
            const Icon = (DASHBOARD_ICONS[kpi.icon] ?? Leaf) as LucideIcon;
            const kpiLabels = locale.kpis[kpi.id as keyof typeof locale.kpis];
            return (
              <StatsCard
                key={kpi.id}
                value={kpi.value}
                label={kpiLabels?.label ?? kpi.id}
                icon={<Icon className="w-5 h-5" />}
                subtext={kpiLabels?.subtext}
              />
            );
          })}
        </div>
      </div>

      {/* 3. TELEMETRÍA DE SENSORES */}
      <div className="bg-card border border-ink/20">
        <div className="p-5 border-b border-ink/10 bg-paper/30 flex justify-between items-center">
          <h2 className="text-xl font-serif font-bold text-ink flex items-center gap-2">
            <Activity className="w-5 h-5 text-chloro" />
            {t.title}
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50 bg-paper px-2 py-1 border border-ink/20">
            {t.network}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-sm">
            <thead className="bg-paper/50 border-b border-ink/20 text-ink/60 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3 font-bold">{t.headers.sensorId}</th>
                <th className="px-5 py-3 font-bold">{t.headers.type}</th>
                <th className="px-5 py-3 font-bold">{t.headers.battery}</th>
                <th className="px-5 py-3 font-bold">{t.headers.signal}</th>
                <th className="px-5 py-3 font-bold">{t.headers.lastPing}</th>
                <th className="px-5 py-3 font-bold">{t.headers.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {TELEMETRY_MOCK_SENSORS.map((sensor) => (
                <tr
                  key={sensor.id}
                  className="hover:bg-paper/30 transition-colors"
                >
                  <td className="px-5 py-4 text-ink font-bold">{sensor.id}</td>
                  <td className="px-5 py-4 text-ink/70">{sensor.typeKey}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`flex items-center gap-1 ${sensor.battery < 20 ? "text-red-500" : "text-chloro"}`}
                    >
                      <Battery className="w-3 h-3" /> {sensor.battery}%
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`flex items-center gap-1 ${sensor.signal < -100 ? "text-ink/40" : sensor.signal < -60 ? "text-solar" : "text-chloro"}`}
                    >
                      <Signal className="w-3 h-3" /> {sensor.signal} dBm
                    </span>
                  </td>
                  <td className="px-5 py-4 text-ink/50">
                    {t.ping[sensor.ping.unit as keyof typeof t.ping]
                      .replace("{minutes}", String(sensor.ping.val))
                      .replace("{hours}", String(sensor.ping.val))}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2 py-0.5 border text-[10px] uppercase font-bold ${
                        sensor.status === "online"
                          ? "border-chloro/30 bg-chloro/5 text-chloro"
                          : "border-solar/30 bg-solar/5 text-solar"
                      }`}
                    >
                      {t.status[sensor.status as keyof typeof t.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. ESTADO DEL SISTEMA */}
      <div>
        <SystemStatusCard
          output={decision}
          context={decisionContext}
          evidence={decisionEvidence}
        />
      </div>

      {/* 5. ZONAS + ALERTAS */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Zonas */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-bold text-ink">
              {locale.ui.dashboard.zonesTitle}
            </h2>
            <Link
              href="/crops" // 👈 CAMBIADO DE /ground-cover a /crops
              className="font-mono text-xs uppercase tracking-widest font-bold text-solar hover:text-ink transition-colors flex items-center gap-1"
            >
              {locale.ui.actions.viewCrops} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {zones.map((zone) => (
              <ZoneCard
                key={zone.id}
                zone={{ ...zone, lastUpdate: new Date().toISOString() }}
                onViewHistory={(id) => console.log("Ver historial:", id)}
              />
            ))}
          </div>
        </div>

        {/* Alertas y Carbono */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-bold text-ink flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-solar" />
              {locale.ui.dashboard.alertsTitle}
            </h2>
            <Link
              href="/engine"
              className="font-mono text-xs uppercase tracking-widest font-bold text-solar hover:text-ink transition-colors flex items-center gap-1"
            >
              {locale.ui.actions.viewAll} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {topAlerts.length === 0 ? (
              <div className="bg-card border border-ink/20 p-6 text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-chloro font-bold">
                  {locale.ui.dashboard.alertsEmpty}
                </p>
              </div>
            ) : (
              topAlerts.map((alert) => {
                const style = PRIORITY_STYLES[alert.priority];
                return (
                  <Link
                    key={alert.id}
                    href="/engine"
                    className={`block bg-card border border-ink/20 hover:bg-paper transition-colors p-4`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{alert.icon ?? "⚠️"}</span>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-mono text-[10px] font-bold ${style.text} uppercase tracking-widest`}
                        >
                          {style.label}
                        </p>
                        <p className="font-serif text-base font-bold text-ink mt-1">
                          {alert.title}
                        </p>
                        <p className="font-mono text-xs text-ink/60 mt-1">
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
          <div className="bg-card border border-ink/20 p-5 mt-6">
            <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-chloro flex items-center gap-2 mb-4 pb-2 border-b border-ink/10">
              <Trees className="w-4 h-4" />
              {locale.ui.dashboard.carbon.title}
            </h4>
            <div className="space-y-0 font-mono">
              <div className="flex justify-between items-center py-2.5 border-b border-ink/10">
                <span className="text-ink/60 uppercase text-[10px] tracking-wider">
                  {locale.ui.dashboard.carbon.soc}
                </span>
                <span className="font-bold text-sm text-ink">
                  {carbon.organicCarbonPercent}%
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-ink/10">
                <span className="text-ink/60 uppercase text-[10px] tracking-wider">
                  {locale.ui.dashboard.carbon.bulkDensity}
                </span>
                <span className="font-bold text-sm text-ink">
                  {carbon.bulkDensity} g/cm³
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-ink/10">
                <span className="text-ink/60 uppercase text-[10px] tracking-wider">
                  {locale.ui.dashboard.carbon.depth}
                </span>
                <span className="font-bold text-sm text-ink">
                  {carbon.depth} cm
                </span>
              </div>
              <div className="flex justify-between items-center pt-3">
                <span className="text-ink/60 uppercase text-[10px] tracking-wider">
                  {locale.ui.dashboard.carbon.co2}
                </span>
                <span className="font-serif text-xl font-bold text-solar">
                  {carbon.co2Sequestration} t/ha
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. CTA CULTIVOS */}
      <div className="bg-ink text-paper p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Sprout className="w-5 h-5 text-solar" />
            <h2 className="text-xl font-serif font-bold">
              {locale.content.home.cropsCta.title}
            </h2>
          </div>
          <p className="font-mono text-xs text-paper/70 max-w-xl">
            {locale.content.home.cropsCta.description}
          </p>
        </div>
        <Link
          href="/crops" // 👈 CAMBIADO DE /ground-cover a /crops
          className="relative z-10 whitespace-nowrap flex items-center gap-2 bg-solar text-ink px-6 py-3 font-mono text-sm uppercase tracking-widest font-bold hover:bg-paper transition-colors"
        >
          {locale.ui.actions.viewCrops} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
