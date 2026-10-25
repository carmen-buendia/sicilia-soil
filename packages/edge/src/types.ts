// packages/edge/src/types.ts
// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Carmen Maria Buendia Sanchez

import type {
  BufferedEvent,
  SyncConfig,
  SyncTransport,
} from "@isola-node/sync";
import type { DecisionRule, DecisionOutput } from "@sicilia-soil/rule-engine";

export type DeviceClass = "rpi" | "esp32" | "esp8266" | "generic";

export interface EdgeDeviceConfig {
  deviceId: string;
  deviceClass: DeviceClass;
  sync: SyncConfig;
  sensorPollingIntervalMs: number;
  bufferCapacity: number;
  runLocalRules: boolean;
  metadata?: Record<string, unknown>;
}

export interface SensorDriver<TPayload = number> {
  readonly sensorId: string;
  readonly unit: string;
  readonly intervalMs: number;
  read(): Promise<BufferedEvent<TPayload>>;
}

export interface EdgeRule {
  id: string;
  label: string;
  rule: DecisionRule;
  onFire?: (output: DecisionOutput) => Promise<void>;
}

export type EdgeRuntimeStatus =
  | "starting"
  | "running"
  | "degraded"
  | "offline"
  | "stopped"
  | "error";

export interface EdgeRuntimeState {
  status: EdgeRuntimeStatus;
  startedAt?: string;
  lastSensorReadAt?: string;
  lastSyncAt?: string;
  bufferedEventCount: number;
  uptimeSeconds: number;
  lastError?: string;
}

export interface EdgeStorage {
  init(): Promise<void>;
  saveEvent(event: BufferedEvent): Promise<void>;
  getPendingEvents(limit: number): Promise<BufferedEvent[]>;
  markSynced(eventIds: string[]): Promise<void>;
  close(): Promise<void>;
}

export interface GnssProvider {
  readonly available: boolean;
  getCurrentPosition(): Promise<{
    latitude: number;
    longitude: number;
    accuracyM: number;
    capturedAt: string;
  } | null>;
}

export interface EdgeRuntime {
  start(config: EdgeDeviceConfig): Promise<void>;
  stop(): Promise<void>;
  getState(): EdgeRuntimeState;
  registerSensor(sensor: SensorDriver): Promise<void>;
  registerRule(rule: EdgeRule): Promise<void>;
}

export type EdgeTransportPreference = {
  preferred: SyncTransport;
  fallback?: SyncTransport;
};
