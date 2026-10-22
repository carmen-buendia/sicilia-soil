## Deuda técnica conocida

- [ ] `pnpm@8.15.0`: migrar a pnpm 10.x. Implica mover `pnpm.overrides` de
      `package.json` a `pnpm-workspace.yaml` y revisar `onlyBuiltDependencies`.
- [ ] Vulnerabilidades sin fix:
  - `braces@3.0.3`: sin versión parcheada. Dev-only (eslint), impacto real 0.
  - `echarts@5.5.1`: XSS moderada. Riesgo bajo si los datos son internos.
    Evaluar subir a 6.x cuando haya tiempo para probar los gráficos.
  - `esbuild@0.18.20`: dev-only vía drizzle-kit. Riesgo bajo.
- [ ] Migrar a React 19 antes de actualizar a Next.js 17.
      echarts-for-react (verificar), @types/react (actualizar).
- [ ] Eliminar types legacy huérfanos:
  - `packages/core/src/types/farm.types.ts` → `FarmConfig` (deprecated, usar `Farm` de spatial.types)
  - `packages/core/src/types/monitoring.types.ts` → `ZoneConfig` (legacy site.config)
  - Renombrar `SiteZoneConfig` → `ZoneConfig` una vez eliminados.
- [ ] `content/mock/recommendation-inputs.ts`: pasar de un único
      input global a un Record por zoneId, y que recommendations/page
      corra el motor por zona (como en el resto del proyecto).
