// packages/decision/src/adapter.ts
// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Sicilia Soil Contributors

import type { InputConflict } from "./types";

export interface EvidenceAdapter<TEvidence> {
  read(evidence: TEvidence, path: string): number | undefined;
  detectConflicts?(evidence: TEvidence): InputConflict[];
  sourcesUsed?(evidence: TEvidence): string[];
}
