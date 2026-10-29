# SikeliaSoil

An open-source, **crop-agnostic** data infrastructure for soil regeneration and water efficiency in Mediterranean and continental agroecosystems.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://react.dev/)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://pnpm.io/)

SikeliaSoil is a **decision-support system (DSS) and data middleware** that fuses in-situ IoT soil sensors with Copernicus Earth Observation data. It provides a sovereign, offline-first infrastructure that helps farmers, cooperatives, and researchers regenerate their soil through the mycorrhizal network.

Designed with the principles of the **Open Internet Stack**, the platform ensures that users own their environmental data without proprietary cloud lock-in.

---

## Why SikeliaSoil exists

Modern agriculture has spent decades extracting from the soil. SikeliaSoil does the opposite: it measures, visualises, and acts on the **fungal network** that regenerates soil, retains water, and captures carbon.

Unlike traditional agritech ERPs that force users into rigid, crop-specific workflows, SikeliaSoil is built on a **schema-driven architecture**. The system does not know what an olive tree or esparto grass is. It only understands **Crop Systems** (Zones) and **Biological Metrics** (SHI, Mycorrhizal Colonisation, Glomalin).

It is the user who defines their agricultural systems (woody, herbaceous, mixed, cover/fallow) via a CRUD interface. The UI then dynamically renders the appropriate charts, tables, and alerts based on the system's template. This makes the infrastructure infinitely adaptable to any crop, region, or scale (from 1 zone to 100).

---

## Core Architectural Pillars

1. **Schema-Driven Rendering (Crop-Agnostic):** The frontend dynamically maps UI components (`HerbaceousRenderer`, `WoodyRenderer`, etc.) based on the data type, eliminating hardcoded crop logic.
2. **Data Sovereignty & Local-First:** Built on libSQL/SQLite, allowing for offline-first edge deployment and zero vendor lock-in. The user's data stays with the user.
3. **Open Data Aggregation:** A planned middleware layer to seamlessly normalise and ingest Copernicus (Sentinel-1, 2, 3) and IoT sensor data.
4. **Explainable Analytics:** Goes beyond raw numbers, providing context and actionable insights through a generic rule engine.

---

## Monorepo Architecture

This repository is a **pnpm workspace**, organised to ensure modularity, testability, and reusability.

```text
sicilia-soil/
├── apps/
│   └── web/              Next.js 16 application (DSS UI & Server Actions)
│
├── packages/
│   ├── core/             Types, domain rules, presets (e.g., cover-fallow), and locale
│   ├── rule-engine/      Generic, domain-agnostic, explainable rule engine
│   ├── db/               libSQL + Drizzle ORM (Edge-ready)
│   ├── sync/             (Planned) Offline-first sync protocol (MQTT/CoAP)
│   ├── edge/             (Planned) Constrained device runtime
│   ├── ui/               Reusable React components (charts, cards, badges)
│   └── utils/            Pure domain engines (recommendations, symbiosis)
│
├── pnpm-workspace.yaml
└── package.json
```

### Package Responsibilities

| Package                       | Responsibility                                                                                                            |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **`@sicilia-soil/core`**      | Single source of truth for types (`CropSystem`, `CropObservation`), mock data, configuration, and i18n locales. No React. |
| **`@isola-node/rule-engine`** | Domain-agnostic, deterministic rule engine. Zero dependencies, pure TypeScript.                                           |
| **`@sicilia-soil/utils`**     | Pure logic and engines (e.g., Symbiosis score calculation). Consumable from both client and server.                       |
| **`@sicilia-soil/ui`**        | Reusable React components (ECharts wrappers, data cards). No domain logic.                                                |
| **`@sicilia-soil/db`**        | Database schema, Drizzle ORM configuration, and libSQL/Turso connection management.                                       |
| **`apps/web`**                | The Next.js App Router application. Features (Crops, Soil Health), Context Providers, and Server Actions.                 |

---

## Getting Started

### Prerequisites

- Node.js 20+ (LTS recommended)
- pnpm 9+

### Installation

```bash
git clone https://github.com/carmen-buendia/sicilia-soil.git
cd sicilia-soil
pnpm install
```

### Development

To start the Next.js application:

```bash
pnpm --filter web dev
```

_(Note: Turbopack is currently disabled in the dev script on Windows to prevent internal memory panics. Webpack is used for stability)._

### Linting & Type Checking

We use ESLint 9 with the new Flat Config and strict TypeScript rules to ensure code quality.

```bash
pnpm --filter web lint
pnpm --filter web type-check
```

---

## Tech Stack

| Layer                | Technology                                                            |
| :------------------- | :-------------------------------------------------------------------- |
| **Frontend**         | Next.js 16 (App Router, Server Components), React 18.3.1, TailwindCSS |
| **State Management** | React Context + custom hooks (local-first via `localStorage`)         |
| **Charts**           | Apache ECharts                                                        |
| **Backend / API**    | Next.js Server Actions (Serverless)                                   |
| **Database**         | libSQL / Turso (persistent, edge-ready)                               |
| **EO Data**          | Copernicus (Sentinel-1, 2, 3), NASA GIBS                              |
| **Monorepo**         | pnpm Workspaces                                                       |

> **Note on React Version:** The project currently uses React 18.3.1 for maximum ecosystem stability. Next.js 16 deprecates React 18 in favor of React 19, so migrating to React 19 is planned for the next release cycle once all charting and UI dependencies are fully validated.

---

## Database Strategy & Open Internet Stack Alignment

SikeliaSoil is built to counter the trend of proprietary data silos in agriculture.

During the MVP phase, the platform uses **Turso Cloud** for rapid iteration. However, Turso is built on **libSQL** (an MIT-licensed, open-source fork of SQLite). This is a strategic choice:

1. **Zero Vendor Lock-in**: The code is 100% portable.
2. **Path to Self-Hosting**: The database can be migrated to a self-hosted `sqld` instance on a European VPS without changing a single line of application code.
3. **Offline-First Ready**: libSQL is designed to work with embedded replicas, aligning perfectly with our vision of offline-capable edge devices (e.g., in rural Sicily with poor connectivity).

---

## License

Apache License 2.0 — see [LICENSE](./LICENSE).

---

## Contact

**Carmen María Buendía Sánchez**
Founder & Lead Developer
[carmenbuendiafullstack@gmail.com](mailto:carmenbuendiafullstack@gmail.com)
[GitHub Profile](https://github.com/carmen-buendia)

```

```
