// packages/core/src/types/alerts.types.ts

// ============================================================================
// Sicilia Soil — Alerts engine
// ----------------------------------------------------------------------------
// Alerts are the OUTPUT of KPI/EO/sensor evaluation.
// Flow:  data → rule → alert → notification → (optional) task
//
// Design principles:
//   - Rule-based: an AlertRule defines WHEN to fire
//   - Instance-based: an Alert is a specific firing (with timestamp, context)
//   - De-duplicated: same rule can't fire repeatedly for the same subject
//   - Escalating: severity can rise if unresolved
//   - Channel-agnostic: email, push, SMS, in-app — all fit
//   - Polymorphic: alert applies to any spatial scope
// ============================================================================

import type { SpatialTargetType } from "./spatial.types";
import type { DDSCriterion } from "./kpi.types";

// ----------------------------------------------------------------------------
// Severity & lifecycle
// ----------------------------------------------------------------------------

export type AlertSeverity = "info" | "warning" | "alert" | "critical";

export type AlertStatus =
  | "open" // just fired, nobody has seen it
  | "acknowledged" // user saw it, not resolved yet
  | "in_progress" // someone is acting on it
  | "resolved" // issue fixed
  | "dismissed" // user deemed it not relevant
  | "expired"; // auto-closed after N days

// ----------------------------------------------------------------------------
// Rule definition (static, lives in code or DB)
// ----------------------------------------------------------------------------

export type AlertConditionOperator =
  | "lt"
  | "lte"
  | "gt"
  | "gte"
  | "eq"
  | "neq"
  | "between"
  | "outside"
  | "change_gt"
  | "change_lt" // delta vs previous
  | "trend_up"
  | "trend_down"; // N consecutive periods

export type AlertMetricSource =
  | "kpi" // KPI record
  | "eo_index" // NDVI, NDWI, SSM, LST, ...
  | "sensor" // IoT sensor reading
  | "observation" // manual observation
  | "weather"; // forecast / meteo

export interface AlertCondition {
  /** Where the value comes from */
  source: AlertMetricSource;
  /** Key within that source (e.g. "water.efficiency.l_per_kg" for KPI, "NDVI" for EO) */
  metricKey: string;
  /** Comparison */
  operator: AlertConditionOperator;
  /** Threshold(s) — number or [min, max] for "between" */
  threshold: number | [number, number];
  /** Optional: consecutive periods required to fire */
  forPeriods?: number;
  /** Optional: evaluate only within a season/month window */
  season?: string;
}

export interface AlertRule {
  id: string;
  farmId?: string; // null = builtin, applies to all farms
  key: string; // stable id, e.g. "water.stress.critical"
  label: string;
  description?: string;
  criteria: DDSCriterion[]; // which DDS criteria it serves
  /** What scope(s) this rule can be evaluated on */
  applicableScopes: SpatialTargetType[];
  /** Logic */
  conditions: AlertCondition[]; // all must be true (AND)
  /** Escalation */
  baseSeverity: AlertSeverity;
  escalateAfterHours?: number; // bump severity if not resolved
  escalatedSeverity?: AlertSeverity;
  /** Lifecycle */
  autoResolveAfterHours?: number; // auto-close if condition no longer true
  /** Suggested action */
  suggestedAction?: string; // plain text
  suggestedTaskType?: string; // e.g. "irrigate", "treat"
  /** Version */
  version: number;
  builtin: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

// ----------------------------------------------------------------------------
// Alert instance (fires when rule triggers)
// ----------------------------------------------------------------------------

export interface Alert {
  id: string;
  farmId: string;
  ruleId: string;
  ruleKey: string; // denormalized for quick filtering
  ruleVersion: number;

  /** Where it applies */
  scopeType: SpatialTargetType;
  scopeId: string;
  scopeName?: string; // denormalized for display

  /** Severity + status */
  severity: AlertSeverity;
  status: AlertStatus;

  /** Human-readable content (generated at fire time) */
  title: string;
  message: string;

  /** The data that triggered it */
  trigger: {
    metricKey: string;
    source: AlertMetricSource;
    observedValue: number;
    threshold: number | [number, number];
    operator: AlertConditionOperator;
    unit?: string;
  };

  /** Lifecycle timestamps */
  firedAt: string;
  acknowledgedAt?: string;
  acknowledgedBy?: string; // userId
  resolvedAt?: string;
  resolvedBy?: string;
  resolvedNote?: string;
  dismissedAt?: string;
  dismissedBy?: string;
  dismissedReason?: string;
  expiresAt?: string;

  /** Suggested action */
  suggestedAction?: string;
  suggestedTaskType?: string;
  /** Link to the task it created (if user accepted) */
  resultingTaskId?: string;

  /** Deduplication: fingerprint to avoid firing the same alert twice */
  fingerprint: string; // hash(ruleKey + scopeType + scopeId)

  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------------------------------
// Notification channels
// ----------------------------------------------------------------------------

export type AlertChannel = "in_app" | "email" | "push" | "sms" | "webhook";

export interface AlertSubscription {
  id: string;
  userId: string;
  farmId: string;
  /** null = all rules */
  ruleKeys?: string[];
  /** null = all severities */
  severities?: AlertSeverity[];
  /** Which channels to notify on */
  channels: AlertChannel[];
  /** Quiet hours — ISO 8601 local time, e.g. ["22:00", "07:00"] */
  quietHours?: [string, string];
  /** Digest mode: send a batch instead of each alert */
  digestMode?: "off" | "hourly" | "daily" | "weekly";
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AlertDelivery {
  id: string;
  alertId: string;
  subscriptionId: string;
  channel: AlertChannel;
  /** When it was sent */
  sentAt?: string;
  /** When it was delivered (if provider confirms) */
  deliveredAt?: string;
  /** Read receipt */
  readAt?: string;
  /** Failure info */
  status: "queued" | "sent" | "delivered" | "failed" | "bounced";
  errorMessage?: string;
  attemptCount: number;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Alert inbox (dashboard shapes)
// ----------------------------------------------------------------------------

export interface AlertSummary {
  total: number;
  bySeverity: Record<AlertSeverity, number>;
  unreadCount: number;
  openCount: number;
  criticalCount: number;
  lastFiredAt?: string;
}

export interface AlertFilter {
  farmId: string;
  scopeType?: SpatialTargetType;
  scopeId?: string;
  severity?: AlertSeverity[];
  status?: AlertStatus[];
  ruleKeys?: string[];
  criteria?: DDSCriterion[];
  from?: string;
  to?: string;
}

// ----------------------------------------------------------------------------
// Lookups
// ----------------------------------------------------------------------------

export type AlertId = Alert["id"];
export type AlertRuleId = AlertRule["id"];
export type AlertSubscriptionId = AlertSubscription["id"];
