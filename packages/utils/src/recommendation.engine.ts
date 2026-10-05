import {
  RECOMMENDATION_RULES,
  type RecommendationItem,
  type RecommendationRuleInput,
  type RecommendationTopic,
} from "@sicilia-soil/core";

export function generateRecommendations(
  input: RecommendationRuleInput,
): RecommendationItem[] {
  const results: RecommendationItem[] = [];

  for (const rule of RECOMMENDATION_RULES) {
    const result = rule.evaluate(input);
    if (result) results.push(result);
  }

  return sortByPriority(results);
}

export function filterByTopic(
  recommendations: RecommendationItem[],
  topic: RecommendationTopic,
): RecommendationItem[] {
  return recommendations.filter((r) => r.topic === topic);
}

export function filterByMinPriority(
  recommendations: RecommendationItem[],
  minPriority: "info" | "low" | "medium" | "high" | "urgent",
): RecommendationItem[] {
  const order: Record<string, number> = {
    urgent: 5,
    high: 4,
    medium: 3,
    low: 2,
    info: 1,
  };
  const min = order[minPriority];
  return recommendations.filter((r) => order[r.priority] >= min);
}

function sortByPriority(
  recommendations: RecommendationItem[],
): RecommendationItem[] {
  const order: Record<string, number> = {
    urgent: 5,
    high: 4,
    medium: 3,
    low: 2,
    info: 1,
  };
  return [...recommendations].sort((a, b) => {
    const p = order[b.priority] - order[a.priority];
    if (p !== 0) return p;
    return b.confidence - a.confidence;
  });
}

export function countByPriority(
  recommendations: RecommendationItem[],
): Record<string, number> {
  const counts: Record<string, number> = {
    urgent: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0,
  };
  for (const r of recommendations) {
    counts[r.priority] = (counts[r.priority] ?? 0) + 1;
  }
  return counts;
}
