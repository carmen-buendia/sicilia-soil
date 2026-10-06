// ============================================================================
// MOCK DATA — Polyculture (árboles + hortalizas + compost)
// Reemplazar por hook usePolycultureData() cuando IoT/Data Cube estén listos
// ============================================================================

export type PolycultureKpi = {
  label: string;
  value: string;
  note: string;
  icon: string;
  color: string;
};

export const POLYCULTURE_KPIS: PolycultureKpi[] = [
  {
    label: "Árboles activos",
    value: "4",
    note: "olivo · almendro · ciruelo · algarrobo",
    icon: "tree",
    color: "text-oliveGreen",
  },
  {
    label: "Humedad media",
    value: "62%",
    note: "↑ Óptimo",
    icon: "droplet",
    color: "text-blue-500",
  },
  {
    label: "Temperatura media",
    value: "24°C",
    note: "✓ Ideal",
    icon: "thermometer",
    color: "text-red-500",
  },
  {
    label: "Compost activo",
    value: "68°C",
    note: "Fase termófila",
    icon: "recycle",
    color: "text-amber-600",
  },
];

export type PolycultureTree = {
  id: string;
  name: string;
  icon: string;
  moisture: number;
  temperature: number;
  light: number;
  wind: number;
  status: string;
  statusColor: string;
  mycorrhiza: "AMF" | "ECM" | "AMF + ECM" | "none";
  stage: string;
};

export const POLYCULTURE_TREES: PolycultureTree[] = [
  {
    id: "olivo",
    name: "Olivar",
    icon: "🫒",
    moisture: 62,
    temperature: 23.1,
    light: 89,
    wind: 10,
    status: "Crítico · riego en 12 h",
    statusColor: "text-red-600 bg-red-50",
    mycorrhiza: "AMF",
    stage: "Fructificación",
  },
  {
    id: "almendro",
    name: "Almendro",
    icon: "🌰",
    moisture: 58,
    temperature: 24.5,
    light: 91,
    wind: 8,
    status: "Óptimo",
    statusColor: "text-green-700 bg-green-50",
    mycorrhiza: "AMF",
    stage: "Post-cosecha",
  },
  {
    id: "ciruelo",
    name: "Ciruelo",
    icon: "🍑",
    moisture: 66,
    temperature: 22.8,
    light: 87,
    wind: 9,
    status: "Óptimo",
    statusColor: "text-green-700 bg-green-50",
    mycorrhiza: "AMF",
    stage: "Reposo",
  },
  {
    id: "algarrobo",
    name: "Algarrobo",
    icon: "🌳",
    moisture: 54,
    temperature: 25.2,
    light: 92,
    wind: 11,
    status: "Establecimiento",
    statusColor: "text-amber-700 bg-amber-50",
    mycorrhiza: "AMF",
    stage: "Crecimiento",
  },
];

export type PolycultureVegetable = {
  id: string;
  name: string;
  icon: string;
  area: string;
  harvest: string;
  residue: number; // kg/semana
  water: number; // L/semana
};

export const POLYCULTURE_VEGETABLES: PolycultureVegetable[] = [
  {
    id: "tomate",
    name: "Tomate",
    icon: "🍅",
    area: "12 m²",
    harvest: "8 kg/semana",
    residue: 3,
    water: 45,
  },
  {
    id: "lechuga",
    name: "Lechuga",
    icon: "🥬",
    area: "6 m²",
    harvest: "4 uds/semana",
    residue: 1,
    water: 18,
  },
  {
    id: "calabacin",
    name: "Calabacín",
    icon: "🥒",
    area: "8 m²",
    harvest: "5 kg/semana",
    residue: 2,
    water: 32,
  },
  {
    id: "aromaticas",
    name: "Aromáticas",
    icon: "🌿",
    area: "4 m²",
    harvest: "Uso continuo",
    residue: 0.5,
    water: 8,
  },
];

export type CompostStep = {
  stage: string;
  amount: string;
  icon: string;
};

export const COMPOST_CYCLE: CompostStep[] = [
  { stage: "Restos hortalizas", amount: "6.5 kg/semana", icon: "🍂" },
  { stage: "Compost activo", amount: "68°C · 3 semanas", icon: "🪱" },
  { stage: "Compost maduro", amount: "4 kg/semana", icon: "🌱" },
  { stage: "Aplicación al suelo", amount: "16 kg/mes", icon: "🪣" },
];
