"use client";

import { useState } from "react";
import { Button } from "@sicilia-soil/ui";
import {
  SoilHealthSummary,
  RemediationTab,
  NetworksTab,
  BioindicatorsTab,
} from "./tabs";

type TabId = "summary" | "remediation" | "networks" | "bioindicators";

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "summary", label: "Resumen", icon: "🌱" },
  { id: "remediation", label: "Biorremediación", icon: "♻️" },
  { id: "networks", label: "Redes", icon: "🔬" },
  { id: "bioindicators", label: "Bioindicadores", icon: "🍄" },
];

export default function SoilHealthPage() {
  const [activeTab, setActiveTab] = useState<TabId>("summary");

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-offWhite">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-oliveGreen/20 to-wheatGold/20 rounded-xl">
                <span className="text-2xl">🍄</span>
              </div>
              Salud Biológica del Suelo
            </h1>
            <span className="text-xs bg-oliveGreen/15 text-oliveGreen border border-oliveGreen/20 px-3 py-1 rounded-full font-medium">
              Red micorrícica
            </span>
          </div>
          <p className="text-oliveGreen/70">
            Redes AMF y ECM, glomalina, biorremediación y bioindicadores
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

        {/* Contenido */}
        {activeTab === "summary" && <SoilHealthSummary />}
        {activeTab === "remediation" && <RemediationTab />}
        {activeTab === "networks" && <NetworksTab />}
        {activeTab === "bioindicators" && <BioindicatorsTab />}
      </div>
    </div>
  );
}
