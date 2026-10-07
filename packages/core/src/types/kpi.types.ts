// packages/core/src/types/kpi.types.ts

// ============================================================================
// Sicilia Soil — KPIs
// ----------------------------------------------------------------------------
// Precomputed KPI values for the dashboard, reports and grant deliverables.
//
// Architecture:
//   KPIDefinition  → the "what" (formula, unit, target)
//   KPIRecord      → the "value" (computed, timestamped, scoped)
//
// Design principles:
//   - Scope-polymorphic: any KPI applies to farm / zone / plot / bed
//   - Period-aware: daily / weekly / monthly / quarterly / yearly / custom
//   - Versioned: KPIs evolve; old records keep their own definition version
//   - Traceable: every record links back to its source operations
//   - DDS-mapped: each definition declares which of the 5 criteria it serves
// ============================================================================

import type { SpatialTargetType } from "./spatial.types";

// ----------------------------------------------------------------------------
// DDS criteria (the 5 pillars)
// ----------------------------------------------------------------------------

/**
 * The 5 DDS criteria. Every KPI serves at least one.
 */
export type DDSCriterion =
  | "water" // 1. Optimizar uso del agua
  | "fertilisation" // 2. Mejorar estrategias de fertilización
  | "protection" // 3. Optimizar protección de cultivos
  | "efficiency" // 4. Mejorar eficiencia de recursos y energía
  | "decisions"; // 5. Toma de decisiones basadas en datos

// ----------------------------------------------------------------------------
// KPI metadata
// ----------------------------------------------------------------------------

export type KPIUnit =
  | "kg"
  | "g"
  | "t"
  | "l"
  | "m3"
  | "ml"
  | "kwh"
  | "mj"
  | "eur"
  | "hours"
  | "person_hours"
  | "percent"
  | "ratio" // dimensionless ratio (e.g. kg/kWh)
  | "index" // 0-100 score
  | "count"
  | "m2"
  | "ha"
  | "kg_per_ha"
  | "kg_per_m2"
  | "kg_per_kwh"
  | "kg_per_l"
  | "l_per_kg"
  | "l_per_m2"
  | "l_per_ha"
  | "kwh_per_kg"
  | "kwh_per_m2"
  | "kwh_per_ha"
  | "eur_per_kg"
  | "eur_per_ha"
  | "days";

export type KPIDirection =
  | "higher_is_better" // e.g. yield per hectare
  | "lower_is_better" // e.g. water per kg produced
  | "target_range"; // e.g. pH around 6.5

export type KPIAggregation =
  | "sum"
  | "average"
  | "min"
  | "max"
  | "median"
  | "count"
  | "ratio" // numerator / denominator
  | "index"; // composite score

/**
 * Metadata for a KPI. Lives in code (static) — describes how to compute it.
 */
export interface KPIDefinition {
  key: string; // stable id, e.g. "water.efficiency.l_per_kg"
  label: string; // human-readable, e.g. "Agua por kg producido"
  description?: string;
  criteria: DDSCriterion[]; // which DDS criteria it serves
  unit: KPIUnit;
  direction: KPIDirection;
  aggregation: KPIAggregation;

  /** Optional target for "is this good?" */
  target?: {
    value?: number;
    min?: number;
    max?: number;
    ideal?: number;
    note?: string;
  };

  /** How the value is computed — reference only, not runtime. */
  formula?: string; // e.g. "SUM(irrigations.liters) / SUM(harvests.kg)"

  /** Version of the definition — bump when formula changes. */
  version: number;

  /** Which scopes this KPI makes sense for. */
  applicableScopes: SpatialTargetType[];

  /** Is it global to the platform, or farm-specific? */
  builtin: boolean;
}

// ----------------------------------------------------------------------------
// KPI record (the computed value)
// ----------------------------------------------------------------------------

export type KPIPeriod =
  | "hour"
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year"
  | "season"
  | "custom";

export type KPIStatus =
  | "good" // within target
  | "watch" // approaching threshold
  | "alert" // outside target, action recommended
  | "critical" // urgent
  | "unknown"; // not enough data

/**
 * A single computed KPI value for a scope + period.
 */
export interface KPIRecord {
  id: string;
  farmId: string;

  /** Which KPI (links to a KPIDefinition.key) */
  kpiKey: string;
  kpiVersion: number; // definition version at compute time

  /** Where it applies */
  scopeType: SpatialTargetType;
  scopeId: string;

  /** When it applies */
  period: KPIPeriod;
  periodStart: string; // ISO 8601
  periodEnd: string;

  /** The value */
  value: number;
  unit: KPIUnit;
  status: KPIStatus;

  /** Optional: comparison vs target or previous period */
  targetValue?: number;
  previousValue?: number;
  deltaPercent?: number;
  trend?: "improving" | "stable" | "worsening";

