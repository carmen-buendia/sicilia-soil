import type {
  HeavyMetal,
  AirQuality,
  WaterQuality,
  SoilQuality,
} from "@/lib/data/ambientalData";
import { AlertTriangle } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface EnvironmentalTableProps {
  heavyMetals: HeavyMetal[];
  airQuality: AirQuality[];
  waterQuality: WaterQuality[];
  soilQuality: SoilQuality[];
}

interface TableRowProps {
  name: string;
  value: number;
  unit: string;
  threshold: number;
  status: "good" | "warning" | "danger";
}

function TableRow({ name, value, unit, threshold, status }: TableRowProps) {
  return (
    <tr className="border-b border-oliveGreen/5 hover:bg-oliveGreen/5">
      <td className="py-2 font-medium">{name}</td>
      <td>{value.toFixed(1)}</td>
      <td>{unit}</td>
      <td>{threshold}</td>
      <td>
        <StatusBadge status={status} />
      </td>
    </tr>
  );
}

/**
 * Table showing all environmental parameters with their status.
 * Groups heavy metals, air quality, water quality and soil quality.
 */
export function EnvironmentalTable({
  heavyMetals,
  airQuality,
  waterQuality,
  soilQuality,
}: EnvironmentalTableProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10 overflow-x-auto">
      <h3 className="font-bold text-charcoalGray mb-3 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-oliveGreen" />
        Detalle de parámetros ambientales
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-oliveGreen/10">
            <th className="text-left py-2 text-oliveGreen/60 font-medium">
              Parámetro
            </th>
            <th className="text-left py-2 text-oliveGreen/60 font-medium">
              Valor
            </th>
            <th className="text-left py-2 text-oliveGreen/60 font-medium">
              Unidad
            </th>
            <th className="text-left py-2 text-oliveGreen/60 font-medium">
              Umbral
            </th>
            <th className="text-left py-2 text-oliveGreen/60 font-medium">
              Estado
            </th>
          </tr>
        </thead>
        <tbody>
          {heavyMetals.map((m) => (
            <TableRow
              key={m.id}
              name={`${m.name} (${m.symbol})`}
              value={m.value}
              unit={m.unit}
              threshold={m.threshold}
              status={m.status}
            />
          ))}
          {airQuality.map((a) => (
            <TableRow
              key={a.id}
              name={a.name}
              value={a.value}
              unit={a.unit}
              threshold={a.threshold}
              status={a.status}
            />
          ))}
          {waterQuality.map((w) => (
            <TableRow
              key={w.id}
              name={w.name}
              value={w.value}
              unit={w.unit}
              threshold={w.threshold}
              status={w.status}
            />
          ))}
          {soilQuality.map((s) => (
            <TableRow
              key={s.id}
              name={s.name}
              value={s.value}
              unit={s.unit}
              threshold={s.threshold}
              status={s.status}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
