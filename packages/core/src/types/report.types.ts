// packages/core/src/types/report.types.ts

// ============================================================================
// Sicilia Soil — Reports & exports
// ----------------------------------------------------------------------------
// Reports are aggregates built from KPIs + operations + EO.
// They serve three audiences:
//   • Farm manager    → operational reports (weekly, monthly)
//   • Cooperative/advisor → comparative reports
//   • EU / grant      → EIP-AGRI practice abstracts, sustainability reports
//
// Design principles:
//   - Format-agnostic: one Report, many exporters (CSV, PDF, JSON, GeoJSON)
//   - Snapshot-based: a report is immutable once generated (with provenance)
//   - Scheduled or on-demand
//   - Multi-language (labels resolved at export time, not stored)
//   - EU-compliant: EIP-AGRI abstract format baked in
// ============================================================================

import type { SpatialTargetType } from "./spatial.types";
import type { DDSCriterion, KPIPeriod } from "./kpi.types";

// ----------------------------------------------------------------------------
// Report taxonomy
// ----------------------------------------------------------------------------

export type ReportType =
  | "operational_weekly" // what happened last week
  | "operational_monthly" // what happened last month
  | "seasonal_summary" // full season recap
  | "kpi_dashboard" // 5 DDS criteria snapshot
  | "field_observations" // observations by scope + period
  | "water_balance" // irrigation vs rainfall vs storage
  | "fertilisation_plan" // inputs vs needs
  | "protection_summary" // pests, diseases, treatments, losses
  | "yield_analysis" // harvest by species/plot, revenue
  | "efficiency_analysis" // kWh/kg, l/kg, hours/kg
  | "carbon_sequestration" // for EU carbon farming claims
  | "biodiversity_index" // species richness, beneficials
  | "custom"; // user-defined

export type ReportFormat = "json" | "csv" | "pdf" | "geojson" | "xlsx";

export type ReportStatus =
  | "queued"
  | "generating"
  | "ready"
  | "failed"
  | "expired";

// ----------------------------------------------------------------------------
// Report definition (template)
// ----------------------------------------------------------------------------

export interface ReportDefinition {
  id: string;
  key: string; // stable id, e.g. "water.balance.monthly"
  type: ReportType;
  label: string;
  description?: string;
  criteria: DDSCriterion[]; // which DDS criteria it covers
  /** What scope it applies to */
  applicableScopes: SpatialTargetType[];
  /** Supported export formats */
  formats: ReportFormat[];
  /** Period granularity recommended */
  defaultPeriod: KPIPeriod;
  /** Which KPIs it includes (by key) */
  kpiKeys?: string[];
  /** Which operation types it includes */
  operationTypes?: string[];
  /** Version of the template */
  version: number;
  builtin: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

// ----------------------------------------------------------------------------
// Report request (what the user asks for)
// ----------------------------------------------------------------------------

export interface ReportRequest {
  definitionKey: string;
  farmId: string;
  scopeType: SpatialTargetType;
  scopeId: string;
  period: KPIPeriod;
  periodStart: string; // ISO 8601
  periodEnd: string; // ISO 8601
  format: ReportFormat;
  /** Optional filters for custom reports */
  filters?: ReportFilter[];
  /** Override language for labels */
  locale?: string;
  /** Custom title / subtitle */
  titleOverride?: string;
  notes?: string;
}

export interface ReportFilter {
  field: string;
  operator: "eq" | "neq" | "in" | "between" | "gte" | "lte";
  value: unknown;
}

// ----------------------------------------------------------------------------
// Report (the generated artifact)
// ----------------------------------------------------------------------------

export interface Report {
  id: string;
  farmId: string;
  requestedBy: string; // userId
  definitionKey: string;
  definitionVersion: number;

  /** Scope + period the report covers */
  scopeType: SpatialTargetType;
  scopeId: string;
  scopeName?: string;
  period: KPIPeriod;
  periodStart: string;
  periodEnd: string;

  /** Status */
  status: ReportStatus;
  format: ReportFormat;

  /** Content */
  title: string;
  subtitle?: string;
  summary?: string; // executive summary (markdown)
  sections?: ReportSection[];

