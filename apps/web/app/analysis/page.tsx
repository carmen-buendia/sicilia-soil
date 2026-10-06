"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  LineChart,
  DownloadCloud,
  Droplets,
  Activity,
} from "lucide-react";
import { Button } from "@sicilia-soil/ui";
import {
  AgronomicTab,
  EnvironmentalTab,
} from "@/components/features/analysis/components";
import {
  heavyMetals,
  airQuality,
  waterQuality,
  soilQuality,
  updateEnvironmentalData,
  type HeavyMetal,
  type AirQuality,
  type WaterQuality,
  type SoilQuality,
} from "@/lib/data/ambientalData";
import { useHistoricalAnalysis } from "@/components/features/analysis/hooks/useHistoricalAnalysis";

export default function AnalisiPage() {
  const [selectedZones, setSelectedZones] = useState<string[]>([
    "tomates",
    "olivar",
  ]);
  const [selectedMetric, setSelectedMetric] = useState("moisture");
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [showPredictions, setShowPredictions] = useState(true);
  const [activeTab, setActiveTab] = useState<"agronomico" | "ambiental">(
    "agronomico",
  );

  const [ambientalData, setAmbientalData] = useState<{
    heavyMetals: HeavyMetal[];
    airQuality: AirQuality[];
    waterQuality: WaterQuality[];
    soilQuality: SoilQuality[];
  }>({
    heavyMetals,
    airQuality,
    waterQuality,
    soilQuality,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      updateEnvironmentalData();
      setAmbientalData({
        heavyMetals: [...heavyMetals],
        airQuality: [...airQuality],
        waterQuality: [...waterQuality],
        soilQuality: [...soilQuality],
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { zonesData, statistics, isLoading } = useHistoricalAnalysis();

  const handleExport = () => {
    const exportData = {
      generatedAt: new Date().toISOString(),
      period: `${selectedPeriod} días`,
      agronomic: {
        zones: zonesData
          .filter((z) => selectedZones.includes(z.id))
          .map((z) => ({
            name: z.name,
            stats: statistics[z.id],
          })),
      },
      environmental: ambientalData,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analisis-completo-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-8 bg-offWhite flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-oliveGreen/20 border-t-oliveGreen rounded-full animate-spin mx-auto mb-4" />
          <p className="text-oliveGreen/70">Cargando datos de análisis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-offWhite">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-oliveGreen/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-oliveGreen" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
                <LineChart className="w-8 h-8 text-oliveGreen" />
                Análisis de Datos
              </h1>
              <p className="text-oliveGreen/70">
                Estadísticas avanzadas y comparativas entre zonas
              </p>
            </div>
          </div>

          <Button
            variant="olive"
            onClick={handleExport}
            icon={<DownloadCloud className="w-4 h-4" />}
          >
            Exportar datos
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-xl p-1 border border-oliveGreen/15 shadow-sm">
          <Button
            variant="tab"
            active={activeTab === "agronomico"}
            onClick={() => setActiveTab("agronomico")}
            icon={<Droplets className="w-4 h-4" />}
            className="flex-1"
          >
            Agronómico
          </Button>
          <Button
            variant="tab"
            active={activeTab === "ambiental"}
            onClick={() => setActiveTab("ambiental")}
            icon={<Activity className="w-4 h-4" />}
            className="flex-1"
          >
            Ambiental
          </Button>
        </div>

        {activeTab === "agronomico" && (
          <AgronomicTab
            selectedZones={selectedZones}
            onZoneToggle={(zoneId) =>
              setSelectedZones((prev) =>
                prev.includes(zoneId)
                  ? prev.filter((id) => id !== zoneId)
                  : [...prev, zoneId],
              )
            }
            selectedMetric={selectedMetric}
            onMetricChange={setSelectedMetric}
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
            showPredictions={showPredictions}
            onTogglePredictions={() => setShowPredictions(!showPredictions)}
            zonesData={zonesData}
            statistics={statistics}
          />
        )}

        {activeTab === "ambiental" && (
          <EnvironmentalTab
            heavyMetals={ambientalData.heavyMetals}
            airQuality={ambientalData.airQuality}
            waterQuality={ambientalData.waterQuality}
            soilQuality={ambientalData.soilQuality}
          />
        )}
      </div>
    </div>
  );
}
