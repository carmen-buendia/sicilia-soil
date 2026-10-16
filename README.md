# MycoMesh Protocol

> An open-source, crop-agnostic platform for soil regeneration and water efficiency in Mediterranean and continental agroecosystems.

MycoMesh Protocol is a decision-support system (DSS) that fuses in-situ IoT soil sensors with Copernicus Earth Observation data to help small and medium-sized farms regenerate their soil through the mycorrhizal network.

The platform is developed in Sicily (Italy).

---

## Why MycoMesh Protocol exists

Modern agriculture has spent decades extracting from the soil. MycoMesh Protocol does the opposite: it measures, visualises and acts on the **fungal network** that regenerates soil, retains water and captures carbon.

The platform works with any crop (esparto, cereal, olive, almond, carob, vegetables, cover crops) — it is **crop-agnostic**. It also monitors the **bioremediation** of degraded areas (e.g. historical illegal burning sites) using native fungi and esparto cover.

---

## Monorepo architecture

This repository is a **pnpm workspace**. It is organised so that each package has a clear responsibility and can be reused across applications.

```

sicilia-soil/
├── apps/
│ ├── web/ Next.js 16 frontend (the DSS)
│ └── backend/ Express API + socket.io
│
├── packages/
│ ├── core/ Types, mock data, constants, config
│ │ └── src/decision/ MycoMesh Protocol's implementation of the decision engine
│ ├── decision/ Generic, domain-agnostic rule engine (reusable)
│ ├── db/ libSQL + Drizzle ORM + sql.js
│ ├── edge/ (planned) edge computing layer
│ ├── sync/ (planned) offline-first sync
│ ├── ui/ Reusable React components (charts, cards, badges)
│ └── utils/ Pure domain engines (recommendations, symbiosis, notifications)
│
├── pnpm-workspace.yaml
└── package.json

```

### Package responsibilities

| Package                   | Responsibility                                                                            |
| :------------------------ | :---------------------------------------------------------------------------------------- |
| **`@sicilia-soil/core`**  | Single source of truth for types, mock data and configuration. No React, no side effects. |
| **`@sicilia-soil/utils`** | Pure logic and engines. No React. Consumable from frontend and backend.                   |
| **`@sicilia-soil/ui`**    | Reusable React components. No domain logic.                                               |
| **`apps/web`**            | The Next.js app. Routes, hooks and feature-specific components.                           |
| **`apps/backend`**        | The API. Routes, services and database access.                                            |

### Rule of thumb

- **Data** (types, mock data, constants) → `packages/core`
- **Logic** (engines, calculations) → `packages/utils`
- **Reusable UI** (buttons, charts, badges) → `packages/ui`
- **App-specific code** (pages, hooks, feature components) → `apps/web`
- **Backend logic** (API, DB, integrations) → `apps/backend`

---

## Getting started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

```bash
git clone https://github.com/carmen-buendia/sicilia-soil.git
cd sicilia-soil
pnpm install
```

### Development

```bash
# Run the frontend
pnpm --filter=web dev

# Run the backend
pnpm --filter=backend dev

# Run both
pnpm dev
```

### Build

```bash
pnpm build
```

---

## Documentation

- [`packages/core/README.md`](packages/core/README.md) — Types, mock data and configuration
- [`packages/utils/README.md`](packages/utils/README.md) — Domain engines
- [`packages/ui/README.md`](packages/ui/README.md) — Reusable components
- [`apps/web/README.md`](apps/web/README.md) — Frontend application

---

## Tech stack

| Layer    | Technology                               |
| :------- | :--------------------------------------- |
| Frontend | Next.js 16, React, TailwindCSS           |
| Charts   | ECharts                                  |
| Maps     | Leaflet, Copernicus tiles                |
| State    | React hooks, Context                     |
| Backend  | Express 4                                |
| Database | SQLite → Postgres (planned)              |
| EO data  | Copernicus (Sentinel-1, 2, 3), NASA GIBS |
| Weather  | Open-Meteo (planned)                     |
| Monorepo | pnpm + Turborepo                         |

---

## License

Apache License 2.0 — see [LICENSE](./LICENSE).

---

## Contact

**Carmen María Buendía Sánchez**  
Founder & Lead Developer  
[carmenbuendiafullstack@gmail.com](mailto:carmenbuendiafullstack@gmail.com)  
https://github.com/carmen-buendia/sicilia-soil
