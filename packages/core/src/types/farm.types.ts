// packages/core/src/types/farm.types.ts

// ============================================================================
// SikeliaSoil — Legacy farm types
// ----------------------------------------------------------------------------
// DEPRECATED. These types are kept for backward compatibility with the
// /humidity and /ground-cover pages that still consume the old mock shape.
//
// The canonical model lives in:
//   • spatial.types.ts  → Farm, Zone, Plot, Bed, Plant
//   • species.types.ts  → Species, Guild
//
// Migration path (see feat/db-crud):
//   Parcel       → Zone (or Plot, depending on granularity)
//   ParcelId     → string (no longer a closed union)
//   ParcelSensors → SensorSnapshot[] (via iot.types)
//   FarmConfig   → Farm (spatial.types)
//
// Do NOT extend these types. Do NOT add new fields. When a consumer
// needs a new field, migrate the consumer to the canonical model.
// ============================================================================

// ----------------------------------------------------------------------------
// Legacy parcel types (kept as string for crop-agnostic openness)
// ----------------------------------------------------------------------------

/**
 * @deprecated Use `Zone["id"]` or `Plot["id"]` from spatial.types.ts.
 * Kept as a loose string so any parcel name is accepted.
 */
export type ParcelId = string;

/**
 * @deprecated Categories were a fixed taxonomy. The new model uses
 * `ZoneType` (spatial.types.ts) which is broader and extensible.
 */
export type ParcelCategory =
  | "textil"
  | "hortalizas"
  | "arboles"
  | "aromaticas"
  | "suelo-vivo"
  | "infraestructura"
  | "cereal"
  | "descanso";

export type LatLng = [number, number];

export type SensorRange = {
  min: number;
  max: number;
  optimal: number;
  unit: string;
};

export type ParcelSensors = {
  humidity?: SensorRange;
  temperature?: SensorRange;
  sunlight?: SensorRange;
  wind?: SensorRange;
};

/**
 * @deprecated Use `Zone` or `Plot` from spatial.types.ts.
 * Still consumed by the /humidity page mock.
 */
export type Parcel = {
  id: ParcelId;
  name: string;
  category: ParcelCategory;
  description?: string;
  color: string;
  icon: string;
  center: LatLng;
  polygon: LatLng[];
  sensors: ParcelSensors;
  notes?: string;
};

/**
 * @deprecated Use `Farm` from spatial.types.ts.
 * Kept for the /configuration and dashboard mock.
 */
export type FarmConfig = {
  name: string;
  location: string;
  coordinates: LatLng;
  defaultZoom: number;
  miniZoom: number;
  parcels: Parcel[];
};
