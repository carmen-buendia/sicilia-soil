import type { ReactNode } from "react";

// ============================================
// TIPOS BASE PARA ZONAS
// ============================================

export interface BaseZone {
  id: string;
  zone: string;
  current: number;
  optimal: number;
  min: number;
  max: number;
  history: number[];
  unit: string;
  trend: "up" | "down" | "stable";
  soilType: string;
  status: "excelente" | "buena" | "baja" | "muy baja";
  icon: string;
  location: string;
}

export interface LightZone extends BaseZone {
  uv: number;
  hours: number;
}

export interface TemperatureZone extends BaseZone {
  hours?: number;
}

export interface WaterZone extends BaseZone {
  sensorId: string;
  lastWatering: string;
}

export interface HistoricalDataPoint {
  day: string;
  value: number;
  optimal: number;
}

export interface ForecastDataPoint {
  day: string;
  value: number;
}

// ============================================
// TIPOS PARA SENSORES (UNIFICADOS)
// ============================================

export type SensorStatusType = "optimal" | "warning" | "critical";
export type ZoneStatusType =
  | "saludable"
  | "óptimo"
  | "necesita riego"
  | "activo"
  | "lleno";

// SensorData - versión UNIFICADA (sin conflictos)
export interface SensorData {
  zoneId: string;
  zoneName: string;
  sensors: {
    moisture: { current: number; optimal: number; unit: string };
    temperature: { current: number; min: number; max: number; unit: string };
    light: { current: number; optimal: number; unit: string };
    wind: { current: number; unit: string };
  };
  status: SensorStatusType; // "optimal" | "warning" | "critical"
  lastUpdate: string;
}

/**
 * Snapshot de una lectura en el mock de monitoring (/humidity, /ground-cover).
 * NO es la SensorReading histórica (ver iot.types.ts).
 *
 * TODO(feat/db-crud): migrar a iot.SensorSnapshot + iot.SensorReading.
 */
export interface MonitoringSensorSnapshot {
  value: number;
  timestamp: Date;
  unit: string;
  status: SensorStatusType;
}

export interface ZoneSensors {
  moisture: MonitoringSensorSnapshot;
  temperature: MonitoringSensorSnapshot;
  light: MonitoringSensorSnapshot;
  wind?: MonitoringSensorSnapshot;
}

/**
 * Snapshot de sensores por zona — usado por las páginas de monitoring
 * (/humidity, /ground-cover). NO es la Zone espacial del modelo real
 * (ver spatial.types.ts → Zone).
 *
 * TODO(feat/db-crud): migrar a spatial.Zone + iot.SensorReading cuando
 * el CRUD esté disponible.
 */
export interface MonitoredZone {
  id: string;
  name: string;
  type: string;
  icon: string;
  location: string;
  sensors: ZoneSensors;
  status: ZoneStatusType;
  lastUpdate: Date;
}

/**
 * Alerta del mock de monitoring (/humidity).
 * NO es la Alert del motor de alertas real (ver alerts.types.ts).
 *
 * TODO(feat/db-crud): migrar a alerts.Alert cuando el motor esté listo.
 */
export interface MonitoringAlert {
  id: string;
  zone: string;
  type: "humidity" | "temperature" | "light";
  current: number;
  optimal: number;
  severity: "low" | "medium" | "high";
  timestamp: string;
  acknowledged: boolean;
  message?: string;
}

export type MetricType = "moisture" | "temperature" | "light";

// ============================================
// TIPOS PARA ESTADO GLOBAL
// ============================================

export interface MonitoringState {
  zones: MonitoredZone[];
  selectedZone: string | null;
  sensorData: Record<string, SensorData>;
  alerts: MonitoringAlert[];
  isLoading: boolean;
  error: string | null;
  lastUpdate: Date | null;
}

export interface MonitoringFilters {
  metric: MetricType;
  period: string;
  showAlerts: boolean;
}

export interface WateringControl {
  isActive: boolean;
  duration: number;
  startTime: Date | null;
  zones: string[];
}

// ============================================
// TIPOS PARA ESTADÍSTICAS
// ============================================

export interface Statistics {
  avg: number;
  max: number;
  min: number;
  trend: number;
  last: number;
}

export interface StatsCardData {
  value: string;
  label: string;
  icon: ReactNode;
  subtext?: string;
}

// ============================================
// TIPOS PARA RECOMENDACIONES
// ============================================

export interface DashboardRecommendation {
  text: string;
  action: string;
  color: string;
  bg: string;
  border: string;
}

// ============================================
// TIPOS PARA GARDEN ZONE (Dashboard)
// ============================================

export interface GardenZone {
  id: string;
  name: string;
  type: string;
  location: string;
  moisture: number;
  temperature: number;
  light: number;
  wind: number;
  status: string;
  lastUpdate: string;
  icon: string;
}

// ============================================
// TIPOS PARA MICOLOGÍA
// ============================================

export interface MushroomZone {
  id: string;
  name: string;
  scientificName: string;
  location: string;
  humidity: number;
  temperature: number;
  co2: number;
  stage: "growth" | "fruiting" | "harvest";
  harvestIn: string;
  status: "optimal" | "excellent" | "good" | "ready";
  icon: string;
}

// ============================================
// TIPOS PARA ESPARTO
// ============================================

export interface EspartoData {
  general: {
    scientificName: string;
    health: number;
    nextHarvest: string;
  };
  growth: {
    phase: string;
    height: string;
    density: string;
    newShoots: number;
  };
  soil: {
    type: string;
    ph: number;
    moisture: number;
    nutrients: string;
  };
  harvest: {
    nextDate: string;
    estimatedYield: string;
    currentStock: string;
    quality: string;
  };
}

// ============================================
// TIPOS AUXILIARES
// ============================================

export interface DataPoint {
  timestamp: string;
  value: number;
}

export type PeriodType = "7" | "15" | "30" | "90";

// ============================================
// ZONE CONFIG (versión para site.config.ts)
// Config de zona (legacy site.config)
// (evita colisión con Zone de sensores)
// ============================================

export interface ZoneConfig {
  id: string;
  name: string;
  icon: string;
  location?: string;
  optimalHumidity?: number;
  optimalTemperature?: number;
  optimalLight?: number;
}

// ============================================
// TIPOS PARA DASHBOARD
// ============================================

export interface DashboardKpi {
  value: string;
  label: string;
  icon: string;
  subtext: string;
}

export interface CarbonSummary {
  organicCarbonPercent: number;
  bulkDensity: number;
  depth: number;
  co2Sequestration: number;
}
