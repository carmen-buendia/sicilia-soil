// packages/ui/src/components/Button.tsx
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentType,
  ReactNode,
} from "react";

// ============================================================================
// Tipos públicos
// ============================================================================

/** Slot de enlace inyectable (next/link, react-router Link, etc.). */
export type LinkLike = ComponentType<any>;

export type ButtonVariant =
  | "primary"
  | "gradient"
  | "dark"
  | "cta"
  | "danger"
  | "secondary"
  | "outline"
  | "ghost"
  | "bare"
  | "link"
  | "chip"
  | "chip-yellow"
  | "tab"
  | "toggle-live";

export type ButtonSize = "sm" | "md" | "lg" | "none";

// ============================================================================
// Estilos
// ============================================================================

const SIZES: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  none: "",
};

const BASE: Record<
  Exclude<ButtonVariant, "chip" | "chip-yellow" | "tab" | "toggle-live">,
  string
> = {
  primary: "bg-oliveGreen text-white hover:bg-oliveGreen/90",
  gradient:
    "bg-gradient-to-r from-oliveGreen to-wheatGold text-white hover:shadow-lg",
  dark: "bg-ink text-paper border border-ink/20 hover:bg-chloro hover:border-chloro",
  cta: "bg-ink text-paper hover:bg-chloro !rounded-none hover:!scale-100",
  danger:
    "bg-transparent text-red-500 border border-red-500/30 hover:bg-red-500/10",
  secondary: "bg-gray-100 text-ink-700 hover:bg-gray-200",
  outline: "border border-oliveGreen/20 text-oliveGreen hover:bg-oliveGreen/5",
  ghost: "text-ink-600 hover:bg-gray-100",
  bare: "",
  link: "text-oliveGreen hover:text-oliveGreen/80 bg-transparent p-0 h-auto !rounded-none hover:!scale-100",
};

const CHIP_ACTIVE =
  "bg-gradient-to-r from-oliveGreen to-wheatGold text-white shadow-lg scale-[1.02]";
const CHIP_INACTIVE =
  "bg-card text-charcoalGray border border-oliveGreen/20 hover:bg-oliveGreen/5";
const CHIP_Y_ACTIVE =
  "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg scale-[1.02]";
const CHIP_Y_INACTIVE =
  "bg-card/50 backdrop-blur-sm text-charcoalGray border border-yellow-200 hover:bg-yellow-50";
const TAB_ACTIVE = "bg-oliveGreen text-white shadow-md";
const TAB_INACTIVE = "text-charcoalGray/60 hover:bg-oliveGreen/10";
const TOGGLE_ACTIVE = "bg-green-100 text-green-700 border border-green-300";
const TOGGLE_INACTIVE = "bg-gray-100 text-ink-600 border border-gray-200";

function variantClass(variant: ButtonVariant, active: boolean): string {
  switch (variant) {
    case "chip":
      return active ? CHIP_ACTIVE : CHIP_INACTIVE;
    case "chip-yellow":
      return active ? CHIP_Y_ACTIVE : CHIP_Y_INACTIVE;
    case "tab":
      return active ? TAB_ACTIVE : TAB_INACTIVE;
    case "toggle-live":
      return active ? TOGGLE_ACTIVE : TOGGLE_INACTIVE;
    default:
      return BASE[variant] ?? "";
  }
}

// ============================================================================
// Props (interface única + href opcional)
// ============================================================================

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  active?: boolean;
  icon?: ReactNode;
  align?: "center" | "start";
  className?: string;
  children?: ReactNode;
}

export interface ButtonProps
  extends
    SharedProps,
    // Omitimos `type` para redefinirlo más abajo con más flexibilidad.
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps | "type"> {
  /**
   * Tipo de `<button>`. Acepta los valores estándar + cualquier string
   * (`(string & {})` mantiene autocompletado sin cerrar el tipo).
   */
  type?: "submit" | "button" | "reset";

  /** Si se pasa, se renderiza `<a>` o `<Link>` en lugar de `<button>`. */
  href?: string;

  /** Componente de enlace a inyectar (next/link, etc.). Default: `<a>`. */
  LinkComponent?: LinkLike;

  /** `true` → `<a target="_blank" rel="noopener noreferrer">`. */
  external?: boolean;
}

// ============================================================================
// Componente
// ============================================================================

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  active = false,
  icon,
  align = "center",
  className = "",
  children,
  href,
  LinkComponent,
  external,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = isLoading || disabled;

  const classes = [
    "rounded-xl font-semibold transition-all duration-200 inline-flex items-center gap-2",
    variantClass(variant, active),
    SIZES[size],
    align === "start" ? "justify-start" : "justify-center",
    isDisabled ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = isLoading ? (
    <>
      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      <span>Loading...</span>
    </>
  ) : (
    <>
      {icon}
      {children}
    </>
  );

  // ─── Rama enlace ────────────────────────────────────────────────────────
  if (href) {
    // `rest` puede arrastrar props button-only (formAction, etc.); el cast
    // deja pasar las que sí aplican en <a> sin ensuciar el tipo público.
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...anchorProps}
        >
          {content}
        </a>
      );
    }

    if (LinkComponent) {
      const Link = LinkComponent;
      return (
        <Link href={href} className={classes} {...(rest as any)}>
          {content}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  // ─── Rama botón ─────────────────────────────────────────────────────────
  return (
    <button type={type} className={classes} disabled={isDisabled} {...rest}>
      {content}
    </button>
  );
}
