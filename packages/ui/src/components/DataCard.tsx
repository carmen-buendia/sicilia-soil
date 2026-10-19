import React from "react";

export interface DataCardProps {
  children: React.ReactNode;
  variant?: "default" | "warning" | "critical" | "success" | "info" | "bare";
  className?: string;
  onClick?: () => void;
  isRead?: boolean;
}

export function DataCard({
  children,
  variant = "default",
  className = "",
  onClick,
  isRead = false,
}: DataCardProps) {
  // Si es 'bare', no aplicamos fondos, ni bordes, ni padding.
  // Solo devolvemos el div con el className que le pase el consumidor.
  if (variant === "bare") {
    return (
      <div
        onClick={onClick}
        className={`${onClick ? "cursor-pointer" : ""} ${className}`}
      >
        {children}
      </div>
    );
  }

  const getVariantStyles = () => {
    if (isRead) return "bg-card/50 border-ink/10 opacity-60";
    switch (variant) {
      case "critical":
        return "bg-red-500/5 border-red-500/20";
      case "warning":
        return "bg-solar/5 border-solar/30";
      case "success":
        return "bg-chloro/5 border-chloro/30";
      case "info":
        return "bg-ink/5 border-ink/20";
      default:
        return "bg-card border-ink/20";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`border p-4 transition-colors ${
        onClick ? "cursor-pointer hover:bg-paper/50" : ""
      } ${getVariantStyles()} ${className}`}
    >
      {children}
    </div>
  );
}
