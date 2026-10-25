# @sicilia-soil/db

Database layer for SikeliaSoil, built with [Drizzle ORM](https://orm.drizzle.team) and [libSQL](https://github.com/tursodatabase/libsql) (Turso).

## Stack

| Layer      | Technology     |
| :--------- | :------------- |
| ORM        | Drizzle ORM    |
| Database   | libSQL (Turso) |
| Migrations | drizzle-kit    |

## Environment Variables

To connect to the database, you need to set the following variables in your `apps/web/.env.local` file (or in your Vercel project settings):

```env
TURSO_DATABASE_URL=libsql://your-database-url.turso.io
TURSO_AUTH_TOKEN=your-auth-token
```

## Scripts

- `pnpm db:generate` — Generate SQL migrations from schema changes.
- `pnpm db:migrate` — Apply pending migrations to the Turso database.
- `pnpm db:push` — Push schema directly (dev only, skips migrations).
- `pnpm db:studio` — Open Drizzle Studio (GUI) to inspect the database.

## Structure

```text
packages/db/
├── src/
│   ├── client.ts          ← Drizzle client + libSQL/Turso connection
│   ├── index.ts           ← Public exports
│   ├── queries.ts         ← Reusable database queries
│   └── schema/            ← Table definitions
├── drizzle.config.ts      ← drizzle-kit configuration
└── drizzle/               ← Generated SQL migrations
```

## Migrations

This package uses `drizzle-kit` to generate and apply migrations. When you change a table in `src/schema/`, run the following commands from the root of the monorepo:

pnpm --filter @sicilia-soil/db db:generate
pnpm --filter @sicilia-soil/db db:migrate

### Data Sovereignty

While the MVP uses Turso Cloud for rapid iteration, the database layer is built on **libSQL** (an MIT-licensed, open-source fork of SQLite). This ensures that the infrastructure remains 100% portable. In future phases, the database can be migrated to a self-hosted `sqld` instance on a European VPS without changing a single line of application code, guaranteeing full data sovereignty.

---

## License

Apache 2.0 — see [LICENSE](../../LICENSE).
