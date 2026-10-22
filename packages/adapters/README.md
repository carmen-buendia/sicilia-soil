# @isola-node/adapters

> Domain-agnostic adapter pattern for ingesting data from heterogeneous sources.

This package provides a unified interface to connect different data sources (IoT sensors, satellite APIs, local mocks) to the rule engine without vendor lock-in.

## Features

- **`DataAdapter<T>`** — Generic contract with zero domain knowledge.
- **Discriminated union config** — Type-safe factory via `createAdapter`.
- **Stub-vs-implementation separation** — Honest, documented milestones.
- **Zero dependencies** — Pure TypeScript.

## Packages

- `MockDataAdapter` — In-memory implementation for testing.
- `SensorDataAdapter` — Stub for IoT sources.
- `SatelliteDataAdapter` — Stub for satellite APIs (e.g., Copernicus).

## License

Apache 2.0 — see [LICENSE](../../LICENSE).
