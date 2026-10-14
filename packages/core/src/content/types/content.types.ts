/**
 * Domain types. No text, no numeric values — only shapes and unions.
 *
 * All IDs follow the convention: `{domain}-{slug}` (e.g. "crop-tomato",
 * "zone-north", "sensor-1"). This makes it obvious where a value comes
 * from and avoids collisions across domains.
 */

// ----------------------------------------------------------------------------
// Enums
// ----------------------------------------------------------------------------

export type WaterNeed = "low" | "medium" | "high";

export type MycorrhizalAffinity = "high" | "medium" | "low" | "none";

export type AlertSeverity = "info" | "warning" | "urgent";

export type DataSource = "mock" | "sensor" | "satellite";

export type CropTrait =
  | "nitrogen-fixer"
  | "drought-tolerant"
  | "heavy-feeder"
  | "warm-season"
  | "cool-season"
  | "bioremediation"
  | "pioneer";

// ----------------------------------------------------------------------------
// Domain shapes
// ----------------------------------------------------------------------------

export interface CropDefinition {
  id: string; // "crop-tomato"
  family: string; // "Solanaceae"
  traits: CropTrait[];
  waterNeed: WaterNeed;
  cycleDays: number;
  sowingMonths: number[]; // 1-12
  harvestMonths: number[];
  companions: string[]; // crop IDs
  antagonists: string[]; // crop IDs
  mycorrhizalAffinity: MycorrhizalAffinity;
}

export interface ZoneData {
  id: string; // "zone-north"
  cropId: string; // "crop-tomato"
  ssm: number; // soil surface moisture %
  temperature: number; // °C
  lastUpdate: string; // ISO 8601
}

export interface SoilHealthData {
  plotId: string; // "plot-1"
  timestamp: string; // ISO 8601
  indicators: {
    organicCarbon: number; // %
    mycorrhizalActivity: number; // 0-1
    microbialBiomass: number; // µg C/g soil
    labileCarbon: number; // %
  };
  source: DataSource;
}
