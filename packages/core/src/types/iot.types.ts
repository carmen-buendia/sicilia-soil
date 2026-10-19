// packages/core/src/types/iot.types.ts

// ============================================================================
// MycoMesh Protocol — IoT layer
// ----------------------------------------------------------------------------
// Design principles:
//   - Protocol-agnostic (MQTT, CoAP, LoRaWAN, HTTP fallback)
//   - Edge-first: devices buffer locally, sync when online (Nostradamus req.)
//   - Every sensor is geolocated (Galileo HAS precision for field placement)
//   - Raw + calibrated values kept separate (audit + reprocessing)
//   - Quality flags on every reading (for filtering in analysis)
// ============================================================================

import type { GeoFix } from "./spatial.types";

// ----------------------------------------------------------------------------
// Protocols & device classes
// ----------------------------------------------------------------------------

export type IoTProtocol =
  | "mqtt" // standard for constrained devices (Nostradamus default)
  | "coap" // for very constrained devices / UDP
  | "lorawan" // long range, low power (field sensors)
  | "http" // fallback (dev / testing)
  | "modbus" // industrial sensors
  | "ble"; // local pairing / calibration

/**
 * Device class — determines power profile, buffering capacity, role.
 */
export type EdgeDeviceType =
  | "gateway" // Raspberry Pi / similar — aggregates + uplink
  | "node" // ESP32 + sensors — leaf node
  | "logger" // data logger (no radio, USB dump)
  | "actuator"; // pump controller, valve, etc.

export type EdgeDeviceStatus =
  | "online"
  | "offline"
  | "degraded" // partial functionality (e.g. low battery)
  | "provisioning"
  | "retired";

// ----------------------------------------------------------------------------
// Sensor taxonomy
// ----------------------------------------------------------------------------

/**
 * What a sensor measures. Broad enough to cover field + greenhouse + storage.
 */
export type SensorType =
  // Soil
  | "soil_moisture" // volumetric water content (VWC)
  | "soil_temperature"
  | "soil_ph"
  | "soil_ec" // electrical conductivity
  | "soil_nitrate"
  | "soil_organic_matter"
  // Air
  | "air_temperature"
  | "air_humidity"
  | "air_pressure"
  | "vpd" // vapour pressure deficit (computed)
  | "co2"
  // Light
  | "light_par" // photosynthetically active radiation
  | "light_lux"
  | "uv_index"
  // Water
  | "rain"
  | "water_flow"
  | "water_level"
  | "water_ph"
  | "water_ec"
  // Wind
  | "wind_speed"
  | "wind_direction"
  | "wind_gust"
  // Biology
  | "leaf_wetness"
  | "sap_flow"
  | "trunk_diameter" // dendrometer
  // Actuators (reported state, not measured)
  | "valve_state"
  | "pump_state"
  | "relay_state";

export type SensorStatus =
  | "active"
  | "inactive"
  | "error"
  | "maintenance"
  | "retired";

/**
 * How the value is transmitted / aggregated.
 * "instant" = raw sample, "avg" = averaged over window, etc.
 */
export type ReadingAggregation =
  | "instant"
  | "avg"
  | "min"
  | "max"
  | "sum"
  | "median";

// ----------------------------------------------------------------------------
// Edge device
// ----------------------------------------------------------------------------

