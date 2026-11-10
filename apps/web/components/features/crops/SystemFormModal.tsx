// apps/web/components/features/crops/SystemFormModal.tsx
"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCropSystemsContext } from "./CropSystemsProvider";
import { X, MapPin, Navigation, Cpu } from "lucide-react";
import { Button } from "@sicilia-soil/ui";
import type {
  SystemTemplate,
  CropSensor,
  CropSystem,
} from "@sicilia-soil/core";

interface SystemFormModalProps {
  systemToEdit?: CropSystem; // 👈 Si viene, es modo edición
  onClose: () => void;
}

export function SystemFormModal({
  systemToEdit,
  onClose,
}: SystemFormModalProps) {
  const { addSystem, updateSystem } = useCropSystemsContext();

  const isEditing = !!systemToEdit;

  // 👇 Inicializamos los estados con los datos del sistema (si estamos editando)
  const [name, setName] = useState(systemToEdit?.name || "");
  const [template, setTemplate] = useState<SystemTemplate>(
    systemToEdit?.template || "herbaceous",
  );
  const [locationInput, setLocationInput] = useState(
    systemToEdit?.location?.address || "",
  );
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    systemToEdit?.location
      ? { lat: systemToEdit.location.lat, lng: systemToEdit.location.lng }
      : null,
  );

  const [sensorId, setSensorId] = useState(
    systemToEdit?.sensors?.[0]?.id || "",
  );
  const [sensorType, setSensorType] = useState<CropSensor["type"]>(
    systemToEdit?.sensors?.[0]?.type || "multiparameter",
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      setMounted(false);
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleGetGPS = () => {
    if (!navigator.geolocation)
      return alert("Tu navegador no soporta geolocalización.");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationInput("Ubicación GPS capturada");
      },
      () => alert("No se pudo obtener la ubicación. Revisa los permisos."),
    );
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocationInput(val);
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)|q=(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = val.match(regex);
    if (match) {
      const lat = parseFloat(match[1] || match[3]);
      const lng = parseFloat(match[2] || match[4]);
      if (!isNaN(lat) && !isNaN(lng)) setCoords({ lat, lng });
    }
  };

  // Función de mock data (solo se usa al crear, no al editar)
  const getMockDataForTemplate = (tpl: SystemTemplate) => {
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
    if (tpl === "cover-fallow") {
      return {
        subCrops: [
          {
            id: "1",
            name: "Trébol",
            icon: "🍀",
            area: "30%",
            residue: 2.8,
            extraction: 22,
            water: 82,
            stage: "High density",
            season: "Otoño",
          },
          {
            id: "2",
            name: "Veza",
            icon: "🌿",
            area: "25%",
            residue: 2.5,
            extraction: 20,
            water: 76,
            stage: "Emergence",
            season: "Invierno",
          },
        ],
        series: [
          {
            key: "rotation",
            name: "Progreso",
            categories: months,
            data: [100, 80, 60, 40, 20, 0],
          },
        ],
      };
    }
    return {
      subCrops: [
        {
          id: "1",
          name: "Cultivo Principal",
          icon: "🌱",
          area: "100%",
          residue: 1.5,
          extraction: 10,
          water: 50,
        },
      ],
      series: [
        {
          key: "moisture",
          name: "Humedad (%)",
          categories: months,
          data: [45, 50, 40, 35, 30, 25],
        },
        {
          key: "ndvi",
          name: "NDVI",
          categories: months,
          data: [0.2, 0.3, 0.5, 0.7, 0.6, 0.4],
        },
      ],
    };
  };

  const handleSave = () => {
    if (!name.trim()) return alert("El nombre es obligatorio");

    const sensors: CropSensor[] = sensorId.trim()
      ? [{ id: sensorId.trim(), label: `Sensor en ${name}`, type: sensorType }]
      : [];

    const baseData = {
      name,
      template,
      location: coords ? { ...coords, address: locationInput } : undefined,
      sensors,
    };

    if (isEditing && systemToEdit) {
      // 👇 MODO EDICIÓN: Mantenemos sus gráficos y métricas intactas
      updateSystem(systemToEdit.id, {
        ...baseData,
        icon:
          template === "woody"
            ? "🌳"
            : template === "cover-fallow"
              ? "🌿"
              : "🌱",
        updatedAt: new Date().toISOString(),
      });
    } else {
      // 👇 MODO CREACIÓN: Generamos datos mock
      const mockData = getMockDataForTemplate(template);
      const newSystem = {
        id: crypto.randomUUID(),
        ...baseData,
        icon:
          template === "woody"
            ? "🌳"
            : template === "cover-fallow"
              ? "🌿"
              : "🌱",
        metrics: {
          shi: Math.floor(Math.random() * 40) + 40,
          amf: Math.floor(Math.random() * 30) + 20,
          glomalin: 0.5,
        },
        subCrops: mockData.subCrops,
        series: mockData.series,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addSystem(newSystem);
    }

    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm">
      <div className="bg-paper border border-ink/20 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative">
        <div className="sticky top-0 bg-paper z-10 flex items-center justify-between p-4 border-b border-ink/10">
          {/* 👇 Título dinámico */}
          <h2 className="font-serif text-xl font-bold text-ink">
            {isEditing ? "Editar Zona" : "Añadir Zona"}
          </h2>
          <button onClick={onClose} className="text-ink/50 hover:text-ink p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-ink/60 mb-1">
              Nombre de la zona
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Oliveto Norte"
              className="w-full bg-card border border-ink/20 p-2 text-sm text-ink focus:outline-none focus:border-chloro"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-ink/60 mb-1">
              Tipo de cultivo
            </label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value as SystemTemplate)}
              className="w-full bg-card border border-ink/20 p-2 text-sm text-ink focus:outline-none focus:border-chloro"
            >
              <option value="herbaceous">Herbácea (Cereales, Esparto)</option>
              <option value="woody">Leñosa (Olivos, Frutales)</option>
              <option value="mixed">Mixta (Huerto sinérgico)</option>
              <option value="cover-fallow">Cubierta / Barbecho</option>
            </select>
          </div>

          <div className="p-3 bg-card border border-ink/10 space-y-3">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-ink/60 flex items-center gap-1">
              <Cpu className="w-3 h-3" /> Sensor IoT (Opcional)
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={sensorId}
                onChange={(e) => setSensorId(e.target.value)}
                placeholder="ID (Ej: S-001)"
                className="flex-1 bg-paper border border-ink/20 p-2 text-xs text-ink focus:outline-none focus:border-chloro"
              />
              <select
                value={sensorType}
                onChange={(e) =>
                  setSensorType(e.target.value as CropSensor["type"])
                }
                className="bg-paper border border-ink/20 p-2 text-xs text-ink focus:outline-none focus:border-chloro"
              >
                <option value="multiparameter">Multiparámetro</option>
                <option value="soil-moisture">Humedad Suelo</option>
                <option value="temperature">Temperatura</option>
                <option value="soil-respiration">Respiración (CO₂)</option>
                <option value="ph-ec">pH / CE</option>
                <option value="npk">Nutrientes (NPK)</option>
                <option value="bioelectricity">Señales Eléctricas</option>
                <option value="radiation">Radiación</option>
                <option value="wind">Viento</option>
                <option value="contamination">Contaminación</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-card border border-ink/10 space-y-3">
            <label className="block font-mono text-[10px] uppercase tracking-wider text-ink/60">
              Ubicación (Copernicus)
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={locationInput}
                onChange={handleLocationChange}
                placeholder="Pega link de Google Maps..."
                className="flex-1 bg-paper border border-ink/20 p-2 text-xs text-ink focus:outline-none focus:border-chloro"
              />
              <Button
                variant="bare"
                onClick={handleGetGPS}
                className="bg-paper border border-ink/20 px-3 flex items-center justify-center gap-1"
              >
                <Navigation className="w-4 h-4 text-chloro" /> GPS
              </Button>
            </div>
            {coords ? (
              <p className="font-mono text-[10px] text-chloro flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {coords.lat.toFixed(4)},{" "}
                {coords.lng.toFixed(4)}
              </p>
            ) : (
              <p className="font-mono text-[10px] text-ink/40">
                Sin coordenadas. Copernicus no podrá leer los datos.
              </p>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-ink/10 flex justify-end gap-2 bg-paper mt-auto">
          <Button
            variant="bare"
            onClick={onClose}
            className="px-4 py-2 text-sm"
          >
            Cancelar
          </Button>
          <Button
            variant="cta"
            onClick={handleSave}
            className="px-4 py-2 text-sm"
          >
            {isEditing ? "Guardar Cambios" : "Crear Zona"}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
