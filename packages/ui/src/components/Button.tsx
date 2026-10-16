import { ReactNode, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "bare"
    | "chip"
    | "chip-yellow"
    | "olive"
    | "outline-olive"
    | "gradient"
    | "gradient-yellow"
    | "icon"
    | "icon-glass-yellow"
    | "tab"
    | "glass"
    | "glass-red"
    | "blue"
    | "gradient-blue"
    | "outline-blue"
    | "toggle-live"
    | "link";
  size?: "sm" | "md" | "lg" | "none";
  isLoading?: boolean;
  active?: boolean;
  icon?: ReactNode;
  align?: "center" | "start";
}

// ============================================
// VARIANTES EXISTENTES — NO TOCAR
// ============================================
const variants = {
  primary:
    "bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg",
  secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  outline: "border-2 border-red-200 text-gray-700 hover:bg-red-50",
  ghost: "text-gray-600 hover:bg-gray-100",
  bare: "",
};

// ============================================
// VARIANTS MycoMesh Protocol
// ============================================
const olive = "bg-oliveGreen text-white hover:bg-oliveGreen/90";
const outlineOlive =
  "border border-oliveGreen/20 text-oliveGreen hover:bg-oliveGreen/5";
const gradient =
  "bg-gradient-to-r from-oliveGreen to-wheatGold text-white hover:shadow-lg";
const iconVariant = "p-2 hover:bg-oliveGreen/10 text-oliveGreen";

// ============================================
// VARIANTS HUMEDAD (azul)
// ============================================
const glass =
  "bg-white/50 backdrop-blur-sm border border-oliveGreen/15 hover:bg-white text-charcoalGray";
const glassRed =
  "bg-white/50 backdrop-blur-sm border border-red-200 hover:bg-white text-charcoalGray";
const blue = "bg-blue-600 text-white hover:bg-blue-700";
const gradientBlue =
  "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-md";
const outlineBlue = "border-2 border-blue-300 text-blue-700 hover:bg-blue-50";

// ============================================
// VARIANTS LUZ (amarillo)
// ============================================
const gradientYellow =
  "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-lg";
const iconGlassYellow =
  "p-2 bg-white/50 backdrop-blur-sm rounded-xl border border-yellow-200 hover:bg-yellow-50 text-yellow-600";

// ============================================
// CHIP (según active)
// ============================================
const chipActive =
  "bg-gradient-to-r from-oliveGreen to-wheatGold text-white shadow-lg scale-[1.02]";
const chipInactive =
  "bg-white text-charcoalGray border border-oliveGreen/20 hover:bg-oliveGreen/5";

const chipYellowActive =
  "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg scale-[1.02]";
const chipYellowInactive =
  "bg-white/50 backdrop-blur-sm text-charcoalGray border border-yellow-200 hover:bg-yellow-50";

// ============================================
// TAB (según active)
// ============================================
const tabActive = "bg-oliveGreen text-white shadow-md";
const tabInactive = "text-charcoalGray/60 hover:bg-oliveGreen/10";

// ============================================
// TOGGLE LIVE (según active)
// ============================================
const toggleLiveActive = "bg-green-100 text-green-700 border border-green-300";
const toggleLiveInactive = "bg-gray-100 text-gray-600 border border-gray-200";

// ============================================
// LINK (texto plano, sin fondo, sin padding)
// ============================================
const linkVariant =
  "text-oliveGreen hover:text-oliveGreen/80 bg-transparent p-0 h-auto rounded-none hover:!scale-100";

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  none: "",
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  active = false,
  icon,
  align = "center",
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  let variantClass = "";
  switch (variant) {
    case "chip":
      variantClass = active ? chipActive : chipInactive;
      break;
    case "chip-yellow":
      variantClass = active ? chipYellowActive : chipYellowInactive;
      break;
    case "tab":
      variantClass = active ? tabActive : tabInactive;
      break;
    case "link":
      variantClass = linkVariant;
      break;
    case "toggle-live":
      variantClass = active ? toggleLiveActive : toggleLiveInactive;
      break;
    case "olive":
      variantClass = olive;
      break;
    case "outline-olive":
      variantClass = outlineOlive;
      break;
    case "gradient":
      variantClass = gradient;
      break;
    case "gradient-yellow":
      variantClass = gradientYellow;
      break;
    case "icon":
      variantClass = iconVariant;
      break;
    case "icon-glass-yellow":
      variantClass = iconGlassYellow;
      break;
    case "glass-red":
      variantClass = glassRed;
      break;
    case "glass":
      variantClass = glass;
      break;
    case "blue":
      variantClass = blue;
      break;
    case "gradient-blue":
      variantClass = gradientBlue;
      break;
    case "outline-blue":
      variantClass = outlineBlue;
      break;
    default:
      variantClass = variants[variant as keyof typeof variants];
  }

  const alignClass = align === "start" ? "justify-start" : "justify-center";

  return (
    <button
      className={`rounded-xl font-semibold transition-all duration-200 inline-flex items-center gap-2 ${variantClass} ${sizes[size]} ${alignClass} ${
        disabled || isLoading
          ? "opacity-50 cursor-not-allowed"
          : "hover:scale-[1.02]"
      } ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
};
