"use client";

import {
  Droplets,
  Thermometer,
  Sun,
  Wind,
  Wheat,
  TrendingUp,
  BarChart3,
} from "lucide-react";

const CEREAL_KPIS = [
  {
    label: "NDVI actual",
    value: "0.58",
    note: "Crecimiento vegetativo",
    color: "text-emerald-600",
  },
  {
    label: "Humedad",
    value: "58%",
    note: "Óptimo 60-70%",
    color: "text-blue-500",
  },
  {
    label: "Temperatura",
    value: "24°C",
    note: "✓ Ideal",
    color: "text-red-500",
  },
  {
    label: "Colonización micorrícica",
    value: "30%",
    note: "vs. esparto: 45%",
    color: "text-amber-600",
  },
];

const GROWTH_DATA = [
  { week: "S1", ndvi: 0.12, moisture: 68 },
  { week: "S2", ndvi: 0.21, moisture: 66 },
  { week: "S3", ndvi: 0.34, moisture: 64 },
  { week: "S4", ndvi: 0.45, moisture: 62 },
  { week: "S5", ndvi: 0.52, moisture: 60 },
  { week: "S6", ndvi: 0.58, moisture: 58 },
];

const SERBIA_COMPARISON = [
  { metric: "NDVI", sicily: 0.58, serbia: 0.71, unit: "" },
  { metric: "Humedad", sicily: 58, serbia: 48, unit: "%" },
  { metric: "Colonización", sicily: 30, serbia: 28, unit: "%" },
  { metric: "SHI", sicily: 62, serbia: 68, unit: "/100" },
];

export function CerealTab() {
  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {CEREAL_KPIS.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-oliveGreen/15"
          >
            <p className="text-xs text-oliveGreen/60 mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold text-charcoalGray">{kpi.value}</p>
            <p className="text-xs text-oliveGreen/60 mt-1">{kpi.note}</p>
          </div>
        ))}
      </div>

      {/* Parcela */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/60 rounded-xl">
            <Wheat className="w-8 h-8 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-charcoalGray mb-1">
              Parcela de Cereal
            </h3>
            <p className="text-sm text-oliveGreen/70 mb-3">
              Validación de cereal mediterráneo en clima Csa · comparación
              directa con Serbia
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/70 rounded-full text-xs">
                📐 40–50 m²
              </span>
              <span className="px-3 py-1 bg-white/70 rounded-full text-xs">
                🌱 Trigo · Cebada · Avena
              </span>
              <span className="px-3 py-1 bg-white/70 rounded-full text-xs font-medium text-amber-700">
                ⏱ Crecimiento vegetativo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Curva de crecimiento */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
        <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-oliveGreen" />
          Evolución NDVI y humedad (6 semanas)
        </h3>
        <div className="space-y-4">
          {GROWTH_DATA.map((d) => (
            <div key={d.week} className="flex items-center gap-4">
              <span className="text-xs text-oliveGreen/60 w-8">{d.week}</span>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-600 w-12">NDVI</span>
                  <div className="flex-1 h-3 bg-oliveGreen/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(d.ndvi / 0.8) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-charcoalGray w-10 text-right">
                    {d.ndvi}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-blue-600 w-12">Humedad</span>
                  <div className="flex-1 h-3 bg-oliveGreen/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${d.moisture}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-charcoalGray w-10 text-right">
                    {d.moisture}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparación con Serbia */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
        <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-oliveGreen" />
          Validación cruzada: Sicilia ↔ Serbia
        </h3>
        <div className="space-y-3">
          {SERBIA_COMPARISON.map((row) => (
            <div key={row.metric}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-oliveGreen/70">{row.metric}</span>
                <span className="text-xs text-oliveGreen/60">
                  Sicilia {row.sicily}
                  {row.unit} · Serbia {row.serbia}
                  {row.unit}
                </span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-2 bg-oliveGreen/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{
                      width: `${(row.sicily / (Math.max(row.sicily, row.serbia) * 1.2)) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex-1 h-2 bg-oliveGreen/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{
                      width: `${(row.serbia / (Math.max(row.sicily, row.serbia) * 1.2)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs text-oliveGreen/60">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-amber-500 rounded-full" /> Sicilia (Csa)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-500 rounded-full" /> Serbia (Dfb)
          </span>
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 rounded-2xl p-6 border border-oliveGreen/15">
        <h3 className="text-lg font-bold text-charcoalGray mb-3">
          Recomendaciones activas
        </h3>
        <ul className="space-y-2 text-sm text-oliveGreen/70">
          <li>
            💧 Riego programado en 3 días (humedad 58%, por debajo del óptimo).
          </li>
          <li>
            ✓ NDVI en curva ascendente: crecimiento normal para la semana 6.
          </li>
          <li>
            🍄 Colonización micorrícica al 30%. Aplicar inóculo tras la cosecha.
          </li>
          <li>
            📊 Comparación con Serbia: SHI 62 vs. 68. Ajustar manejo de
            cubierta.
          </li>
        </ul>
      </div>
    </div>
  );
}
