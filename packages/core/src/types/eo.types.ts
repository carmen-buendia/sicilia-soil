// packages/core/src/types/eo.types.ts

// ============================================================================
// SikeliaSoil — Earth Observation (EO)
// ----------------------------------------------------------------------------
// Two European space programmes converge here:
//
//   • Copernicus  → "the eyes": satellite scenes + derived indices
//                    (NDVI, NDWI, SSM, LST, EVI, ...)
//
//   • Galileo     → "the ruler": high-precision positioning
//                    (HAS service, 20-40 cm accuracy)
//
// Design principles:
//   - STAC-aligned: scenes reference STAC items + COG assets
//   - Multi-provider: CDSE (Copernicus Data Space), Planetary Computer
//   - Index-agnostic: any index key from the platform can be stored
//   - Scope-polymorphic: an index applies to a farm | zone | plot | bed
//   - Quality-aware: cloud masks, valid-pixel ratios on every index
//   - Time-series native: designed for trend queries, not snapshots
// ============================================================================

import type { GeoFix, PolygonGeometry } from "./spatial.types";

// ----------------------------------------------------------------------------
// Satellites & providers
// ----------------------------------------------------------------------------

export type SatellitePlatform =
  | "sentinel-1a"
  | "sentinel-1b"
  | "sentinel-1c"
  | "sentinel-2a"
  | "sentinel-2b"
  | "sentinel-2c"
  | "sentinel-3a"
  | "sentinel-3b"
  | "landsat-8"
  | "landsat-9"
  | "modis-terra"
  | "modis-aqua"
  | "smap";

/**
 * Where the scene comes from. Needed for authentication + attribution.
 */
export type EOProvider =
  | "copernicus_cdse" // Copernicus Data Space Ecosystem (default for EU)
  | "planetary_computer" // Microsoft Planetary Computer
  | "nasa_gibs" // NASA GIBS (WMTS tiles)
  | "usgs_earth_explorer"
  | "local_archive"; // downloaded + indexed locally

/**
 * Product level, following Sentinel conventions.
 * L1C = top of atmosphere, L2A = bottom of atmosphere (surface reflectance).
 */
export type EOProcessingLevel =
  | "L1C" // TOA reflectance (Sentinel-2)
  | "L2A" // BOA surface reflectance (Sentinel-2, atmospherically corrected)
  | "GRD" // Ground Range Detected (Sentinel-1)
  | "RTC" // Radiometrically Terrain Corrected (Sentinel-1)
  | "L3" // derived / composited
  | "unknown";

// ----------------------------------------------------------------------------
// Scene — one satellite acquisition over a bbox
// ----------------------------------------------------------------------------

export interface EOScene {
  id: string;
  provider: EOProvider;
  satellite: SatellitePlatform;
  level: EOProcessingLevel;
  /** STAC item id, e.g. "S2B_MSIL2A_20260415T100029_N0500_R122_T33SVC_20260415T131532" */
  stacItemId: string;
  stacCollectionId?: string; // e.g. "sentinel-2-l2a"

  // Time
  acquisitionAt: string; // ISO 8601 UTC
  processedAt?: string;

  // Spatial
  bbox: [number, number, number, number]; // [west, south, east, north]
  footprint?: PolygonGeometry;
  crs: string; // e.g. "EPSG:32633"
  resolutionM: number; // ground sample distance

  // Quality
  cloudCoverPercent?: number; // 0-100
  snowCoverPercent?: number;
  validPixelPercent?: number; // after QA mask

  // Assets (COG URLs, signed or public)
  assets?: Record<string, EOAsset>;

  // Metadata
  sunAzimuthDeg?: number;
  sunElevationDeg?: number;
  viewAzimuthDeg?: number;
  viewElevationDeg?: number;

  createdAt: string;
  updatedAt: string;
}

export interface EOAsset {
  href: string; // URL (may be a signed URL)
  type?: string; // e.g. "image/tiff; application=geotiff; profile=cloud-optimized"
  roles?: string[]; // ["data", "metadata", "thumbnail", ...]
  bands?: string[]; // e.g. ["B02", "B03", "B04", "B08"]
  sizeBytes?: number;
  expiresAt?: string; // for signed URLs
}

// ----------------------------------------------------------------------------
// Index — the derived value used by the DDS
// ----------------------------------------------------------------------------

/**
 * Vegetation / water / thermal indices. Extensible: add new keys as needed.
 */
export type EOIndexType =
  // Vegetation
  | "NDVI" // normalised difference vegetation index — vigour
  | "EVI" // enhanced vegetation index — denser canopies
  | "SAVI" // soil-adjusted vegetation index — sparse cover
  | "NDRE" // red-edge NDVI — nitrogen status
  | "GNDVI" // green NDVI
  // Water
  | "NDWI" // water index (McFeeters) — surface water
  | "NDMI" // moisture index (Gao) — canopy water content
  | "MSI" // moisture stress index
  // Soil
  | "SSM" // surface soil moisture (SAR-derived, Sentinel-1)
  | "BSI" // bare soil index
  // Thermal
  | "LST" // land surface temperature (Sentinel-3, MODIS)
  // Drought
  | "CDI" // combined drought indicator
  | "SPI"; // standardised precipitation index

/**
 * Value of one index over one spatial unit on one date.
 *
 * This is what the DDS reads when answering "how is my olive grove doing?".
 */
export interface EOIndexValue {
  id: string;
  sceneId: string; // FK → EOScene
  indexType: EOIndexType;

