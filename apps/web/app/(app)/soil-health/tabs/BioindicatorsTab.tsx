"use client";

import { useState } from "react";
import {
  Droplets,
  Thermometer,
  Wind,
  Calendar,
  MapPin,
  Leaf,
  Info,
} from "lucide-react";
import { MycologyChart } from "@sicilia-soil/ui";
import { MushroomChip } from "../components/MushroomChip";
import { MUSHROOMS, DEFAULT_MUSHROOM_ID, getLocale } from "@sicilia-soil/core";
import { DataCard } from "@sicilia-soil/ui"; // <-- Importamos DataCard

export function BioindicatorsTab() {
  const locale = getLocale("es");
  const t = locale.content.soilHealthTabs.bioindicators;

  const [selectedMushroom, setSelectedMushroom] = useState(DEFAULT_MUSHROOM_ID);
  const current = MUSHROOMS.find((m) => m.id === selectedMushroom);
  if (!current) return null;

  return (
    <div className="space-y-8">
      {/* Intro */}
      <DataCard className="p-6">
        <h2 className="text-xl font-serif font-bold text-ink mb-2">
          {t.title}
        </h2>
        <p className="font-sans text-sm text-ink/70">{t.description}</p>
      </DataCard>

      {/* Selector */}
      <div className="flex flex-wrap gap-3">
        {MUSHROOMS.map((m) => (
          <MushroomChip
            key={m.id}
            mushroom={m}
            active={selectedMushroom === m.id}
            onClick={() => setSelectedMushroom(m.id)}
          />
        ))}
      </div>

      {/* Info de la seta */}
      <div className="grid md:grid-cols-3 gap-6">
        <DataCard className="p-6 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-chloro" />
            <h3 className="font-serif text-lg font-bold text-ink">
              {t.descTitle}
            </h3>
          </div>
          <p className="font-sans text-sm text-ink/80 leading-relaxed mb-4">
            {current.description}
          </p>
          <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider font-bold">
            <span className="px-2 py-1 bg-chloro/10 text-chloro border border-chloro/20">
              {current.role === "bioindicator" && t.roleBio}
              {current.role === "cultivation" && t.roleCult}
              {current.role === "both" && t.roleBoth}
            </span>
            <span className="px-2 py-1 bg-solar/10 text-solar border border-solar/20">
              {current.mycorrhizaType === "AMF" && t.typeAMF}
              {current.mycorrhizaType === "ECM" && t.typeECM}
              {current.mycorrhizaType === "none" && t.typeNone}
            </span>
          </div>
        </DataCard>

        <DataCard className="p-6">
          <div className="space-y-4 font-mono text-xs text-ink/70">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-ink/40" />
              <span>{t.habitat}</span>
              <span className="font-bold text-ink ml-auto">
                {current.habitat}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-ink/40" />
              <span>{t.season}</span>
              <span className="font-bold text-ink ml-auto">
                {current.season.join(", ")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-ink/40" />
              <span>{t.endemic}</span>
              <span
                className={`font-bold ml-auto ${current.isEndemic ? "text-solar" : "text-ink"}`}
              >
                {current.isEndemic ? t.endemicTrue : t.endemicFalse}
              </span>
            </div>
          </div>
        </DataCard>
      </div>

      {/* Gráficos de seguimiento */}
      <div className="space-y-6">
        <h3 className="font-serif text-lg font-bold text-ink">
          {t.trackingTitle.replace("{name}", current.name)}
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <DataCard className="p-6">
            <MycologyChart
              mushroomName={current.name}
              data={current.data.humidity}
              metric="humidity"
              height={320}
            />
          </DataCard>
          <DataCard className="p-6">
            <MycologyChart
              mushroomName={current.name}
              data={current.data.temperature}
              metric="temperature"
              height={320}
            />
          </DataCard>
          <DataCard className="p-6 md:col-span-2">
            <MycologyChart
              mushroomName={current.name}
              data={current.data.co2}
              metric="co2"
              height={320}
            />
          </DataCard>
        </div>

        <p className="font-sans text-xs text-ink/50">{t.trackingNote}</p>
      </div>

      {/* Condiciones óptimas */}
      <DataCard className="p-6">
        <h3 className="font-serif text-lg font-bold text-ink mb-4 flex items-center gap-2">
          <Droplets className="w-5 h-5 text-chloro" /> {t.optimalTitle}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-paper border border-ink/10">
            <Droplets className="w-5 h-5 text-chloro" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                {t.idealHumidity}
              </p>
              <p className="font-mono text-sm font-bold text-ink">
                {current.optimal.humidity[0]}% - {current.optimal.humidity[1]}%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-paper border border-ink/10">
            <Thermometer className="w-5 h-5 text-solar" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                {t.idealTemp}
              </p>
              <p className="font-mono text-sm font-bold text-ink">
                {current.optimal.temperature[0]}°C -{" "}
                {current.optimal.temperature[1]}°C
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-paper border border-ink/10">
            <Wind className="w-5 h-5 text-ink/60" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                {t.idealCO2}
              </p>
              <p className="font-mono text-sm font-bold text-ink">
                {current.optimal.co2[0]} - {current.optimal.co2[1]} ppm
              </p>
            </div>
          </div>
        </div>
      </DataCard>
    </div>
  );
}
