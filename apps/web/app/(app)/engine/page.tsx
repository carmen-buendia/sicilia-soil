"use client";

import { useEffect, useMemo, useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import Link from "next/link";
import { ArrowLeft, Brain, RefreshCw } from "lucide-react";
import { Button } from "@sicilia-soil/ui";
import { RecommendationsList } from "@/components/features/recommendations";
import { generateRecommendations } from "@sicilia-soil/utils";
import { getLocale, RECOMMENDATION_INPUT_MOCK } from "@sicilia-soil/core";
import { getZones } from "@sicilia-soil/core/site";

export default function EnginePage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { addNotificationsFromRecommendations } = useNotifications();

  const locale = getLocale("es");
  const t = locale.engine;

  const firstZone = getZones()[0];
  const zoneName = firstZone
    ? (locale.zones[firstZone.id as keyof typeof locale.zones] ?? firstZone.id)
    : "Unknown";

  const engineInput = useMemo(
    () => ({
      ...RECOMMENDATION_INPUT_MOCK,
      zoneId: firstZone?.id ?? "zone-unknown",
      zoneName,
    }),
    [firstZone?.id, zoneName],
  );

  const recommendations = useMemo(
    () => generateRecommendations(engineInput),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refreshKey, engineInput],
  );

  useEffect(() => {
    addNotificationsFromRecommendations(recommendations);
  }, [recommendations, addNotificationsFromRecommendations]);

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-offWhite">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 hover:bg-oliveGreen/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-oliveGreen" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-oliveGreen/20 to-wheatGold/20 rounded-xl">
                  <Brain className="w-8 h-8 text-oliveGreen" />
                </div>
                {t.header.title}
              </h1>
              <p className="text-oliveGreen/70">{t.header.subtitle}</p>
            </div>
          </div>

          <Button
            variant="olive"
            onClick={() => setRefreshKey((k) => k + 1)}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            {t.header.recalculate}
          </Button>
        </div>

        {/* Info box */}
        <div className="bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 rounded-2xl p-6 border border-oliveGreen/15 mb-8">
          <h2 className="text-lg font-bold text-charcoalGray mb-2">
            {t.infoBox.title}
          </h2>
          <p className="text-sm text-oliveGreen/70">{t.infoBox.description}</p>
        </div>

        <RecommendationsList recommendations={recommendations} />
      </div>
    </div>
  );
}
