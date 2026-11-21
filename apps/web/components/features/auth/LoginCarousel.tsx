// apps/web/components/features/auth/LoginCarousel.tsx
"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { LoginIllustration, type LoginIllustrationId } from "./LoginIllustrations";

export interface LoginSlide {
  art: LoginIllustrationId;
  /** Descripción de la ilustración para lectores de pantalla. */
  alt: string;
  text: string;
  label: string;
}

interface LoginCarouselProps {
  slides: readonly LoginSlide[];
  /** Texto accesible del carrusel y de los controles. */
  labels: {
    region: string;
    goTo: string; // "Ir a la diapositiva {n}"
    pause: string;
    play: string;
  };
  intervalMs?: number;
}

/**
 * Carrusel del panel lateral del login: problema → solución en lenguaje de campo.
 * - Pasa solo cada `intervalMs`; se detiene al pasar el ratón o enfocar con teclado.
 * - Si el usuario pide menos movimiento (prefers-reduced-motion), no avanza solo.
 * - Puntos navegables con teclado y botón de pausa (WCAG 2.2.2).
 */
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;
// En el servidor asumimos movimiento reducido: no hay autoplay hasta hidratar.
const getReducedMotionServer = () => true;

export function LoginCarousel({
  slides,
  labels,
  intervalMs = 7000,
}: LoginCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  );

  const autoplay = !paused && !hovering && !reducedMotion;

  const next = useCallback(
    () => setIndex((i) => (i + 1) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  }, [autoplay, next, intervalMs]);

  const current = slides[index];

  return (
    <section
      aria-roledescription="carrusel"
      aria-label={labels.region}
      className="absolute inset-0 flex flex-col items-center justify-center"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      <div
        key={index}
        aria-live={autoplay ? "off" : "polite"}
        className="flex flex-col items-center w-full animate-[fadeIn_600ms_ease-out]"
      >
        <div className="relative z-10 -mt-16">
          <LoginIllustration id={current.art} label={current.alt} />
        </div>

        <div className="absolute bottom-16 left-8 right-8 text-center">
          <p className="text-paper font-serif italic text-xl leading-relaxed mb-3">
            {current.text}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-solar font-bold">
            — {current.label}
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-3">
        <div className="flex items-center gap-1">
          {slides.map((slide, i) => (
            <button
              key={slide.art}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={labels.goTo.replace("{n}", String(i + 1))}
              aria-current={i === index ? "true" : undefined}
              className="h-6 flex items-center px-0.5 outline-none focus-visible:ring-2 focus-visible:ring-solar"
            >
              <span
                className={`block h-1.5 transition-all duration-300 ${
                  i === index ? "w-5 bg-solar" : "w-1.5 bg-paper/30 hover:bg-paper/60"
                }`}
              />
            </button>
          ))}
        </div>
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? labels.play : labels.pause}
            className="h-6 w-6 flex items-center justify-center text-paper/50 hover:text-paper outline-none focus-visible:ring-2 focus-visible:ring-solar"
          >
            {paused ? (
              <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                <path d="M3 2 L10 6 L3 10 Z" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                <path d="M3 2 H5 V10 H3 Z M7 2 H9 V10 H7 Z" fill="currentColor" />
              </svg>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