export interface EdgeDevice {
  id: string;
  farmId: string;
  name: string;
  type: EdgeDeviceType;
  protocol: IoTProtocol;
  model?: string; // e.g. "Raspberry Pi 4B", "ESP32-S3"
  firmwareVersion?: string;
  // Buffering (Nostradamus: offline-capable, no data loss on dropout)
  bufferCapacityMb?: number;
  bufferRetentionHours?: number;
  // Connectivity
  ipAddress?: string;
  macAddress?: string;
  lastSeenAt?: string; // ISO 8601
  // Health
  batteryPercent?: number; // if battery-powered
  solarCharging?: boolean;
  signalStrengthDbm?: number;
  status: EdgeDeviceStatus;
  // Physical
  installedAt?: string;
  position?: GeoFix; // GNSS-measured (Galileo HAS when available)
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

// ----------------------------------------------------------------------------
// Sensor
// ----------------------------------------------------------------------------

export interface Sensor {
  id: string;
  farmId: string;
  edgeDeviceId: string; // parent device
  // Spatial placement (nullable — sensor may be moved)
  zoneId?: string;
  plotId?: string;
  bedId?: string;
  plantId?: string; // for stem/leaf sensors on a specific plant
  // Identity
  name: string;
  type: SensorType;
  model?: string; // e.g. "METER TEROS 12"
  serialNumber?: string;
  firmwareVersion?: string;
  // Measurement profile
  unit: string; // e.g. "%", "°C", "ppm"
  aggregation: ReadingAggregation;
  samplingIntervalSec?: number; // expected cadence
  // Placement
  position?: GeoFix; // precise placement (Galileo HAS)
  depthCm?: number; // for soil sensors
  heightCm?: number; // for air sensors
  orientationDeg?: number; // for wind / radiation sensors
  // Calibration
  calibrationOffset?: number;
  calibrationScale?: number;
  calibrationDate?: string;
  calibrationNotes?: string;
  // Thresholds (for alerts)
  minThreshold?: number;
  maxThreshold?: number;
  optimalMin?: number;
  optimalMax?: number;
  // Lifecycle
  installedAt?: string;
  status: SensorStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

// ----------------------------------------------------------------------------
// Reading — the time-series row
// ----------------------------------------------------------------------------

/**
 * Quality of a reading. Used to filter during analysis.
 */
export type ReadingQuality =
  | "good"
  | "suspect" // outside expected range, but not invalid
  | "calibrating"
  | "maintenance"
  | "error";

/**
 * A single time-series measurement.
 * Kept minimal and append-only for performance (one row per reading).
 */
export interface SensorReading {
  id: string;
  sensorId: string;
  // Time
  timestamp: string; // ISO 8601 (UTC)
  recordedAt?: string; // if different from timestamp (device clock drift)
  // Value
  value: number;
  unit: string;
  aggregation: ReadingAggregation;
  // Raw + processed
  rawValue?: number; // before calibration
  // Quality
  quality: ReadingQuality;
  // Provenance
  source?: "iot" | "manual" | "imported" | "estimated";
  notes?: string;
  createdAt: string;
}

/**
 * A "current state" snapshot of one sensor — the latest good reading.
 * Used by dashboards. Computed periodically or on read, not stored raw.
 */
export interface SensorSnapshot {
  sensorId: string;
  value: number;
  unit: string;
  timestamp: string;
  quality: ReadingQuality;
  status: SensorStatus;
}

/**
 * Aggregated reading for a time window.
 * Used for charts (daily avg, weekly max, etc.).
 */
export interface SensorAggregate {
  sensorId: string;
  windowStart: string;
  windowEnd: string;
  aggregation: ReadingAggregation;
  value: number;
  unit: string;
  sampleCount: number;
}

// ----------------------------------------------------------------------------
// Actuator (for irrigation / dosing control)
// ----------------------------------------------------------------------------

export type ActuatorType =
  | "irrigation_valve"
  | "pump"
  | "dosing_pump"
  | "vent"
  | "shade_screen"
  | "heater"
  | "fan"
  | "light";

export interface Actuator {
  id: string;
  farmId: string;
  edgeDeviceId: string;
  zoneId?: string;
  plotId?: string;
  bedId?: string;
  name: string;
  type: ActuatorType;
  protocol: IoTProtocol;
  // Current state (updated by telemetry)
  currentState?: "on" | "off" | "auto" | "error" | "unknown";
  lastCommandAt?: string;
  lastCommandBy?: string; // userId or "system"
  // Safety
  maxRuntimeMin?: number; // auto-off safeguard
  minOffTimeMin?: number; // anti-short-cycling
  status: SensorStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

// ----------------------------------------------------------------------------
// Commands (outbound to devices)
// ----------------------------------------------------------------------------

export type CommandStatus =
  | "queued"
  | "sent"
  | "acked"
  | "executed"
  | "failed"
  | "expired";

export interface DeviceCommand {
  id: string;
  actuatorId: string;
  command: string; // e.g. "turn_on", "set_duration"
  payload?: Record<string, unknown>;
  issuedBy: string; // userId
  issuedAt: string;
  expiresAt?: string;
  status: CommandStatus;
  ackedAt?: string;
  executedAt?: string;
  errorMessage?: string;
}

// ----------------------------------------------------------------------------
// Lookups
// ----------------------------------------------------------------------------

export type EdgeDeviceId = EdgeDevice["id"];
export type SensorId = Sensor["id"];
export type ReadingId = SensorReading["id"];
export type ActuatorId = Actuator["id"];
