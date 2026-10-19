"use client";

import { useState } from "react";
import { getLocale } from "@sicilia-soil/core";
import {
  EspartoTab,
  PolycultureTab,
  CerealTab,
  CoverFallowTab,
  AnalysisTab,
} from "./tabs";
import { Button } from "@sicilia-soil/ui";

type TabId = "esparto" | "polyculture" | "cereal" | "cover-fallow" | "analysis";

export default function CropsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("esparto");
  const locale = getLocale("es");
  const t = locale.content.cropsPage;

  const TABS: { id: TabId; label: string; icon: string }[] = [
    { id: "esparto", label: t.tabs.esparto, icon: "🌾" },
    { id: "polyculture", label: t.tabs.polyculture, icon: "🌳" },
    { id: "cereal", label: t.tabs.cereal, icon: "🌾" },
    { id: "cover-fallow", label: t.tabs.coverFallow, icon: "🌿" },
    { id: "analysis", label: t.tabs.analysis, icon: "📈" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-ink/20 pb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-12 h-12 bg-chloro/10 border border-chloro/20 flex items-center justify-center text-xl">
            🌾
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-ink flex items-center gap-3">
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

      {/* TABS (Estilo índice de libro) */}
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
        {activeTab === "esparto" && <EspartoTab />}
        {activeTab === "polyculture" && <PolycultureTab />}
        {activeTab === "cereal" && <CerealTab />}
        {activeTab === "cover-fallow" && <CoverFallowTab />}
        {activeTab === "analysis" && <AnalysisTab />}
      </div>
    </div>
  );
}
