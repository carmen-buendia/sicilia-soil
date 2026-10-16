// packages/core/src/adapters/types.ts

export type SourceKind = "mock" | "sensor" | "satellite" | "manual";

export interface Query {
  from: string;
  to: string;
  limit?: number;
}

export interface AdapterMetadata {
  id: string;
  kind: SourceKind;
  name: string;
}

export interface DataAdapter<T> {
  readonly metadata: AdapterMetadata;
  isAvailable(): Promise<boolean>;
  getReadings(query: Query): Promise<T[]>;
  getSeries(query: Query): Promise<T[]>;
}

export interface Aoi {
  minLon: number;
  minLat: number;
  maxLon: number;
  maxLat: number;
}
