// packages/core/src/domain/crop-system.ts

export type SystemTemplate = "herbaceous" | "woody" | "mixed" | "cover-fallow";
export type ObservationLevel = "success" | "warning" | "info";

export interface CropSensor {
  id: string;
  label: string;
  type:
    | "multiparameter"
    | "soil-moisture"
    | "temperature"
    | "radiation"
    | "wind"
    | "contamination"
    | "soil-respiration" // CO2
    | "npk" // Nitrógeno, Fósforo, Potasio
    | "ph-ec" // pH y Conductividad Eléctrica
    | "bioelectricity"; // Señales eléctricas (Ecoshroom)
}

export interface CropObservation {
  id: string;
  systemId: string;
  key: string;
  text: string;
  level: ObservationLevel;
  category?: "fungi" | "pest" | "weather" | "other";
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
  data: (number | null)[];
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

  location?: {
    lat: number;
    lng: number;
    address?: string;
  };

  metrics: {
    shi?: number;
    amf?: number;
    ecm?: number; // Añadido por si usas ectomicorrizas
    glomalin?: number;
    moisture?: number;
    moistureThreshold?: number;
    temperature?: number;
    light?: number;
    wind?: number;
    ndvi?: number;
    lead?: number;
    cadmium?: number;
    hydrocarbons?: number;
    [k: string]: number | undefined; // Permite cualquier otra métrica extra
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
