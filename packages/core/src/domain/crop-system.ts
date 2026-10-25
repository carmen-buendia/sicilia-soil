// packages/core/src/domain/crop-system.ts

export type SystemTemplate = "herbaceous" | "woody" | "mixed" | "cover-fallow";
export type ObservationLevel = "success" | "warning" | "info";

export interface CropSensor {
  id: string;
  label: string;
  type: "soil-moisture" | "temperature" | "radiation" | "wind";
}

export interface CropObservation {
  id: string;
  systemId: string;
  key: string;
  text: string;
  level: ObservationLevel;
  value?: number;
  threshold?: number;
  meta?: {
    source?: string;
    sensorId?: string;
    date: string;
  };
}

export interface Crop {
  id: string;
  name: string;
  icon: string;
  area: string;
  extraction?: number;
  residue?: number;
  water?: number;
  stage?: string;
  mycorrhiza?: string;
  season?: string;
}

export interface MetricSeries {
  key: string;
  name: string;
  data: number[];
  categories?: string[];
}

export interface KpiItem {
  label: string;
  value: string;
  note: string;
  icon: string;
  level?: ObservationLevel;
}

export interface CropSystem {
  id: string;
  name: string;
  icon: string;
  template: SystemTemplate;
  region?: string;
  description?: string;

  metrics: {
    shi?: number;
    amf?: number;
    glomalin?: number;
    moisture?: number;
    moistureThreshold?: number;
    temperature?: number;
    light?: number;
    wind?: number;
    ndvi?: number;
    [k: string]: number | undefined;
  };

  attributes?: Record<string, string | number>;
  kpis?: KpiItem[];

  series?: MetricSeries[];
  subCrops?: Crop[];
  sensors?: CropSensor[];
  observations?: CropObservation[];

  createdAt: string;
  updatedAt: string;
}
