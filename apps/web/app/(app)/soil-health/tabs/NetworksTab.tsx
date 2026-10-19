"use client";

import { MushroomCard } from "@/components/features/soil-health";
import { MONITORING_ZONES, getLocale } from "@sicilia-soil/core";
import { DataCard } from "@sicilia-soil/ui"; // <-- Importamos el wrapper

export function NetworksTab() {
  const locale = getLocale("es");
  const t = locale.content.soilHealthTabs.networks;

  const amf = MONITORING_ZONES.filter((z) => z.mycorrhizaType === "AMF");
  const ecm = MONITORING_ZONES.filter((z) => z.mycorrhizaType === "ECM");

  return (
    <div className="space-y-8">
      {/* Intro */}
      <DataCard className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-xl font-serif font-bold text-ink mb-2">
            {t.title}
          </h2>
          <p className="font-sans text-sm text-ink/70 leading-relaxed">
            {t.description.replace("{count}", String(MONITORING_ZONES.length))}
          </p>
        </div>

        <div className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-wider font-bold text-ink/70 bg-paper/50 p-4 border border-ink/10">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-chloro" />
            {t.amfHosts.replace("{count}", String(amf.length))}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-solar" />
            {t.ecmHosts.replace("{count}", String(ecm.length))}
          </span>
        </div>
      </DataCard>

      {/* Grid de hosts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MONITORING_ZONES.map((zone) => (
          <MushroomCard
            key={zone.id}
            zone={zone}
            onViewDetails={(id: string) => console.log("Ver detalles:", id)}
          />
        ))}
      </div>
    </div>
  );
}
