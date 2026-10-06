import { ReactNode } from "react";

export interface ChipProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  active?: boolean;
  onClick?: () => void;
  badgeActiveClass?: string;
  badgeInactiveClass?: string;
  className?: string;
}

export function Chip({
  icon,
  title,
  subtitle,
  badge,
  active = false,
  onClick,
  badgeActiveClass = "bg-white/20 text-white",
  badgeInactiveClass = "bg-wheatGold/20 text-wheatGold",
  className = "",
}: ChipProps) {
  const base =
    "inline-flex items-center padding-2 rounded-xl font-semibold transition-all duration-200 cursor-pointer text-left";
  const state = active
    ? "bg-gradient-to-r from-oliveGreen to-wheatGold text-white shadow-lg scale-[1.02]"
    : "bg-white text-charcoalGray border border-oliveGreen/20 hover:bg-oliveGreen/5";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${state} ${className}`}
    >
      {icon && (
        <span className="shrink-0 flex items-center justify-center w-10 h-10 ml-4 mr-3">
          {icon}
        </span>
      )}

      <div className="flex flex-col gap-0.5 py-3 pr-4">
        <p className="font-medium leading-tight whitespace-nowrap">{title}</p>
        {subtitle && (
          <p className="text-xs opacity-80 leading-tight whitespace-nowrap">
            {subtitle}
          </p>
        )}
      </div>

      {/* {badge && (
        <span
          className={`shrink-0 mr-4 text-xs px-2.5 py-1 rounded-full ${active ? badgeActiveClass : badgeInactiveClass}`}
        >
          {badge}
        </span>
      )} */}
    </button>
  );
}
