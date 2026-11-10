# @sicilia-soil/core

Types, mock data, and static configuration for SikeliaSoil.

This package doesn't have React or any side effects. It's just the shared foundation (types, defaults, locales, and site configs) that both the frontend and the backend can import.

## What's inside

```text
packages/core/src/
├── types/              TypeScript interfaces (EngineContext, EngineEvidence, etc.)
├── data/               Mock data and default values (telemetry, rule-engine defaults)
├── domain/             Domain models (CropSystem, etc.)
├── content/            Static text and translations (locales)
├── site/               Farm configuration (boundaries, sensor mapping)
├── constants.ts        Shared constants
└── index.ts            Public API exports
```

## How to use it

```ts
import {
  ENGINE_CONTEXT_DEFAULT,
  ENGINE_EVIDENCE_DEFAULT,
  type EngineContext,
  type EngineEvidence,
} from "@sicilia-soil/core";
```

## About the mock data

Right now, the files in `data/` hold static mock data (like the Assoro farm values).
When the database is connected, the plan is simple:

1. Keep the types in `types/`.
2. Fetch the real data inside the web app (`apps/web/hooks`).
3. Delete the mock file from `data/`.

## How to add a new rule

The generic rule engine is no longer in this package. It was extracted to `@isola-node/rule-engine`.

This means the farm-specific business rules (thresholds, conditions) now live in the web app.

To add or modify a rule:

1. Go to `apps/web/hooks/useTodayEngine.ts` (or `useRecommendations.ts`).
2. Add a new object to the rules array (like `SICILIA_RULES`) using the `EngineRule` format.
3. If your new rule needs a data point that doesn't exist yet (e.g., "soil pH"), add it to the `EngineEvidence` type in `packages/core/src/types/rule-engine.types.ts`.
