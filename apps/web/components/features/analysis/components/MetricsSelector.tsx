"use client";

import { Button } from "@sicilia-soil/ui";
import { metrics } from "@/lib/config/site.config";
import { getMetricBgColor } from "../utils";
import { Button } from "@sicilia-soil/ui";

interface MetricsSelectorProps {
  selectedMetric: string;
  onMetricChange: (metricId: string) => void;
}

export function MetricsSelector({
  selectedMetric,
  onMetricChange,
}: MetricsSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-oliveGreen mb-3">
        Métrica a analizar
      </label>
      <div className="space-y-2">
        {metrics.map((metric) => (
          <Button
            key={metric.id}
            type="button"
            variant="bare"
            onClick={() => onMetricChange(metric.id)}
            className={`w-full justify-between !px-3 !py-2 !rounded-lg !font-normal !text-sm !transition-colors !duration-150 hover:!scale-100 ${
              selectedMetric === metric.id
                ? `${getMetricBgColor(metric.id)} border`
                : "bg-offWhite text-charcoalGray/70 hover:bg-oliveGreen/5 border border-oliveGreen/10"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">{metric.icon}</span>
              <span className="font-medium">{metric.name}</span>
            </span>
            <span className="text-xs text-oliveGreen/50">{metric.unit}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
