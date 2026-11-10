# @sicilia-soil/utils

> Pure logic, domain engines, and calculations.

This package contains the **business logic** of SikeliaSoil. It has no React and no side effects. It can run in the browser, on the server, or in a Node script.

**Note:** The recommendation engine logic was extracted to the standalone `@isola-node/rule-engine` package. This utils package now focuses on the remaining domain helpers (symbiosis, notifications, etc.).

## Structure

```text
packages/utils/src/
├── notification.engine.ts      Convert recommendations into notifications
├── symbiosis.engine.ts         Calculate the mycorrhizal symbiosis score
├── copernicusUtils.ts          Interpret NDVI, NDWI, SSM, LST
├── groundCoverUtils.ts         Ground cover helpers
├── humidityUtils.ts            Humidity helpers
├── lightUtils.ts               Light helpers
├── temperatureUtils.ts         Temperature helpers
├── formatters.ts               Format dates, numbers, units
├── numberUtils.ts              Numeric helpers
└── index.ts                    Public API
```

## Engines

### `symbiosis.engine.ts`

Calculates the mycorrhizal symbiosis score from soil biology indicators.

```ts
import { calculateSymbiosisScore } from "@sicilia-soil/utils";

const symbiosis = calculateSymbiosisScore({
  espartoHealth: 92,
  mycorrhizalColonisation: 45,
  glomalin: 2.1,
  // ...
});
```

### `notification.engine.ts`

Converts recommendations into notifications based on priority.

```ts
import { buildNotifications } from "@sicilia-soil/utils";
```

## Conventions

- **Pure functions.** No side effects, no `window`, no `fetch`.
- **Testable.** Each engine is isolated and can be unit-tested.
- **Domain-driven.** File names reflect the domain (`symbiosis`, `notification`, etc.).
- **No React.** Utils is framework-agnostic.

## Adding a new engine

1. Create `src/yourEngine.engine.ts`.
2. Export the public functions from `index.ts`.
3. Add a short docstring at the top of the file explaining the domain.

```

```
