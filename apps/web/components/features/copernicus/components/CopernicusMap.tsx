"use client";

import {
  Fragment,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  LatLngExpression,
  LatLngBoundsExpression,
  DivIcon,
} from "leaflet";
import { Satellite, Layers, MapPin, Maximize2 } from "lucide-react";
import { useMap } from "react-leaflet";
import {
  COPERNICUS_LAYER_CONFIG,
  FARM_BOUNDARY,
  FARM_CENTER,
  FARM_DEFAULT_ZOOM,
  type CopernicusLayer,
  type CopernicusMapProps,
} from "@sicilia-soil/core";

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

/**
 * Crea el icono de marca de Sicilia Soil (DivIcon, sin PNG externo).
 * Debe llamarse solo en cliente, tras cargar leaflet dinámicamente.
 *
 * Por qué DivIcon y no PNG:
 *   Next.js/Turbopack rompen las rutas relativas a los PNGs por defecto
 *   de Leaflet. Un DivIcon (HTML+CSS inline) es inmune a ese problema,
 *   coincide con la paleta de marca y no depende de unpkg.
 */
function createFarmMarkerIcon(L: typeof import("leaflet")): DivIcon {
  return L.divIcon({
    className: "sicilia-soil-marker",
    html: `
      <div style="
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: #8B9D6B;
        border: 3px solid #ffffff;
        box-shadow: 0 2px 10px rgba(0,0,0,0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        line-height: 1;
      ">🌱</div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -17],
  });
}

/**
 * Encaja el mapa en los límites de todas las parcelas al cargar
 * y cuando cambian. Expone `fit()` vía ref para el botón "centrar".
 */
const FitToPlots = forwardRef<
  { fit: () => void },
  { plots: { coordinates: [number, number][] }[] }
>(({ plots }, ref) => {
  const map = useMap();

  const fit = () => {
    if (!plots.length) return;
    const bounds = plots.flatMap(
      (p) => p.coordinates,
    ) as LatLngBoundsExpression;
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 21 });
  };

  useImperativeHandle(ref, () => ({ fit }));

  useEffect(() => {
    fit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plots.length]);

  return null;
});
FitToPlots.displayName = "FitToPlots";

export function CopernicusMap({
  plots = FARM_BOUNDARY,
  initialLayer = "satellite",
  initialCenter = FARM_CENTER,
  initialZoom = FARM_DEFAULT_ZOOM,
  height = "500px",
}: CopernicusMapProps) {
  const [activeLayer, setActiveLayer] = useState<CopernicusLayer>(initialLayer);
  const [isMounted, setIsMounted] = useState(false);
  const [markerIcon, setMarkerIcon] = useState<DivIcon | null>(null);

  const fitRef = useRef<{ fit: () => void }>(null);

  useEffect(() => {
    import("leaflet/dist/leaflet.css");
    import("leaflet").then((mod) => {
      setMarkerIcon(createFarmMarkerIcon(mod));
      setIsMounted(true);
    });
  }, []);

  const layer = COPERNICUS_LAYER_CONFIG[activeLayer];

  const center = useMemo(
    () => initialCenter as LatLngExpression,
    [initialCenter],
  );

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
        className="rounded-lg overflow-hidden border border-blue-100 relative"
        style={{ height }}
      >
        <MapContainer
          center={center}
          zoom={initialZoom}
          minZoom={14}
          maxZoom={22}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url={layer.url}
            attribution={layer.attribution}
            opacity={layer.opacity}
            maxNativeZoom={layer.maxNativeZoom}
            maxZoom={layer.maxZoom}
          />

          {plots.map((plot) => (
            <Fragment key={plot.id}>
              <Polygon
                positions={plot.coordinates as LatLngExpression[]}
                pathOptions={{
                  color: plot.color ?? "#2563eb",
                  fillColor: plot.color ?? "#3b82f6",
                  fillOpacity: 0.35,
                  weight: 3,
                }}
              />
              {markerIcon && (
                <Marker
                  position={plot.center as LatLngExpression}
                  icon={markerIcon}
                >
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
              )}
            </Fragment>
          ))}

          {/* Encaja automáticamente + expone fit() vía ref */}
          <FitToPlots ref={fitRef} plots={plots} />
        </MapContainer>

        {/* Botón "fit to farm" — sin recargar la página */}
        <button
          type="button"
          className="absolute top-3 right-3 z-[400] bg-white/90 backdrop-blur-sm border border-blue-100 rounded-md p-1.5 shadow-sm hover:bg-white"
          onClick={() => fitRef.current?.fit()}
          title="Centrar en la finca"
        >
          <Maximize2 className="w-4 h-4 text-blue-600" />
        </button>
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
