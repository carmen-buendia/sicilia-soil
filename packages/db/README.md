# @sicilia-soil/db

Database layer for Sicilia Soil, built with [Drizzle ORM](https://orm.drizzle.team).

## Stack

| Layer | Technology |
| :--- | :--- |
| ORM | Drizzle ORM |
| Dev DB | SQLite (`better-sqlite3`) |
| Prod DB | Postgres (planned, 2027) |
| Migrations | drizzle-kit |

## Scripts

- `pnpm db:generate` — Generate SQL migrations from schema changes
- `pnpm db:migrate` — Apply pending migrations
- `pnpm db:push` — Push schema directly (dev only, skips migrations)
- `pnpm db:studio` — Open Drizzle Studio (GUI)
- `pnpm db:seed` — Seed the database with initial data

## Structure
packages/db/
├── data/ ← SQLite file lives here (gitignored)
├── src/
│ ├── client.ts ← Drizzle client + connection
│ ├── index.ts ← Public exports
│ ├── schema/ ← Table definitions
│ └── seed/ ← Initial data (farm, species)
├── drizzle.config.ts ← drizzle-kit configuration
└── drizzle/ ← Generated SQL migrations




