// packages/core/src/types/spatial.types.ts

// ============================================================================
// SikeliaSoil — Spatial hierarchy
// ----------------------------------------------------------------------------
// Farm → Zone → Plot → Bed → Plant
//
// Design principles:
//   - Crop-agnostic: no species hardcoded; Plants reference speciesId
//   - Syntropic-aware: Plants carry layer + stratum + successionStage
//   - Geo-aware: every level has centroid + polygon (GeoJSON-ready)
//   - IoT-aware: sensors can attach to any level (see iot.types.ts)
//   - Soft-delete: every entity has deletedAt for audit trails
// ============================================================================

import type { Layer, SuccessionStage } from "./species.types";

// ----------------------------------------------------------------------------
// Geo primitives
// ----------------------------------------------------------------------------

/**
 * A [longitude, latitude] pair in WGS84 (EPSG:4326).
 * GeoJSON order — NOT Leaflet order. Convert at the boundary.
 */
export type LonLat = [number, number];

/**
 * A GeoJSON-compatible polygon (closed ring, first == last point).
 */
export interface PolygonGeometry {
  type: "Polygon";
  coordinates: LonLat[][]; // outer ring + optional holes
}

/**
 * A single GPS/GNSS fix, possibly from Galileo HAS.
 */
export interface GeoFix {
  lat: number;
  lng: number;
  altitudeM?: number;
  accuracyM?: number;
  service?: "galileo_has" | "galileo" | "gps" | "manual";
  timestamp: string;
}

/**
 * A rectangular bounding box.
 */
export interface BBox {
  minLat: number;
  minLng: number;
  maxLat: number;
  maxLng: number;
}

// ----------------------------------------------------------------------------
// Zone types — coarse functional divisions of a farm
// ----------------------------------------------------------------------------

/**
 * Functional type of a Zone. This is NOT a crop classification.
 * It describes the *role* of the zone within the farm system.
 */
export type ZoneType =
  | "food_forest" // multi-strata productive system
  | "garden" // intensive annual production
  | "orchard" // fruit trees (may be inside food forest)
  | "greenhouse" // protected cultivation
  | "nursery" // propagation area
  | "pond" // aquatic system
  | "silvopasture" // trees + animals
  | "riparian" // water-edge buffer
  | "windbreak" // linear tree barrier
  | "cover_crop" // soil-building area
  | "fallow" // resting / regeneration
  | "infrastructure" // house, garage, workshop, storage
  | "conservation" // untouched / rewilding
  | "other";

// ----------------------------------------------------------------------------
// Plot / Bed types
// ----------------------------------------------------------------------------

export type SunExposure =
  | "full_sun" // 6+ hours direct
  | "partial_sun" // 3-6 hours
  | "shade" // <3 hours
  | "mixed";

export type Slope =
  | "flat" // <2%
  | "gentle" // 2-5%
  | "moderate" // 5-15%
  | "steep" // 15-30%
  | "very_steep"; // >30%

export type BedType =
  | "raised" // raised bed
  | "ground" // in-ground bed
  | "sintropic_row" // syntropic agriculture row
  | "swale" // water-harvesting ditch
  | "terrace" // terraced bed
  | "container" // pot / planter
  | "hugelkultur" // buried wood mound
  | "keyhole" // keyhole garden
  | "mandala" // mandala garden
  | "other";

// ----------------------------------------------------------------------------
// Plant — the individual organism
// ----------------------------------------------------------------------------

/**
 * Status of an individual plant over its lifetime.
 */
export type PlantStatus =
  | "planned" // on the design, not yet planted
  | "seedling" // germinated, in nursery
  | "planted" // in the ground
  | "growing" // established, growing
  | "productive" // in production
  | "declining" // senescent
  | "dead" // died / removed
  | "removed"; // deliberately removed

/**
 * Health signal — coarse, set by observation or rule engine.
 */
export type HealthStatus =
  | "excellent"
  | "good"
  | "fair"
  | "poor"
  | "critical"
  | "unknown";

// ----------------------------------------------------------------------------
// Core entities
// ----------------------------------------------------------------------------

export interface Farm {
  id: string;
  ownerId: string;
  name: string;
  description?: string;
  location: string; // human-readable (e.g. "Assoro, Sicilia")
  country: string; // ISO 3166-1 alpha-2 (e.g. "IT")
  centroid: GeoFix; // center point (measured or calculated)
  bbox: BBox; // bounding box of the whole farm
  boundary?: PolygonGeometry; // exact perimeter if measured
  areaM2?: number; // computed from boundary
  altitudeM?: number;
  climate?: string; // e.g. "mediterranean"
  biome?: string; // e.g. "mediterranean_forest"
  hardinessZone?: string; // e.g. "9b"
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface Zone {
  id: string;
  farmId: string;
  name: string;
  type: ZoneType;
  description?: string;
  centroid: GeoFix;
  polygon?: PolygonGeometry;
  areaM2?: number;
  sunExposure?: SunExposure;
  slope?: Slope;
  irrigationSource?: string; // e.g. "well", "rain", "municipal"
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface Plot {
  id: string;
  zoneId: string;
  name: string;
  description?: string;
  centroid: GeoFix;
  polygon?: PolygonGeometry;
  areaM2?: number;
  sunExposure?: SunExposure;
  slope?: Slope;
  soilType?: string; // e.g. "clay_loam"
  soilPh?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface Bed {
  id: string;
  plotId: string;
  name: string;
  type: BedType;
  description?: string;
  centroid: GeoFix;
  polygon?: PolygonGeometry;
  areaM2?: number;
  lengthM?: number;
  widthM?: number;
  orientationDeg?: number; // 0 = north, 90 = east (for syntropic rows)
  mulchDepthCm?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

/**
 * An individual plant. The most granular spatial entity.
 * References a Species from the catalog — never hardcodes the crop.
 */
export interface Plant {
  id: string;
  bedId: string;
  speciesId: string; // FK → Species.id
  name?: string; // optional nickname (e.g. "Olivo bisabuelo")
  position: GeoFix; // GNSS-measured or estimated
  layer?: Layer; // override of species.layer if needed
  stratum?: number; // 1..7 syntropic vertical position (1 = highest)
  successionStage?: SuccessionStage;
  plantedAt?: string; // ISO date
  status: PlantStatus;
  health?: HealthStatus;
  parentPlantId?: string; // for propagations / suckers / cuttings
  pruningCycle?: string; // override of species.pruningCycle
  lastPrunedAt?: string;
  biomassProducedKg?: number; // cumulative biomass for chop-and-drop
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

// ----------------------------------------------------------------------------
// Lookups and helpers
// ----------------------------------------------------------------------------

export type FarmId = Farm["id"];
export type ZoneId = Zone["id"];
export type PlotId = Plot["id"];
export type BedId = Bed["id"];
export type PlantId = Plant["id"];

/**
 * Discriminator for anything in the spatial hierarchy.
 * Useful for polymorphic references (observations, inputs, sensors...).
 */
export type SpatialTargetType = "farm" | "zone" | "plot" | "bed" | "plant";

export interface SpatialTarget {
  type: SpatialTargetType;
  id: string;
}
