"use client";

import { MushroomCard } from "@/components/features/soil-health";
import { MONITORING_ZONES } from "@sicilia-soil/core";

export function NetworksTab() {
  const amf = MONITORING_ZONES.filter((z) => z.mycorrhizaType === "AMF");
  const ecm = MONITORING_ZONES.filter((z) => z.mycorrhizaType === "ECM");

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="bg-gradient-to-r from-oliveGreen/10 to-emerald-500/10 rounded-2xl p-6 border border-oliveGreen/20">
        <h2 className="text-xl font-bold text-charcoalGray mb-2">
          Redes activas del sistema
        </h2>
        <p className="text-sm text-charcoalGray/80">
          {MONITORING_ZONES.length} hosts monitorizados. La mayoría forman{" "}
          <strong>micorrizas arbusculares (AMF)</strong>. Los pinos forman{" "}
          <strong>ectomicorrizas (ECM)</strong>.
        </p>
        <div className="flex gap-4 mt-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-oliveGreen" />
            AMF · {amf.length} hosts
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            ECM · {ecm.length} hosts
          </span>
        </div>
      </div>

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
