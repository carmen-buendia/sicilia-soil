"use client";

import { useEffect, useMemo } from "react";
import Map, { Source, Layer, Marker } from "react-map-gl/maplibre";
import { MapPin } from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  COPERNICUS_LAYER_CONFIG,
  FARM_BOUNDARY,
  FARM_CENTER,
  FARM_MINI_ZOOM,
} from "@sicilia-soil/core";
import { initMapLibreWorker } from "./MapLibreSetup";

// Estilo base neutro (Carto Positron), público y sin token.
const BASE_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

// Leaflet usa [lat, lng] → MapLibre usa [lng, lat]
const toLngLat = (coord: [number, number]): [number, number] => [
  coord[1],
  coord[0],
];

export function CopernicusMapMini({
  height = "240px",
  onExpand,
}: {
  height?: string;
  onExpand?: () => void;
}) {
  useEffect(() => {
    initMapLibreWorker();
  }, []);
  const layer = COPERNICUS_LAYER_CONFIG.satellite;
  const plot = FARM_BOUNDARY[0];

  const boundaryGeoJSON = useMemo(
    () => ({
      type: "Feature" as const,
      properties: {},
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            ...plot.coordinates.map(toLngLat),
            toLngLat(plot.coordinates[0]), // cerrar el anillo
          ],
        ],
      },
    }),
    [plot],
  );

  const [centerLng, centerLat] = toLngLat(FARM_CENTER as [number, number]);
  const [markerLng, markerLat] = toLngLat(plot.center as [number, number]);

  return (
    <div
      className="relative rounded-xl overflow-hidden border border-oliveGreen/15 group"
      style={{ height }}
    >
      <Map
        initialViewState={{
          longitude: centerLng,
          latitude: centerLat,
          zoom: FARM_MINI_ZOOM,
        }}
        mapStyle={BASE_STYLE}
        scrollZoom={false}
        dragRotate={false}
        pitchWithRotate={false}
        touchPitch={false}
        attributionControl={{ compact: true }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Tiles satelitales de Copernicus (raster) */}
        <Source
          id="copernicus-satellite"
          type="raster"
          tiles={[layer.url]}
          tileSize={256}
          attribution={layer.attribution}
        >
          <Layer
            id="copernicus-satellite-layer"
            type="raster"
            paint={{ "raster-opacity": layer.opacity ?? 1 }}
          />
        </Source>

        {/* Polígono de la parcela */}
        <Source id="farm-boundary" type="geojson" data={boundaryGeoJSON}>
          <Layer
            id="farm-boundary-fill"
            type="fill"
            paint={{
              "fill-color": plot.color ?? "#8B9D6B",
              "fill-opacity": 0.35,
            }}
          />
          <Layer
            id="farm-boundary-line"
            type="line"
            paint={{
              "line-color": plot.color ?? "#8B9D6B",
              "line-width": 3,
            }}
          />
        </Source>

        {/* Marker con emoji (equivalente al DivIcon de Leaflet) */}
        <Marker longitude={markerLng} latitude={markerLat} anchor="center">
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "#8B9D6B",
              border: "2px solid #ffffff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              lineHeight: 1,
            }}
          >
            🌱
          </div>
        </Marker>
      </Map>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 flex items-center justify-between pointer-events-none">
        <span className="flex items-center gap-1.5 text-xs text-white font-medium">
          <MapPin className="w-3.5 h-3.5" />
          {plot.name}
        </span>
        <button
          type="button"
          onClick={onExpand}
          className="pointer-events-auto text-xs text-white/90 hover:text-white font-medium bg-black/30 hover:bg-black/50 px-2.5 py-1 rounded-md transition-colors"
        >
          Ver completo →
        </button>
      </div>
    </div>
  );
}
