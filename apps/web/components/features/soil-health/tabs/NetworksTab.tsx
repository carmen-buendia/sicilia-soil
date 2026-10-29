// apps/web/components/features/soil-health/tabs/NetworksTab.tsx
"use client";

import { getLocale } from "@sicilia-soil/core";
import type { CropSystem } from "@sicilia-soil/core";
import { DataCard } from "@sicilia-soil/ui";
import { Network } from "lucide-react";

export function NetworksTab({ systems }: { systems: CropSystem[] }) {
  const locale = getLocale("es");
  const t = locale.content.soilHealthTabs.networks;

  // Calculamos cuántos sistemas hay de cada tipo basándonos en sus métricas
  // Si un sistema tiene 'amf' > 0, asumimos que es AMF. Si tiene 'ecm', ECM.
  const amfSystems = systems.filter((s) => (s.metrics.amf ?? 0) > 0);
  const ecmSystems = systems.filter((s) => (s.metrics.ecm ?? 0) > 0);

  if (systems.length === 0) {
    return (
      <DataCard className="p-12 text-center border-dashed border-ink/20">
        <p className="font-mono text-sm text-ink/50">
          No hay sistemas registrados. Añade uno en el CRUD de cultivos.
        </p>
      </DataCard>
    );
  }

  return (
    <div className="space-y-8">
      {/* Intro */}
      <DataCard className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-xl font-serif font-bold text-ink mb-2">
            {t.title}
          </h2>
          <p className="font-sans text-sm text-ink/70 leading-relaxed">
            {t.description.replace("{count}", String(systems.length))}
          </p>
        </div>

        <div className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-wider font-bold text-ink/70 bg-paper/50 p-4 border border-ink/10">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-chloro" />
            {t.amfHosts.replace("{count}", String(amfSystems.length))}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-solar" />
            {t.ecmHosts.replace("{count}", String(ecmSystems.length))}
          </span>
        </div>
      </DataCard>

      {/* Grid de hosts (Sistemas) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systems.map((system) => {
          const isAMF = (system.metrics.amf ?? 0) > 0;
          const isECM = (system.metrics.ecm ?? 0) > 0;

          return (
            <DataCard key={system.id} className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-chloro/10 text-chloro border border-chloro/20">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-ink">
                    {system.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase text-ink/50">
                    {system.template}
                  </p>
                </div>
              </div>
              <div className="space-y-2 font-mono text-xs text-ink/70">
                <div className="flex justify-between border-b border-ink/10 pb-1">
                  <span>Colonización AMF</span>
                  <span className="font-bold">{system.metrics.amf ?? 0}%</span>
                </div>
                <div className="flex justify-between border-b border-ink/10 pb-1">
                  <span>Colonización ECM</span>
                  <span className="font-bold">{system.metrics.ecm ?? 0}%</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Tipo de red</span>
                  <span className="font-bold text-chloro">
                    {isAMF
                      ? "Arbuscular (AMF)"
                      : isECM
                        ? "Ectomicorrícica (ECM)"
                        : "No definida"}
                  </span>
                </div>
              </div>
            </DataCard>
          );
        })}
      </div>
    </div>
  );
}
