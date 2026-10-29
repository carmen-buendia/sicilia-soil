// apps/web/components/features/soil-health/SoilHealthView.tsx
"use client";

import { useState } from "react";
import { getLocale } from "@sicilia-soil/core";
import { useCropSystemsContext } from "@/components/features/crops/CropSystemsProvider";
import {
  SoilHealthSummary,
  RemediationTab,
  NetworksTab,
  BioindicatorsTab,
} from "./tabs";
import { Button } from "@sicilia-soil/ui";

type TabId = "summary" | "remediation" | "networks" | "bioindicators";

export function SoilHealthView() {
  const [activeTab, setActiveTab] = useState<TabId>("summary");
  const locale = getLocale("es");
  
  // 👇 Aquí conectamos con el CRUD de sistemas para que sea Crop-Agnostic
  const { systems } = useCropSystemsContext();

  const TABS: { id: TabId; label: string; icon: string }[] = [
    { id: "summary", label: locale.ui.soilHealthTabs.summary, icon: "🌱" },
    { id: "remediation", label: locale.ui.soilHealthTabs.remediation, icon: "♻️" },
    { id: "networks", label: locale.ui.soilHealthTabs.networks, icon: "🔬" },
    { id: "bioindicators", label: locale.ui.soilHealthTabs.bioindicators, icon: "🍄" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-ink/20 pb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-12 h-12 bg-chloro/10 border border-chloro/20 flex items-center justify-center text-xl">
            🍄
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-ink flex items-center gap-3">
              {locale.content.soilHealth.title}
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-chloro font-bold mt-1">
              {locale.content.soilHealth.badge}
            </p>
          </div>
        </div>
        <p className="font-sans text-base text-ink/70 max-w-2xl">
          {locale.content.soilHealth.description}
        </p>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap gap-0 border-b border-ink/20">
        {TABS.map((tab) => {
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

      {/* CONTENIDO */}
      <div className="pt-2">
        {activeTab === "summary" && <SoilHealthSummary systems={systems} />}
        {activeTab === "remediation" && <RemediationTab systems={systems} />}
        {activeTab === "networks" && <NetworksTab systems={systems} />}
        {activeTab === "bioindicators" && <BioindicatorsTab systems={systems} />}
      </div>
    </div>
  );
}