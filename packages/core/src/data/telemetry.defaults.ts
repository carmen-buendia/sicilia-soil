// packages/core/src/data/telemetry.default.ts

export interface MockSensor {
  id: string;
  typeKey: "soilMoisture" | "soilTemp" | "solarRadiation";
  battery: number;
  signal: number;
  ping: { val: number; unit: "minutesAgo" | "hoursAgo" };
  status: "online" | "unstable";
}

export const TELEMETRY_MOCK_SENSORS: MockSensor[] = [
  {
    id: "SNS-01",
    typeKey: "soilMoisture",
    battery: 92,
    signal: -45,
    ping: { val: 2, unit: "minutesAgo" },
    status: "online",
  },
  {
    id: "SNS-02",
    typeKey: "soilTemp",
    battery: 88,
    signal: -65,
    ping: { val: 5, unit: "minutesAgo" },
    status: "online",
  },
  {
    id: "SNS-03",
    typeKey: "soilMoisture",
    battery: 12,
    signal: -110,
    ping: { val: 2, unit: "hoursAgo" },
    status: "unstable",
  },
  {
    id: "SNS-04",
    typeKey: "solarRadiation",
    battery: 100,
    signal: -40,
    ping: { val: 1, unit: "minutesAgo" },
    status: "online",
  },
];
