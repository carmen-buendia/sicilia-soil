# @sicilia-soil/ui

> Reusable React components. No domain logic.

---

## Structure

```
packages/ui/src/
├── components/
│   ├── Button.tsx              Button with variants
│   ├── Chip/
│   │   └── Chip.tsx            Selectable chip
│   └── Charts/
│       ├── MycologyChart.tsx   ECharts line chart for mushroom conditions
│       └── index.ts
└── index.ts                    Public API
```

---

## Usage

```tsx
import { Button, Chip, MycologyChart } from "@sicilia-soil/ui";
```

---

## Chart components

Chart components wrap **ECharts** with a consistent theme.

- `MycologyChart` — line chart for mushroom conditions (humidity, temperature, CO2).

For domain-specific charts (SoilChart, YearCycleChart) see `apps/web/components/features/shared/`.

---

## Conventions

- **No domain logic.** A button is a button.
- **No data fetching.** Components receive props, they do not fetch.
- **TypeScript first.** All components are typed.
- **TailwindCSS** for styling.

---

## Adding a new component

1. Create `src/components/YourComponent.tsx`.
2. Export from `src/index.ts`.
3. If it is a chart, place it in `src/components/Charts/`.
