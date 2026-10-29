// apps/web/components/features/soil-health/tabs/BioindicatorsTab.tsx
"use client";

import { useState } from "react";
import { getLocale } from "@sicilia-soil/core";
import type { CropSystem } from "@sicilia-soil/core";
import { DataCard, Button } from "@sicilia-soil/ui";
import { Sprout, Info, PenLine } from "lucide-react";
import { useCropSystemsContext } from "@/components/features/crops/CropSystemsProvider";

export function BioindicatorsTab({ systems }: { systems: CropSystem[] }) {
  const locale = getLocale("es");
  const t = locale.content.soilHealthTabs.bioindicators;

  // 👇 Importamos la función para actualizar los sistemas
  const { updateSystem } = useCropSystemsContext();

  // Estados para el formulario rápido
  const [selectedSystemId, setSelectedSystemId] = useState<string>(
    systems[0]?.id || "",
  );
  const [note, setNote] = useState("");

  const systemsWithObservations = systems.filter(
    (s) => s.observations && s.observations.length > 0,
  );

  // 👇 Función para guardar la nota
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
      meta: { source: "Diario de campo", date: new Date().toISOString() },
    };

    updateSystem(selectedSystemId, {
      observations: [...(system.observations || []), newObservation],
    });
    setNote(""); // Limpiamos el campo
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

      {/* 👇 Formulario rápido para añadir notas */}
      <DataCard className="p-4 border-chloro/30 bg-chloro/5">
        <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-chloro mb-3 flex items-center gap-2">
          <PenLine className="w-4 h-4" /> Añadir nota al diario de campo
        </h3>
        <div className="flex flex-col md:flex-row gap-3">
          <select
            value={selectedSystemId}
            onChange={(e) => setSelectedSystemId(e.target.value)}
            className="bg-card border border-ink/20 p-2 text-sm text-ink focus:outline-none focus:border-chloro"
          >
            {systems.length === 0 && <option value="">No hay sistemas</option>}
            {systems.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ej: Aparición de setas en la zona norte..."
            className="flex-1 bg-card border border-ink/20 p-2 text-sm text-ink focus:outline-none focus:border-chloro"
            onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
          />
          <Button
            variant="cta"
            onClick={handleAddNote}
            className="px-4 py-2 text-sm"
          >
            Guardar Nota
          </Button>
        </div>
      </DataCard>

      {/* Grid de bioindicadores */}
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
            <DataCard key={system.id} className="p-5">
              <div className="flex items-center gap-3 mb-3">
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

              <div className="flex items-center gap-2 font-mono text-xs text-ink/70 mb-4 pb-3 border-b border-ink/10">
                <Sprout className="w-4 h-4 text-chloro" />
                <span>{t.habitat}</span>
                <span className="font-bold text-ink ml-auto">
                  {system.region ?? "Desconocido"}
                </span>
              </div>

              {/* Listamos todas las observaciones de este sistema */}
              <div className="space-y-3">
                {system.observations?.map((obs) => (
                  <div
                    key={obs.id}
                    className="bg-paper/50 border border-ink/10 p-3"
                  >
                    <p className="font-sans text-xs text-ink/80">{obs.text}</p>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-ink/40 mt-2">
                      {obs.meta?.source ?? "Sin fuente"} ·{" "}
                      {new Date(
                        obs.meta?.date ?? Date.now(),
                      ).toLocaleDateString("es-IT")}
                    </p>
                  </div>
                ))}
              </div>
            </DataCard>
          ))}
        </div>
      )}
    </div>
  );
}
