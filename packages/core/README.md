# @sicilia-soil/core

> Single source of truth for types, mock data and configuration.

This package contains **no React, no side effects, no logic**. It is importable from the frontend, the backend and any other package.

---

## Structure

```
packages/core/src/
├── types/              TypeScript types
│   ├── copernicus.types.ts
│   ├── farm.types.ts
│   ├── groundCover.types.ts
│   ├── monitoring.types.ts
│   ├── mycorrhiza.types.ts
│   ├── notification.types.ts
│   ├── recommendation.types.ts
│   ├── soilHealth.types.ts
│   └── symbiosis.types.ts
│
├── data/               Mock data and demo values
│   ├── cereal.data.ts
│   ├── coverFallow.data.ts
│   ├── cycle.data.ts
│   ├── dashboard.data.ts
│   ├── esparto.data.ts
│   ├── groundCover.data.ts
│   ├── humidity.data.ts
│   ├── light.data.ts
│   ├── polyculture.data.ts
│   ├── sensors.mock.ts
│   ├── soilHealth.data.ts
│   ├── temperature.data.ts
│   └── index.ts
│
├── constants.ts        Shared constants
└── index.ts            Public API
```

---

## Usage

```ts
import {
  FARM_CENTER,
  FARM_DEFAULT_ZOOM,
  DEFAULT_FARM_PLOTS,
  COPERNICUS_LAYER_CONFIG,
  HUMIDITY_DATA,
  SOIL_CONTAMINATION,
  getRemediationProgress,
} from "@sicilia-soil/core";
```

---

## Data lifecycle

All data lives here as **mock data** until the backend is connected. Once the API is ready:

1. Keep the types in `types/`.
2. Replace the mock values in `data/` with **fetch calls from hooks** in the app.
3. Delete the mock file for that domain.

Example: `humidity.data.ts` will be replaced by `useHumidityData()` that fetches from `/api/humidity`.

---

## Conventions

- **One file per domain.** No giant `data.ts`.
- **Types first.** Every data file imports its type from `types/`.
- **No React.** Core is framework-agnostic.
- **No side effects.** No `fetch`, no `localStorage`, no `window`.

---

## Adding a new data domain

1. Create `types/yourDomain.types.ts` with the types.
2. Export from `types/index.ts`.
3. Create `data/yourDomain.data.ts` with mock values.
4. Export from `data/index.ts`.
5. Use it from `apps/web/hooks/useYourDomainData.ts`.
