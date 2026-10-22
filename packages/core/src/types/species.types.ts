// packages/core/src/types/species.types.ts

// ============================================================================
// SikeliaSoil — Species catalog
// ----------------------------------------------------------------------------
// Crop-agnostic + syntropic. Never hardcode "tomate" or "manzano".
// Every plant references a Species; the Species describes behavior, needs
// and ecological role. The same schema models:
//   - a tomato in a raised bed (annual, herbaceous)
//   - an apple tree in a food forest (perennial, canopy)
//   - a milpa guild (maize + beans + squash)
//   - a syntropic row (banana + cacao + ipê + cassava)
// ============================================================================

import type { MycorrhizaType } from "./mycorrhiza.types";

// ----------------------------------------------------------------------------
// Primitive unions
// ----------------------------------------------------------------------------

/**
 * Syntropic stratification layer.
 * Based on Ernst Götsch's model of vertical stratification.
 * Order = from tallest to deepest (visually top → bottom).
 */
export type Layer =
  | "emergente" // towers above canopy (e.g. Ceiba, ipê, eucalyptus)
  | "alto" // main canopy (e.g. fruit trees, palms)
  | "medio" // sub-canopy (e.g. citrus, banana, coffee)
  | "bajo" // understory trees (e.g. papaya, elderberry)
  | "herbaceo" // herbaceous (e.g. vegetables, cereals, aromatic)
  | "rastrero" // ground cover (e.g. squash, clover, purslane)
  | "trepador" // climbers (e.g. beans, vines, passion fruit)
  | "raiz"; // root crops (e.g. cassava, sweet potato, carrot)

/**
 * Lifecycle of the plant. Determines pruning, replanting and succession.
 */
export type Lifecycle =
  | "anual" // completes in one season
  | "bianual" // two seasons
  | "perenne" // lives many years
  | "semiperenne"; // lives a few years but not truly perennial

/**
 * Succession stage in a syntropic system.
 */
export type SuccessionStage =
  | "pioneer" // fast-growing, fixes soil, short-lived
  | "intermediate" // mid-succession, prepares soil for climax
  | "climax" // long-lived, mature system
  | "climax_helper"; // supports climax species (N-fixers, shade)

/**
 * Root system architecture. Affects irrigation, guild design, soil work.
 */
export type RootSystem =
  | "fasciculado" // fibrous, shallow, dense (grasses, cereals)
  | "pivotante" // taproot, deep (carrots, trees)
  | "tuberoso" // tuberous (cassava, potato)
  | "rizomatoso" // rhizomatous (ginger, turmeric)
  | "superficial" // shallow, spreading (most vegetables)
  | "profundo" // deep (some trees, alfalfa)
  | "mixto"; // combines types (many trees)

/**
 * Nitrogen fixation capacity.
 */
export type NitrogenFixation =
  | "none"
  | "rhizobia" // symbiotic with legumes
  | "actinorhizal" // symbiotic with Frankia (alder, casuarina)
  | "free_living" // free-living bacteria in rhizosphere
  | "associative"; // associative with grasses (e.g. sugarcane)

/**
 * Sun exposure needs.
 */
export type SunNeeds =
  | "pleno" // full sun (6+ h)
  | "semi" // partial sun (3-6 h)
  | "sombra" // shade tolerant (<3 h)
  | "indiferente"; // adapts

/**
 * Water needs. Relative scale, not absolute liters.
 */
export type WaterNeeds =
  | "muy_bajo" // xerophytic (olive, almond, carob, esparto)
  | "bajo" // drought-tolerant
  | "medio" // average
  | "alto" // needs regular water
  | "muy_alto"; // wetland / aquatic

/**
 * Edible / usable parts. Multi-value.
 */
export type EdiblePart =
  | "hoja"
  | "tallo"
  | "flor"
  | "fruto"
  | "semilla"
  | "raiz"
  | "tuberculo"
  | "rizoma"
  | "corteza"
  | "savia"
  | "bulbo"
  | "none";

/**
 * Ecosystem services provided by this species.
 * Used to design guilds and calculate symbiosis scores.
 */
export type EcosystemService =
  | "nitrogen_fixation"
  | "biomass_production"
  | "soil_cover"
  | "deep_rooting"
  | "nutrient_pumping" // brings nutrients up from deep soil
  | "pest_confusion" // aromatics that confuse pests
  | "beneficial_attraction" // attracts pollinators / predators
  | "wind_break"
  | "shade_provision"
  | "water_retention"
  | "erosion_control"
  | "mycorrhizal_host" // supports fungal network
  | "allelopathic" // releases compounds that affect neighbors
  | "mulch_production";

/**
 * How the species is propagated.
 */
export type PropagationMethod =
  | "semilla"
  | "esqueje"
  | "injerto"
  | "division"
  | "rizoma"
  | "tuberculo"
  | "bulbo"
  | "acodo"
  | "in_vitro";

