// packages/core/src/types/operations.types.ts

// ============================================================================
// Sicilia Soil — Farm operations
// ----------------------------------------------------------------------------
// Everything that HAPPENS on the farm: observations, inputs, irrigations,
// harvests, treatments, tasks, resource consumption.
//
// These tables feed the 5 DDS criteria:
//   1. Water efficiency      → irrigations, water resources
//   2. Fertilisation         → inputs, treatments
//   3. Crop protection       → observations (pests/disease), treatments
//   4. Resource efficiency   → resources, tasks, harvests
//   5. Data-driven decisions → everything above, aggregated as KPIs
//
// Design principles:
//   - Polymorphic target: any operation can point to farm/zone/plot/bed/plant
//   - Append-only: corrections create new records, not edits (audit trail)
//   - Cost-aware: time, money, water, energy, labour all tracked
//   - Photo/receipt ready: attachments via URL
//   - i18n-friendly: free text notes in any language; enums in English
// ============================================================================

import type { SpatialTargetType } from "./spatial.types";

// ----------------------------------------------------------------------------
// Polymorphic target (shared by all operations)
// ----------------------------------------------------------------------------

export interface OperationTarget {
  type: SpatialTargetType;
  id: string;
}

export interface OperationBase {
  id: string;
  farmId: string;
  target: OperationTarget;
  performedAt: string; // ISO 8601 UTC
  performedBy?: string; // userId
  notes?: string;
  photoUrls?: string[];
  attachments?: Attachment[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface Attachment {
  id: string;
  url: string;
  mimeType: string;
  sizeBytes?: number;
  label?: string;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// 1. OBSERVATION — criterio 3 (protección) + 5 (decisiones)
// ----------------------------------------------------------------------------

export type ObservationType =
  | "pest" // plaga detectada
  | "disease" // enfermedad detectada
  | "weed" // mala hierba
  | "deficiency" // carencia nutricional
  | "toxicity" // exceso / fitotoxicidad
  | "growth" // estadio fenológico
  | "phenology" // floración, fructificación
  | "damage" // daño mecánico, granizo, helada
  | "mortality" // muerte de planta
  | "beneficial" // presencia de fauna útil
  | "soil" // observación de suelo (estructura, color, olor)
  | "water" // observación hídrica (encharcamiento, sequía)
  | "general"; // observación libre

export type ObservationSeverity =
  | "none"
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface Observation extends OperationBase {
  type: ObservationType;
  severity: ObservationSeverity;
  /** Affected area / count (optional) */
  affectedAreaM2?: number;
  affectedPlants?: number;
  /** Species involved (pest, disease, beneficial) */
  speciesId?: string; // FK → Species (biological agent)
  scientificName?: string; // for unclassified agents
  /** Confidence in diagnosis (0-100) */
  confidencePercent?: number;
  /** Phenological stage at observation */
  phenologyStage?: string; // e.g. "BBCH 65"
  /** Actions taken / suggested */
  actionTaken?: string;
  actionRequired?: boolean;
}

// ----------------------------------------------------------------------------
// 2. INPUT — criterio 2 (fertilización)
// ----------------------------------------------------------------------------

export type InputType =
  | "compost"
  | "manure"
  | "mulch"
  | "biochar"
  | "wood_chips"
  | "straw"
  | "green_manure"
  | "biofertilizer"
  | "mineral_fertilizer"
  | "rock_dust"
  | "ash"
  | "lime"
  | "gypsum"
  | "seaweed"
  | "humic_acid"
  | "mycorrhizal_inoculum"
  | "effective_microorganisms"
  | "other";

export type InputUnit = "kg" | "t" | "l" | "m3" | "unit";

export interface Input extends OperationBase {
  type: InputType;
  quantity: number;
  unit: InputUnit;
  /** NPK declared (if applicable) — percent of dry weight */
  nitrogenPercent?: number;
  phosphorusPercent?: number;
  potassiumPercent?: number;
  /** Organic matter content (%) */
  organicMatterPercent?: number;
  /** Carbon:nitrogen ratio */
  cnRatio?: number;
  /** Cost */
  costEur?: number;
  /** Supplier / source */
  supplier?: string;
  batchNumber?: string;
}

// ----------------------------------------------------------------------------
// 3. IRRIGATION — criterio 1 (agua)
// ----------------------------------------------------------------------------

export type IrrigationSource =
  | "rain"
  | "well"
  | "municipal"
  | "greywater"
  | "reservoir"
  | "pond"
  | "river"
  | "canal"
  | "desalinated"
  | "other";

export type IrrigationMethod =
  | "drip"
  | "sprinkler"
  | "micro_sprinkler"
  | "furrow"
  | "flood"
  | "manual"
  | "swale"
  | "ollas"
  | "wicking"
  | "hydroponic"
  | "other";

export interface Irrigation extends OperationBase {
  source: IrrigationSource;
  method: IrrigationMethod;
  volumeLiters: number;
  durationMinutes?: number;
  /** Energy used to pump (kWh) */
  energyKwh?: number;
  /** Water quality (if measured) */
  ph?: number;
  ecDsM?: number; // electrical conductivity
  /** Trigger: was this irrigation decision data-driven? */
  triggeredBy?: "manual" | "sensor" | "schedule" | "forecast" | "rule_engine";
}

// ----------------------------------------------------------------------------
// 4. HARVEST — criterio 4 (eficiencia) + 5 (decisiones)
// ----------------------------------------------------------------------------

export type HarvestDestination =
  | "self_consumption"
  | "market"
  | "restaurant"
  | "cooperative"
  | "seed"
  | "community"
  | "processing"
  | "waste"
  | "other";

export type HarvestQuality = "premium" | "standard" | "second" | "waste";

export interface Harvest extends OperationBase {
  /** Which species / plant was harvested (optional for mixed beds) */
  speciesId?: string;
  plantId?: string;
  quantity: number;
  unit: "kg" | "g" | "l" | "unit";
  quality: HarvestQuality;
  destination: HarvestDestination;
  /** Revenue if sold */
  revenueEur?: number;
  /** Processing cost (if any) */
  costEur?: number;
  /** Storage info */
  storageLocation?: string;
  storageUntil?: string;
}

// ----------------------------------------------------------------------------
// 5. TREATMENT — criterio 2 (fertilización) + 3 (protección)
// ----------------------------------------------------------------------------

export type TreatmentType =
  | "purin" // fermented plant extract
  | "compost_tea"
  | "biodynamic_prep"
  | "neem_oil"
  | "sulfur"
  | "copper"
  | "potassium_bicarbonate"
  | "bacillus_thuringiensis"
  | "beneficial_insects" // release of predators
  | "pheromone" // mating disruption
  | "trap" // physical trap
  | "manual_removal"
  | "biological_control"
  | "mineral_oil"
  | "pyrethrum"
  | "other";

export type TreatmentTarget =
  | "pest"
  | "disease"
  | "weed"
  | "deficiency"
  | "general";

export interface Treatment extends OperationBase {
  type: TreatmentType;
  treatmentTarget: TreatmentTarget;
  /** What product was applied (name / brand / homemade) */
  productName?: string;
  concentration?: number;
  concentrationUnit?: string; // e.g. "%", "ml/l", "g/l"
  volumeApplied?: number;
  volumeUnit?: string;
  /** Effectiveness rating (self-assessed after 3-7 days) */
  effectiveness?: "ineffective" | "partial" | "effective" | "excellent";
  effectivenessCheckedAt?: string;
  costEur?: number;
}

// ----------------------------------------------------------------------------
// 6. TASK — criterio 4 (eficiencia) + 5 (decisiones)
// ----------------------------------------------------------------------------

export type TaskType =
  | "plant"
  | "transplant"
  | "prune"
  | "mulch"
  | "chop_and_drop" // syntropic pruning
  | "weed"
  | "harvest"
  | "irrigate"
  | "fertilize"
  | "treat"
  | "observe"
  | "sample"
  | "measure"
  | "repair"
  | "install"
  | "inspect"
  | "general";

export type TaskStatus =
  | "planned"
  | "in_progress"
  | "completed"
  | "skipped"
  | "cancelled";

export type TaskPriority = "low" | "normal" | "high" | "urgent";

export interface Task extends OperationBase {
  type: TaskType;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  /** Scheduling */
  dueAt?: string;
  startedAt?: string;
  completedAt?: string;
  estimatedDurationMin?: number;
  actualDurationMin?: number;
  /** Who is assigned (nullable = unassigned) */
  assignedTo?: string; // userId
  /** Link to the operation it produced (e.g. the Harvest that came out) */
  resultingOperationId?: string;
  /** Recurring? */
  recurrenceRule?: string; // iCal RRULE
  /** Cost tracking */
  costEur?: number;
  /** From recommendation engine? */
  fromRecommendationId?: string;
}

// ----------------------------------------------------------------------------
// 7. RESOURCE — criterio 4 (eficiencia energética y de recursos)
// ----------------------------------------------------------------------------

export type ResourceType =
  | "water"
  | "electricity"
  | "fuel_diesel"
  | "fuel_petrol"
  | "gas"
  | "propane"
  | "labour"
  | "machinery_hours"
  | "transport"
  | "consumables"
  | "other";

export interface ResourceUsage {
  id: string;
  farmId: string;
  /** Which operation consumed it (optional — can be standalone) */
  operationType?:
    | "observation"
    | "input"
    | "irrigation"
    | "harvest"
    | "treatment"
    | "task";
  operationId?: string;
  /** Target (optional) */
  target?: OperationTarget;
  resourceType: ResourceType;
  quantity: number;
  unit: string; // "kWh", "l", "h", "person_hour", "km"
  costEur?: number;
  occurredAt: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

// ----------------------------------------------------------------------------
// 8. SAMPLE — análisis de laboratorio (suelo, agua, planta)
// ----------------------------------------------------------------------------

export type SampleType =
  | "soil"
  | "water"
  | "plant_tissue"
  | "compost"
  | "other";

export interface LabResult {
  parameter: string; // e.g. "pH", "organic_matter", "phosphorus"
  value: number;
  unit: string;
  referenceRange?: { min?: number; max?: number };
  method?: string; // e.g. "Olsen P", "Walkley-Black"
  flag?: "low" | "normal" | "high" | "critical";
}

export interface Sample extends OperationBase {
  type: SampleType;
  depthCm?: number; // for soil samples
  laboratory?: string;
  labReportUrl?: string;
  results: LabResult[];
}

// ----------------------------------------------------------------------------
// Enums and lookups
// ----------------------------------------------------------------------------

export type OperationType =
  | "observation"
  | "input"
  | "irrigation"
  | "harvest"
  | "treatment"
  | "task"
  | "resource_usage"
  | "sample";

/**
 * Discriminated union of any operation.
 * Useful for activity feeds, timelines and audit views.
 */
export type AnyOperation =
  | ({ kind: "observation" } & Observation)
  | ({ kind: "input" } & Input)
  | ({ kind: "irrigation" } & Irrigation)
  | ({ kind: "harvest" } & Harvest)
  | ({ kind: "treatment" } & Treatment)
  | ({ kind: "task" } & Task)
  | ({ kind: "resource_usage" } & ResourceUsage)
  | ({ kind: "sample" } & Sample);

export type ObservationId = Observation["id"];
export type InputId = Input["id"];
export type IrrigationId = Irrigation["id"];
export type HarvestId = Harvest["id"];
export type TreatmentId = Treatment["id"];
export type TaskId = Task["id"];
export type ResourceUsageId = ResourceUsage["id"];
export type SampleId = Sample["id"];
