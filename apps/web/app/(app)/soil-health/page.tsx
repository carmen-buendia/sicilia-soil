// apps/web/app/(app)/soil-health/page.tsx
"use client";

import { useState } from "react";
import { getLocale } from "@sicilia-soil/core";
import { useCropSystemsContext } from "@/components/features/crops/CropSystemsProvider";
import {
  SoilHealthSummary,
  RemediationTab,
  NetworksTab,
  BioindicatorsTab,
} from "@/components/features/soil-health/tabs";
import { Button } from "@sicilia-soil/ui";

type TabId = "summary" | "remediation" | "networks" | "bioindicators";

const locale = getLocale("es");
const soilHealthPageContent = locale.content.soilHealth;
const soilHealthTabsContent = locale.ui.soilHealthTabs;

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "summary", label: soilHealthTabsContent.summary, icon: "🌱" },
  { id: "remediation", label: soilHealthTabsContent.remediation, icon: "♻️" },
  { id: "networks", label: soilHealthTabsContent.networks, icon: "🔬" },
  {
    id: "bioindicators",
    label: soilHealthTabsContent.bioindicators,
    icon: "🍄",
  },
];

export default function SoilHealthPage() {
  const [activeTab, setActiveTab] = useState<TabId>("summary");
  const { systems } = useCropSystemsContext();

  return (
    <div className="flex flex-col gap-4 border-b border-ink/20 pb-6">
      <div className="flex flex-col gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-12 h-12 bg-chloro/10 border border-chloro/20 flex items-center justify-center text-xl">
            🍄
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-ink flex items-center gap-3">
              {soilHealthPageContent.title}
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-chloro font-bold mt-1">
              {soilHealthPageContent.badge}
            </p>
          </div>
        </div>
        <p className="font-sans text-base text-ink/70 max-w-2xl">
          {soilHealthPageContent.description}
        </p>
      </div>

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

      <div className="pt-2">
        {activeTab === "summary" && <SoilHealthSummary systems={systems} />}
        {activeTab === "remediation" && <RemediationTab systems={systems} />}
        {activeTab === "networks" && <NetworksTab systems={systems} />}
        {activeTab === "bioindicators" && (
          <BioindicatorsTab systems={systems} />
        )}
      </div>
    </div>
  );
}
