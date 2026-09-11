"use client";

import { Download } from "lucide-react";
import { DataPoint } from "@sicilia-soil/core";
import { Button } from "@sicilia-soil/ui";

interface Zone {
  id: string;
  name: string;
  icon: string;
  data: DataPoint[];
}

interface DataTableProps {
  zones: Zone[];
  unit: string;
}

/* ---------------------------------- Botón --------------------------------- */

interface ExportButtonProps {
  onClick: () => void;
}

function ExportButton({ onClick }: ExportButtonProps) {
  return (
    <Button
      variant="outline-olive"
      size="sm"
      onClick={onClick}
      icon={<Download className="w-4 h-4" />}
    >
      Descargar CSV
    </Button>
  );
}

/* ------------------------------ Header de tabla ---------------------------- */

function TableHead({ zones }: { zones: Zone[] }) {
  return (
    <thead>
      <tr className="border-b border-oliveGreen/15">
        <th className="text-left py-3 px-4 text-oliveGreen font-medium">
          Fecha
        </th>
        {zones.map((zone) => (
          <th
            key={zone.id}
            className="text-left py-3 px-4 text-oliveGreen font-medium"
          >
            {zone.icon} {zone.name}
          </th>
        ))}
      </tr>
    </thead>
  );
}

/* ------------------------------- Fila de tabla ----------------------------- */

interface TableRowProps {
  date: string;
  zones: Zone[];
  unit: string;
}

function TableRow({ date, zones, unit }: TableRowProps) {
  return (
    <tr className="border-b border-oliveGreen/10 hover:bg-oliveGreen/5 transition-colors">
      <td className="py-2 px-4 text-charcoalGray/70">{date}</td>
      {zones.map((zone) => {
        const point = zone.data.find((d) => d.timestamp === date);
        return (
          <td key={zone.id} className="py-2 px-4 font-medium text-charcoalGray">
            {point ? `${point.value.toFixed(1)}${unit}` : "-"}
          </td>
        );
      })}
    </tr>
  );
}

/* --------------------------------- Tabla ----------------------------------- */

export function DataTable({ zones, unit }: DataTableProps) {
  const recentDates =
    zones[0]?.data
      ?.map((d) => d.timestamp)
      .slice(-10)
      .reverse() ?? [];

  const exportToCSV = () => {
    const headers = ["Fecha", ...zones.map((z) => z.name)];
    const rows = recentDates.map((date) => [
      date,
      ...zones.map((zone) => {
        const point = zone.data.find((d) => d.timestamp === date);
        return point ? `${point.value}${unit}` : "-";
      }),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `datos-historicos-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-offWhite rounded-xl p-6 shadow-lg border border-oliveGreen/15">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-charcoalGray">
          Datos históricos detallados
        </h2>
        <ExportButton onClick={exportToCSV} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <TableHead zones={zones} />
          <tbody>
            {recentDates.map((date) => (
              <TableRow key={date} date={date} zones={zones} unit={unit} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