// ----------------------------------------------------------------------------
// Species — the crop-agnostic catalog entry
// ----------------------------------------------------------------------------

export interface Species {
  // --- Identity ---
  id: string; // uuid v7 or stable slug
  scientificName: string; // e.g. "Olea europaea"
  commonName: string; // e.g. "Olivo"
  family: string; // e.g. "Oleaceae"
  synonyms?: string[];
  description?: string;

  // --- Syntropic classification ---
  layer: Layer;
  lifecycle: Lifecycle;
  successionStage: SuccessionStage;

  // --- Morphology ---
  matureHeightM: number;
  matureWidthM: number;
  rootSystem: RootSystem;
  yearsToProduction: number; // 0 for annuals
  lifespanYears: number | null; // null = indefinite / unknown

  // --- Ecological role ---
  nitrogenFixation: NitrogenFixation;
  mycorrhizaType: MycorrhizaType;
  ecosystemServices: EcosystemService[];
  attractsBeneficials: string[]; // e.g. ["bees", "ladybugs", "hoverflies"]

  // --- Needs ---
  waterNeeds: WaterNeeds;
  sunNeeds: SunNeeds;
  phMin: number;
  phMax: number;
  soilTexturePref?: "arcilloso" | "franco" | "arenoso" | "indiferente";
  frostToleranceC: number; // minimum °C tolerated
  heatToleranceC: number; // maximum °C tolerated

  // --- Uses ---
  edibleParts: EdiblePart[];
  medicinalUses?: string[];
  otherUses?: string[]; // e.g. ["fibra", "tinte", "biomasa"]

  // --- Management ---
  propagationMethods: PropagationMethod[];
  pruningCycle?: string; // e.g. "anual", "cada 2 años", "ninguna"
  harvestWindow?: string; // e.g. "oct-dic"
  companionSpecies?: string[]; // species ids that work well together
  incompatibleSpecies?: string[]; // species ids that should not be neighbors

  // --- Regional context ---
  nativeTo?: string[]; // e.g. ["Mediterráneo", "Sicilia"]
  climateZones?: string[]; // e.g. ["mediterranean", "subtropical"]
  invasive?: boolean;

  // --- Metadata ---
  createdAt: string; // ISO 8601
  updatedAt: string;
  deletedAt?: string | null;
  source?: string; // provenance of this catalog entry
}

// ----------------------------------------------------------------------------
// Guild — syntropic association of species
// ----------------------------------------------------------------------------

/**
 * Role of a species inside a guild.
 */
export type GuildRole =
  | "emergente" // towers above
  | "canopy" // main productive layer
  | "productive" // main yield
  | "support" // supports others (N-fix, shade)
  | "cover" // ground cover
  | "climber" // climbs on support
  | "root" // below-ground production
  | "aromatic" // pest confusion / beneficial attraction
  | "mulch" // biomass production for chop-and-drop
  | "pioneer" // early-stage soil builder
  | "accumulator"; // accumulates nutrients (comfrey, yarrow)

/**
 * Position of a species within the guild's temporal sequence.
 */
export type GuildSequence =
  | "initial" // planted at guild establishment
  | "secondary" // planted after initial species establish
  | "final"; // climax species, planted last

/**
 * A guild is a designed association of species that work together.
 * Examples: milpa, food forest, syntropic row, Mediterranean silvopasture.
 */
export interface Guild {
  id: string;
  farmId: string; // guilds are farm-specific by default
  name: string;
  description?: string;
  stratum: Layer; // dominant layer of the guild
  successionStage: SuccessionStage;
  climateZones?: string[];
  members: GuildMember[];
  area_m2?: number; // recommended area
  establishmentNotes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

/**
 * A species participating in a guild.
 */
export interface GuildMember {
  id: string;
  guildId: string;
  speciesId: string;
  role: GuildRole;
  sequence: GuildSequence;
  densityPerHa?: number; // recommended planting density
  notes?: string;
}

// ----------------------------------------------------------------------------
// Helpers / lookups
// ----------------------------------------------------------------------------

export type SpeciesId = Species["id"];
export type GuildId = Guild["id"];

/**
 * Filter species by layer, succession, or ecosystem service.
 * Pure type-level helpers — actual implementations live in packages/utils.
 */
export interface SpeciesFilter {
  layer?: Layer[];
  lifecycle?: Lifecycle[];
  successionStage?: SuccessionStage[];
  nitrogenFixation?: NitrogenFixation[];
  mycorrhizaType?: MycorrhizaType[];
  waterNeeds?: WaterNeeds[];
  sunNeeds?: SunNeeds[];
  ecosystemServices?: EcosystemService[];
  nativeTo?: string[];
  climateZones?: string[];
  frostToleranceMinC?: number;
}
