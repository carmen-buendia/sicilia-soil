// apps/web/components/features/crops/SystemTab.tsx
"use client";

import type { CropSystem } from "@sicilia-soil/core";
import { HerbaceousRenderer } from "../renderers/HerbaceousRenderer";
import { MixedRenderer } from "../renderers/MixedRenderer";
import { WoodyRenderer } from "../renderers/WoodyRenderer";
import { CoverFallowRenderer } from "../renderers/CoverFallowRenderer";

const RENDERERS = {
  herbaceous: HerbaceousRenderer,
  woody: WoodyRenderer,
  mixed: MixedRenderer,
  "cover-fallow": CoverFallowRenderer,
} as const;

export function SystemTab({ system }: { system: CropSystem }) {
  const Renderer = RENDERERS[system.template];
  return <Renderer system={system} />;
}
