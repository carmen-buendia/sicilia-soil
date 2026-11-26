# @sicilia-soil/db

Database layer for SikeliaSoil, built with [Drizzle ORM](https://orm.drizzle.team)
and [libSQL](https://github.com/tursodatabase/libsql) (Turso).

> **Turso is temporary. The app is offline-first.**
>
> SikeliaSoil uses **Turso Cloud only during early development** because it
> speeds up iteration while the schema is still moving. It is **not** the final
> deployment target and it is **not** a dependency of the architecture.
>
> The finalized app runs against a **local `libSQL`/SQLite database** (a
> `file:` URL, or a self-hosted `sqld` instance on the edge device) with
> **zero cloud dependency**. Because libSQL is an open-source SQLite fork, the
> code is 100% portable: switching from Turso to a local database is a
> **one-line env change**, no code changes required.

## Stack

| Layer      | Technology                   |
| :--------- | :--------------------------- |
| ORM        | Drizzle ORM                  |
| Database   | libSQL (Turso — _temporary_) |
| Migrations | drizzle-kit                  |

## Environment Variables

This package does **not** read `.env` files directly. It receives the
variables at runtime from the host application (`apps/web`), which loads them
from **`apps/web/.env.local`**.

| Variable             | Description                                                                                           |
| :------------------- | :---------------------------------------------------------------------------------------------------- |
| `TURSO_DATABASE_URL` | libSQL connection URL. `file:./local.db` (offline, final target), `libsql://…` (Turso Cloud or sqld). |
| `TURSO_AUTH_TOKEN`   | Token **only for Turso Cloud**. Leave empty for `file:` URLs and open `sqld`.                         |

> **Do not** create `.env.local` inside `packages/db/`. Next.js does not
> load it from there. All environment files live in `apps/web/`.
>
> `AUTH_SECRET` is **not** a database variable — it belongs to `apps/web`
> (auth). See the root `README.md`.

For setup instructions (including how to switch between offline mode and
Turso Cloud), see the root
[`README.md` → Environment Variables](../../README.md#environment-variables).

## Scripts

- `pnpm db:generate` — Generate SQL migrations from schema changes.
- `pnpm db:migrate` — Apply pending migrations to the configured database.
- `pnpm db:push` — Push schema directly (dev only, skips migrations).
- `pnpm db:studio` — Open Drizzle Studio (GUI) to inspect the database.

All scripts target whichever `TURSO_DATABASE_URL` is set: a local file, a
self-hosted `sqld`, or Turso Cloud. No script assumes Turso.

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

This package uses `drizzle-kit` to generate and apply migrations. When you
change a table in `src/schema/`, run the following commands from the root of
the monorepo:

```bash
pnpm --filter @sicilia-soil/db db:generate
pnpm --filter @sicilia-soil/db db:migrate
```

## Data Sovereignty

The database layer is built on **libSQL** (an MIT-licensed, open-source fork of
SQLite). This is deliberate:

- **No lock-in.** Turso Cloud is a temporary convenience. The same code runs
  against a `file:` database or a self-hosted `sqld` with **zero changes**.
- **Offline-first.** libSQL supports **embedded replicas**, which is exactly
  what SikeliaSoil needs to run on edge devices in areas with poor or no
  connectivity.
- **European data sovereignty.** In the final phase the database runs entirely
  on-premise / on-device. No user data leaves the farm.

**Contributor rule:** if a change only works because Turso Cloud is reachable,
it is wrong. Every query must work with `TURSO_DATABASE_URL=file:./local.db`.

## License

Apache 2.0 — see [LICENSE](../../LICENSE).
