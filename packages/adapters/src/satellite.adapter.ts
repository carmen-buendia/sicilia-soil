// packages/core/src/adapters/satellite.adapter.ts

import type { AdapterMetadata, Aoi, DataAdapter, Query } from "./types";

/**
 * Adapter for satellite data sources (planned: Copernicus Sentinel).
 *
 * NOT IMPLEMENTED in v1. This stub documents the contract for the
 * satellite integration planned for v2.
 *
 * When implemented, this adapter will:
 * - Authenticate against the Copernicus Data Space Ecosystem API.
 * - Query scenes within the configured area of interest (AOI).
 * - Extract the requested index (NDVI, NDWI, etc.) for the given time range.
 * - Cache OAuth2 tokens and refresh them before expiry.
 */
export class SatelliteDataAdapter<T> implements DataAdapter<T> {
  constructor(
    private readonly config: {
      metadata: AdapterMetadata;
      apiEndpoint: string;
      apiKey: string;
      aoi: Aoi;
      sentinel: "s1" | "s2" | "s3";
    },
  ) {}

  get metadata(): AdapterMetadata {
    return this.config.metadata;
  }

  async isAvailable(): Promise<boolean> {
    throw new Error("SatelliteDataAdapter.isAvailable not implemented yet");
  }

  async getReadings(_query: Query): Promise<T[]> {
    throw new Error("SatelliteDataAdapter.getReadings not implemented yet");
  }

  async getSeries(_query: Query): Promise<T[]> {
    throw new Error("SatelliteDataAdapter.getSeries not implemented yet");
  }
}
