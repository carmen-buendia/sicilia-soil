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

### Environment Variables

The app connects to a **local-first** libSQL/SQLite database and signs auth sessions with a secret. During development we use **Turso Cloud as a temporary convenience**, but SikeliaSoil is designed to be **offline-first**: once the app is finalized it will **not depend on any cloud service**. See "Database Strategy" below.

- **Turso is a development shortcut, not a commitment.**
- The final target is a **local `libSQL`/`sqld` instance** (or an embedded replica) running on the edge device itself, with **no network dependency**.
- Switching from Turso to a local database requires **only an env variable change** — no code changes.

#### 1. Create the file

Next.js only reads environment files from the app directory (`apps/web/`), **not from the monorepo root** and **not from `packages/db/`**.

```bash
cp apps/web/.env.example apps/web/.env.local
```

#### 2. Fill in the values

Two supported modes — pick one. **Both require `AUTH_SECRET`.**

**A. Offline / local-first (final target, recommended for real use):**

```env
# apps/web/.env.local
TURSO_DATABASE_URL=file:./local.db
TURSO_AUTH_TOKEN=
AUTH_SECRET=<random-32-byte-string>
```

**B. Turso Cloud (temporary, for fast iteration during early development):**

```env
# apps/web/.env.local
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-turso-auth-token
AUTH_SECRET=<random-32-byte-string>
```

Generate `AUTH_SECRET` with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> **Turso is temporary.** It exists only to make iteration faster while the schema and Server Actions are still changing. The finalized app must run offline. Do not build features that assume Turso Cloud is present.

#### 3. Variable reference

| Variable             | Required | Owner         | Description                                                                                                       |
| :------------------- | :------: | :------------ | :---------------------------------------------------------------------------------------------------------------- |
| `TURSO_DATABASE_URL` |   Yes    | `packages/db` | libSQL connection URL. `file:./local.db` for offline/local, `libsql://…` for Turso Cloud or a self-hosted `sqld`. |
| `TURSO_AUTH_TOKEN`   |    !     | `packages/db` | Auth token **only for Turso Cloud**. Leave empty for `file:` URLs and open `sqld`.                                |
| `AUTH_SECRET`        |   Yes    | `apps/web`    | Secret used to sign auth sessions (login). Any long random string (≥ 32 bytes).                                   |

#### 4. Where to get Turso credentials (temporary mode only)

Skip if using mode **A** (`file:./local.db`).

- `curl -sSfL https://get.tur.so/install.sh | bash`
- `turso auth login`
- `turso db create sicilia-soil`
- `turso db show sicilia-soil --url` → `TURSO_DATABASE_URL`
- `turso db tokens create sicilia-soil` → `TURSO_AUTH_TOKEN`

#### 5. Important notes

- `apps/web/.env.local` is **git-ignored** and must **never be committed**.
- Do **not** place the file in the monorepo root — Next.js will not load it.
- Do **not** place it in `packages/db/` — `packages/db` receives the variables through `apps/web` at runtime.
- After creating or editing `.env.local`, **restart `pnpm dev`**. Next.js does not hot-reload environment variables reliably.
- Server-only variables (like these) must **not** be prefixed with `NEXT_PUBLIC_`.
- **Turso-specific features must not leak into the codebase.** The migration path to a fully local database must remain a one-line env change.

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

> **Turso is temporary — the app is offline-first.**
>
> We use **Turso Cloud** during early development purely because it makes iteration fast while the schema is still moving. It is **not** a long-term dependency and it is **not** how the finalized app will run.
>
> The final deployment target is a **local `libSQL` / `sqld` instance (or an embedded replica)** running on the device itself, with **zero cloud dependency**. Because Turso is built on `libSQL` (an open-source SQLite fork), the application code is already portable and switching between the two requires only an environment variable change:
>
> | Mode                         | `TURSO_DATABASE_URL`           | `TURSO_AUTH_TOKEN` |
> | :--------------------------- | :----------------------------- | :----------------- |
> | Local file (offline, target) | `file:./local.db`              | _(empty)_          |
> | Self-hosted `sqld` (target)  | `libsql://your-sqld-host:8080` | _(empty / custom)_ |
> | Turso Cloud (temporary, dev) | `libsql://your-db.turso.io`    | `<token>`          |
>
> **Rule of thumb for contributors:** if a change only works because Turso Cloud is reachable, it is wrong. The app must keep working offline.
>
> See [Environment Variables](#environment-variables) for the setup.

---

## License

Apache License 2.0 — see [LICENSE](./LICENSE).

---

## Contact

**Carmen María Buendía Sánchez**  
Founder & Lead Developer  
[carmenbuendiafullstack@gmail.com](mailto:carmenbuendiafullstack@gmail.com)  
[GitHub Profile](https://github.com/carmen-buendia)