  // Spatial scope (polymorphic — pick one)
  scopeType: "farm" | "zone" | "plot" | "bed";
  scopeId: string;

  // Value
  value: number;
  unit?: string; // usually dimensionless, but keeps flexibility

  // Temporal
  timestamp: string; // ISO 8601 (usually = scene.acquisitionAt)

  // Quality
  validPixelPercent?: number; // what fraction of the scope had valid data
  cloudMaskedPercent?: number;

  // Stats over the scope (for charts + anomaly detection)
  stats?: {
    min: number;
    max: number;
    mean: number;
    median?: number;
    stdDev?: number;
    p10?: number;
    p90?: number;
  };

  createdAt: string;
}

/**
 * A precomputed time series for a given scope + index.
 * Avoids N queries when rendering charts.
 */
export interface EOIndexSeries {
  scopeType: "farm" | "zone" | "plot" | "bed";
  scopeId: string;
  indexType: EOIndexType;
  windowStart: string;
  windowEnd: string;
  resolution: "daily" | "weekly" | "monthly" | "scene";
  points: EOIndexSeriesPoint[];
}

export interface EOIndexSeriesPoint {
  timestamp: string;
  value: number;
  validPixelPercent?: number;
  quality?: "good" | "suspect" | "bad";
}

/**
 * Anomaly relative to the historical baseline for the same scope + index.
 * Used by the DDS to answer "is this normal for this time of year?".
 */
export interface EOIndexAnomaly {
  scopeType: "farm" | "zone" | "plot" | "bed";
  scopeId: string;
  indexType: EOIndexType;
  timestamp: string;
  value: number;
  baselineMean: number;
  baselineStdDev: number;
  zScore: number;
  severity: "normal" | "watch" | "alert";
}

// ----------------------------------------------------------------------------
// GNSS — Galileo high-precision positioning
// ----------------------------------------------------------------------------

/**
 * Which service was used to obtain the fix.
 * Copernicus does not provide positioning — that's Galileo / GPS.
 */
export type GNSSService =
  | "galileo_has" // High Accuracy Service (20-40 cm, free, global)
  | "galileo" // standard Galileo (1-3 m)
  | "gps" // standard GPS
  | "glonass"
  | "beidou"
  | "multi" // multi-constellation fix
  | "rtk" // RTK base station (cm-level, requires base)
  | "manual"; // entered by hand on a map

/**
 * A high-precision measurement of a point in the field.
 * Attached to any entity that needs exact geo-location.
 */
export interface GNSSPosition {
  id: string;
  /** What this fix refers to (polymorphic). */
  targetType:
    | "farm"
    | "zone"
    | "plot"
    | "bed"
    | "plant"
    | "sensor"
    | "edge_device"
    | "observation"
    | "sample";
  targetId: string;

  latitude: number;
  longitude: number;
  altitudeM?: number;

  /** Horizontal accuracy in meters (lower = better). */
  accuracyM: number;
  /** Vertical accuracy in meters (often worse than horizontal). */
  verticalAccuracyM?: number;

  service: GNSSService;
  satelliteCount?: number; // number of satellites in the fix
  hdop?: number; // horizontal dilution of precision
  pdop?: number; // position dilution of precision

  /** Corrected by HAS or RTK? */
  corrected: boolean;

  capturedAt: string; // ISO 8601 UTC
  capturedBy?: string; // userId, or deviceId
  deviceLabel?: string; // e.g. "iPhone 15 Pro", "Ardusimple RTK"

  notes?: string;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Data Cube abstractions (Nostradamus / ODC-style)
// ----------------------------------------------------------------------------

/**
 * A named multi-dimensional view of EO data over a bbox + time range.
 * Mirrors the Open Data Cube "product" concept.
 */
export interface EODataCube {
  id: string;
  name: string; // e.g. "sicilia-soil-s2-l2a"
  description?: string;
  provider: EOProvider;
  /** Products included, e.g. ["sentinel-2-l2a", "sentinel-1-rtc"] */
  products: string[];
  bbox: [number, number, number, number];
  crs: string;
  resolutionM: number;
  timeStart: string;
  timeEnd?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * A query against a data cube. Used by the CRUD + analytics layer.
 */
export interface EOQuery {
  cubeId: string;
  /** Geometry filter (polygon or bbox) */
  geometry?: PolygonGeometry;
  bbox?: [number, number, number, number];
  /** Time range */
  timeStart: string;
  timeEnd: string;
  /** Which bands / indices are needed */
  bands?: string[];
  indices?: EOIndexType[];
  /** Max cloud cover accepted */
  maxCloudCoverPercent?: number;
  /** Target CRS and resolution */
  crs?: string;
  resolutionM?: number;
}

/**
 * Result of an EO query. Deliberately small — actual rasters come from
 * signed COG URLs, not embedded in the response.
 */
export interface EOQueryResult {
  query: EOQuery;
  scenesMatched: number;
  items: EOScene[];
  /** Signed URLs for derived COG outputs, if any */
  derivedAssets?: EOAsset[];
  computedAt: string;
}

// ----------------------------------------------------------------------------
// Lookups
// ----------------------------------------------------------------------------

export type EOSceneId = EOScene["id"];
export type EOIndexValueId = EOIndexValue["id"];
export type GNSSPositionId = GNSSPosition["id"];

/**
 * Common scope targets for EO indices.
 * Aliased for readability at call sites.
 */
export type EOScopeType = EOIndexValue["scopeType"];
export type EOScope = { type: EOScopeType; id: string };
