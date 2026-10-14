"use client";

import { BarChart3 } from "lucide-react";
import { SoilChart, SOIL_COLORS } from "@/components/features/shared";
import { useAnalysisData } from "@/hooks/useAnalysisData";

export function AnalysisTab() {
  const { coverComparison } = useAnalysisData();

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
          <strong>crop-agnostic soil infrastructure</strong>.
        </p>

        <SoilChart
          type="column"
          categories={coverComparison.map((c) => c.cover)}
          series={[
            {
              name: "SHI (0-100)",
              data: coverComparison.map((c) => c.shi),
              color: SOIL_COLORS.olive,
            },
            {
              name: "Colonización AMF (%)",
              data: coverComparison.map((c) => c.colonisation),
              color: SOIL_COLORS.green,
            },
            {
              name: "Glomalina (mg/g × 10)",
              data: coverComparison.map((c) => c.glomalin * 10),
              color: SOIL_COLORS.wheat,
            },
          ]}
          yAxisLabel="Valor"
          height={360}
          legend
        />
      </div>

      {/* Interpretación */}
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
            corto, pero es clave como cultivo de cobertura y rotación.
          </li>
          <li>
            ✓ El <strong>barbecho</strong> está en recuperación: se espera que
            suba tras el período de reposo.
          </li>
        </ul>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-oliveGreen/15">
        <h3 className="text-lg font-bold text-charcoalGray mb-3">
          Ciclo regenerativo del sistema
        </h3>
        <p className="text-sm text-oliveGreen/70">
          Todos los cultivos comparten la misma red subterránea de micorrizas.
          El esparto y el cereal alimentan el micelio con su biomasa. Los
          árboles aportan hojarasca y sombra. Las hortalizas cierran el ciclo
          vía compost. El barbecho permite que la red fúngica se recupere y
          expanda antes del siguiente ciclo de siembra.
        </p>
      </div>
    </div>
  );
}
