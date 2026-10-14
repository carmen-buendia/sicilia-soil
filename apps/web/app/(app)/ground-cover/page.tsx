"use client";

import { useState } from "react";
import { Button } from "@sicilia-soil/ui";
import {
  EspartoTab,
  PolycultureTab,
  CerealTab,
  CoverFallowTab,
  AnalysisTab,
} from "./tabs";

type TabId = "esparto" | "polyculture" | "cereal" | "cover-fallow" | "analysis";

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "esparto", label: "Esparto", icon: "🌾" },
  { id: "polyculture", label: "Policultivo", icon: "🌳" },
  { id: "cereal", label: "Cereal", icon: "🌾" },
  { id: "cover-fallow", label: "Cubiertas y barbecho", icon: "🌿" },
  { id: "analysis", label: "Análisis", icon: "📈" },
];

export default function CropsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("esparto");

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-gradient-to-br from-offWhite to-emerald-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-oliveGreen/20 to-wheatGold/20 rounded-xl">
                <span className="text-3xl">🌾</span>
              </div>
              Cultivos
            </h1>
            <span className="text-xs bg-oliveGreen/15 text-oliveGreen border border-oliveGreen/20 px-3 py-1 rounded-full font-medium">
              Regeneración del suelo
            </span>
          </div>
          <p className="text-oliveGreen/70">
            Esparto · Policultivo · Cereal · Cubiertas · Barbecho — gestión
            regenerativa en clima mediterráneo
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 my-8 border-b border-oliveGreen/15 pb-2">
          {TABS.map((tab) => (
            <Button
              key={tab.id}
              variant="tab"
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              icon={<span>{tab.icon}</span>}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "esparto" && <EspartoTab />}
        {activeTab === "polyculture" && <PolycultureTab />}
        {activeTab === "cereal" && <CerealTab />}
        {activeTab === "cover-fallow" && <CoverFallowTab />}
        {activeTab === "analysis" && <AnalysisTab />}
      </div>
    </div>
  );
}
