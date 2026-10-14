import Link from "next/link";
import {
  Sprout,
  ArrowRight,
  Github,
  Leaf,
  Droplets,
  Mountain,
} from "lucide-react";
import { getLocale } from "@sicilia-soil/core";

const locale = getLocale("es");

export const metadata = {
  title: `MycoMesh Protocol — ${locale.ui.app.subtitle}`,
};

export default function LandingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-oliveGreen to-wheatGold rounded-xl shadow-sm">
            <Sprout className="w-7 h-7 text-white" />
          </div>
          <span className="font-bold text-2xl text-charcoalGray">
            MycoMesh<span className="text-sicilian-red">·</span>Protocol
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-charcoalGray mb-4 leading-tight">
          {locale.content.landing.headline}
        </h1>

        <p className="text-lg text-oliveGreen/80 mb-10 leading-relaxed">
          {locale.content.landing.intro}
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white/60 backdrop-blur-sm border border-oliveGreen/15 rounded-xl p-4">
            <Leaf className="w-5 h-5 text-oliveGreen mb-2" />
            <p className="text-sm font-medium text-charcoalGray">
              {locale.ui.landing.pillars.soilHealth}
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-oliveGreen/15 rounded-xl p-4">
            <Droplets className="w-5 h-5 text-oliveGreen mb-2" />
            <p className="text-sm font-medium text-charcoalGray">
              {locale.ui.landing.pillars.waterEfficiency}
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-oliveGreen/15 rounded-xl p-4">
            <Mountain className="w-5 h-5 text-oliveGreen mb-2" />
            <p className="text-sm font-medium text-charcoalGray">
              {locale.ui.landing.pillars.carbonCapture}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-oliveGreen text-white rounded-lg font-medium hover:bg-oliveGreen/90 transition-colors"
          >
            {locale.ui.landing.cta.accessDashboard}{" "}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/carmen-buendia/sicilia-soil"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-oliveGreen/20 text-charcoalGray rounded-lg font-medium hover:bg-oliveGreen/5 transition-colors"
          >
            <Github className="w-4 h-4" /> {locale.ui.landing.cta.viewOnGithub}
          </a>
        </div>

        <p className="mt-12 text-xs text-oliveGreen/50">
          {locale.content.landing.footerNote}
        </p>
      </div>
    </main>
  );
}
