// apps/web/components/features/soil-health/tabs/BioindicatorsTab.tsx
"use client";

import { useState } from "react";
import { getLocale } from "@sicilia-soil/core";
import type { CropSystem } from "@sicilia-soil/core";
import { DataCard, Button } from "@sicilia-soil/ui";
import { Info, PenLine, Leaf, Bug, CloudRain, FileText } from "lucide-react";
import { useCropSystemsContext } from "@/components/features/crops/CropSystemsProvider";

const CATEGORY_CONFIG = {
  fungi: {
    label: "Hongos",
    icon: Leaf,
    color: "text-chloro bg-chloro/10 border-chloro/20",
  },
  pest: {
    label: "Plaga",
    icon: Bug,
    color: "text-solar bg-solar/10 border-solar/20",
  },
  weather: {
    label: "Clima",
    icon: CloudRain,
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  },
  other: {
    label: "Otro",
    icon: FileText,
    color: "text-ink/60 bg-ink/5 border-ink/20",
  },
};

export function BioindicatorsTab({ systems }: { systems: CropSystem[] }) {
  const locale = getLocale("es");
  const t = locale.content.soilHealthTabs.bioindicators;
  const { updateSystem } = useCropSystemsContext();

  const [selectedSystemId, setSelectedSystemId] = useState<string>(
    systems[0]?.id || "",
  );
  const [note, setNote] = useState("");
  // 👇 Nuevo estado para la categoría
  const [category, setCategory] = useState<
    "fungi" | "pest" | "weather" | "other"
  >("fungi");

  const systemsWithObservations = systems.filter(
    (s) => s.observations && s.observations.length > 0,
  );

  const handleAddNote = () => {
    if (!note.trim() || !selectedSystemId) return;

    const system = systems.find((s) => s.id === selectedSystemId);
    if (!system) return;

    const newObservation = {
      id: crypto.randomUUID(),
      systemId: selectedSystemId,
      key: "bioindicator",
      text: note,
      level: "info" as const,
      category, // 👈 Guardamos la categoría
      meta: { source: "Diario de campo", date: new Date().toISOString() },
    };

    updateSystem(selectedSystemId, {
      observations: [...(system.observations || []), newObservation],
    });
    setNote("");
  };

  return (
    <div className="space-y-8">
      {/* Intro */}
      <DataCard className="p-6">
        <h2 className="text-xl font-serif font-bold text-ink mb-2">
          {t.title}
        </h2>
        <p className="font-sans text-sm text-ink/70">{t.description}</p>
      </DataCard>

      {/* 👇 FORMULARIO REDISEÑADO */}
      <DataCard className="p-6 border-chloro/30 bg-chloro/5">
        <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-chloro mb-4 flex items-center gap-2">
          <PenLine className="w-4 h-4" /> Añadir nota al diario de campo
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
          {/* Selector de Zona */}
          <div className="md:col-span-2">
            <label className="block font-mono text-[10px] uppercase text-ink/60 mb-1">
              Zona
            </label>
            <select
              value={selectedSystemId}
              onChange={(e) => setSelectedSystemId(e.target.value)}
              className="w-full bg-card border border-ink/20 p-2 text-sm text-ink focus:outline-none focus:border-chloro"
            >
              {systems.length === 0 && (
                <option value="">No hay sistemas</option>
              )}
              {systems.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de Categoría */}
          <div className="md:col-span-2">
            <label className="block font-mono text-[10px] uppercase text-ink/60 mb-1">
              Tipo de hallazgo
            </label>
            <div className="flex gap-2">
              {(
                Object.keys(CATEGORY_CONFIG) as Array<
                  keyof typeof CATEGORY_CONFIG
                >
              ).map((key) => {
                const Icon = CATEGORY_CONFIG[key].icon;
                const isSelected = category === key;
                return (
                  <button
                    key={key}
                    onClick={() => setCategory(key)}
                    className={`flex-1 flex items-center justify-center gap-1 py-2 border text-xs font-mono uppercase tracking-wider font-bold transition-colors ${
                      isSelected
                        ? CATEGORY_CONFIG[key].color
                        : "bg-card border-ink/20 text-ink/40 hover:bg-paper"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span className="hidden sm:inline">
                      {CATEGORY_CONFIG[key].label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Input de texto y botón */}
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ej: Aparición de setas, mordida de insectos, helada..."
            className="flex-1 bg-card border border-ink/20 p-3 text-sm text-ink focus:outline-none focus:border-chloro"
            onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
          />
          <Button
            variant="cta"
            onClick={handleAddNote}
            className="px-6 py-3 text-sm whitespace-nowrap"
          >
            Guardar Nota
          </Button>
        </div>
      </DataCard>

      {/* Grid de Tarjetas */}
      {systemsWithObservations.length === 0 ? (
        <DataCard className="p-12 text-center border-dashed border-ink/20">
          <Info className="w-8 h-8 text-ink/30 mx-auto mb-3" />
          <p className="font-mono text-sm text-ink/50">
            No hay notas en el diario. Usa el formulario de arriba para añadir
            la primera.
          </p>
        </DataCard>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemsWithObservations.map((system) => (
            <DataCard key={system.id} className="p-5 flex flex-col">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-ink/10">
                <span className="text-2xl">{system.icon}</span>
                <div>
                  <h3 className="font-serif font-bold text-ink">
                    {system.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase text-ink/50">
                    {system.template}
                  </p>
                </div>
              </div>

              <div className="space-y-3 flex-1">
                {system.observations?.map((obs) => {
                  const catConfig =
                    CATEGORY_CONFIG[
                      obs.category as keyof typeof CATEGORY_CONFIG
                    ] || CATEGORY_CONFIG.other;
                  const CatIcon = catConfig.icon;

                  return (
                    <div
                      key={obs.id}
                      className="bg-paper/50 border border-ink/10 p-3 relative group"
                    >
                      {/* Etiqueta de categoría */}
                      <div
                        className={`inline-flex items-center gap-1 px-2 py-0.5 border text-[9px] font-mono uppercase font-bold mb-2 ${catConfig.color}`}
                      >
                        <CatIcon className="w-3 h-3" /> {catConfig.label}
                      </div>

                      <p className="font-sans text-sm text-ink/80">
                        {obs.text}
                      </p>

                      <p className="font-mono text-[9px] uppercase tracking-wider text-ink/40 mt-2">
                        {obs.meta?.source} ·{" "}
                        {new Date(
                          obs.meta?.date ?? Date.now(),
                        ).toLocaleDateString("es-IT")}
                      </p>
                    </div>
                  );
                })}
              </div>
            </DataCard>
          ))}
        </div>
      )}
    </div>
  );
}
