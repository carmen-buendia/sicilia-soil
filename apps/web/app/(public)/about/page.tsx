import Link from "next/link";
import { getLocale } from "@sicilia-soil/core";
import {
  ArrowLeft,
  Satellite,
  Cpu,
  Leaf,
  Github,
  Mail,
  Target,
  Lightbulb,
  Users,
  BookOpen,
  MapPin,
} from "lucide-react";
import { BrandLogo, Button, DataCard } from "@sicilia-soil/ui";

const t = getLocale("es");

export const metadata = {
  title: "Sobre el proyecto — SikeliaSoil",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans relative overflow-hidden">
      {/* Rejilla de fondo */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#2B363C 1px, transparent 1px), linear-gradient(90deg, #2B363C 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header */}
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

      <main className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        {/* Título */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-4">
            {t.content.about.title}
          </h1>
          <p className="font-mono text-sm uppercase tracking-widest text-chloro font-bold">
            {t.content.about.subtitle}
          </p>
        </div>

        {/* Misión */}
        <DataCard className="bg-paper-dark/30 border-ink/5 p-8 mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-4">
            {t.content.about.missionTitle}
          </h2>
          <p className="text-ink/80 leading-relaxed mb-4">
            {t.content.about.missionText1}
          </p>
          <p className="text-ink/80 leading-relaxed">
            {t.content.about.missionText2}
          </p>
        </DataCard>

        {/* Qué hacemos */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-6">
            {t.content.about.whatWeDoTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <DataCard className="bg-paper border-ink/10 p-6">
              <Satellite className="w-8 h-8 text-solar mb-4" />
              <h3 className="font-bold text-ink mb-2">
                {t.content.about.eoTitle}
              </h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                {t.content.about.eoDesc}
              </p>
            </DataCard>

            <DataCard className="bg-paper border-ink/10 p-6">
              <Cpu className="w-8 h-8 text-chloro mb-4" />
              <h3 className="font-bold text-ink mb-2">
                {t.content.about.iotTitle}
              </h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                {t.content.about.iotDesc}
              </p>
            </DataCard>

            <DataCard className="bg-paper border-ink/10 p-6">
              <Leaf className="w-8 h-8 text-chloro mb-4" />
              <h3 className="font-bold text-ink mb-2">
                {t.content.about.shiTitle}
              </h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                {t.content.about.shiDesc}
              </p>
            </DataCard>
          </div>
        </section>

        {/* Dónde validamos — sin SicilianFlag */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-6">
            {t.content.about.validateTitle}
          </h2>
          <DataCard className="bg-paper border-ink/10 p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="p-4 bg-solar/10 rounded-full flex-shrink-0">
              <MapPin className="w-8 h-8 text-solar" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mb-1">
                {t.content.about.livingLab}
              </p>
              <h3 className="font-bold text-xl text-ink mb-2">
                {t.content.about.location}
              </h3>
              <p className="text-ink/70 text-sm leading-relaxed">
                {t.content.about.locationDesc}
              </p>
            </div>
          </DataCard>
        </section>

        {/* Alineación con la UE */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-6">
            {t.content.about.euTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <DataCard className="bg-paper border-ink/10 p-5">
              <Target className="w-5 h-5 text-chloro mb-3" />
              <h3 className="font-bold text-ink mb-1">
                {t.content.about.euGreenDeal}
              </h3>
              <p className="text-sm text-ink/70">
                {t.content.about.euGreenDealDesc}
              </p>
            </DataCard>

            <DataCard className="bg-paper border-ink/10 p-5">
              <Leaf className="w-5 h-5 text-chloro mb-3" />
              <h3 className="font-bold text-ink mb-1">
                {t.content.about.euFarmToFork}
              </h3>
              <p className="text-sm text-ink/70">
                {t.content.about.euFarmToForkDesc}
              </p>
            </DataCard>

            <DataCard className="bg-paper border-ink/10 p-5">
              <Lightbulb className="w-5 h-5 text-chloro mb-3" />
              <h3 className="font-bold text-ink mb-1">
                {t.content.about.euFoodSecurity}
              </h3>
              <p className="text-sm text-ink/70">
                {t.content.about.euFoodSecurityDesc}
              </p>
            </DataCard>

            <DataCard className="bg-paper border-ink/10 p-5">
              <Satellite className="w-5 h-5 text-chloro mb-3" />
              <h3 className="font-bold text-ink mb-1">
                {t.content.about.euCopernicus}
              </h3>
              <p className="text-sm text-ink/70">
                {t.content.about.euCopernicusDesc}
              </p>
            </DataCard>
          </div>
        </section>

        {/* Equipo */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-6 flex items-center gap-3">
            <Users className="w-6 h-6 text-chloro" />
            {t.content.about.teamTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <DataCard className="bg-paper border-ink/10 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-chloro text-paper rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                  C
                </div>
                <div>
                  <h3 className="font-bold text-ink">
                    Carmen María Buendía Sánchez
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-solar font-bold mt-1">
                    {t.content.about.teamCarmenRole}
                  </p>
                </div>
              </div>
              <p className="text-sm text-ink/70 leading-relaxed">
                {t.content.about.teamCarmenDesc}
              </p>
            </DataCard>

            <DataCard className="bg-paper border-ink/10 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-solar text-paper rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                  D
                </div>
                <div>
                  <h3 className="font-bold text-ink">Domenico Calí</h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-chloro font-bold mt-1">
                    {t.content.about.teamDomenicoRole}
                  </p>
                </div>
              </div>
              <p className="text-sm text-ink/70 leading-relaxed">
                {t.content.about.teamDomenicoDesc}
              </p>
            </DataCard>
          </div>
        </section>

        {/* Open Source */}
        <DataCard className="bg-paper-dark/30 border-ink/5 p-8 mb-12">
          <h2 className="text-2xl font-serif font-bold text-ink mb-3">
            {t.content.about.openSourceTitle}
          </h2>
          <p className="text-ink/80 leading-relaxed mb-6">
            {t.content.about.openSourceDesc}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              href="https://github.com/carmen-buendia/sicilia-soil"
              external
              variant="dark"
              className="!!rounded-none hover:scale-100 px-5 py-2.5 text-sm"
              icon={<Github className="w-4 h-4" />}
            >
              {t.content.about.btnGithub}
            </Button>
            <Button
              href="mailto:carmenbuendiafullstack@gmail.com"
              variant="outline"
              className="!!rounded-none hover:scale-100 px-5 py-2.5 text-sm border-ink/20 text-ink hover:bg-ink/5"
              icon={<Mail className="w-4 h-4" />}
            >
              {t.content.about.btnContact}
            </Button>
            <Button
              href="/manifesto"
              LinkComponent={Link}
              variant="outline"
              className="!!rounded-none hover:scale-100 px-5 py-2.5 text-sm border-ink/20 text-ink hover:bg-ink/5"
              icon={<BookOpen className="w-4 h-4" />}
            >
              {t.content.about.btnManifesto}
            </Button>
          </div>
        </DataCard>
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