  /** Optional breakdown (e.g. contributions from sub-scopes) */
  breakdown?: KPIBreakdownItem[];

  /** Provenance: what data went into this number */
  sourceOperationCount?: number;
  sourceOperationTypes?: string[]; // e.g. ["irrigation", "harvest"]
  computedAt: string; // ISO 8601
  computedBy?: string; // "system" | userId

  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface KPIBreakdownItem {
  scopeType: SpatialTargetType;
  scopeId: string;
  scopeName?: string;
  value: number;
  sharePercent?: number; // contribution to the total
}

// ----------------------------------------------------------------------------
// KPI dashboard shapes
// ----------------------------------------------------------------------------

/**
 * A KPI card — the minimum needed to render a dashboard tile.
 */
export interface KPICard {
  kpiKey: string;
  label: string;
  value: number;
  unit: KPIUnit;
  status: KPIStatus;
  trend?: "improving" | "stable" | "worsening";
  deltaPercent?: number;
  period: KPIPeriod;
  scopeType: SpatialTargetType;
  scopeId: string;
  lastUpdated: string;
}

/**
 * A dashboard snapshot: the KPIs for one scope in one period.
 */
export interface KPIDashboard {
  scopeType: SpatialTargetType;
  scopeId: string;
  scopeName: string;
  period: KPIPeriod;
  periodStart: string;
  periodEnd: string;
  criteria: Record<DDSCriterion, KPICard[]>;
  generatedAt: string;
}

// ----------------------------------------------------------------------------
// KPI registry (builtin keys — canonical names)
// ----------------------------------------------------------------------------

/**
 * Built-in KPI keys. Not exhaustive — farms can define custom KPIs.
 * These cover the 5 DDS criteria for the base implementation.
 */
export type BuiltinKPIKey =
  // --- 1. Water ---
  | "water.efficiency.l_per_kg" // litros por kg producido
  | "water.efficiency.l_per_m2" // litros por m² cultivado
  | "water.rain_vs_irrigation.ratio" // % de agua de lluvia vs riego
  | "water.soil_moisture.avg" // humedad media del suelo (%)
  | "water.retention.index" // índice de retención hídrica (0-100)

  // --- 2. Fertilisation ---
  | "fert.inputs.kg_per_m2" // kg de insumos por m²
  | "fert.organic_matter.percent" // % de materia orgánica
  | "fert.npk.balance" // balance N-P-K (entradas vs extracción)
  | "fert.compost.kg_per_m2" // kg de compost por m²
  | "fert.cn_ratio.avg" // relación C:N media

  // --- 3. Protection ---
  | "prot.pest.incidence.percent" // % de plantas afectadas por plaga
  | "prot.disease.incidence.percent" // % de plantas afectadas por enfermedad
  | "prot.losses.percent" // % de pérdida estimada de cosecha
  | "prot.beneficials.count" // nº de observaciones de fauna útil
  | "prot.treatment.frequency" // nº de tratamientos por mes

  // --- 4. Efficiency ---
  | "eff.energy.kwh_per_kg" // kWh por kg producido
  | "eff.labour.hours_per_kg" // horas de trabajo por kg
  | "eff.fuel.l_per_ha" // litros de combustible por hectárea
  | "eff.yield.kg_per_m2" // rendimiento por m²
  | "eff.eroi.ratio" // energy return on investment

  // --- 5. Decisions ---
  | "dec.recommendations.adoption" // % de recomendaciones ejecutadas
  | "dec.data_coverage.percent" // % de operaciones con datos estructurados
  | "dec.response_time.hours" // tiempo medio de respuesta a alertas
  | "dec.observations.frequency" // nº de observaciones por semana
  | "dec.soil_health.index" // índice global de salud del suelo (0-100)

  // --- Cross-cutting ---
  | "global.sustainability.score" // score compuesto 0-100
  | "global.carbon.sequestration_kg" // kg de CO2 eq secuestrados
  | "global.biodiversity.index"; // índice de biodiversidad (0-100)

// ----------------------------------------------------------------------------
// KPI computation request (for backend)
// ----------------------------------------------------------------------------

export interface KPIComputeRequest {
  farmId: string;
  scopeType: SpatialTargetType;
  scopeId: string;
  kpiKeys?: string[]; // empty = all applicable
  period: KPIPeriod;
  periodStart: string;
  periodEnd: string;
  /** Force recompute even if cached */
  force?: boolean;
}

export interface KPIComputeResult {
  scopeType: SpatialTargetType;
  scopeId: string;
  period: KPIPeriod;
  periodStart: string;
  periodEnd: string;
  records: KPIRecord[];
  computedAt: string;
  errors?: { kpiKey: string; message: string }[];
}

// ----------------------------------------------------------------------------
// Lookups
// ----------------------------------------------------------------------------

export type KPIRecordId = KPIRecord["id"];
export type KPIKey = string;
