"use client";

import { useMemo, useState } from "react";
import type {
  RecommendationItem,
  RecommendationPriority,
} from "@sicilia-soil/core";
import { getLocale } from "@sicilia-soil/core";
import { RecommendationCard } from "./RecommendationCard";
import { Button, DataCard } from "@sicilia-soil/ui";

type TopicFilter = "all" | "soil" | "water";
type PriorityFilter = "all" | RecommendationPriority;

interface RecommendationsListProps {
  recommendations: RecommendationItem[];
  onAction?: (id: string) => void;
  highlightId?: string | null; // <-- AÑADIDO
}

const PRIORITY_ORDER: Record<RecommendationPriority, number> = {
  urgent: 5,
  high: 4,
  medium: 3,
  low: 2,
  info: 1,
};

export function RecommendationsList({
  recommendations,
  onAction,
  highlightId, // <-- AÑADIDO
}: RecommendationsListProps) {
  const locale = getLocale("es");
  const t = locale.ui.recommendations;
  const [topicFilter, setTopicFilter] = useState<TopicFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");

  const filtered = useMemo(() => {
    return recommendations
      .filter((r) => topicFilter === "all" || r.topic === topicFilter)
      .filter((r) => priorityFilter === "all" || r.priority === priorityFilter)
      .sort((a, b) => {
        const p = PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
        return p !== 0 ? p : b.confidence - a.confidence;
      });
  }, [recommendations, topicFilter, priorityFilter]);

  const counts = useMemo(
    () => ({
      total: recommendations.length,
      urgent: recommendations.filter((r) => r.priority === "urgent").length,
      soil: recommendations.filter((r) => r.topic === "soil").length,
      water: recommendations.filter((r) => r.topic === "water").length,
    }),
    [recommendations],
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <DataCard className="p-4 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-bold text-ink/50 uppercase tracking-wider">
            {t.topic}:
          </span>
          {(["all", "soil", "water"] as TopicFilter[]).map((topic) => (
            <Button
              key={topic}
              variant="bare"
              size="none"
              onClick={() => setTopicFilter(topic)}
              className={`!rounded-none hover:!scale-100 px-3 py-1 font-mono text-xs uppercase tracking-wider font-bold border transition-colors ${
                topicFilter === topic
                  ? "bg-ink text-paper border-ink"
                  : "bg-transparent text-ink/60 border-ink/20 hover:bg-paper"
              }`}
            >
              {t[topic as keyof typeof t]} (
              {topic === "all"
                ? counts.total
                : topic === "soil"
                  ? counts.soil
                  : counts.water}
              )
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-bold text-ink/50 uppercase tracking-wider">
            {t.priority}:
          </span>
          {(
            [
              "all",
              "urgent",
              "high",
              "medium",
              "low",
              "info",
            ] as PriorityFilter[]
          ).map((p) => (
            <Button
              key={p}
              variant="bare"
              size="none"
              onClick={() => setPriorityFilter(p)}
              className={`!rounded-none hover:!scale-100 px-3 py-1 font-mono text-xs uppercase tracking-wider font-bold border transition-colors ${
                priorityFilter === p
                  ? "bg-ink text-paper border-ink"
                  : "bg-transparent text-ink/60 border-ink/20 hover:bg-paper"
              }`}
            >
              {t[p as keyof typeof t]}
            </Button>
          ))}
        </div>

        {counts.urgent > 0 && (
          <span className="ml-auto font-mono text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-1 bg-red-500/10 px-2 py-1 border border-red-500/20">
            ⚠️ {t.urgentCount.replace("{count}", String(counts.urgent))}
          </span>
        )}
      </DataCard>

      {/* List */}
      {filtered.length === 0 ? (
        <DataCard className="p-12 text-center bg-card">
          <p className="font-mono text-sm uppercase tracking-widest text-ink/40">
            {t.empty}
          </p>
        </DataCard>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((rec) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              onAction={onAction}
              highlightId={highlightId} // <-- LO PASAMOS AQUÍ
            />
          ))}
        </div>
      )}
    </div>
  );
}
