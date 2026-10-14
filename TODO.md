## Deuda técnica conocida

- [x] ~~`apps/web/next.config.js`: `reactStrictMode: false`~~ — **Resuelto**.
      Era workaround al bug de react-leaflet v4 (#1073). Al migrar a MapLibre GL
  - react-map-gl, `reactStrictMode` volvió a `true` sin efectos negativos.

- [ ] `apps/web/scripts/copy-maplibre-workers.mjs`: workaround al bug de
      `import.meta.url` en Turbopack. Revisar cuando MapLibre lo resuelva upstream.

- [ ] `maplibre-gl@6.x`: verificar si futuras versiones resuelven el worker
      sin copia manual a `public/`.

- [ ] `pnpm@8.15.0`: migrar a pnpm 10.x. Implica mover `pnpm.overrides` de
      `package.json` a `pnpm-workspace.yaml` y revisar `onlyBuiltDependencies`.

- [ ] Vulnerabilidades sin fix:
  - `braces@3.0.3`: sin versión parcheada. Dev-only (eslint), impacto real 0.
  - `echarts@5.5.1`: XSS moderada. Riesgo bajo si los datos son internos.
    Evaluar subir a 6.x cuando haya tiempo para probar los gráficos.
  - `esbuild@0.18.20`: dev-only vía drizzle-kit. Riesgo bajo.
- [ ] Migrar a React 19 antes de actualizar a Next.js 17.
      Requiere verificar: react-leaflet (ya no se usa), react-map-gl (compatible),
      echarts-for-react (verificar), @types/react (actualizar).
- [ ] Eliminar types legacy huérfanos:
  - `packages/core/src/types/farm.types.ts` → `FarmConfig` (deprecated, usar `Farm` de spatial.types)
  - `packages/core/src/types/monitoring.types.ts` → `ZoneConfig` (legacy site.config)
  - Renombrar `SiteZoneConfig` → `ZoneConfig` una vez eliminados.
