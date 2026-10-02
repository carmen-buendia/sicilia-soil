"use client";

import { useEffect, useState } from "react";
import type { LatLngExpression } from "leaflet";
import { Satellite, Layers, MapPin } from "lucide-react";
import {
  COPERNICUS_LAYER_CONFIG,
  DEFAULT_MAP_PLOTS,
  type CopernicusLayer,
  type CopernicusMapProps,
} from "@sicilia-soil/core";

// 👇 Import dinámico de react-leaflet (solo en cliente)
import dynamic from "next/dynamic";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const Polygon = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polygon),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export function CopernicusMap({
  plots = DEFAULT_MAP_PLOTS,
  initialLayer = "satellite",
  initialCenter = [42.5, 16.5],
  initialZoom = 5,
  height = "500px",
}: CopernicusMapProps) {
  const [activeLayer, setActiveLayer] = useState<CopernicusLayer>(initialLayer);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Carga el CSS de Leaflet solo en cliente
    import("leaflet/dist/leaflet.css");
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        className="flex items-center justify-center bg-blue-50/50 border border-blue-100 rounded-xl"
        style={{ height }}
      >
        <div className="flex flex-col items-center gap-2 text-oliveGreen/70">
          <Satellite className="w-6 h-6 animate-pulse text-blue-600" />
          <p className="text-sm">Cargando mapa satelital…</p>
        </div>
      </div>
    );
  }

  const layer = COPERNICUS_LAYER_CONFIG[activeLayer];

  return (
    <div className="bg-white/50 backdrop-blur-sm border border-blue-100 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-blue-100 gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg text-blue-600">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-charcoalGray">
              Mapa de Datos Satelitales
            </h3>
            <p className="text-xs text-oliveGreen/70">
              Visualización geoespacial · {layer.label}
            </p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {(Object.keys(COPERNICUS_LAYER_CONFIG) as CopernicusLayer[]).map(
            (key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveLayer(key)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors text-xs ${
                  activeLayer === key
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-oliveGreen/70 hover:text-charcoalGray hover:bg-blue-50 border border-blue-100"
                }`}
              >
                {key.toUpperCase()}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Mapa */}
      <div
        className="rounded-lg overflow-hidden border border-blue-100"
        style={{ height }}
      >
        <MapContainer
          center={initialCenter as LatLngExpression}
          zoom={initialZoom}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url={layer.url}
            attribution={layer.attribution}
            opacity={layer.opacity}
          />

          {plots.map((plot) => (
            <div key={plot.id}>
              <Polygon
                positions={plot.coordinates as LatLngExpression[]}
                pathOptions={{
                  color: "#2563eb",
                  fillColor: "#3b82f6",
                  fillOpacity: 0.2,
                  weight: 2,
                }}
              />
              <Marker position={plot.center as LatLngExpression}>
                <Popup>
                  <div className="text-xs">
                    <strong className="text-charcoalGray">{plot.name}</strong>
                    {plot.indices && (
                      <ul className="mt-2 space-y-0.5 text-oliveGreen/80">
                        {plot.indices.ndvi !== undefined && (
                          <li>NDVI: {plot.indices.ndvi.toFixed(2)}</li>
                        )}
                        {plot.indices.ndwi !== undefined && (
                          <li>NDWI: {plot.indices.ndwi.toFixed(2)}</li>
                        )}
                        {plot.indices.ssm !== undefined && (
                          <li>SSM: {plot.indices.ssm}%</li>
                        )}
                        {plot.indices.lst !== undefined && (
                          <li>LST: {plot.indices.lst}°C</li>
                        )}
                      </ul>
                    )}
                  </div>
                </Popup>
              </Marker>
            </div>
          ))}
        </MapContainer>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-blue-100 flex flex-wrap justify-between items-center text-xs text-oliveGreen/70 gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            {plots.length} parcelas monitorizadas
          </span>
          <span>
            Capa activa:{" "}
            <strong className="text-charcoalGray font-semibold">
              {layer.label}
            </strong>
          </span>
        </div>
        <span className="text-blue-600 font-medium cursor-pointer hover:underline">
          Exportar GeoJSON →
        </span>
      </div>
    </div>
  );
}
