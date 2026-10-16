// packages/core/src/adapters/registry.ts

/** *
 * Adapter registry: discriminated union config + factory function.
 *
 * Consumers describe the source they want via AdapterConfig, and createdAdapter returns the matching DataAdapter<T>.
 * Adding a new source kind is a matter of extending the union and adding a case.
 */

import type { AdapterMetadata, Aoi, DataAdapter } from "./types";
import { MockDataAdapter } from "./mock.adapter";
import { SensorDataAdapter } from "./sensor.adapter";
import { SatelliteDataAdapter } from "./satellite.adapter";

export type AdapterConfig<T> =
  | {
      kind: "mock";
      metadata: AdapterMetadata;
      data: T[];
      getTimestamp: (item: T) => string;
    }
  | {
      kind: "sensor";
      metadata: AdapterMetadata;
      endpoint: string;
      authToken: string;
    }
  | {
      kind: "satellite";
      metadata: AdapterMetadata;
      apiEndpoint: string;
      apiKey: string;
      aoi: Aoi;
      sentinel: "s1" | "s2" | "s3";
    };

export function createAdapter<T>(config: AdapterConfig<T>): DataAdapter<T> {
  switch (config.kind) {
    case "mock":
      return new MockDataAdapter<T>({
        metadata: config.metadata,
        data: config.data,
        getTimestamp: config.getTimestamp,
      });
    case "sensor":
      return new SensorDataAdapter<T>({
        metadata: config.metadata,
        endpoint: config.endpoint,
        authToken: config.authToken,
      });
    case "satellite":
      return new SatelliteDataAdapter<T>({
        metadata: config.metadata,
        apiEndpoint: config.apiEndpoint,
        apiKey: config.apiKey,
        aoi: config.aoi,
        sentinel: config.sentinel,
      });
  }
}
