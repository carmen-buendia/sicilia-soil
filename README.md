# SikeliaSoil

An open-source, crop-agnostic platform for soil regeneration and water efficiency in Mediterranean and continental agroecosystems.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://pnpm.io/)

SikeliaSoil is a decision-support system (DSS) that fuses in-situ IoT soil sensors with Copernicus Earth Observation data to help small and medium-sized farms regenerate their soil through the mycorrhizal network.

The platform is developed in Sicily (Italy) and is designed to be **offline-first** and **data-sovereign**, ensuring that farmers own their environmental data.

---

## Why SikeliaSoil exists

Modern agriculture has spent decades extracting from the soil. SikeliaSoil does the opposite: it measures, visualises and acts on the **fungal network** that regenerates soil, retains water and captures carbon.

The platform works with any crop (esparto, cereal, olive, almond, carob, vegetables, cover crops) — it is **crop-agnostic**. It also monitors the **bioremediation** of degraded areas (e.g., historical illegal burning sites) using native fungi and esparto cover.

---

## Monorepo Architecture

This repository is a **pnpm workspace**. It is organised so that each package has a clear responsibility, ensuring modularity, testability, and reusability across applications.

```text
sicilia-soil/
├── apps/
│   └── web/              Next.js 16 application (DSS UI & Server Actions)
│
├── packages/
│   ├── core/             Types, mock data, constants, and Sikelia domain rules
│   │   └── src/rules/    Sikelia's specific implementation of the rule engine
│   ├── rule-engine/      Generic, domain-agnostic, explainable rule engine
│   ├── db/               libSQL + Drizzle ORM (Edge-ready)
│   ├── edge/             (Planned) Constrained device runtime
│   ├── sync/             (Planned) Offline-first sync protocol (MQTT/CoAP)
│   ├── ui/               Reusable React components (charts, cards, badges)
│   └── utils/            Pure domain engines (recommendations, symbiosis)
│
├── pnpm-workspace.yaml
└── package.json
```

### Package Responsibilities

| Package                       | Responsibility                                                                                                    |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| **`@sicilia-soil/core`**      | Single source of truth for types, mock data, configuration, and domain-specific rules. No React, no side effects. |
| **`@isola-node/rule-engine`** | Domain-agnostic, deterministic, and explainable rule engine. Zero dependencies, pure TypeScript.                  |
| **`@sicilia-soil/utils`**     | Pure logic and engines. No React. Consumable from both client and server.                                         |
| **`@sicilia-soil/ui`**        | Reusable React components. No domain logic.                                                                       |
| **`@sicilia-soil/db`**        | Database schema, Drizzle ORM configuration, and libSQL/Turso connection management.                               |
| **`apps/web`**                | The Next.js application. Routes, Server Actions, hooks, and feature-specific components.                          |

### Rule of thumb

- **Data & Domain Rules** (types, constants, Sikelia rules) → `packages/core`
- **Generic Infrastructure** (rule engines, sync protocols) → `packages/rule-engine`, `packages/sync`
- **Reusable UI** (Buttons, charts, badges) → `packages/ui`
- **App-specific code** (pages, hooks, Server Actions) → `apps/web`

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

To start the Next.js application (which includes both the UI and the backend logic via Server Actions):

```bash
pnpm --filter web dev
```

_(Note: Turbopack has been disabled in the dev script by default on Windows to prevent internal memory panics. Webpack is used for stability)._

### Build

```bash
pnpm build
```

---

## Documentation

- [`packages/core/README.md`](packages/core/README.md) — Types, mock data, and domain rules
- [`packages/rule-engine/README.md`](packages/rule-engine/README.md) — Explainable rule engine
- [`packages/utils/README.md`](packages/utils/README.md) — Domain engines
- [`packages/ui/README.md`](packages/ui/README.md) — Reusable components
- [`apps/web/README.md`](apps/web/README.md) — Frontend application

---

## Tech Stack

| Layer             | Technology                                     |
| :---------------- | :--------------------------------------------- |
| **Frontend**      | Next.js 16 (App Router), React 18, TailwindCSS |
| **Charts**        | ECharts                                        |
| **Backend / API** | Next.js Server Actions (Serverless)            |
| **Database**      | libSQL / Turso (persistent, edge-ready)        |
| **EO Data**       | Copernicus (Sentinel-1, 2, 3), NASA GIBS       |
| **Weather**       | Open-Meteo (planned)                           |
| **Monorepo**      | pnpm Workspaces                                |

---

## Database Strategy & Data Sovereignty

SikeliaSoil is built on the principles of the **Open Internet Stack**. To ensure **Data Sovereignty**, we avoid proprietary cloud lock-in (such as AWS or Google Cloud).

**Why Turso for the MVP?**
During the prototyping phase, the platform uses **Turso Cloud** for rapid iteration and high availability. However, Turso is built on **libSQL** (an MIT-licensed, open-source fork of SQLite). This is a strategic choice:

1. **Zero Vendor Lock-in**: The code is 100% portable.
2. **Path to Self-Hosting**: In the next phase, the database can be migrated to a self-hosted `sqld` instance on a European VPS (e.g., Hetzner) without changing a single line of application code.
3. **Offline-First Ready**: libSQL is designed to work with embedded replicas, which aligns perfectly with our vision of offline-capable edge devices in rural areas.

---

## License

Apache License 2.0 — see [LICENSE](./LICENSE).

---

## Contact

**Carmen María Buendía Sánchez**  
Founder & Lead Developer  
[carmenbuendiafullstack@gmail.com](mailto:carmenbuendiafullstack@gmail.com)  
[GitHub Profile](https://github.com/carmen-buendia)
