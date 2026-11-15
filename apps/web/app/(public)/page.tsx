import Link from "next/link";
import { cookies } from "next/headers";
import {
  ArrowRight,
  Github,
  Leaf,
  Droplets,
  Mountain,
  LogIn,
  LayoutDashboard,
  Wind,
  Sprout,
  ShieldCheck,
  WifiOff,
  Code,
} from "lucide-react";
import { getLocale } from "@sicilia-soil/core";
import { verifySession, COOKIE_NAME } from "@/lib/auth/session";
import { BrandLogo, Button, DataCard } from "@sicilia-soil/ui";

const locale = getLocale("es");

export const metadata = {
  title: `SikeliaSoil — ${locale.ui.app.subtitle}`,
};

export default async function LandingPage() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans relative overflow-hidden">
      {/* Patrón de rejilla sutil */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#2B363C 1px, transparent 1px), linear-gradient(90deg, #2B363C 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-solar/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-chloro/10 rounded-full blur-[120px] pointer-events-none" />

      {/* HEADER */}
      <header className="w-full border-b border-ink/20 bg-paper/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <BrandLogo href="/" size="md" LinkComponent={Link} />

          <nav className="flex items-center gap-6">
            {session ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold bg-ink text-paper px-4 py-2 hover:bg-chloro transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                {locale.ui.nav.dashboard}
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold text-ink hover:text-solar transition-colors"
              >
                <LogIn className="w-4 h-4" />
                {locale.ui.auth.signIn}
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 border border-ink/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest font-bold mb-8 bg-paper/50">
            <span className="w-2 h-2 bg-solar animate-pulse" />
            {locale.ui.landing.badge}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] mb-6 text-ink">
            {locale.content.landing.headline}
          </h1>

          <p className="text-lg text-ink/70 mb-10 leading-relaxed max-w-lg border-l-2 border-solar/50 pl-4">
            {locale.content.landing.intro}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              href={session ? "/dashboard" : "/register"}
              LinkComponent={Link}
              variant="cta"
              className="gap-2 px-8 py-4 font-mono text-xs uppercase tracking-widest font-bold transition-colors"
            >
              {session
                ? locale.ui.landing.cta.accessDashboard
                : locale.ui.landing.cta.start}
              <ArrowRight className="w-4 h-4" />
            </Button>

            <a
              href="https://github.com/carmen-buendia/sicilia-soil"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-transparent border border-ink/20 text-ink font-mono text-xs uppercase tracking-widest font-bold hover:bg-paper transition-colors"
            >
              <Github className="w-4 h-4" />{" "}
              {locale.ui.landing.cta.viewOnGithub}
            </a>
          </div>
        </div>

        {/* GRÁFICO ABSTRACT + ETIQUETA */}
        <div className="relative w-full max-w-lg mx-auto">
          <div className="absolute inset-0 bg-solar/10 blur-[100px] rounded-full" />

          <svg
            viewBox="0 0 200 200"
            className="w-full max-w-[450px] h-auto relative z-10 mx-auto block"
          >
            {/* Líneas topográficas */}
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

            {/* Líneas punteadas */}
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

            {/* Red de micelio */}
            <path
              d="M100,20 Q100,100 100,180"
              fill="none"
              stroke="#2B363C"
              strokeWidth="2"
            />
            <path
              d="M100,60 Q60,80 40,60"
              fill="none"
              stroke="#4F7A5C"
              strokeWidth="2"
            />
            <path
              d="M100,60 Q140,80 160,60"
              fill="none"
              stroke="#4F7A5C"
              strokeWidth="2"
            />
            <path
              d="M100,110 Q50,130 30,110"
              fill="none"
              stroke="#E69A45"
              strokeWidth="2"
            />
            <path
              d="M100,110 Q150,130 170,110"
              fill="none"
              stroke="#E69A45"
              strokeWidth="2"
            />
            <path
              d="M100,150 Q70,170 50,160"
              fill="none"
              stroke="#2B363C"
              strokeWidth="2"
            />
            <path
              d="M100,150 Q130,170 150,160"
              fill="none"
              stroke="#2B363C"
              strokeWidth="2"
            />

            {/* Nodos */}
            <circle
              cx="40"
              cy="60"
              r="4"
              fill="#4F7A5C"
              className="animate-pulse"
            />
            <circle cx="160" cy="60" r="4" fill="#4F7A5C" />
            <circle cx="30" cy="110" r="4" fill="#E69A45" />
            <circle
              cx="170"
              cy="110"
              r="4"
              fill="#E69A45"
              className="animate-pulse"
            />
            <circle cx="50" cy="160" r="4" fill="#2B363C" />
            <circle cx="150" cy="160" r="4" fill="#2B363C" />

            {/* Nodo central destacado */}
            <circle
              cx="100"
              cy="100"
              r="8"
              fill="#F8F7F2"
              stroke="#2B363C"
              strokeWidth="3"
            />
          </svg>

          {/* Etiqueta debajo del gráfico */}
          <div className="text-center mt-6 relative z-10">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 border border-ink/10 bg-paper px-3 py-1">
              {locale.content.landing.graphLabel}
            </span>
          </div>
        </div>
      </main>

      {/* PILARES */}
      <section className="w-full border-t border-ink/20 bg-paper/50 relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4 text-ink">
              {locale.content.landing.featuresTitle}
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
              {locale.content.landing.featuresSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <DataCard className="p-8 flex flex-col items-start">
              <Leaf className="w-8 h-8 mb-6 text-chloro" />
              <h3 className="text-xl font-serif font-bold mb-4 text-ink">
                {locale.ui.landing.pillars.soilHealth}
              </h3>
              <p className="font-sans text-sm text-ink/70 leading-relaxed">
                {locale.content.landing.pillar1Desc}
              </p>
            </DataCard>

            <DataCard className="p-8 flex flex-col items-start">
              <Droplets className="w-8 h-8 mb-6 text-chloro" />
              <h3 className="text-xl font-serif font-bold mb-4 text-ink">
                {locale.ui.landing.pillars.waterEfficiency}
              </h3>
              <p className="font-sans text-sm text-ink/70 leading-relaxed">
                {locale.content.landing.pillar2Desc}
              </p>
            </DataCard>

            <DataCard className="p-8 flex flex-col items-start">
              <Mountain className="w-8 h-8 mb-6 text-solar" />
              <h3 className="text-xl font-serif font-bold mb-4 text-ink">
                {locale.ui.landing.pillars.carbonCapture}
              </h3>
              <p className="font-sans text-sm text-ink/70 leading-relaxed">
                {locale.content.landing.pillar3Desc}
              </p>
            </DataCard>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE VALORES (NUEVA) */}
      <section className="w-full relative z-10 py-16 px-6 bg-paper/30 border-y border-ink/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-ink mb-10 text-center">
            {locale.content.landing.valuesTitle}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Soberanía */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-chloro/10 border border-chloro/20 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-chloro" />
              </div>
              <h3 className="font-serif font-bold text-ink mb-2">
                {locale.content.landing.valueSovereigntyTitle}
              </h3>
              <p className="font-sans text-sm text-ink/70 leading-relaxed">
                {locale.content.landing.valueSovereigntyDesc}
              </p>
            </div>

            {/* Resiliencia */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-solar/10 border border-solar/20 flex items-center justify-center mb-4">
                <WifiOff className="w-6 h-6 text-solar" />
              </div>
              <h3 className="font-serif font-bold text-ink mb-2">
                {locale.content.landing.valueResilienceTitle}
              </h3>
              <p className="font-sans text-sm text-ink/70 leading-relaxed">
                {locale.content.landing.valueResilienceDesc}
              </p>
            </div>

            {/* Transparencia */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-ink/5 border border-ink/20 flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-ink" />
              </div>
              <h3 className="font-serif font-bold text-ink mb-2">
                {locale.content.landing.valueTransparencyTitle}
              </h3>
              <p className="font-sans text-sm text-ink/70 leading-relaxed">
                {locale.content.landing.valueTransparencyDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN FILOSOFÍA */}
      <section className="w-full relative z-10 py-24 border-t border-ink/20 bg-card">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-6 text-ink">
              {locale.content.landing.philosophyTitle}
            </h2>
            <p className="font-sans text-lg text-ink/70 leading-relaxed mb-8">
              {locale.content.landing.philosophyDesc}
            </p>
            <div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-widest font-bold">
              <span className="border border-ink/20 px-4 py-2 flex items-center gap-2 text-ink/70 bg-paper">
                <Wind className="w-4 h-4 text-solar" />{" "}
                {locale.content.landing.energyTag}
              </span>
              <span className="border border-ink/20 px-4 py-2 flex items-center gap-2 text-ink/70 bg-paper">
                <Droplets className="w-4 h-4 text-chloro" />{" "}
                {locale.content.landing.waterTag}
              </span>
              <span className="border border-ink/20 px-4 py-2 flex items-center gap-2 text-ink/70 bg-paper">
                <Sprout className="w-4 h-4 text-chloro" />{" "}
                {locale.content.landing.soilTag}
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-4 text-6xl text-solar/20 font-serif"></div>
            <div className="bg-paper border border-ink/20 p-8 relative z-10 shadow-sm">
              <p className="font-serif italic text-xl leading-relaxed text-ink mb-6">
                {locale.content.landing.philosophyQuote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-ink/20 flex items-center justify-center bg-chloro/10">
                  <Leaf className="w-4 h-4 text-chloro" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-ink/60">
                  — {locale.content.landing.philosophyAuthor}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-8 px-6 relative z-10 bg-paper border-t border-ink/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
            {locale.content.landing.footerNote}
          </p>
          <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest font-bold">
            <Link
              href="/manifesto"
              className="hover:text-solar transition-colors"
            >
              {locale.ui.footer.manifesto}
            </Link>
            <Link href="/about" className="hover:text-solar transition-colors">
              {locale.ui.footer.about}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
