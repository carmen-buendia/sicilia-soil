import Link from "next/link";
import { cookies } from "next/headers";
import {
  Sprout,
  ArrowRight,
  Github,
  Leaf,
  Droplets,
  Wind,
  LogIn,
  LayoutDashboard,
} from "lucide-react";
import { getLocale } from "@sicilia-soil/core";
import { verifySession, COOKIE_NAME } from "@/lib/auth/session";

const locale = getLocale("es");

export const metadata = {
  title: `MycoMesh Protocol — ${locale.ui.app.subtitle}`,
};

export default async function LandingPage() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans relative overflow-hidden">
      {/* 1. FONDO CON MARCAS (Rejilla técnica) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#2B363C 1px, transparent 1px), linear-gradient(90deg, #2B363C 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* 2. Degradado suave (Solarpunk/Journey) para iluminar el fondo */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#E69A45]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#4F7A5C]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* HEADER (Línea fina inferior) */}
      <header className="w-full border-b border-ink/10 bg-paper/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-chloro text-paper rounded-lg shadow-sm group-hover:bg-solar transition-colors">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="font-serif font-bold text-2xl tracking-tight text-ink">
              MycoMesh<span className="text-solar">.</span>Protocol
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            {session ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm font-semibold text-ink hover:text-solar transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-semibold text-ink hover:text-solar transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Iniciar Sesión
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Texto (Izquierda) */}
        <div>
          <div className="inline-flex items-center gap-2 border border-ink/20 rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-widest font-bold mb-8 bg-paper/50 backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 bg-solar rounded-full animate-pulse" />
            {locale.ui.landing.badge}
          </div>

          <h1 className="text-5xl sm:text-6xl font-serif font-bold leading-[1.1] mb-6 text-ink">
            {locale.content.landing.headline}
          </h1>

          <p className="text-lg text-ink/70 mb-10 leading-relaxed max-w-lg border-l-2 border-solar/50 pl-4">
            {locale.content.landing.intro}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={session ? "/dashboard" : "/register"}
              className="flex items-center gap-2 px-8 py-4 bg-ink text-paper rounded-lg font-semibold hover:bg-chloro transition-colors shadow-lg shadow-ink/10"
            >
              {session
                ? locale.ui.landing.cta.accessDashboard
                : locale.ui.landing.cta.start}
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://github.com/carmen-buendia/sicilia-soil"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-paper/50 backdrop-blur-sm border border-ink/20 text-ink rounded-lg font-semibold hover:bg-ink/5 transition-colors shadow-sm"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>

        {/* MAPA BOTÁNICO (Derecha) */}
        <div className="relative">
          {/* Halo de luz */}
          <div className="absolute inset-0 bg-solar/15 blur-3xl rounded-full translate-y-4" />

          <div className="relative bg-paper/80 backdrop-blur-sm border border-ink/10 p-8 rounded-2xl shadow-xl shadow-ink/5 aspect-square flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between items-start relative z-10">
              <div className="font-mono text-[10px] uppercase tracking-widest font-bold text-ink/50">
                Fig 01.
                <br />
                Topografía Sintrópica
              </div>
              <div className="border border-chloro/30 rounded px-2 py-1 font-mono text-[10px] uppercase bg-chloro/10 text-chloro flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-chloro animate-pulse" />
                Live
              </div>
            </div>

            {/* SVG Topográfico */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full max-h-[250px] my-auto relative z-10"
            >
              {/* Líneas topográficas (marcas de nivel) */}
              <path
                d="M20,100 Q60,40 100,100 T180,100"
                fill="none"
                stroke="#2B363C"
                strokeWidth="1"
                opacity="0.1"
              />
              <path
                d="M10,120 Q60,60 100,120 T190,120"
                fill="none"
                stroke="#2B363C"
                strokeWidth="1"
                opacity="0.15"
              />
              <path
                d="M0,140 Q60,80 100,140 T200,140"
                fill="none"
                stroke="#2B363C"
                strokeWidth="1"
                opacity="0.2"
              />

              {/* Líneas punteadas de guía */}
              <line
                x1="100"
                y1="0"
                x2="100"
                y2="200"
                stroke="#2B363C"
                strokeWidth="1"
                strokeDasharray="2 4"
                opacity="0.2"
              />
              <line
                x1="0"
                y1="100"
                x2="200"
                y2="100"
                stroke="#2B363C"
                strokeWidth="1"
                strokeDasharray="2 4"
                opacity="0.2"
              />

              {/* Red de micelio (curvas) */}
              <path
                d="M100,20 Q100,100 100,180"
                fill="none"
                stroke="#2B363C"
                strokeWidth="1.5"
              />
              <path
                d="M100,60 Q60,80 40,60"
                fill="none"
                stroke="#4F7A5C"
                strokeWidth="1.5"
              />
              <path
                d="M100,60 Q140,80 160,60"
                fill="none"
                stroke="#4F7A5C"
                strokeWidth="1.5"
              />
              <path
                d="M100,110 Q50,130 30,110"
                fill="none"
                stroke="#E69A45"
                strokeWidth="1.5"
              />
              <path
                d="M100,110 Q150,130 170,110"
                fill="none"
                stroke="#E69A45"
                strokeWidth="1.5"
              />

              {/* Nodos */}
              <circle cx="40" cy="60" r="3" fill="#4F7A5C" />
              <circle cx="160" cy="60" r="3" fill="#4F7A5C" />
              <circle cx="30" cy="110" r="3" fill="#E69A45" />
              <circle cx="170" cy="110" r="3" fill="#E69A45" />

              {/* Coordenadas de texto */}
              <text
                x="105"
                y="15"
                className="font-mono text-[8px] fill-ink opacity-40"
              >
                00°00'N
              </text>
              <text
                x="105"
                y="195"
                className="font-mono text-[8px] fill-ink opacity-40"
              >
                00°00'S
              </text>
            </svg>

            <div className="flex justify-between items-end border-t border-ink/10 pt-4 relative z-10">
              <div>
                <p className="font-serif text-2xl font-bold text-ink">42.5%</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-chloro font-bold">
                  Humedad Suelo
                </p>
              </div>
              <Leaf className="w-5 h-5 text-chloro" />
            </div>
          </div>
        </div>
      </main>

      {/* SECCIÓN FILOSOFÍA (Suave y con marco sutil) */}
      <section className="w-full relative z-10 py-24 border-t border-ink/10 bg-paper/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-6 text-ink">
              {locale.content.landing.philosophyTitle}
            </h2>
            <p className="font-sans text-lg text-ink/70 leading-relaxed mb-8">
              {locale.content.landing.philosophyDesc}
            </p>
            <div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-widest font-bold">
              <span className="border border-ink/20 rounded-full px-4 py-2 flex items-center gap-2 text-ink/70 bg-paper">
                <Wind className="w-4 h-4 text-solar" />{" "}
                {locale.content.landing.energyTag}
              </span>
              <span className="border border-ink/20 rounded-full px-4 py-2 flex items-center gap-2 text-ink/70 bg-paper">
                <Droplets className="w-4 h-4 text-chloro" />{" "}
                {locale.content.landing.waterTag}
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-4 text-6xl text-solar/20 font-serif">
              "
            </div>

            <div className="bg-paper border border-ink/10 p-8 rounded-2xl shadow-lg shadow-ink/5 relative z-10">
              <p className="font-serif italic text-xl leading-relaxed text-ink mb-6">
                {locale.content.landing.philosophyQuote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-ink/10 flex items-center justify-center bg-chloro/5">
                  <Sprout className="w-4 h-4 text-chloro" />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest font-bold text-ink/60">
                  — {locale.content.landing.philosophyAuthor}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-8 px-6 relative z-10 bg-paper border-t border-ink/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
            {locale.content.landing.footerNote}
          </p>
          <div className="flex gap-6 font-mono text-xs uppercase tracking-widest font-bold text-ink/70">
            <Link
              href="/manifesto"
              className="hover:text-solar transition-colors"
            >
              {locale.ui.landing.footer.manifesto}
            </Link>
            <Link href="/about" className="hover:text-solar transition-colors">
              {locale.ui.landing.footer.about}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
