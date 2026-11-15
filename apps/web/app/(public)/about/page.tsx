import Link from "next/link";
import { getLocale } from "@sicilia-soil/core";
import {
  ArrowLeft,
  Satellite,
  Cpu,
  Leaf,
  Github,
  Mail,
  Users,
  BookOpen,
  MapPin,
  SlidersHorizontal,
  Workflow,
  BellRing,
  ShieldCheck,
} from "lucide-react";
import { BrandLogo, Button, DataCard } from "@sicilia-soil/ui";

const locale = getLocale("es");
const about = locale.content.about;
const footerNote = locale.content.landing.footerNote;

export const metadata = {
  title: "Sobre el proyecto — SikeliaSoil",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans relative overflow-hidden">
      {/* Rejilla */}
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
        {/* Hero */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-4">
            {about.title}
          </h1>
          <p className="font-mono text-sm uppercase tracking-widest text-chloro font-bold">
            {about.subtitle}
          </p>
        </div>

        {/* El contexto */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-4">
            {about.problemTitle}
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed mb-4">
            {about.problemText1}
          </p>
          <p className="text-lg text-ink/80 leading-relaxed">
            {about.problemText2}
          </p>
        </section>

        {/* Misión */}
        <DataCard className="bg-paper-dark/30 border-ink/5 p-8 mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-4">
            {about.missionTitle}
          </h2>
          <p className="text-ink/80 leading-relaxed mb-4">
            {about.missionText1}
          </p>
          <p className="text-ink/80 leading-relaxed">{about.missionText2}</p>
        </DataCard>

        {/* ───────────────────────────────────────────── */}
        {/* MOTOR DE REGLAS                                */}
        {/* ───────────────────────────────────────────── */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-ink mb-2">
              {about.engineTitle}
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-solar font-bold">
              {about.engineSubtitle}
            </p>
          </div>

          <p className="text-lg text-ink/80 leading-relaxed mb-8 max-w-3xl">
            {about.engineIntro}
          </p>

          {/* 3 pasos */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <DataCard className="bg-paper border-ink/10 p-6 relative">
              <span className="absolute top-4 right-4 font-mono text-xs text-ink/25 font-bold">
                01
              </span>
              <SlidersHorizontal className="w-8 h-8 text-solar mb-4" />
              <h3 className="font-bold text-ink mb-2">
                {about.engineStep1Title}
              </h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                {about.engineStep1Desc}
              </p>
            </DataCard>

            <DataCard className="bg-paper border-ink/10 p-6 relative">
              <span className="absolute top-4 right-4 font-mono text-xs text-ink/25 font-bold">
                02
              </span>
              <Workflow className="w-8 h-8 text-chloro mb-4" />
              <h3 className="font-bold text-ink mb-2">
                {about.engineStep2Title}
              </h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                {about.engineStep2Desc}
              </p>
            </DataCard>

            <DataCard className="bg-paper border-ink/10 p-6 relative">
              <span className="absolute top-4 right-4 font-mono text-xs text-ink/25 font-bold">
                03
              </span>
              <BellRing className="w-8 h-8 text-ink mb-4" />
              <h3 className="font-bold text-ink mb-2">
                {about.engineStep3Title}
              </h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                {about.engineStep3Desc}
              </p>
            </DataCard>
          </div>

          {/* Callout: reglas vs IA */}
          <div className="border-l-2 border-solar pl-6 py-2 bg-solar/5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-solar flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-ink mb-1">
                  {about.engineWhyTitle}
                </h4>
                <p className="text-sm text-ink/70 leading-relaxed">
                  {about.engineWhyDesc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Qué hacemos */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-6">
            {about.whatWeDoTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <DataCard className="bg-paper border-ink/10 p-6">
              <Satellite className="w-8 h-8 text-solar mb-4" />
              <h3 className="font-bold text-ink mb-2">{about.eoTitle}</h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                {about.eoDesc}
              </p>
            </DataCard>

            <DataCard className="bg-paper border-ink/10 p-6">
              <Cpu className="w-8 h-8 text-chloro mb-4" />
              <h3 className="font-bold text-ink mb-2">{about.iotTitle}</h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                {about.iotDesc}
              </p>
            </DataCard>

            <DataCard className="bg-paper border-ink/10 p-6">
              <Leaf className="w-8 h-8 text-chloro mb-4" />
              <h3 className="font-bold text-ink mb-2">{about.shiTitle}</h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                {about.shiDesc}
              </p>
            </DataCard>
          </div>
        </section>

        {/* Validación en campo */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-6">
            {about.validateTitle}
          </h2>
          <DataCard className="bg-paper border-ink/10 p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="p-4 bg-solar/10 rounded-full flex-shrink-0">
              <MapPin className="w-8 h-8 text-solar" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mb-1">
                {about.livingLab}
              </p>
              <h3 className="font-bold text-xl text-ink mb-2">
                {about.location}
              </h3>
              <p className="text-ink/70 text-sm leading-relaxed">
                {about.locationDesc}
              </p>
            </div>
          </DataCard>
        </section>

        {/* Equipo */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-ink mb-6 flex items-center gap-3">
            <Users className="w-6 h-6 text-chloro" />
            {about.teamTitle}
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
                    {about.teamCarmenRole}
                  </p>
                </div>
              </div>
              <p className="text-sm text-ink/70 leading-relaxed">
                {about.teamCarmenDesc}
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
                    {about.teamDomenicoRole}
                  </p>
                </div>
              </div>
              <p className="text-sm text-ink/70 leading-relaxed">
                {about.teamDomenicoDesc}
              </p>
            </DataCard>
          </div>
        </section>

        {/* CTA open source */}
        <DataCard className="bg-paper-dark/30 border-ink/5 p-8 mb-12">
          <h2 className="text-2xl font-serif font-bold text-ink mb-3">
            {about.openSourceTitle}
          </h2>
          <p className="text-ink/80 leading-relaxed mb-6">
            {about.openSourceDesc}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              href="https://github.com/carmen-buendia/sicilia-soil"
              external
              variant="dark"
              className="!!rounded-none hover:scale-100 px-5 py-2.5 text-sm"
              icon={<Github className="w-4 h-4" />}
            >
              {about.btnGithub}
            </Button>
            <Button
              href="mailto:carmenbuendiafullstack@gmail.com"
              variant="outline"
              className="!!rounded-none hover:scale-100 px-5 py-2.5 text-sm border-ink/20 text-ink hover:bg-ink/5"
              icon={<Mail className="w-4 h-4" />}
            >
              {about.btnContact}
            </Button>
            <Button
              href="/manifesto"
              LinkComponent={Link}
              variant="outline"
              className="!!rounded-none hover:scale-100 px-5 py-2.5 text-sm border-ink/20 text-ink hover:bg-ink/5"
              icon={<BookOpen className="w-4 h-4" />}
            >
              {about.btnManifesto}
            </Button>
          </div>
        </DataCard>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center border-t border-ink/10 relative z-10 bg-paper">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
          {footerNote}
        </p>
      </footer>
    </div>
  );
}
