import React, { useId } from "react";
import { Info } from "lucide-react";
import { DataCard } from "@sicilia-soil/ui";

interface StatsCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  subtext?: string;
  /** Texto de ayuda que aparece al pasar el ratón o al enfocar el tile con el teclado. */
  help?: string;
}

export const StatsCard = ({
  value,
  label,
  icon,
  subtext,
  help,
}: StatsCardProps) => {
  const helpId = useId();

  return (
    <DataCard
      variant="bare"
      className="relative p-5 flex flex-col justify-between h-full group"
    >
      <div
        tabIndex={help ? 0 : undefined}
        aria-describedby={help ? helpId : undefined}
        className="flex flex-col justify-between h-full outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-card"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-ink/40 group-hover:text-chloro transition-colors">
            {icon}
          </div>
          {help ? (
            <Info
              className="w-3.5 h-3.5 text-ink/30 group-hover:text-ink/70 transition-colors"
              aria-hidden="true"
            />
          ) : (
            <div className="w-1.5 h-1.5 border border-ink/20 rounded-full" />
          )}
        </div>

        <div>
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-ink/50 font-bold mb-1">
            {label}
          </p>
          <p className="font-mono text-3xl font-bold text-ink leading-none mt-1">
            {value}
          </p>
          {subtext && (
            <p className="font-sans text-xs text-ink/40 mt-2">{subtext}</p>
          )}
        </div>
      </div>

      {help && (
        <span
          id={helpId}
          role="tooltip"
          className="pointer-events-none absolute left-3 right-3 top-full -mt-2 z-50 bg-ink text-paper font-sans text-xs leading-snug px-3 py-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-opacity"
        >
          {help}
        </span>
      )}
    </DataCard>
  );
};
