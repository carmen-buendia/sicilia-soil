import React from "react";
import { DataCard } from "@sicilia-soil/ui";

interface StatsCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  subtext?: string;
}

export const StatsCard = ({ value, label, icon, subtext }: StatsCardProps) => {
  return (
    <DataCard
      variant="bare"
      className="p-5 flex flex-col justify-between h-full group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-ink/40 group-hover:text-chloro transition-colors">
          {icon}
        </div>
        <div className="w-1.5 h-1.5 border border-ink/20 rounded-full" />
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
    </DataCard>
  );
};
