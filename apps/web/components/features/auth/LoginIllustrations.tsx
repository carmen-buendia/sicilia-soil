// apps/web/components/features/auth/LoginIllustrations.tsx
// Ilustraciones de línea del carrusel del login (viewBox 240×240).
// Verde = currentColor (text-chloro); acentos en solar (#DCA354) y paper (#F8F7F2), como en tailwind.config.js.

import type { ReactNode } from "react";

export type LoginIllustrationId =
  | "portada"
  | "bajo-tierra"
  | "riego-a-ojo"
  | "suelo-cansado"
  | "sensor"
  | "satelite"
  | "avisos"
  | "tus-datos";

const ILLUSTRATIONS: Record<LoginIllustrationId, ReactNode> = {
  "portada": (
    <>
      <rect x="62" y="62" width="116" height="116" transform="rotate(45 120 120)" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M120 152 V118" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /><path d="M104 154 H136" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M120 124 C108 124 98 116 98 104 C110 104 120 110 120 124 Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M120 118 C120 102 132 94 146 94 C146 108 136 118 120 118 Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  "bajo-tierra": (
    <>
      <path d="M20 110 H220" fill="none" stroke="#F8F7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.5}/>
      <path d="M120 110 V70" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M120 84 C106 84 96 76 96 62 C110 62 120 70 120 84 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M120 78 C120 62 132 54 146 54 C146 68 136 78 120 78 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M120 110 V160 M120 128 L96 150 M120 128 L146 152 M120 146 L104 176 M120 146 L138 182" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity={0.55} strokeDasharray="5 6"/>
      <circle cx="120" cy="182" r="34" fill="none" stroke="#DCA354" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 6"/>
      <path d="M112 176 C112 166 128 166 128 176 C128 184 120 184 120 192" fill="none" stroke="#DCA354" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="120" cy="202" r="2.5" fill="#DCA354"/>
    </>
  ),
  "riego-a-ojo": (
    <>
      <path d="M58 96 H138 V156 C138 166 130 172 120 172 H76 C66 172 58 166 58 156 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M138 110 L186 80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M180 72 L194 90" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M74 96 C74 72 122 72 122 96" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M200 104 C196 112 194 116 194 120 A6 6 0 0 0 206 120 C206 116 204 112 200 104 Z" fill="none" stroke="#DCA354" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M188 136 C184 144 182 148 182 152 A6 6 0 0 0 194 152 C194 148 192 144 188 136 Z" fill="none" stroke="#DCA354" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M212 150 C208 158 206 162 206 166 A6 6 0 0 0 218 166 C218 162 216 158 212 150 Z" fill="none" stroke="#DCA354" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity={0.4}/>
      <path d="M30 196 H210" fill="none" stroke="#F8F7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.5}/>
      <path d="M150 200 C150 190 166 190 166 200 C166 207 158 207 158 214" fill="none" stroke="#DCA354" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><circle cx="158" cy="222" r="2.2" fill="#DCA354"/>
    </>
  ),
  "suelo-cansado": (
    <>
      <path d="M20 160 H220" fill="none" stroke="#F8F7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.5}/>
      <path d="M60 160 V96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M60 118 C44 118 34 108 34 92 C50 92 60 102 60 118 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M60 108 C60 90 74 82 90 82 C90 98 78 108 60 108 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M120 160 V118" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity={0.75}/><path d="M120 134 C108 134 100 126 100 114 C112 114 120 122 120 134 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity={0.75}/><path d="M120 128 C120 116 130 110 142 110 C142 122 132 128 120 128 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity={0.75}/>
      <path d="M180 160 V140" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity={0.45}/><path d="M180 148 C172 148 166 142 166 134 C174 134 180 140 180 148 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity={0.45}/>
      <path d="M44 52 L120 70 L196 108" fill="none" stroke="#DCA354" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M184 98 L198 109 L182 114" fill="none" stroke="#DCA354" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M70 176 L82 188 L74 200 M150 172 L140 186 L152 198 M190 178 L200 192" fill="none" stroke="#F8F7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.35}/>
    </>
  ),
  "sensor": (
    <>
      <path d="M20 150 H220" fill="none" stroke="#F8F7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.5}/>
      <rect x="104" y="72" width="32" height="44" rx="4" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M120 116 V196" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M112 196 L120 210 L128 196" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="120" cy="92" r="5" fill="#DCA354"/>
      <path d="M150 70 C162 80 162 100 150 110 M166 58 C186 76 186 104 166 122" fill="none" stroke="#DCA354" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M90 70 C78 80 78 100 90 110 M74 58 C54 76 54 104 74 122" fill="none" stroke="#DCA354" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity={0.5}/>
      <path d="M84 176 C84 170 90 168 92 172 M150 182 C152 176 158 176 160 180" fill="none" stroke="#DCA354" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.7}/>
      <circle cx="88" cy="186" r="3" fill="#DCA354" opacity={0.7}/><circle cx="154" cy="192" r="3" fill="#DCA354" opacity={0.7}/>
    </>
  ),
  "satelite": (
    <>
      <rect x="104" y="40" width="32" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="56" y="44" width="40" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><rect x="144" y="44" width="40" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M96 52 H104 M136 52 H144 M76 44 V60 M164 44 V60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M112 64 L70 160 M128 64 L170 160" fill="none" stroke="#DCA354" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 7"/>
      <path d="M40 160 L200 160 L220 200 L20 200 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M120 160 L120 200 M80 160 L70 200 M160 160 L170 200 M30 180 H210" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.55}/>
      <path d="M120 160 L160 160 L170 200 L120 200 Z" fill="#DCA354" opacity={0.22}/>
    </>
  ),
  "avisos": (
    <>
      <rect x="78" y="34" width="84" height="164" rx="14" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M108 48 H132" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><circle cx="120" cy="184" r="4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="88" y="78" width="92" height="56" rx="8" fill="#2C352C" stroke="#DCA354" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M100 134 L94 148 L112 134" fill="#2C352C" stroke="#DCA354" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M104 96 C100 102 98 106 98 108 A6 6 0 0 0 110 108 C110 106 108 102 104 96 Z" fill="none" stroke="#DCA354" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M118 100 H166 M118 114 H154" fill="none" stroke="#F8F7F2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity={0.8}/>
      <path d="M186 54 C194 60 194 72 186 78 M196 46 C208 58 208 76 196 86" fill="none" stroke="#DCA354" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.6}/>
    </>
  ),
  "tus-datos": (
    <>
      <path d="M60 112 L120 64 L180 112" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M74 102 V176 H166 V102" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="104" y="136" width="32" height="40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M150 36 L182 48 V70 C182 88 168 100 150 106 C132 100 118 88 118 70 V48 Z" fill="#2C352C" stroke="#DCA354" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M136 70 L146 80 L166 58" fill="none" stroke="#DCA354" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 150 C46 142 58 142 66 150 M44 160 C50 154 56 154 60 160" fill="none" stroke="#F8F7F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.45}/>
      <path d="M36 138 L70 170" fill="none" stroke="#F8F7F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.45}/>
      <path d="M30 190 H210" fill="none" stroke="#F8F7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.5}/>
    </>
  ),
};

export function LoginIllustration({
  id,
  label,
}: {
  id: LoginIllustrationId;
  label: string;
}) {
  return (
    <svg
      viewBox="0 0 240 240"
      width={250}
      height={250}
      role="img"
      aria-label={label}
      className="text-chloro"
    >
      {ILLUSTRATIONS[id]}
    </svg>
  );
}
