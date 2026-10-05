"use client";

import { useMemo, useState } from "react";
import type {
  RecommendationItem,
  RecommendationPriority,
} from "@sicilia-soil/core";
import { RecommendationCard } from "./RecommendationCard";

type TopicFilter = "all" | "soil" | "water";
type PriorityFilter = "all" | RecommendationPriority;

interface RecommendationsListProps {
  recommendations: RecommendationItem[];
  onAction?: (id: string) => void;
}

const PRIORITY_ORDER: Record<RecommendationPriority, number> = {
  urgent: 5,
  high: 4,
  medium: 3,
  low: 2,
  info: 1,
};

const TOPIC_LABELS: Record<TopicFilter, string> = {
  all: "Todos",
  soil: "Suelo",
  water: "Agua",
};

const PRIORITY_LABELS: Record<PriorityFilter, string> = {
  all: "Todas",
  urgent: "Urgente",
  high: "Alta",
  medium: "Media",
  low: "Baja",
  info: "Info",
};

export function RecommendationsList({
  recommendations,
  onAction,
}: RecommendationsListProps) {
  const [topicFilter, setTopicFilter] = useState<TopicFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");

  const filtered = useMemo(() => {
    return recommendations
      .filter((r) => topicFilter === "all" || r.topic === topicFilter)
      .filter((r) => priorityFilter === "all" || r.priority === priorityFilter)
      .sort((a, b) => {
        const p = PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
        if (p !== 0) return p;
        return b.confidence - a.confidence;
      });
  }, [recommendations, topicFilter, priorityFilter]);

  const counts = useMemo(() => {
    return {
      total: recommendations.length,
      urgent: recommendations.filter((r) => r.priority === "urgent").length,
      soil: recommendations.filter((r) => r.topic === "soil").length,
      water: recommendations.filter((r) => r.topic === "water").length,
    };
  }, [recommendations]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-oliveGreen/15 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-oliveGreen/60 uppercase tracking-wider">
            Tema:
          </span>
          {(["all", "soil", "water"] as TopicFilter[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopicFilter(t)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                topicFilter === t
                  ? "bg-oliveGreen text-offWhite"
                  : "bg-oliveGreen/10 text-oliveGreen hover:bg-oliveGreen/20"
              }`}
            >
              {t === "all"
                ? `${TOPIC_LABELS[t]} (${counts.total})`
                : `${TOPIC_LABELS[t]} (${counts[t]})`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-oliveGreen/60 uppercase tracking-wider">
            Prioridad:
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
            <button
              key={p}
              type="button"
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                priorityFilter === p
                  ? "bg-oliveGreen text-offWhite"
                  : "bg-oliveGreen/10 text-oliveGreen hover:bg-oliveGreen/20"
              }`}
            >
              {PRIORITY_LABELS[p]}
            </button>
          ))}
        </div>

        {counts.urgent > 0 && (
          <span className="ml-auto text-xs font-medium text-red-600 flex items-center gap-1">
            ⚠️ {counts.urgent} urgente{counts.urgent > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-oliveGreen/15 text-center">
          <p className="text-oliveGreen/60">
            No hay recomendaciones que coincidan con los filtros seleccionados.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((rec) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              onAction={onAction}
            />
          ))}
        </div>
      )}
    </div>
  );
}
