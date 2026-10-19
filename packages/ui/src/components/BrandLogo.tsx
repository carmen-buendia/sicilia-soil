// packages/ui/src/components/BrandLogo.tsx
import type { ComponentType, ReactNode } from "react";
import { MycoMeshLogo } from "./MycoMeshLogo";

/**
 * Slot de enlace. Acepta `next/link`, `react-router` `Link`,
 * `<a>` nativo, etc.
 *
 * Usamos `ComponentType<any>` a propósito: `next/link` devuelve un
 * `ForwardRefExoticComponent` cuyo `propTypes`/`href` (`string | UrlObject`)
 * no son asignables estructuralmente a `FunctionComponent<{ href: string; … }>`.
 * El contrato real (`href`, `className`, `children`) lo garantizamos en el
 * cuerpo del componente, no en el tipo del slot.
 */
export type LinkLike = ComponentType<any>;

export type BrandLogoSize = "sm" | "md" | "lg";

const SIZES: Record<
  BrandLogoSize,
  { box: string; icon: number; text: string; gap: string }
> = {
  sm: { box: "p-1", icon: 20, text: "text-xl", gap: "gap-2" },
  md: { box: "p-1.5", icon: 32, text: "text-2xl", gap: "gap-3" },
  lg: { box: "p-2", icon: 48, text: "text-4xl", gap: "gap-4" },
};

export interface BrandLogoProps {
  href?: string;
  size?: BrandLogoSize;
  LinkComponent?: LinkLike;
  wordmark?: ReactNode;
  className?: string;
}

export function BrandLogo({
  href,
  size = "md",
  LinkComponent,
  wordmark,
  className,
}: BrandLogoProps) {
  const s = SIZES[size];

  const content = (
    <>
      <div className={`${s.box} bg-ink text-paper`}>
        <MycoMeshLogo
          size={s.icon}
          className="text-chloro group-hover:text-solar transition-colors"
        />
      </div>
      <span
        className={`font-serif font-bold ${s.text} tracking-tight text-ink`}
      >
        {wordmark ?? (
          <>
            MycoMesh<span className="text-solar">.</span>Protocol
          </>
        )}
      </span>
    </>
  );

  const wrapperClass =
    `flex items-center ${s.gap} group ${className ?? ""}`.trim();

  if (!href) return <div className={wrapperClass}>{content}</div>;

  if (!LinkComponent) {
    return (
      <a href={href} className={wrapperClass}>
        {content}
      </a>
    );
  }

  const Link = LinkComponent;
  return (
    <Link href={href} className={wrapperClass}>
      {content}
    </Link>
  );
}
