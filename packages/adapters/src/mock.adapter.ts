// packages/core/src/adapters/mock.adapter.ts

import type { AdapterMetadata, DataAdapter, Query } from "./types";

export class MockDataAdapter<T> implements DataAdapter<T> {
  constructor(
    private readonly config: {
      metadata: AdapterMetadata;
      data: T[];
      getTimestamp: (item: T) => string;
    },
  ) {}
  get metadata(): AdapterMetadata {
    return this.config.metadata;
  }

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async getReadings(query: Query): Promise<T[]> {
    const queryFrom = new Date(query.from).getTime();
    const queryTo = new Date(query.to).getTime();

    const filtered = this.config.data.filter((item) => {
      const itemTimestamp = new Date(this.config.getTimestamp(item)).getTime();
      return itemTimestamp >= queryFrom && itemTimestamp <= queryTo;
    });

    return query.limit !== undefined
      ? filtered.slice(0, query.limit)
      : filtered;
  }

  async getSeries(query: Query): Promise<T[]> {
    const readings = await this.getReadings(query);
    return readings.sort((a, b) => {
      const ta = new Date(this.config.getTimestamp(a)).getTime();
      const tb = new Date(this.config.getTimestamp(b)).getTime();
      return ta - tb;
    });
  }
}
