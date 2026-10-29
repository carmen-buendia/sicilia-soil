// apps/web/app/(app)/crops/page.tsx (o components/features/crops/CropsView.tsx)
"use client";

import { useState } from "react";
import { getLocale } from "@sicilia-soil/core";
import { useCropSystemsContext } from "@/components/features/crops/CropSystemsProvider";
import { SystemTab } from "@/components/features/crops/tabs/SystemTab";
import { ObservationsTab } from "@/components/features/crops/tabs/ObservationsTab";
import { AnalyticsTab } from "@/components/features/crops/tabs/AnalyticsTab";
import { CreateSystemModal } from "@/components/features/crops/CreateSystemModal"; // 👈 Importamos el modal
import { Button, DataCard } from "@sicilia-soil/ui";
import { ArrowLeft, Plus, LayoutGrid, Droplets, Activity } from "lucide-react";

export default function CropsPage() {
  const { systems } = useCropSystemsContext();
  const locale = getLocale("es");
  const t = locale.content.cropsPage;

  // Estados para controlar la vista
  const [viewMode, setViewMode] = useState<"directory" | "detail">("directory");
  const [activeTab, setActiveTab] = useState<string>("observations");

  // 👇 Estado para controlar el modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleOpenSystem = (id: string) => {
    setActiveTab(id);
    setViewMode("detail");
  };

  const handleBackToDirectory = () => {
    setViewMode("directory");
    setActiveTab("observations");
  };

  // --- VISTA 1: DIRECTORIO DE ZONAS ---
  if (viewMode === "directory") {
    return (
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        {/* Header del Directorio */}
        <div className="flex flex-col gap-4 border-b border-ink/20 pb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-chloro/10 border border-chloro/20 flex items-center justify-center text-xl">
                <LayoutGrid className="w-6 h-6 text-chloro" />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-ink">
                  {t.title}
                </h1>
                <p className="font-mono text-xs uppercase tracking-widest text-chloro font-bold mt-1">
                  Directorio de Zonas
                </p>
              </div>
            </div>

            {/* 👇 Botón conectado al modal */}
            <Button
              variant="cta"
              className="flex items-center gap-2"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="w-4 h-4" /> Añadir Zona
            </Button>
          </div>
          <p className="font-sans text-base text-ink/70 max-w-2xl">
            {t.description}
          </p>
        </div>

        {/* Grid de Tarjetas */}
        {systems.length === 0 ? (
          <DataCard className="p-12 text-center border-dashed border-ink/20">
            <p className="font-mono text-sm text-ink/50">{t.emptySystems}</p>
          </DataCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systems.map((system) => (
              <DataCard
                key={system.id}
                className="p-6 flex flex-col hover:border-chloro/50 transition-colors cursor-pointer group"
                onClick={() => handleOpenSystem(system.id)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{system.icon}</span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-ink group-hover:text-chloro transition-colors">
                      {system.name}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                      {system.template}
                    </p>
                  </div>
                </div>

                {/* Mini KPIs en la tarjeta */}
                <div className="grid grid-cols-2 gap-2 mt-auto pt-4 border-t border-ink/10">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase text-ink/50 flex items-center gap-1">
                      <Activity className="w-3 h-3" /> SHI
                    </span>
                    <span className="font-mono text-lg font-bold text-ink">
                      {system.metrics.shi ?? "—"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase text-ink/50 flex items-center gap-1">
                      <Droplets className="w-3 h-3" /> Humedad
                    </span>
                    <span className="font-mono text-lg font-bold text-ink">
                      {system.metrics.moisture
                        ? `${system.metrics.moisture}%`
                        : "—"}
                    </span>
                  </div>
                </div>
              </DataCard>
            ))}
          </div>
        )}

        {/* 👇 Renderizamos el Modal aquí */}
        {isCreateModalOpen && (
          <CreateSystemModal onClose={() => setIsCreateModalOpen(false)} />
        )}
      </div>
    );
  }

  // --- VISTA 2: DETALLE DE LA ZONA  ---
  const tabs = [
    ...systems.map((s) => ({ id: s.id, label: s.name, icon: s.icon })),
    { id: "observations", label: t.tabs.observations, icon: "🔬" },
    { id: "analytics", label: t.tabs.analytics, icon: "📈" },
  ];

  const activeSystem = systems.find((s) => s.id === activeTab);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header del Detalle con botón de volver */}
      <div className="flex flex-col gap-4 border-b border-ink/20 pb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <Button
            variant="bare"
            onClick={handleBackToDirectory}
            className="!rounded-none hover:scale-100 text-ink/60 hover:text-ink flex items-center gap-2 px-0"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al directorio
          </Button>
        </div>
        <div className="flex items-center gap-4 flex-wrap mt-2">
          <div className="w-12 h-12 bg-chloro/10 border border-chloro/20 flex items-center justify-center text-xl">
            🌱
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-ink">
              {t.title}
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-chloro font-bold mt-1">
              {t.badge}
            </p>
          </div>
        </div>
        <p className="font-sans text-base text-ink/70 max-w-2xl">
          {t.description}
        </p>
      </div>

      {/* TABS del Detalle */}
      <div className="flex flex-wrap gap-0 border-b border-ink/20">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Button
              key={tab.id}
              variant="bare"
              size="none"
              onClick={() => setActiveTab(tab.id)}
              className={`!rounded-none hover:!scale-100 flex items-center gap-2 px-5 py-3 font-mono text-xs uppercase tracking-widest font-bold transition-colors border-t border-x border-transparent -mb-[1px] ${
                isActive
                  ? "bg-card text-ink border-ink/20 border-b-card z-10"
                  : "text-ink/50 hover:text-ink hover:bg-paper/50"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* CONTENIDO del Detalle */}
      <div className="pt-2">
        {activeSystem && <SystemTab system={activeSystem} />}
        {activeTab === "observations" && <ObservationsTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
}
