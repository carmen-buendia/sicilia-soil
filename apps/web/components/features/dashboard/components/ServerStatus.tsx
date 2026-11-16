"use client";

import { Wifi, WifiOff, Loader2 } from "lucide-react";
import type { ServerStatusValue } from "@/hooks/useServerStatus";

interface ServerStatusProps {
  status: ServerStatusValue;
}

const CONFIG = {
  checking: {
    icon: Loader2,
    text: "Conectando con los sensores…",
    className: "text-ink/60",
    animate: "animate-spin",
  },
  online: {
    icon: Wifi,
    text: "Sensores conectados",
    className: "text-chloro",
    animate: "",
  },
  offline: {
    icon: WifiOff,
    text: "Sensores desconectados",
    className: "text-sicilian-red",
    animate: "",
  },
} as const;

/**
 * Indicador compacto del estado de los sensores para el header.
 * Solo icono; el texto aparece como tooltip al pasar el ratón o al enfocar con teclado.
 */
export function ServerStatus({ status }: ServerStatusProps) {
  const current = CONFIG[status];
  const Icon = current.icon;
  const tooltipId = "server-status-tooltip";

  return (
    <div className="relative group">
      <span
        tabIndex={0}
        role="status"
        aria-label={current.text}
        aria-describedby={tooltipId}
        className={`flex items-center justify-center w-8 h-8 cursor-default outline-none focus-visible:ring-2 focus-visible:ring-ink ${current.className}`}
      >
        <Icon className={`w-5 h-5 ${current.animate}`} aria-hidden="true" />
      </span>
      <span
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-ink text-paper font-mono text-xs px-2 py-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-50"
      >
        {current.text}
      </span>
    </div>
  );
}
