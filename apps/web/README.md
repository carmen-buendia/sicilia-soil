# @sicilia-soil/web

> Next.js frontend — the MycoMesh Protocol DSS.

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
│   │   ├── copernicus/           Map + widget (Copernicus EO)
│   │   ├── dashboard/            Dashboard cards + server status
│   │   ├── ground-cover/         Crops
│   │   ├── notifications/        Bell + panel
│   │   ├── recommendations/      List + card
│   │   ├── shared/               Shared domain components (SoilChart, SymbiosisCard, CycleDiagram)
│   │   └── soil-health/          MushroomCard
│   └── layout/                   Navbar, Footer, SicilianFlag
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
