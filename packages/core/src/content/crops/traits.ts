import type { CropTrait } from "../types/content.types";

//rasgos de cultivos
export const CROP_TRAITS: readonly CropTrait[] = [
  "nitrogen-fixer",
  "drought-tolerant",
  "heavy-feeder",
  "warm-season",
  "cool-season",
  "bioremediation",
  "pioneer",
] as const;
