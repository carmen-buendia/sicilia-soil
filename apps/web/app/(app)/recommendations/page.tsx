"use client";

import { useEffect, useMemo, useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import Link from "next/link";
import { ArrowLeft, Lightbulb, RefreshCw } from "lucide-react";
import { Button } from "@sicilia-soil/ui";
import { RecommendationsList } from "@/components/features/recommendations";
import { generateRecommendations } from "@sicilia-soil/utils";

// Datos simulados de una parcela (mientras no hay sensores reales)
const MOCK_INPUT = {
  soilMoisture: 38,
  soilTemperature: 21,
  airTemperature: 30,
  co2: 720,
  ndvi: 0.35,
  ndwi: 0.18,
  lst: 34,
  windSpeed: 27,
  zoneId: "sicilia-food-forest",
  zoneName: "Sicilia — Food Forest (Assoro)",
};

export default function RecommendationsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { addNotificationsFromRecommendations } = useNotifications();

  const recommendations = useMemo(
    () => generateRecommendations(MOCK_INPUT),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refreshKey],
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
              href="/"
              className="p-2 hover:bg-oliveGreen/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-oliveGreen" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-oliveGreen/20 to-wheatGold/20 rounded-xl">
                  <Lightbulb className="w-8 h-8 text-oliveGreen" />
                </div>
                Recomendaciones
              </h1>
              <p className="text-oliveGreen/70">
                Decisiones accionables para suelo y agua
              </p>
            </div>
          </div>

          <Button
            variant="olive"
            onClick={() => setRefreshKey((k) => k + 1)}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            Recalcular
          </Button>
        </div>

        {/* Info box */}
        <div className="bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 rounded-2xl p-6 border border-oliveGreen/15 mb-8">
          <h2 className="text-lg font-bold text-charcoalGray mb-2">
            🌱 Motor de recomendaciones
          </h2>
          <p className="text-sm text-oliveGreen/70">
            Este motor combina datos IoT (sensores in-situ) y datos Copernicus
            (NDVI, NDWI, SSM, LST) para generar recomendaciones accionables
            sobre riego, fertilización, salud del suelo y regeneración.
          </p>
        </div>

        <RecommendationsList recommendations={recommendations} />
      </div>
    </div>
  );
}
