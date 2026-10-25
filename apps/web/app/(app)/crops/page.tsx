// apps/web/app/(app)/crops/page.tsx
"use client";

import { useState, useEffect } from "react";
import { getLocale } from "@sicilia-soil/core";
import { useCropSystemsContext } from "@/components/features/crops/CropSystemsProvider";
import { SystemTab } from "@/components/features/crops/tabs/SystemTab";
import { ObservationsTab } from "@/components/features/crops/tabs/ObservationsTab";
import { AnalyticsTab } from "@/components/features/crops/tabs/AnalyticsTab";
import { Button } from "@sicilia-soil/ui";

const FIXED_TABS = ["observations", "analytics"] as const;
type FixedTabId = (typeof FIXED_TABS)[number];

export default function CropsPage() {
  const { systems } = useCropSystemsContext();
  const locale = getLocale("es");
  const t = locale.content.cropsPage;

  const [activeTab, setActiveTab] = useState<string>(
    () => systems[0]?.id ?? "observations",
  );

  useEffect(() => {
    if (FIXED_TABS.includes(activeTab as FixedTabId)) return;
    if (!systems.find((s) => s.id === activeTab)) {
      setActiveTab(systems[0]?.id ?? "observations");
    }
  }, [systems, activeTab]);

  const tabs = [
    ...systems.map((s) => ({ id: s.id, label: s.name, icon: s.icon })),
    { id: "observations", label: t.tabs.observations, icon: "🔬" },
    { id: "analytics", label: t.tabs.analytics, icon: "📈" },
  ];

  const activeSystem = systems.find((s) => s.id === activeTab);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col gap-4 border-b border-ink/20 pb-6">
        <div className="flex items-center gap-4 flex-wrap">
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

      <div className="pt-2">
        {activeSystem && <SystemTab system={activeSystem} />}
        {activeTab === "observations" && <ObservationsTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
        {systems.length === 0 &&
          activeTab !== "observations" &&
          activeTab !== "analytics" && (
            <div className="p-12 text-center border border-dashed border-ink/20">
              <p className="font-mono text-sm text-ink/50">{t.emptySystems}</p>
            </div>
          )}
      </div>
    </div>
  );
}
