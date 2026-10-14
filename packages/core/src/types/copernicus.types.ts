// ============================================================================
// Copernicus Types – Shared across MycoMesh Protocol
// ============================================================================

export type CopernicusTabType = "indices" | "analysis";

export type CopernicusLayer = "satellite" | "ndvi" | "ndwi" | "ssm" | "lst";

// ----------------------------------------------------------------------------
// Widget Data
// ----------------------------------------------------------------------------

export interface IndexMetric {
  value: string | number;
  status: string;
  color: string;
}

export interface AnalysisScore {
  score: string;
  status: string;
  color: string;
}

export interface CopernicusData {
  lastPass: string;
  satellite: string;
  cloudCover: string;
  resolution: string;
  indices: {
    ndvi: IndexMetric;
    ndwi: IndexMetric;
    ssm: IndexMetric;
    lst: IndexMetric;
  };
  analysisScores: {
    droughtRisk: AnalysisScore;
    soilHealth: AnalysisScore;
  };
}

// ----------------------------------------------------------------------------
// Widget Props
// ----------------------------------------------------------------------------

export interface CopernicusWidgetProps {
  selectedPlot?: string;
  data?: CopernicusData;
}

// ----------------------------------------------------------------------------
// Map Types
// ----------------------------------------------------------------------------

export interface MapPlot {
  id: string;
  name: string;
  coordinates: [number, number][];
  center: [number, number];
  color?: string;
  indices?: {
    ndvi?: number;
    ndwi?: number;
    ssm?: number;
    lst?: number;
  };
}

export interface CopernicusMapProps {
  plots?: MapPlot[];
  initialLayer?: CopernicusLayer;
  initialCenter?: [number, number];
  initialZoom?: number;
  height?: string;
}

// ----------------------------------------------------------------------------
// Hook Types
// ----------------------------------------------------------------------------

export interface UseCopernicusDataOptions {
  plotId?: string;
  apiUrl?: string;
  pollIntervalMs?: number;
  enabled?: boolean;
}

export interface UseCopernicusDataReturn {
  data: CopernicusData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
}
