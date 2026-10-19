"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Droplets,
  RefreshCw,
  Settings,
  Wifi,
  Globe,
  User,
  Lock,
  Monitor,
  Save,
} from "lucide-react";
import { Button, DataCard } from "@sicilia-soil/ui";

// ============================================================================
// Toggle — switch semántico con role="switch"
// ============================================================================
function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        checked ? "bg-chloro" : "bg-ink/20"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-paper rounded-full transition-transform ${
          checked ? "translate-x-6" : ""
        }`}
      />
    </button>
  );
}

// ============================================================================
// Página
// ============================================================================
export default function ConfigurationPage() {
  const [activeTab, setActiveTab] = useState<
    "general" | "alerts" | "sensors" | "account"
  >("general");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState("30");

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "alerts", label: "Alertas", icon: Bell },
    { id: "sensors", label: "Sensores", icon: Wifi },
    { id: "account", label: "Cuenta", icon: User },
  ] as const;

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-paper text-ink">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            href="/dashboard"
            LinkComponent={Link}
            variant="bare"
            size="none"
            className="!rounded-none hover:scale-100 p-2 text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors"
            aria-label="Volver al dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink flex items-center gap-3">
              <Settings className="w-6 h-6 text-chloro" />
              Configuración
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink/50 mt-1">
              Ajusta las preferencias de tu huerto sintrópico
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-ink/20 pb-2">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                variant="bare"
                size="none"
                onClick={() => setActiveTab(tab.id)}
                className={`!!rounded-none hover:scale-100 flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest font-bold transition-colors ${
                  active
                    ? "bg-ink text-paper"
                    : "text-ink/60 hover:text-ink hover:bg-ink/5"
                }`}
                icon={<tab.icon className="w-4 h-4" />}
              >
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Tab: General */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <DataCard className="p-6">
              <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-chloro" />
                Apariencia
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-ink">Modo oscuro</p>
                  <p className="text-sm text-ink/60">
                    Alternar entre tema claro y oscuro
                  </p>
                </div>
                <Toggle
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  label="Modo oscuro"
                />
              </div>
            </DataCard>

            <DataCard className="p-6">
              <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-chloro" />
                Datos
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-ink">Auto-refresco</p>
                    <p className="text-sm text-ink/60">
                      Actualizar datos automáticamente
                    </p>
                  </div>
                  <Toggle
                    checked={autoRefresh}
                    onChange={() => setAutoRefresh(!autoRefresh)}
                    label="Auto-refresco"
                  />
                </div>

                {autoRefresh && (
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest font-bold text-ink/60 mb-2">
                      Intervalo de refresco
                    </label>
                    <select
                      value={refreshInterval}
                      onChange={(e) => setRefreshInterval(e.target.value)}
                      className="w-full px-3 py-2 border border-ink/20 !rounded-none bg-paper text-ink font-mono text-sm focus:outline-none focus:border-ink"
                    >
                      <option value="15">Cada 15 segundos</option>
                      <option value="30">Cada 30 segundos</option>
                      <option value="60">Cada 1 minuto</option>
                      <option value="300">Cada 5 minutos</option>
                    </select>
                  </div>
                )}
              </div>
            </DataCard>

            <DataCard className="p-6">
              <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-chloro" />
                Idioma
              </h3>
              <select className="w-full px-3 py-2 border border-ink/20 !rounded-none bg-paper text-ink font-mono text-sm focus:outline-none focus:border-ink">
                <option value="es">Español</option>
                <option value="it">Italiano</option>
                <option value="en">English</option>
              </select>
            </DataCard>

            <Button
              variant="cta"
              className="w-full px-8 py-3 font-mono text-xs uppercase tracking-widest font-bold transition-colors"
              icon={<Save className="w-4 h-4" />}
            >
              Guardar cambios
            </Button>
          </div>
        )}

        {/* Tab: Alertas */}
        {activeTab === "alerts" && (
          <div className="space-y-6">
            <DataCard className="p-6">
              <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-chloro" />
                Notificaciones
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-ink">Notificaciones push</p>
                    <p className="text-sm text-ink/60">
                      Recibir alertas en el navegador
                    </p>
                  </div>
                  <Toggle
                    checked={pushAlerts}
                    onChange={() => setPushAlerts(!pushAlerts)}
                    label="Notificaciones push"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-ink">Alertas por email</p>
                    <p className="text-sm text-ink/60">
                      Recibir alertas en tu correo
                    </p>
                  </div>
                  <Toggle
                    checked={emailAlerts}
                    onChange={() => setEmailAlerts(!emailAlerts)}
                    label="Alertas por email"
                  />
                </div>
              </div>
            </DataCard>

            <DataCard className="p-6">
              <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-solar" />
                Umbrales de alerta
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest font-bold text-ink/60 mb-1">
                    Humedad mínima (%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    className="w-full"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-ink/50 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest font-bold text-ink/60 mb-1">
                    Temperatura máxima (°C)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    defaultValue="35"
                    className="w-full"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-ink/50 mt-1">
                    <span>0°C</span>
                    <span>35°C</span>
                    <span>50°C</span>
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest font-bold text-ink/60 mb-1">
                    Luz mínima (%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="40"
                    className="w-full"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-ink/50 mt-1">
                    <span>0%</span>
                    <span>40%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </DataCard>

            <Button
              variant="cta"
              className="w-full px-8 py-3 font-mono text-xs uppercase tracking-widest font-bold transition-colors"
              icon={<Save className="w-4 h-4" />}
            >
              Guardar umbrales
            </Button>
          </div>
        )}

        {/* Tab: Sensores */}
        {activeTab === "sensors" && (
          <div className="space-y-6">
            <DataCard className="p-6">
              <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <Wifi className="w-5 h-5 text-chloro" />
                Estado de sensores
              </h3>
              <div className="space-y-2">
                {[
                  {
                    name: "Sensor de humedad - Parcela Norte",
                    status: "online",
                    value: "78%",
                  },
                  {
                    name: "Sensor de temperatura - Parcela Sur",
                    status: "online",
                    value: "24°C",
                  },
                  {
                    name: "Sensor de luz - Olivar",
                    status: "offline",
                    value: "---",
                  },
                  {
                    name: "Sensor de viento - Zona Oeste",
                    status: "online",
                    value: "12 km/h",
                  },
                ].map((sensor, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-paper border border-ink/10"
                  >
                    <div>
                      <p className="font-medium text-ink">{sensor.name}</p>
                      <p className="font-mono text-xs text-ink/60">
                        {sensor.value}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 font-mono text-[10px] uppercase tracking-widest font-bold ${
                        sensor.status === "online"
                          ? "bg-chloro/10 text-chloro"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {sensor.status === "online"
                        ? "Conectado"
                        : "Desconectado"}
                    </span>
                  </div>
                ))}
              </div>
            </DataCard>

            <Button
              variant="cta"
              className="w-full px-8 py-3 font-mono text-xs uppercase tracking-widest font-bold transition-colors"
              icon={<RefreshCw className="w-4 h-4" />}
            >
              Reintentar conexión
            </Button>
          </div>
        )}

        {/* Tab: Cuenta */}
        {activeTab === "account" && (
          <div className="space-y-6">
            <DataCard className="p-6">
              <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-chloro" />
                Información personal
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest font-bold text-ink/60 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    defaultValue="Carmen Buendía"
                    className="w-full px-3 py-2 border border-ink/20 !rounded-none bg-paper text-ink font-mono text-sm focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest font-bold text-ink/60 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="carmen@example.com"
                    className="w-full px-3 py-2 border border-ink/20 !rounded-none bg-paper text-ink font-mono text-sm focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest font-bold text-ink/60 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    defaultValue="+34 123 456 789"
                    className="w-full px-3 py-2 border border-ink/20 !rounded-none bg-paper text-ink font-mono text-sm focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest font-bold text-ink/60 mb-1">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    defaultValue="Sicilia, Italia"
                    className="w-full px-3 py-2 border border-ink/20 !rounded-none bg-paper text-ink font-mono text-sm focus:outline-none focus:border-ink"
                  />
                </div>
              </div>
            </DataCard>

            <DataCard className="p-6">
              <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-chloro" />
                Seguridad
              </h3>
              <Button
                variant="outline"
                className="!!rounded-none hover:scale-100 w-full px-8 py-3 border-ink/20 text-ink hover:bg-ink/5 font-mono text-xs uppercase tracking-widest font-bold transition-colors"
              >
                Cambiar contraseña
              </Button>
            </DataCard>

            <Button
              variant="cta"
              className="w-full px-8 py-3 font-mono text-xs uppercase tracking-widest font-bold transition-colors"
              icon={<Save className="w-4 h-4" />}
            >
              Guardar cambios
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
