# @sicilia-soil/web

//TODO: I need to refactor this file to adapt it to the new website; this content has become deprecated.

> Next.js frontend — the SikeliaSoil DSS.

---

## Structure

```
apps/web/
├── app/                          Next.js App Router
│   ├── page.tsx                  Dashboard
│   ├── soil-health/              Soil biology (T2)
│   │   ├── page.tsx
│   │   └── tabs/                 Resumen · Biorremediación · Redes · Bioindicadores
│   ├── water/                    Water efficiency (T3)
│   ├── ground-cover/             Crops
│   │   └── tabs/                 Esparto · Policultivo · Cereal · Cubiertas · Análisis
│   ├── recommendations/          Actionable recommendations
│   ├── notifications/            Alerts
│   ├── configuration/            Settings
│   ├── about/                    About
│   ├── manifesto/                Manifesto
│   └── layout.tsx                Root layout with Navbar and Footer
│
├── components/
│   ├── features/                 Feature-specific components
│   │   ├── copernicus/
│   │   ├── dashboard/            Dashboard cards + server status
│   │   ├── ground-cover/         Crops
│   │   ├── notifications/        Bell + panel
│   │   ├── recommendations/      List + card
│   │   ├── shared/               Shared domain components (SoilChart, SymbiosisCard, CycleDiagram)
│   │   └── soil-health/
│   └── layout/                   Navbar, Footer
│
├── hooks/                        All React hooks
│   ├── useCerealData.ts
│   ├── useCoverFallowData.ts
│   ├── useDashboardData.ts
│   ├── useEspartoData.ts
│   ├── useWaterData.ts
│   ├── useLightData.ts
│   ├── useNotifications.ts
│   ├── usePolycultureData.ts
│   ├── useRecommendations.ts
│   └── useTemperatureData.ts
│
└── contexts/
    └── NotificationsContext.tsx
```

---

## Pages

| Route              | Description                                                   |
| :----------------- | :------------------------------------------------------------ |
| `/`                | Dashboard with mini-map, KPIs and alerts                      |
| `/soil-health`     | Soil biology: symbiosis, bioremediation, mycorrhizal networks |
| `/water`           | Water efficiency: soil moisture, irrigation, drought          |
| `/ground-cover`    | Crops: esparto, polyculture, cereal, covers, fallow           |
| `/recommendations` | Actionable recommendations                                    |
| `/notifications`   | Alerts and history                                            |
| `/configuration`   | Settings                                                      |
| `/about`           | About the project                                             |
| `/manifesto`       | Why the project exists                                        |

---

## Data flow

```
apps/web/hooks/useXxxData.ts
        ↓
@sicilia-soil/core (types + mock data)
        ↓
@sicilia-soil/utils (engines)
        ↓
Components (features/)
```

Once the backend is ready, hooks will fetch from `/api/*` instead of reading from `@sicilia-soil/core/data`.

---

## Environment

This app connects to a **local-first** libSQL/SQLite database and signs auth sessions with a secret. **Turso Cloud is used temporarily during development only** — the finalized app must run **offline**, with no cloud dependency. See the root [`README.md`](../../README.md#database-strategy).

### Setup

**You must create `apps/web/.env.local` before running `pnpm dev`.**

```bash
cp .env.example .env.local
```

### Two supported modes (both require `AUTH_SECRET`)

**A. Offline / local-first — the final target:**

```env
TURSO_DATABASE_URL=file:./local.db
TURSO_AUTH_TOKEN=
AUTH_SECRET=<random-32-byte-string>
```

**B. Turso Cloud — temporary, fast iteration only:**

```env
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-token
AUTH_SECRET=<random-32-byte-string>
```

Generate `AUTH_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Variable reference

| Variable             | Description                                                                        |
| :------------------- | :--------------------------------------------------------------------------------- |
| `TURSO_DATABASE_URL` | `file:./local.db` for offline, `libsql://…` for Turso Cloud or self-hosted `sqld`. |
| `TURSO_AUTH_TOKEN`   | Turso Cloud token only. Leave empty for local / self-hosted.                       |
| `AUTH_SECRET`        | Secret for signing auth sessions. Any long random string (≥ 32 bytes).             |

### Rules

> **Do not** place `.env.local` at the monorepo root or in `packages/db/`. Next.js only loads environment files from `apps/web/`.
>
> **Turso is temporary.** Do not write code that depends on Turso Cloud being present. Any feature must keep working with `file:./local.db`.

The `dev` script runs `scripts/check-env.mjs` first and **fails fast with a clear message** if `apps/web/.env.local` is missing or incomplete.

---

## Development

```bash
pnpm --filter=web dev
```

Runs on http://localhost:3000.

---

## Build

```bash
pnpm --filter=web build
```

---

## Conventions

- **Server Components by default.** Use `"use client"` only when needed.
- **Hooks in `hooks/`.** No hooks inside components.
- **Feature folders.** Group components by domain, not by type.
- **No data in components.** All data comes from hooks.
- **Env files live in `apps/web/` only.** Never commit `.env.local`.
- **No cloud assumptions.** The app must work with `TURSO_DATABASE_URL=file:./local.db`.
