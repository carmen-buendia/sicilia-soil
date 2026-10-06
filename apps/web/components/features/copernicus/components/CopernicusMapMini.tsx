"use client";

import { useEffect, useState } from "react";
import type { LatLngExpression } from "leaflet";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import {
  COPERNICUS_LAYER_CONFIG,
  FARM_BOUNDARY,
  FARM_CENTER,
  FARM_MINI_ZOOM,
} from "@sicilia-soil/core";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);
const Polygon = dynamic(() => import("react-leaflet").then((m) => m.Polygon), {
  ssr: false,
});
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});

export function CopernicusMapMini({
  height = "240px",
  onExpand,
}: {
  height?: string;
  onExpand?: () => void;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    import("leaflet/dist/leaflet.css");
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        className="flex items-center justify-center bg-blue-50/40 border border-blue-100 rounded-xl animate-pulse"
        style={{ height }}
      >
        <p className="text-sm text-oliveGreen/60">Cargando mapa…</p>
      </div>
    );
  }

  const layer = COPERNICUS_LAYER_CONFIG.satellite;
  const plot = FARM_BOUNDARY[0];

  return (
    <div
      className="relative rounded-xl overflow-hidden border border-oliveGreen/15 cursor-pointer group"
      style={{ height }}
      onClick={onExpand}
    >
      <MapContainer
        center={FARM_CENTER as LatLngExpression}
        zoom={FARM_MINI_ZOOM}
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url={layer.url}
          attribution={layer.attribution}
          opacity={layer.opacity}
          maxNativeZoom={layer.maxNativeZoom}
          maxZoom={layer.maxZoom}
        />
        <Polygon
          positions={plot.coordinates as LatLngExpression[]}
          pathOptions={{
            color: plot.color ?? "#8B9D6B",
            fillColor: plot.color ?? "#8B9D6B",
            fillOpacity: 0.35,
            weight: 3,
          }}
        />
        <Marker position={plot.center as LatLngExpression} />
      </MapContainer>

      {/* Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-white font-medium">
          <MapPin className="w-3.5 h-3.5" />
          {plot.name}
        </span>
        <span className="text-xs text-white/80 group-hover:text-white transition-colors">
          Ver completo →
        </span>
      </div>
    </div>
  );
}
