import Link from "next/link";
import { getLocale } from "@sicilia-soil/core";
import {
  ArrowLeft,
  ArrowRight,
  Sprout,
  Leaf,
  Globe,
  Heart,
  Code,
  WifiOff,
  ShieldCheck,
} from "lucide-react";
import { BrandLogo, Button, DataCard, MycoMeshLogo } from "@sicilia-soil/ui";

const t = getLocale("es");

export const metadata = {
  title: "Manifiesto — MycoMesh Protocol",
};

export default function ManifestoPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans relative overflow-hidden">
      {/* Rejilla de fondo sutil */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#2B363C 1px, transparent 1px), linear-gradient(90deg, #2B363C 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header simple */}
      <header className="w-full border-b border-ink/10 bg-paper/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-ink/60 hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a la Home
          </Link>

          <BrandLogo href="/" size="sm" LinkComponent={Link} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-20 relative z-10">
        {/* Hero del Manifiesto */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-chloro/10 rounded-2xl mb-6">
            <MycoMeshLogo size={40} className="text-chloro" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-serif font-bold mb-6 text-ink">
            {t.content.manifesto.heroTitle}
          </h1>
          <p className="text-lg font-mono uppercase tracking-widest text-solar font-bold">
            {t.content.manifesto.heroSubtitle}
          </p>
        </div>

        {/* Intro */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif font-bold mb-6 text-ink">
            {t.content.manifesto.introTitle}
          </h2>
          <p className="text-lg leading-relaxed text-ink/80 mb-6">
            {t.content.manifesto.introText1}
          </p>
          <p className="text-lg leading-relaxed text-ink/80 font-medium border-l-4 border-solar pl-6">
            {t.content.manifesto.introText2}
          </p>
        </section>

        {/* Lo que creemos — ahora con <DataCard> */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif font-bold mb-8 text-ink">
            {t.content.manifesto.beliefsTitle}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <DataCard className="p-6 bg-paper border-ink/10">
              <Sprout className="w-6 h-6 text-chloro mb-4" />
              <h3 className="font-bold text-lg text-ink mb-2">
                {t.content.manifesto.belief1Title}
              </h3>
              <p className="text-ink/70 text-sm leading-relaxed">
                {t.content.manifesto.belief1Desc}
              </p>
            </DataCard>

            <DataCard className="p-6 bg-paper border-ink/10">
              <Leaf className="w-6 h-6 text-chloro mb-4" />
              <h3 className="font-bold text-lg text-ink mb-2">
                {t.content.manifesto.belief2Title}
              </h3>
              <p className="text-ink/70 text-sm leading-relaxed">
                {t.content.manifesto.belief2Desc}
              </p>
            </DataCard>

            <DataCard className="p-6 bg-paper border-ink/10">
              <Globe className="w-6 h-6 text-chloro mb-4" />
              <h3 className="font-bold text-lg text-ink mb-2">
                {t.content.manifesto.belief3Title}
              </h3>
              <p className="text-ink/70 text-sm leading-relaxed">
                {t.content.manifesto.belief3Desc}
              </p>
            </DataCard>

            <DataCard className="p-6 bg-paper border-ink/10">
              <Heart className="w-6 h-6 text-chloro mb-4" />
              <h3 className="font-bold text-lg text-ink mb-2">
                {t.content.manifesto.belief4Title}
              </h3>
              <p className="text-ink/70 text-sm leading-relaxed">
                {t.content.manifesto.belief4Desc}
              </p>
            </DataCard>
          </div>
        </section>

        {/* Infraestructura (Dark block para contraste) */}
        <DataCard className="mb-20 bg-ink text-paper p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-chloro/20 blur-3xl rounded-full" />

          <h2 className="text-3xl font-serif font-bold mb-8 text-solar relative z-10">
            {t.content.manifesto.infraTitle}
          </h2>
          <div className="space-y-8 relative z-10">
            <div className="flex gap-4">
              <Code className="w-8 h-8 text-solar flex-shrink-0" />
              <div>
                <h3 className="font-bold text-xl mb-1">
                  {t.content.manifesto.infraOpenSourceTitle}
                </h3>
                <p className="text-paper/70 leading-relaxed">
                  {t.content.manifesto.infraOpenSourceDesc}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <WifiOff className="w-8 h-8 text-chloro flex-shrink-0" />
              <div>
                <h3 className="font-bold text-xl mb-1">
                  {t.content.manifesto.infraOfflineTitle}
                </h3>
                <p className="text-paper/70 leading-relaxed">
                  {t.content.manifesto.infraOfflineDesc}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <ShieldCheck className="w-8 h-8 text-paper flex-shrink-0" />
              <div>
                <h3 className="font-bold text-xl mb-1">
                  {t.content.manifesto.infraDataTitle}
                </h3>
                <p className="text-paper/70 leading-relaxed">
                  {t.content.manifesto.infraDataDesc}
                </p>
              </div>
            </div>
          </div>
        </DataCard>

        {/* El compromiso */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif font-bold mb-6 text-ink">
            {t.content.manifesto.commitmentTitle}
          </h2>
          <ul className="space-y-4">
            {t.content.manifesto.commitmentList.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-chloro/10 text-chloro flex-shrink-0 mt-0.5">
                  <ArrowRight className="w-3 h-3" />
                </span>
                <span className="text-ink/80 text-lg leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Futuro */}
        <DataCard className="p-6 bg-paper border-ink/10">
          <h2 className="text-2xl font-serif font-bold mb-4 text-ink">
            {t.content.manifesto.futureTitle}
          </h2>
          <p className="text-ink/70 leading-relaxed">
            {t.content.manifesto.futureDesc}
          </p>
        </DataCard>

        {/* Cita final + CTA */}
        <section className="text-center py-16 border-t border-ink/10">
          <p className="text-2xl md:text-3xl font-serif font-bold text-ink mb-6 leading-relaxed italic">
            {t.content.manifesto.quoteText}
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-solar font-bold mb-10">
            — {t.content.manifesto.quoteAuthor}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/register"
              LinkComponent={Link}
              variant="cta"
              className="px-8 py-4 font-mono text-xs uppercase tracking-widest font-bold transition-colors"
            >
              {t.ui.landing.cta.start} <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              href="/"
              LinkComponent={Link}
              variant="bare"
              size="none"
              className="!!rounded-none hover:scale-100 flex items-center gap-2 px-8 py-4 border border-ink/20 text-ink font-mono text-xs uppercase tracking-widest font-bold hover:bg-ink/5 transition-colors"
            >
              Volver al inicio
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center border-t border-ink/10 relative z-10 bg-paper">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
          {t.content.landing.footerNote}
        </p>
      </footer>
    </div>
  );
}
