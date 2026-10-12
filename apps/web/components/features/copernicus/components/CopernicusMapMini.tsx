"use client";

import { useEffect, useState } from "react";
import type { LatLngExpression, DivIcon } from "leaflet";
import { MapPin } from "lucide-react";
import { MapContainer, TileLayer, Polygon, Marker } from "react-leaflet";
import {
  COPERNICUS_LAYER_CONFIG,
  FARM_BOUNDARY,
  FARM_CENTER,
  FARM_MINI_ZOOM,
} from "@sicilia-soil/core";

function createMiniMarkerIcon(L: typeof import("leaflet")): DivIcon {
  return L.divIcon({
    className: "sicilia-soil-marker-mini",
    html: `
      <div style="
        width: 26px; height: 26px; border-radius: 50%;
        background: #8B9D6B; border: 2px solid #ffffff;
        box-shadow: 0 2px 6px rgba(0,0,0,0.35);
        display: flex; align-items: center; justify-content: center;
        font-size: 14px; line-height: 1;
      ">🌱</div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
}

export function CopernicusMapMini({
  height = "240px",
  onExpand,
}: {
  height?: string;
  onExpand?: () => void;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [markerIcon, setMarkerIcon] = useState<DivIcon | null>(null);

  useEffect(() => {
    import("leaflet/dist/leaflet.css");
    import("leaflet").then((mod) => {
      setMarkerIcon(createMiniMarkerIcon(mod));
      setIsMounted(true);
    });
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
      className="relative rounded-xl overflow-hidden border border-oliveGreen/15 group"
      style={{ height }}
    >
      <MapContainer
        center={FARM_CENTER as LatLngExpression}
        zoom={FARM_MINI_ZOOM}
        zoomControl={true}
        dragging={true}
        scrollWheelZoom={false}
        doubleClickZoom={true}
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
        {markerIcon && (
          <Marker
            position={plot.center as LatLngExpression}
            icon={markerIcon}
          />
        )}
      </MapContainer>

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
