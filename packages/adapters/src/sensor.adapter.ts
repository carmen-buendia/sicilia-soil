// packages/core/src/adapters/sensor.adapter.ts

import type { AdapterMetadata, DataAdapter, Query } from "./types";

/**
 * Adapter for real IoT sensor sources.
 *
 * NOT IMPLEMENTED in v1. This stub documents the contract for the
 * sensor integration planned for v2.
 *
 * When implemented, this adapter will:
 * - Fetch readings from an HTTP/MQTT gateway using `endpoint` and `authToken`
 * - Validate the auth token before each request
 * - Cache the last successful response for `isAvailable()` to avoid
 *   hitting the network on every call
 */
export class SensorDataAdapter<T> implements DataAdapter<T> {
  constructor(
    private readonly config: {
      metadata: AdapterMetadata;
      endpoint: string;
      authToken: string;
    },
  ) {}

  get metadata(): AdapterMetadata {
    return this.config.metadata;
  }

  async isAvailable(): Promise<boolean> {
    throw new Error("SensorDataAdapter.isAvailable not implemented yet");
  }

  async getReadings(_query: Query): Promise<T[]> {
    throw new Error("SensorDataAdapter.getReadings not implemented yet");
  }

  async getSeries(_query: Query): Promise<T[]> {
    throw new Error("SensorDataAdapter.getSeries not implemented yet");
  }
}
