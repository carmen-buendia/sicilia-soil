"use client";

import { Filter } from "lucide-react";
import {
  ZoneSelector,
  MetricsSelector,
  PeriodSelector,
  StatsGrid,
  PredictionCard,
  InsightsFooter,
  DataTable,
} from "./";
import { metrics } from "@/lib/config/site.config";
import { getMetricColor, getMetricUnit } from "../utils";

interface AgronomicTabProps {
  selectedZones: string[];
  onZoneToggle: (zoneId: string) => void;
  selectedMetric: string;
  onMetricChange: (metric: string) => void;
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  showPredictions: boolean;
  onTogglePredictions: () => void;
  zonesData: any[];
  statistics: Record<string, any>;
}

export function AgronomicTab({
  selectedZones,
  onZoneToggle,
  selectedMetric,
  onMetricChange,
  selectedPeriod,
  onPeriodChange,
  showPredictions,
  onTogglePredictions,
  zonesData,
  statistics,
}: AgronomicTabProps) {
  const currentMetric = metrics.find((m) => m.id === selectedMetric);
  const unit = getMetricUnit(selectedMetric);
  const metricColor = getMetricColor(selectedMetric);

  const filteredZones = zonesData
    .filter((z) => selectedZones.includes(z.id))
    .map((zone) => ({
      id: zone.id,
      name: zone.name,
      icon: zone.icon,
      stats: statistics[zone.id] || {
        avg: 0,
        max: 0,
        min: 0,
        trend: 0,
        last: 0,
      },
      metricColor,
      unit,
    }));

  const predictionZones = zonesData
    .filter((z) => selectedZones.includes(z.id))
    .map((zone) => ({
      id: zone.id,
      name: zone.name,
      icon: zone.icon,
      data: zone[selectedMetric as keyof typeof zone] as any[],
    }));

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-oliveGreen/15 mb-8">
        <div className="grid md:grid-cols-3 gap-6">
          <ZoneSelector
            selectedZones={selectedZones}
            onZoneToggle={onZoneToggle}
          />
          <MetricsSelector
            selectedMetric={selectedMetric}
            onMetricChange={onMetricChange}
          />
          <PeriodSelector
            selectedPeriod={selectedPeriod}
            onPeriodChange={onPeriodChange}
            showPredictions={showPredictions}
            onTogglePredictions={onTogglePredictions}
          />
        </div>
      </div>

      {selectedZones.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-lg border border-oliveGreen/15 text-center">
          <Filter className="w-16 h-16 text-oliveGreen/30 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-charcoalGray mb-2">
            Selecciona zonas para analizar
          </h2>
          <p className="text-oliveGreen/60">
            Elige al menos una zona del panel izquierdo para ver los datos
          </p>
        </div>
      ) : (
        <>
          <StatsGrid zones={filteredZones} />
          {showPredictions && predictionZones.length > 0 && (
            <PredictionCard
              zones={predictionZones}
              metricName={currentMetric?.name || ""}
              unit={unit}
              onClose={onTogglePredictions}
            />
          )}
          {predictionZones.length > 0 && (
            <DataTable zones={predictionZones} unit={unit} />
          )}
          <InsightsFooter />
        </>
      )}
    </>
  );
}