  /** File (when status === "ready") */
  fileUrl?: string;
  fileSizeBytes?: number;
  fileName?: string;

  /** Provenance */
  dataSnapshot: ReportSnapshot;
  generatedAt?: string;
  expiresAt?: string; // auto-cleanup

  /** Error, when status === "failed" */
  errorMessage?: string;

  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface ReportSection {
  id: string;
  title: string;
  /** Markdown or structured content */
  content?: string;
  tables?: ReportTable[];
  charts?: ReportChart[];
  kpis?: ReportKPI[];
  images?: ReportImage[];
}

export interface ReportTable {
  id: string;
  title?: string;
  columns: Array<{ key: string; label: string; unit?: string }>;
  rows: Array<Record<string, unknown>>;
  footnote?: string;
}

export interface ReportChart {
  id: string;
  title?: string;
  kind: "line" | "bar" | "area" | "scatter" | "heatmap" | "map";
  series: Array<{
    name: string;
    points: Array<{ x: string | number; y: number }>;
  }>;
  axis?: { xLabel?: string; yLabel?: string };
}

export interface ReportKPI {
  key: string;
  label: string;
  value: number;
  unit: string;
  status?: "good" | "watch" | "alert" | "critical" | "unknown";
  target?: number;
  trend?: "improving" | "stable" | "worsening";
}

export interface ReportImage {
  id: string;
  url: string;
  caption?: string;
  sourceType?: "eo_ndvi" | "eo_rgb" | "photo" | "chart" | "map";
  capturedAt?: string;
}

/**
 * Provenance — what data was used to build this report.
 * Needed for EU compliance (audit + reproducibility).
 */
export interface ReportSnapshot {
  kpiRecordIds?: string[];
  operationCount?: number;
  eoSceneIds?: string[];
  sensorReadingCount?: number;
  sourceDateRange: { from: string; to: string };
  computedAt: string;
  engineVersion: string;
}

// ----------------------------------------------------------------------------
// EIP-AGRI practice abstract (EU-specific format)
// ----------------------------------------------------------------------------

/**
 * The EIP-AGRI "practice abstract" is a 2-page summary that must follow
 * the EU common format. Required by Nostradamus (DEL 4.3) and Horizon Europe.
 */
export interface EIPAgriAbstract {
  id: string;
  farmId: string;
  author: string; // userId
  title: string;
  subtitle?: string;

  /** Standard sections (per EU template) */
  problemStatement: string; // max ~500 chars
  solutionDescription: string; // max ~1000 chars
  keyResults: string[]; // 3-5 bullets with quantified outcomes
  practicalRecommendations: string[];

  /** Metadata */
  keywords: string[];
  targetAudience: string[]; // ["farmers", "advisors", ...]
  sectors: string[]; // ["cereals", "olive", ...]
  country: string; // ISO 3166-1 alpha-2
  languages: string[]; // e.g. ["en", "it"]

  /** Visuals */
  heroImageUrl?: string;
  logoUrl?: string;

  /** Reference to the source report */
  reportId?: string;

  /** Status */
  status: "draft" | "submitted" | "published";
  publishedUrl?: string; // EU-FarmBook link

  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------------------------------
// Scheduled reports
// ----------------------------------------------------------------------------

export type ScheduleFrequency =
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "seasonal"
  | "yearly";

export interface ScheduledReport {
  id: string;
  farmId: string;
  definitionKey: string;
  scopeType: SpatialTargetType;
  scopeId: string;
  frequency: ScheduleFrequency;
  /** Send at this hour (local time, HH:MM) */
  sendAt?: string;
  /** Day of week (0=Sunday) for weekly, day of month for monthly */
  dayOfPeriod?: number;
  format: ReportFormat;
  recipients: string[]; // emails or userIds
  channels: Array<"email" | "in_app">;
  active: boolean;
  lastRunAt?: string;
  nextRunAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

// ----------------------------------------------------------------------------
// Lookups
// ----------------------------------------------------------------------------

export type ReportId = Report["id"];
export type ReportDefinitionId = ReportDefinition["id"];
export type EIPAgriAbstractId = EIPAgriAbstract["id"];
export type ScheduledReportId = ScheduledReport["id"];
