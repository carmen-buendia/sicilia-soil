// packages/ui/src/components/MycoMeshLogo.tsx
import type { ComponentProps } from "react";

export type MycoMeshLogoProps = ComponentProps<"svg"> & {
  /** Tamaño en px (ancho y alto). Default: 32 */
  size?: number;
  /** Si `true`, el nodo central pulsa. Default: true */
  animated?: boolean;
};

export function MycoMeshLogo({
  size = 32,
  animated = true,
  className,
  ...props
}: MycoMeshLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      className={className}
      aria-label="MycoMesh Protocol"
      role="img"
      {...props}
    >
      {/* Raíz central */}
      <path
        d="M50,10 Q50,50 50,90"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Ramificaciones */}
      <path
        d="M50,30 Q30,40 15,30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M50,30 Q70,40 85,30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M50,70 Q30,80 15,70"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M50,70 Q70,80 85,70"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Nodos */}
      <circle cx="15" cy="30" r="4" fill="currentColor" />
      <circle cx="85" cy="30" r="4" fill="currentColor" />
      <circle cx="15" cy="70" r="4" fill="currentColor" />
      <circle cx="85" cy="70" r="4" fill="currentColor" />
      <circle
        cx="50"
        cy="50"
        r="6"
        fill="currentColor"
        className={animated ? "animate-pulse" : undefined}
      />
    </svg>
  );
}
