// packages/sync/src/types.ts
// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Carmen María Buendía Sánchez
// ============================================================================
// @isola-node/sync — Generic types
// ----------------------------------------------------------------------------
// Domain-agnostic. Works for any edge-to-cloud deployment in environments
// with intermittent connectivity (agriculture, environmental monitoring,
// disaster response, citizen science).
//
// Standards: MQTT 3.1.1/5.0, CoAP (RFC 7252), HTTP.
// Zero dependencies. Pure TypeScript.
// ============================================================================

// ---------------------------------------------------------------------------
// Transport
// ---------------------------------------------------------------------------

export type SyncTransport = "mqtt" | "coap" | "http";

// ---------------------------------------------------------------------------
// Buffered event
// ---------------------------------------------------------------------------

/**
 * A buffered event awaiting sync to cloud.
 * Uses monotonic sequence numbers per device for conflict-free ordering.
 */
export interface BufferedEvent<TPayload = unknown> {
  /** Unique event ID (UUID v7 recommended) */
  id: string;

  /** Device that generated the event */
  deviceId: string;

  /** Monotonic sequence number per device */
  sequence: number;

  /** ISO 8601 timestamp of when the event was captured */
  capturedAt: string;

  /** Payload — any serializable structure */
  payload: TPayload;

  /** Number of sync attempts so far */
  retries: number;

  /** Last attempt timestamp (ISO 8601) */
  lastAttemptAt?: string;
}

// ---------------------------------------------------------------------------
// Sync configuration
// ---------------------------------------------------------------------------

export interface SyncConfig {
  /** Unique device ID */
  deviceId: string;

  /** Transport protocol */
  transport: SyncTransport;

  /** Cloud endpoint (host or URL, transport-dependent) */
  endpoint: string;

  /** Max events to buffer locally (ring buffer size) */
  bufferCapacity: number;

  /** How often to attempt flushing the buffer (ms) */
  flushIntervalMs: number;

  /** Max retries per event before giving up */
  maxRetries: number;

  /** Optional TLS/auth credentials */
  credentials?: SyncCredentials;
}

export interface SyncCredentials {
  username?: string;
  password?: string;
  /** For MQTT: client certificate */
  clientCert?: string;
  /** For HTTP: bearer token */
  bearerToken?: string;
}

// ---------------------------------------------------------------------------
// Sync state
// ---------------------------------------------------------------------------

export type SyncStatus = "idle" | "syncing" | "offline" | "error";

export interface SyncState {
  status: SyncStatus;
  /** Number of events currently buffered */
  bufferedCount: number;
  /** Last successful sync timestamp */
  lastSyncedAt?: string;
  /** Last error message, if any */
  lastError?: string;
}

// ---------------------------------------------------------------------------
// Sync result
// ---------------------------------------------------------------------------

export interface SyncResult {
  /** Events successfully sent */
  sent: number;

  /** Events that failed (will be retried) */
  failed: number;

  /** Events still in the buffer */
  remaining: number;

  /** Timestamp of this sync attempt */
  attemptedAt: string;
}

// ---------------------------------------------------------------------------
// Pluggable interfaces
// ---------------------------------------------------------------------------

/**
 * A buffer implementation. Default is a ring buffer on flash/SD.
 * Any implementation that satisfies this interface works.
 */
export interface BufferStore<TPayload = unknown> {
  push(event: BufferedEvent<TPayload>): Promise<void>;
  peek(limit: number): Promise<BufferedEvent<TPayload>[]>;
  ack(eventId: string): Promise<void>;
  nack(eventId: string): Promise<void>;
  size(): Promise<number>;
  clear(): Promise<void>;
}

/**
 * A transport implementation. Any implementation that satisfies this
 * interface works (MQTT, CoAP, HTTP, custom).
 */
export interface Transport {
  connect(config: SyncConfig): Promise<void>;
  disconnect(): Promise<void>;
  send(events: BufferedEvent[]): Promise<SyncResult>;
  isConnected(): boolean;
}

/**
 * A local persistence layer for the last-synced sequence.
 */
export interface SequenceTracker {
  getLastAcked(deviceId: string): Promise<number>;
  setLastAcked(deviceId: string, sequence: number): Promise<void>;
}
