"use client";

import { getLocale } from "@sicilia-soil/core";

interface MushroomChipProps {
  mushroom: {
    id: string;
    name: string;
    scientificName: string;
    icon: string;
    isEndemic: boolean;
  };
  active: boolean;
  onClick: () => void;
}

export function MushroomChip({ mushroom, active, onClick }: MushroomChipProps) {
  const locale = getLocale("es");
  const t = locale.ui.mushroomChip;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center gap-4 px-5 py-3 border transition-all duration-300 ${
        active
          ? "bg-paper border-chloro/50 shadow-[0_4px_20px_-4px_rgba(79,122,92,0.2)] scale-[1.02]"
          : "bg-card/50 backdrop-blur-sm border-ink/10 hover:border-ink/30 hover:bg-card hover:shadow-sm"
      }`}
    >
      {/* Indicador activo */}
      {active && (
        <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-chloro rounded-full animate-pulse" />
      )}

      <span className="text-3xl drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
        {mushroom.icon}
      </span>

      <div className="text-left">
        <p
          className={`font-serif font-bold text-base leading-tight transition-colors ${
            active ? "text-ink" : "text-ink/80 group-hover:text-ink"
          }`}
        >
          {mushroom.name}
        </p>
        <p
          className={`font-mono text-[11px] italic mt-0.5 transition-colors ${
            active ? "text-chloro/80" : "text-ink/50 group-hover:text-ink/60"
          }`}
        >
          {mushroom.scientificName}
        </p>
      </div>

      {mushroom.isEndemic && (
        <span
          className={`ml-2 px-2 py-1 font-mono text-[9px] uppercase tracking-wider font-bold border rounded-sm transition-colors ${
            active
              ? "border-solar/40 text-solar bg-solar/10"
              : "border-solar/20 text-solar/70 bg-solar/5 group-hover:bg-solar/10"
          }`}
        >
          {t.endemicLabel}
        </span>
      )}
    </button>
  );
}
