import { Sprout, Leaf, Droplets, Calendar } from "lucide-react";
import { getLocale } from "@sicilia-soil/core";

interface EspartoData {
  general: {
    scientificName: string;
    health: number;
    nextHarvest: string;
  };
  growth: {
    phase: string;
    height: string;
    density: string;
    newShoots: number;
  };
  soil: {
    type: string;
    ph: number;
    moisture: number;
    nutrients: string;
  };
  harvest: {
    nextDate: string;
    estimatedYield: string;
    currentStock: string;
    quality: string;
  };
}

interface EspartoSummaryProps {
  data: EspartoData;
}

const getHealthColor = (health: number): string => {
  if (health >= 80) return "text-chloro";
  if (health >= 60) return "text-solar";
  return "text-red-500";
};

export const EspartoSummary = ({ data }: EspartoSummaryProps) => {
  const locale = getLocale("es");
  const t = locale.ui.espartoSummary;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Health Card */}
      <div className="bg-card border border-ink/20 p-5 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-4 border-b border-ink/10 pb-3">
          <div className="p-2 bg-chloro/10 border border-chloro/20 text-chloro">
            <Sprout className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-ink">{t.plantHealth}</h3>
        </div>
        <div>
          <p
            className={`font-mono text-4xl font-bold ${getHealthColor(data.general.health)} mb-1`}
          >
            {data.general.health}%
          </p>
          <p className="font-serif text-sm italic text-ink/60">
            {data.general.scientificName}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mt-3 pt-2 border-t border-ink/10">
            {t.nextHarvest}: {data.general.nextHarvest}
          </p>
        </div>
      </div>

      {/* Growth Card */}
      <div className="bg-card border border-ink/20 p-5 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-4 border-b border-ink/10 pb-3">
          <div className="p-2 bg-chloro/10 border border-chloro/20 text-chloro">
            <Leaf className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-ink">{t.growthStatus}</h3>
        </div>
        <div>
          <p className="font-mono text-lg font-bold text-ink mb-2">
            {data.growth.phase}
          </p>
          <div className="space-y-1 font-mono text-xs text-ink/70">
            <p>
              {t.height}: {data.growth.height}
            </p>
            <p>
              {t.density}: {data.growth.density}
            </p>
          </div>
          <p className="font-mono text-xs text-chloro font-bold mt-3 pt-2 border-t border-ink/10">
            +{data.growth.newShoots} {t.newShoots}
          </p>
        </div>
      </div>

      {/* Soil Card */}
      <div className="bg-card border border-ink/20 p-5 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-4 border-b border-ink/10 pb-3">
          <div className="p-2 bg-chloro/10 border border-chloro/20 text-chloro">
            <Droplets className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-ink">{t.soilCondition}</h3>
        </div>
        <div>
          <p className="font-mono text-lg font-bold text-ink mb-2">
            {data.soil.type}
          </p>
          <div className="font-mono text-xs text-ink/70">
            <p>
              {t.ph}: {data.soil.ph} • {t.moisture}: {data.soil.moisture}%
            </p>
          </div>
          <p className="font-mono text-xs text-chloro font-bold mt-3 pt-2 border-t border-ink/10">
            {t.nutrients}: {data.soil.nutrients}
          </p>
        </div>
      </div>

      {/* Harvest Card */}
      <div className="bg-card border border-ink/20 p-5 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-4 border-b border-ink/10 pb-3">
          <div className="p-2 bg-chloro/10 border border-chloro/20 text-chloro">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-ink">{t.harvest}</h3>
        </div>
        <div>
          <p className="font-mono text-lg font-bold text-solar mb-2">
            {data.harvest.nextDate}
          </p>
          <div className="space-y-1 font-mono text-xs text-ink/70">
            <p>
              {t.yield}: {data.harvest.estimatedYield}
            </p>
            <p>
              {t.stock}: {data.harvest.currentStock}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-ink/10">
            <span className="inline-block px-2 py-0.5 border border-chloro/30 bg-chloro/5 text-chloro font-mono text-[10px] uppercase font-bold">
              {t.quality}: {data.harvest.quality}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
