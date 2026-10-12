"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Map, {
  Source,
  Layer,
  Marker,
  Popup,
  type MapRef,
} from "react-map-gl/maplibre";
import { Satellite, Layers, MapPin, Maximize2 } from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  COPERNICUS_LAYER_CONFIG,
  FARM_BOUNDARY,
  FARM_CENTER,
  FARM_DEFAULT_ZOOM,
  type CopernicusLayer,
  type CopernicusMapProps,
} from "@sicilia-soil/core";
import { initMapLibreWorker } from "./MapLibreSetup";

const BASE_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

const toLngLat = (coord: [number, number]): [number, number] => [
  coord[1],
  coord[0],
];

export function CopernicusMap({
  plots = FARM_BOUNDARY,
  initialLayer = "satellite",
  initialCenter = FARM_CENTER,
  initialZoom = FARM_DEFAULT_ZOOM,
  height = "500px",
}: CopernicusMapProps) {
  useEffect(() => {
    initMapLibreWorker();
  }, []);
  const mapRef = useRef<MapRef>(null);
  const [activeLayer, setActiveLayer] = useState<CopernicusLayer>(initialLayer);
  const [popupPlot, setPopupPlot] = useState<(typeof plots)[number] | null>(
    null,
  );

  const layer = COPERNICUS_LAYER_CONFIG[activeLayer];

  const plotsGeoJSON = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: plots.map((plot) => ({
        type: "Feature" as const,
        properties: {
          id: plot.id,
          name: plot.name,
          color: plot.color ?? "#2563eb",
        },
        geometry: {
          type: "Polygon" as const,
          coordinates: [
            [...plot.coordinates.map(toLngLat), toLngLat(plot.coordinates[0])],
          ],
        },
      })),
    }),
    [plots],
  );

  const fitToPlots = useCallback(() => {
    if (!plots.length || !mapRef.current) return;
    const lngs: number[] = [];
    const lats: number[] = [];
    plots.forEach((p) => {
      p.coordinates.forEach(([lat, lng]) => {
        lngs.push(lng);
        lats.push(lat);
      });
    });
    mapRef.current.fitBounds(
      [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)],
      ],
      { padding: 40, maxZoom: 21, duration: 600 },
    );
  }, [plots]);

  useEffect(() => {
    fitToPlots();
  }, [fitToPlots]);

  const [centerLng, centerLat] = toLngLat(initialCenter as [number, number]);

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
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: centerLng,
            latitude: centerLat,
            zoom: initialZoom,
          }}
          minZoom={14}
          maxZoom={22}
          scrollZoom
          mapStyle={BASE_STYLE}
          dragRotate={false}
          pitchWithRotate={false}
          touchPitch={false}
          attributionControl={{ compact: true }}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Tiles de Copernicus — key fuerza remount al cambiar de capa */}
          <Source
            key={activeLayer}
            id="copernicus-raster"
            type="raster"
            tiles={[layer.url]}
            tileSize={256}
            attribution={layer.attribution}
          >
            <Layer
              id="copernicus-raster-layer"
              type="raster"
              paint={{ "raster-opacity": layer.opacity ?? 1 }}
            />
          </Source>

          {/* Polígonos */}
          <Source id="plots-geojson" type="geojson" data={plotsGeoJSON}>
            <Layer
              id="plots-fill"
              type="fill"
              paint={{
                "fill-color": ["get", "color"],
                "fill-opacity": 0.35,
              }}
            />
            <Layer
              id="plots-line"
              type="line"
              paint={{
                "line-color": ["get", "color"],
                "line-width": 3,
              }}
            />
          </Source>

          {/* Markers */}
          {plots.map((plot) => {
            const [markerLng, markerLat] = toLngLat(
              plot.center as [number, number],
            );
            return (
              <Marker
                key={plot.id}
                longitude={markerLng}
                latitude={markerLat}
                anchor="center"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setPopupPlot(plot);
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: "#8B9D6B",
                    border: "3px solid #ffffff",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    lineHeight: 1,
                    cursor: "pointer",
                  }}
                >
                  🌱
                </div>
              </Marker>
            );
          })}

          {/* Popup con índices */}
          {popupPlot && (
            <Popup
              longitude={toLngLat(popupPlot.center as [number, number])[0]}
              latitude={toLngLat(popupPlot.center as [number, number])[1]}
              anchor="bottom"
              onClose={() => setPopupPlot(null)}
              closeOnClick={false}
              maxWidth="240px"
            >
              <div className="text-xs">
                <strong className="text-charcoalGray">{popupPlot.name}</strong>
                {popupPlot.indices && (
                  <ul className="mt-2 space-y-0.5 text-oliveGreen/80">
                    {popupPlot.indices.ndvi !== undefined && (
                      <li>NDVI: {popupPlot.indices.ndvi.toFixed(2)}</li>
                    )}
                    {popupPlot.indices.ndwi !== undefined && (
                      <li>NDWI: {popupPlot.indices.ndwi.toFixed(2)}</li>
                    )}
                    {popupPlot.indices.ssm !== undefined && (
                      <li>SSM: {popupPlot.indices.ssm}%</li>
                    )}
                    {popupPlot.indices.lst !== undefined && (
                      <li>LST: {popupPlot.indices.lst}°C</li>
                    )}
                  </ul>
                )}
              </div>
            </Popup>
          )}
        </Map>

        {/* Botón fit-to-farm */}
        <button
          type="button"
          className="absolute top-3 right-3 z-[400] bg-white/90 backdrop-blur-sm border border-blue-100 rounded-md p-1.5 shadow-sm hover:bg-white"
          onClick={fitToPlots}
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
