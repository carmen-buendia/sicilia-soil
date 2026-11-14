"use client";

import { useState, useEffect } from "react";
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
  Check,
} from "lucide-react";
import { Button, DataCard } from "@sicilia-soil/ui";
import { getLocale } from "@sicilia-soil/core";

const locale = getLocale("es");
const configContent = locale.ui.configuration;

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

export default function ConfigurationPage() {
  const [activeTab, setActiveTab] = useState<
    "general" | "alerts" | "sensors" | "account"
  >("general");

  // Estados
  const [darkMode, setDarkMode] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState("30");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDarkMode(parsed.darkMode ?? false);

      setAutoRefresh(parsed.autoRefresh ?? true);

      setRefreshInterval(parsed.refreshInterval ?? "30");

      setEmailAlerts(parsed.emailAlerts ?? true);
    }
  }, []);

  const handleSave = () => {
    const settings = {
      darkMode,
      autoRefresh,
      refreshInterval,
      emailAlerts,
      pushAlerts,
    };
    localStorage.setItem("sikelia_settings", JSON.stringify(settings));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const tabs = [
    { id: "general", label: configContent.tabs.general, icon: Settings },
    { id: "alerts", label: configContent.tabs.alerts, icon: Bell },
    { id: "sensors", label: configContent.tabs.sensors, icon: Wifi },
    { id: "account", label: configContent.tabs.account, icon: User },
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
              {configContent.title}
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink/50 mt-1">
              {configContent.subtitle}
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
                className={`!rounded-none hover:scale-100 flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest font-bold transition-colors ${
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
                {configContent.general.appearanceTitle}
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-ink">
                    {configContent.general.darkMode}
                  </p>
                  <p className="text-sm text-ink/60">
                    {configContent.general.darkModeDesc}
                  </p>
                </div>
                <Toggle
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  label={configContent.general.darkMode}
                />
              </div>
            </DataCard>

            <DataCard className="p-6">
              <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-chloro" />
                {configContent.general.dataTitle}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-ink">
                      {configContent.general.autoRefresh}
                    </p>
                    <p className="text-sm text-ink/60">
                      {configContent.general.autoRefreshDesc}
                    </p>
                  </div>
                  <Toggle
                    checked={autoRefresh}
                    onChange={() => setAutoRefresh(!autoRefresh)}
                    label={configContent.general.autoRefresh}
                  />
                </div>

                {autoRefresh && (
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest font-bold text-ink/60 mb-2">
                      {configContent.general.interval}
                    </label>
                    <select
                      value={refreshInterval}
                      onChange={(e) => setRefreshInterval(e.target.value)}
                      className="w-full px-3 py-2 border border-ink/20 !rounded-none bg-paper text-ink font-mono text-sm focus:outline-none focus:border-ink"
                    >
                      <option value="15">
                        {configContent.general.interval15}
                      </option>
                      <option value="30">
                        {configContent.general.interval30}
                      </option>
                      <option value="60">
                        {configContent.general.interval60}
                      </option>
                      <option value="300">
                        {configContent.general.interval300}
                      </option>
                    </select>
                  </div>
                )}
              </div>
            </DataCard>

            <DataCard className="p-6">
              <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-chloro" />
                {configContent.general.languageTitle}
              </h3>
              <select className="w-full px-3 py-2 border border-ink/20 !rounded-none bg-paper text-ink font-mono text-sm focus:outline-none focus:border-ink">
                <option value="es">Español</option>
                <option value="it">Italiano</option>
                <option value="en">English</option>
              </select>
            </DataCard>

            <Button
              onClick={handleSave}
              variant="cta"
              className="w-full px-8 py-3 font-mono text-xs uppercase tracking-widest font-bold transition-colors"
              icon={
                isSaved ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )
              }
            >
              {isSaved ? "¡Guardado!" : configContent.general.save}
            </Button>
          </div>
        )}

        {/* Tab: Alertas */}
        {activeTab === "alerts" && (
          <div className="space-y-6">
            <DataCard className="p-6">
              <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-chloro" />
                {configContent.alerts.notificationsTitle}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-ink">
                      {configContent.alerts.push}
                    </p>
                    <p className="text-sm text-ink/60">
                      {configContent.alerts.pushDesc}
                    </p>
                  </div>
                  <Toggle
                    checked={pushAlerts}
                    onChange={() => setPushAlerts(!pushAlerts)}
                    label={configContent.alerts.push}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-ink">
                      {configContent.alerts.email}
                    </p>
                    <p className="text-sm text-ink/60">
                      {configContent.alerts.emailDesc}
                    </p>
                  </div>
                  <Toggle
                    checked={emailAlerts}
                    onChange={() => setEmailAlerts(!emailAlerts)}
                    label={configContent.alerts.email}
                  />
                </div>
              </div>
            </DataCard>

            <DataCard className="p-6">
              <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-solar" />
                {configContent.alerts.thresholdsTitle}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest font-bold text-ink/60 mb-1">
                    {configContent.alerts.minMoisture}
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
                    {configContent.alerts.maxTemp}
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
                    {configContent.alerts.minLight}
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
              onClick={handleSave}
              variant="cta"
              className="w-full px-8 py-3 font-mono text-xs uppercase tracking-widest font-bold transition-colors"
              icon={
                isSaved ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )
              }
            >
              {isSaved ? "¡Guardado!" : configContent.alerts.saveThresholds}
            </Button>
          </div>
        )}

        {/* Tab: Sensores */}
        {activeTab === "sensors" && (
          <div className="space-y-6">
            <DataCard className="p-6">
              <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <Wifi className="w-5 h-5 text-chloro" />
                {configContent.sensors.title}
              </h3>
              <div className="p-8 text-center border border-dashed border-ink/20 bg-paper/50">
                <p className="font-mono text-sm text-ink/60">
                  {configContent.sensors.noSensors}
                </p>
              </div>
            </DataCard>

            <Button
              variant="outline"
              className="w-full px-8 py-3 border-ink/20 text-ink hover:bg-ink/5 font-mono text-xs uppercase tracking-widest font-bold transition-colors"
              icon={<RefreshCw className="w-4 h-4" />}
            >
              {configContent.sensors.retry}
            </Button>
          </div>
        )}

        {/* Tab: Cuenta */}
        {activeTab === "account" && (
          <div className="space-y-6">
            <DataCard className="p-6">
              <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-chloro" />
                {configContent.account.infoTitle}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest font-bold text-ink/60 mb-1">
                    {configContent.account.name}
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full px-3 py-2 border border-ink/20 !rounded-none bg-paper text-ink font-mono text-sm focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest font-bold text-ink/60 mb-1">
                    {configContent.account.email}
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-3 py-2 border border-ink/20 !rounded-none bg-paper text-ink font-mono text-sm focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest font-bold text-ink/60 mb-1">
                    {configContent.account.phone}
                  </label>
                  <input
                    type="tel"
                    placeholder="+34 000 000 000"
                    className="w-full px-3 py-2 border border-ink/20 !rounded-none bg-paper text-ink font-mono text-sm focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest font-bold text-ink/60 mb-1">
                    {configContent.account.location}
                  </label>
                  <input
                    type="text"
                    placeholder="Sicilia, Italia"
                    className="w-full px-3 py-2 border border-ink/20 !rounded-none bg-paper text-ink font-mono text-sm focus:outline-none focus:border-ink"
                  />
                </div>
              </div>
            </DataCard>

            <DataCard className="p-6">
              <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-chloro" />
                {configContent.account.securityTitle}
              </h3>
              <Button
                variant="outline"
                className="!rounded-none hover:scale-100 w-full px-8 py-3 border-ink/20 text-ink hover:bg-ink/5 font-mono text-xs uppercase tracking-widest font-bold transition-colors"
              >
                {configContent.account.changePassword}
              </Button>
            </DataCard>

            <Button
              onClick={handleSave}
              variant="cta"
              className="w-full px-8 py-3 font-mono text-xs uppercase tracking-widest font-bold transition-colors"
              icon={
                isSaved ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )
              }
            >
              {isSaved ? "¡Guardado!" : configContent.account.save}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
