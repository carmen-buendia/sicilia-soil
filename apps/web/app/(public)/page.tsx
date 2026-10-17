import Link from "next/link";
import { cookies } from "next/headers";
import {
  Sprout,
  ArrowRight,
  Github,
  Leaf,
  Droplets,
  Mountain,
  LogIn,
  LayoutDashboard,
  ShieldCheck,
  Database,
  Cpu,
  Activity,
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
    <div className="min-h-screen flex flex-col bg-[#fcfbf9] overflow-hidden">
      {/* HEADER PÚBLICO */}
      <header className="w-full border-b border-oliveGreen/10 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-oliveGreen to-wheatGold rounded-lg shadow-sm">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-charcoalGray tracking-tight">
              MycoMesh<span className="text-sicilian-red">·</span>Protocol
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            {session ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 bg-oliveGreen/10 text-oliveGreen rounded-lg font-medium hover:bg-oliveGreen/20 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                {locale.ui.nav.dashboard}
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm font-medium text-charcoalGray hover:text-oliveGreen transition-colors"
              >
                <LogIn className="w-4 h-4" />
                {locale.ui.auth.signIn}
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Columna Izquierda: Texto y CTA */}
          <div className="text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oliveGreen/10 text-oliveGreen text-xs font-semibold mb-6">
              <ShieldCheck className="w-3 h-3" />
              {locale.ui.landing.badge}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoalGray mb-6 leading-tight tracking-tight">
              {locale.content.landing.headline}
            </h1>

            <p className="text-lg text-oliveGreen/80 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {locale.content.landing.intro}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {session ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-oliveGreen text-white rounded-xl font-bold text-lg hover:bg-oliveGreen/90 transition-transform hover:scale-105 shadow-lg shadow-oliveGreen/20"
                >
                  {locale.ui.landing.cta.accessDashboard}{" "}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-oliveGreen text-white rounded-xl font-bold text-lg hover:bg-oliveGreen/90 transition-transform hover:scale-105 shadow-lg shadow-oliveGreen/20"
                >
                  {locale.ui.landing.cta.start}{" "}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}

              <a
                href="https://github.com/carmen-buendia/sicilia-soil"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-oliveGreen/20 text-charcoalGray rounded-xl font-bold text-lg hover:bg-oliveGreen/5 transition-colors"
              >
                <Github className="w-5 h-5" />{" "}
                {locale.ui.landing.cta.viewOnGithub}
              </a>
            </div>
          </div>

          {/* Columna Derecha: VISUALIZACIÓN DE RED (CSS y SVG) */}
          <div className="hidden lg:flex items-center justify-center relative min-h-[500px]">
            {/* Resplandor de fondo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-oliveGreen/20 via-transparent to-wheatGold/20 blur-3xl rounded-full animate-pulse" />

            <div className="relative w-full max-w-[450px] aspect-square">
              {/* Anillos orbitales */}
              <div className="absolute inset-4 border-2 border-dashed border-oliveGreen/20 rounded-full animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-16 border border-oliveGreen/30 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
              <div className="absolute inset-28 border border-oliveGreen/10 rounded-full" />

              {/* Líneas de conexión (Simulan el micelio/red) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 400"
              >
                <path
                  d="M200 200 L 340 120"
                  stroke="#556B2F"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  className="opacity-40"
                />
                <path
                  d="M200 200 L 60 140"
                  stroke="#556B2F"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  className="opacity-40"
                />
                <path
                  d="M200 200 L 120 330"
                  stroke="#556B2F"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  className="opacity-40"
                />
                <path
                  d="M200 200 L 310 320"
                  stroke="#556B2F"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  className="opacity-40"
                />
              </svg>

              {/* Nodo Central */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-oliveGreen to-[#3a4a1c] rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(107,142,35,0.5)] z-10 rotate-45 border border-white/20">
                <Sprout className="w-12 h-12 text-white -rotate-45" />
              </div>

              {/* Tarjeta HUD 1: Humedad del suelo */}
              <div className="absolute top-4 right-0 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-oliveGreen/10 shadow-xl z-20 flex items-center gap-3 transform hover:scale-105 transition-transform duration-300">
                <div className="p-2 bg-blue-50 rounded-lg shadow-inner">
                  <Droplets className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                    {locale.ui.landing.hud.soilMoisture}
                  </p>
                  <p className="text-lg font-black text-gray-800">
                    {locale.ui.landing.hud.soilMoistureValue}
                  </p>
                </div>
              </div>

              {/* Tarjeta HUD 2: Estado del nodo edge */}
              <div className="absolute top-32 left-0 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-oliveGreen/10 shadow-xl z-20 flex items-center gap-3 transform hover:scale-105 transition-transform duration-300">
                <div className="p-2 bg-purple-50 rounded-lg shadow-inner">
                  <Cpu className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                    {locale.ui.landing.hud.edgeNode}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-black text-gray-800">
                      {locale.ui.landing.hud.edgeNodeValue}
                    </p>
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-ping" />
                  </div>
                </div>
              </div>

              {/* Tarjeta HUD 3: Captura de Carbono */}
              <div className="absolute bottom-16 right-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-oliveGreen/10 shadow-xl z-20 flex items-center gap-3 transform hover:scale-105 transition-transform duration-300">
                <div className="p-2 bg-amber-50 rounded-lg shadow-inner">
                  <Mountain className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                    {locale.ui.landing.hud.carbonStored}
                  </p>
                  <p className="text-lg font-black text-gray-800">
                    {locale.ui.landing.hud.carbonStoredValue}
                  </p>
                </div>
              </div>

              {/* Tarjeta HUD 4: Actividad de la red */}
              <div className="absolute bottom-0 left-12 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-oliveGreen/10 shadow-xl z-20 flex items-center gap-3 transform hover:scale-105 transition-transform duration-300">
                <div className="p-2 bg-green-50 rounded-lg shadow-inner">
                  <Activity className="w-5 h-5 text-oliveGreen" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                    {locale.ui.landing.hud.mycorrhiza}
                  </p>
                  <p className="text-lg font-black text-gray-800">
                    {locale.ui.landing.hud.mycorrhizaValue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CARACTERÍSTICAS (PILARES) */}
      <section className="w-full bg-white/40 border-y border-oliveGreen/10 py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-charcoalGray mb-4">
              {locale.content.landing.featuresTitle}
            </h2>
            <p className="text-oliveGreen/70 max-w-2xl mx-auto">
              {locale.content.landing.featuresSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pilar 1 */}
            <div className="bg-white/80 backdrop-blur-sm border border-oliveGreen/15 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-oliveGreen/10 rounded-xl flex items-center justify-center mb-6">
                <Leaf className="w-6 h-6 text-oliveGreen" />
              </div>
              <h3 className="text-xl font-bold text-charcoalGray mb-3">
                {locale.ui.landing.pillars.soilHealth}
              </h3>
              <p className="text-oliveGreen/70 text-sm leading-relaxed">
                {locale.content.landing.pillar1Desc}
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="bg-white/80 backdrop-blur-sm border border-oliveGreen/15 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Droplets className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-charcoalGray mb-3">
                {locale.ui.landing.pillars.waterEfficiency}
              </h3>
              <p className="text-oliveGreen/70 text-sm leading-relaxed">
                {locale.content.landing.pillar2Desc}
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="bg-white/80 backdrop-blur-sm border border-oliveGreen/15 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-amber-600/10 rounded-xl flex items-center justify-center mb-6">
                <Mountain className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-charcoalGray mb-3">
                {locale.ui.landing.pillars.carbonCapture}
              </h3>
              <p className="text-oliveGreen/70 text-sm leading-relaxed">
                {locale.content.landing.pillar3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ARQUITECTURA / TECH STACK */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-charcoalGray mb-8">
            {locale.ui.landing.techTitle}
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-oliveGreen/10 text-sm font-medium text-charcoalGray">
              <Database className="w-4 h-4 text-oliveGreen" />{" "}
              {locale.ui.landing.tech.db}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-oliveGreen/10 text-sm font-medium text-charcoalGray">
              <Cpu className="w-4 h-4 text-oliveGreen" />{" "}
              {locale.ui.landing.tech.edge}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-oliveGreen/10 text-sm font-medium text-charcoalGray">
              <ShieldCheck className="w-4 h-4 text-oliveGreen" />{" "}
              {locale.ui.landing.tech.auth}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-oliveGreen/10 py-8 px-6 bg-white/30 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-oliveGreen/50">
            {locale.content.landing.footerNote}
          </p>
          <div className="flex gap-4 text-xs font-medium text-charcoalGray/70">
            <Link href="/manifesto" className="hover:text-oliveGreen">
              {locale.ui.landing.footer.manifesto}
            </Link>
            <Link href="/about" className="hover:text-oliveGreen">
              {locale.ui.landing.footer.about}
            </Link>
            <a
              href="https://github.com/carmen-buendia/sicilia-soil"
              target="_blank"
              className="hover:text-oliveGreen"
            >
              {locale.ui.landing.footer.github}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
