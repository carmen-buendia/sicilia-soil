# @sicilia-soil/core

> Single source of truth for types, mock data and configuration.

This package contains **no React, no side effects, no logic**. It is importable from the frontend, the backend and any other package.

---

# @sicilia-soil/core

> Single source of truth for types, domain rules, mock data, and configuration.

This package contains **no React and no side effects**. It holds the domain knowledge of SikeliaSoil (types, decision rules, static content) and is importable from both the frontend and the server.

---

## Structure

```text
packages/core/src/
├── types/              TypeScript interfaces and types
├── data/               Mock data, defaults, and telemetry
│   ├── copernicus.defaults.ts
│   ├── telemetry.default.ts
│   └── ... (domain-specific mock files)
│
├── rules/              SikeliaSoil's domain rules
│   ├── rules.v1.ts     Declarative agricultural rules
│   └── sicilia-soil.adapter.ts  Adapter for the generic rule engine
│
├── content/            Static text and translations
├── constants.ts        Shared constants
└── index.ts            Public API
```

---

## Usage

```ts
import {
  // Types
  DecisionContext,
  DecisionEvidence,

  // Domain Rules & Adapters
  DECISION_RULES_V1,
  SiciliaSoilAdapter,

  // Default Data & Telemetry
  DECISION_EVIDENCE_DEFAULT,
  TELEMETRY_MOCK_SENSORS,
  FARM_CENTER,
} from "@sicilia-soil/core";
```

---

## Data lifecycle

All data lives here as **mock data** until the backend is connected. Once the API is ready:

1. Keep the types in `types/`.
2. Replace the mock values in `data/` with **fetch calls from hooks** in the app.
3. Delete the mock file for that domain.

Example: telemetry.default.ts will be replaced by a useTelemetry() hook that fetches from the database or API.

---

## Conventions

- One file per domain. No giant data.ts.

- Types first. Every data file imports its type from types/.

- Pure logic. Rules and adapters must be pure functions with no side effects.

- No React. Core is framework-agnostic.

---

## Adding a new data domain

1. Open rules/rules.v1.ts and add your new DecisionRule object.

2. If the rule requires a new data field, update the DecisionEvidence type.

3. Update sicilia-soil.adapter.ts so the engine knows how to read that new field.
