# SikeliaSoil

An open-source, local-first platform for soil monitoring and regenerative agriculture.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://react.dev/)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://pnpm.io/)

SikeliaSoil connects to local IoT sensors and Copernicus satellite data. It stores everything locally and uses a deterministic rule engine to evaluate soil health. No cloud required.

Most agritech tools lock your data in their servers and assume you are growing a specific crop. SikeliaSoil is different:

1. It works entirely offline.
2. Your data stays on your device.
3. It doesn't care what you are growing. The app doesn't know what an olive tree is. You create "Zones" and define the metrics yourself, and the UI renders the data based on your configuration.

---

## Why this exists

We built this because we needed it for our own farm in Sicily. Most tools are designed for large industrial farms with constant internet access. We don't have that.

We needed a way to monitor soil biology (fungi, carbon, moisture) in remote areas. Because the system doesn't hardcode specific crops, it adapts to whatever you have planted—whether it's a forest, a vegetable garden, or a fallow field.

---

## Monorepo Architecture

This repository is a **pnpm workspace**. The frontend and the backend logic are split into independent packages to keep the code modular.

```text
sicilia-soil/
├── apps/
│   └── web/              Next.js 16 application (UI and Server Actions)
│
├── packages/
│   ├── core/             Types, mock data, locales, and domain configurations
│   ├── db/               libSQL + Drizzle ORM (Database connection and schema)
│   ├── ui/               Reusable React components (Charts, Cards, etc.)
│   └── utils/            Pure business logic (Symbiosis score, notification helpers)
│
├── pnpm-workspace.yaml
└── package.json
```

_(Note: The backend infrastructure for syncing data with edge devices and the generic rule engine is extracted into a separate repository: [`isola-node-protocol`](https://github.com/carmen-buendia/isola-node-protocol).)_

### Package Responsibilities

| Package                   | Responsibility                                                                                                |
| :------------------------ | :------------------------------------------------------------------------------------------------------------ |
| **`@sicilia-soil/core`**  | TypeScript interfaces (`CropSystem`, `CropObservation`), static locales, and preset configurations. No React. |
| **`@sicilia-soil/db`**    | Database schema, Drizzle ORM setup, and libSQL/Turso connection management.                                   |
| **`@sicilia-soil/ui`**    | Pure presentational React components (ECharts wrappers, DataCards). No business logic.                        |
| **`@sicilia-soil/utils`** | Pure TypeScript functions (e.g., calculating the Symbiosis score). Runs on client and server.                 |
| **`apps/web`**            | The Next.js App Router application. Routing, React Context providers, and Server Actions.                     |

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

_(Note: Turbopack is disabled in the dev script on Windows to prevent memory panics. We use Webpack for stability)._

### Linting & Type Checking

We use ESLint 9 with the Flat Config and strict TypeScript rules to ensure code quality.

```bash
pnpm --filter web lint
pnpm --filter web type-check
```

---

## Tech Stack

| Layer                 | Technology                                                 |
| :-------------------- | :--------------------------------------------------------- |
| **Frontend**          | Next.js 16 (App Router), React 18.3.1, TailwindCSS         |
| **State Management**  | React Context + custom hooks (persisted in `localStorage`) |
| **Charts**            | Apache ECharts                                             |
| **Backend / API**     | Next.js Server Actions                                     |
| **Database**          | libSQL / Turso                                             |
| **Earth Observation** | Copernicus (Sentinel-1, 2, 3), NASA GIBS                   |
| **Monorepo**          | pnpm Workspaces                                            |

> **Note on React Version:** We use React 18.3.1 because it has better ecosystem stability with ECharts right now. Next.js 16 deprecates React 18 in favor of React 19; we will migrate once all charting dependencies are fully validated.

---

## Database Strategy

Right now, we use **Turso Cloud** because it makes iteration easy. But Turso is built on **libSQL** (an open-source fork of SQLite), which means:

1. **You are not locked in**: The code is 100% portable.
2. **Self-hosting is easy**: If we want, we can move the database to a local `sqld` instance on a VPS without changing a single line of application code.
3. **Offline-first**: libSQL supports embedded replicas, which is exactly what we need to run the app on edge devices in areas with poor connectivity.

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
