// ============================================================================
// Ground Cover Types – T3 Module (Water Efficiency & Drought Resilience)
// ============================================================================

export interface GroundCoverInfo {
  name: string;
  scientificName: string;
  icon: string;
  description: string;
  history: string;
  benefits: string[];
  uses: string[];
}

export interface GroundCoverMonitoring {
  moisture: number[];
  temperature: number[];
  light: number[];
  wind: number[];
}

export type MonitoringKey = keyof GroundCoverMonitoring;

export interface MonitoringChartConfig {
  label: string;
  color: string;
  unit: string;
  max: number;
}

export interface HarvestCalendarEntry {
  month: string;
  activity: string;
  color: string;
}

export interface MycorrhizalSymbiosis {
  mushroom: string;
  icon: string;
  description: string;
}

export type GroundCoverTabId = "info" | "monitoring" | "harvest" | "symbiosis";

export interface GroundCoverTab {
  id: GroundCoverTabId;
  label: string;
  icon: string;
}

export interface GroundCoverHealth {
  status: string;
  color: string;
  icon: string;
}
