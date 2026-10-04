"use client";

import { BarChart3 } from "lucide-react";

const COVER_COMPARISON = [
  {
    cover: "Esparto",
    colonisation: 45,
    glomalin: 2.1,
    shi: 88,
    color: "#8B9D6B",
  },
  {
    cover: "Árboles",
    colonisation: 42,
    glomalin: 2.0,
    shi: 82,
    color: "#6B8E23",
  },
  {
    cover: "Hortalizas",
    colonisation: 35,
    glomalin: 1.6,
    shi: 68,
    color: "#E07A5F",
  },
  {
    cover: "Cereal",
    colonisation: 30,
    glomalin: 1.5,
    shi: 62,
    color: "#D4A574",
  },
  {
    cover: "Cubiertas",
    colonisation: 38,
    glomalin: 1.8,
    shi: 74,
    color: "#A3B18A",
  },
  {
    cover: "Barbecho",
    colonisation: 25,
    glomalin: 1.2,
    shi: 55,
    color: "#B8B8B8",
  },
];

export function AnalysisTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
        <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-oliveGreen" />
          Comparador de cultivos y coberturas
        </h3>
        <p className="text-sm text-oliveGreen/70 mb-6">
          Misma metodología (SHI, colonización micorrícica, glomalina) aplicada
          a todos los componentes del sistema. Evidencia del enfoque{" "}
          <strong>crop-agnostic</strong>.
        </p>

        <div className="space-y-4">
          {COVER_COMPARISON.map((row) => (
            <div key={row.cover} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-charcoalGray">
                  {row.cover}
                </span>
                <span className="text-oliveGreen/70">SHI {row.shi}/100</span>
              </div>
              <div className="h-3 bg-oliveGreen/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${row.shi}%`, backgroundColor: row.color }}
                />
              </div>
              <div className="flex gap-4 text-xs text-oliveGreen/60">
                <span>Colonización: {row.colonisation}%</span>
                <span>Glomalina: {row.glomalin} mg/g</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 rounded-2xl p-6 border border-oliveGreen/15">
        <h3 className="text-lg font-bold text-charcoalGray mb-3">
          Interpretación
        </h3>
        <ul className="space-y-2 text-sm text-oliveGreen/70">
          <li>
            ✓ El <strong>esparto</strong> muestra el SHI más alto por su sistema
            radical profundo y su larga simbiosis con hongos.
          </li>
          <li>
            ✓ Los <strong>árboles</strong> mantienen valores altos por su
            micorrización estable y aporte de hojarasca.
          </li>
          <li>
            ✓ Las <strong>hortalizas</strong> tienen SHI medio, pero cierran el
            ciclo vía compost.
          </li>
          <li>
            ✓ El <strong>cereal</strong> tiene menor colonización por el ciclo
            corto, pero sirve como comparación directa con Serbia.
          </li>
          <li>
            ✓ El <strong>barbecho</strong> está en recuperación: se espera que
            suba tras el período de reposo.
          </li>
        </ul>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
        <h3 className="text-lg font-bold text-charcoalGray mb-3">
          Validación cruzada NOSTRADAMUS
        </h3>
        <p className="text-sm text-oliveGreen/70">
          Los mismos indicadores se medirán en Sicilia (Mediterráneo,
          policultivo) y Serbia (continental, cereal). Los resultados se
          comparan para demostrar la transferibilidad del método en la entrega
          D3.1.
        </p>
      </div>
    </div>
  );
}
