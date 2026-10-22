import type {
  GroundCoverInfo,
  GroundCoverMonitoring,
  HarvestCalendarEntry,
  MycorrhizalSymbiosis,
  GroundCoverTab,
  MonitoringChartConfig,
  MonitoringKey,
} from "../types/groundCover.types";

// ============================================================================
// Info Section
// ============================================================================

export const GROUND_COVER_INFO: GroundCoverInfo = {
  name: "Esparto",
  scientificName: "Stipa tenacissima",
  icon: "🌾",
  description:
    "Planta fibrosa tradicional siciliana, utilizada durante siglos para la elaboración de cuerdas, cestas y tejidos. Es un pilar de la economía rural mediterránea.",
  history:
    "El esparto ha sido cultivado en Sikeliadesde la época fenicia. Su fibra resistente al agua salada lo hizo invaluable para la industria naval y agrícola.",
  benefits: [
    "Fibra natural sostenible",
    "Resistente a la humedad y salinidad",
    "Previene la erosión del suelo",
    "Hábitat para fauna local",
    "Secuestro de carbono",
    "Bajo requerimiento hídrico",
  ],
  uses: [
    "Cuerdas y cordelería",
    "Cestería tradicional",
    "Tejidos técnicos",
    "Biocombustibles",
    "Material de construcción ecológico",
    "Sustrato para cultivo de setas",
  ],
};

// ============================================================================
// Monitoring Data (last 14 days)
// ============================================================================

export const GROUND_COVER_MONITORING: GroundCoverMonitoring = {
  moisture: [68, 70, 72, 71, 69, 68, 67, 66, 68, 70, 72, 74, 73, 71],
  temperature: [18, 19, 20, 21, 22, 23, 22, 21, 20, 19, 18, 17, 18, 19],
  light: [55, 58, 62, 65, 68, 70, 72, 71, 69, 66, 63, 60, 58, 56],
  wind: [12, 11, 13, 14, 12, 10, 9, 11, 13, 14, 15, 13, 12, 11],
};

// ============================================================================
// Chart Configuration
// ============================================================================

export const MONITORING_CHART_CONFIG: Record<
  MonitoringKey,
  MonitoringChartConfig
> = {
  moisture: {
    label: "Humedad",
    color: "#5A6B47",
    unit: "%",
    max: 100,
  },
  temperature: {
    label: "Temperatura",
    color: "#CD212A",
    unit: "°C",
    max: 35,
  },
  light: {
    label: "Luz solar",
    color: "#E6B422",
    unit: "%",
    max: 100,
  },
  wind: {
    label: "Viento",
    color: "#6B7280",
    unit: "km/h",
    max: 30,
  },
};

// ============================================================================
// Harvest Calendar
// ============================================================================

export const GROUND_COVER_HARVEST_CALENDAR: HarvestCalendarEntry[] = [
  { month: "Enero", activity: "Descanso invernal", color: "bg-blue-100" },
  {
    month: "Febrero",
    activity: "Preparación del terreno",
    color: "bg-blue-100",
  },
  { month: "Marzo", activity: "Inicio de crecimiento", color: "bg-green-100" },
  { month: "Abril", activity: "Crecimiento activo", color: "bg-green-100" },
  { month: "Mayo", activity: "Crecimiento máximo", color: "bg-green-200" },
  { month: "Junio", activity: "Floración", color: "bg-yellow-100" },
  { month: "Julio", activity: "Maduración", color: "bg-yellow-100" },
  { month: "Agosto", activity: "Cosecha tradicional", color: "bg-orange-100" },
  {
    month: "Septiembre",
    activity: "Cosecha principal",
    color: "bg-orange-200",
  },
  { month: "Octubre", activity: "Secado y procesado", color: "bg-yellow-100" },
  { month: "Noviembre", activity: "Almacenamiento", color: "bg-blue-100" },
  { month: "Diciembre", activity: "Descanso invernal", color: "bg-blue-100" },
];

// ============================================================================
// Mycorrhizal Symbiosis
// ============================================================================

export const GROUND_COVER_MYCORRHIZAL_SYMBIOSIS: MycorrhizalSymbiosis[] = [
  {
    mushroom: "Cardoncello di Nebrodi",
    icon: "🍄",
    description:
      "El cardoncello se asocia a las raíces del esparto, mejorando la absorción de nutrientes y agua.",
  },
  {
    mushroom: "Cardonchello",
    icon: "🍄",
    description:
      "Crece en los restos de esparto, descomponiendo la materia y enriqueciendo el suelo.",
  },
  {
    mushroom: "Níccolo",
    icon: "🍄",
    description:
      "Forma micorrizas con las raíces, extendiendo la red de absorción del esparto.",
  },
];

// ============================================================================
// Tabs Configuration
// ============================================================================

export const GROUND_COVER_TABS: GroundCoverTab[] = [
  { id: "info", label: "Información", icon: "📖" },
  { id: "monitoring", label: "Monitoreo", icon: "📊" },
  { id: "harvest", label: "Calendario", icon: "📅" },
  { id: "symbiosis", label: "Simbiosis", icon: "🔗" },
];
