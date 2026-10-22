import Link from "next/link";
import { getLocale } from "@sicilia-soil/core";
import { BrandLogo, SikeliaLogo } from "@sicilia-soil/ui";

const t = getLocale("es");

export function AppFooter() {
  return (
    <footer className="bg-paper border-t-2 border-ink py-12 mt-16 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        {/* Logo y Subtítulo */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
          <BrandLogo />
          <span className="hidden sm:inline-block h-4 w-px bg-ink/20" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50 text-center sm:text-left">
            {t.ui.app.subtitle}
          </span>
        </div>

        {/* Enlaces */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-widest font-bold text-ink/60 mb-8">
          <Link href="/about" className="hover:text-solar transition-colors">
            {t.ui.footer.about}
          </Link>
          <span className="text-ink/20">/</span>
          <Link
            href="/manifesto"
            className="hover:text-solar transition-colors"
          >
            {t.ui.footer.manifesto}
          </Link>
          <span className="text-ink/20">/</span>
          <a
            href="https://github.com/carmen-buendia/sicilia-soil"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-solar transition-colors"
          >
            {t.ui.footer.github}
          </a>
          <span className="text-ink/20">/</span>
          <a
            href="https://github.com/carmen-buendia/sicilia-soil/blob/master/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-solar transition-colors"
          >
            {t.ui.footer.license}
          </a>
        </div>

        {/* Copyright y Créditos */}
        <div className="text-center font-mono text-[10px] uppercase tracking-widest text-ink/40 leading-loose">
          <div className="flex items-center justify-center gap-2 mb-1">
            <SikeliaLogo />
            <span>{t.ui.footer.createdBy}</span>
          </div>
          <p>
            © {new Date().getFullYear()} SikeliaSoil · {t.ui.footer.madeWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
