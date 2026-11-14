// apps/web/components/layout/AppFooter.tsx
import Link from "next/link";
import { getLocale } from "@sicilia-soil/core";
import { BrandLogo, SikeliaLogo } from "@sicilia-soil/ui";

const locale = getLocale("es");
const appContent = locale.ui.app;
const footerContent = locale.ui.footer;

export function AppFooter() {
  return (
    <footer className="bg-paper border-t-2 border-ink py-12 mt-16 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
          <BrandLogo />
          <span className="hidden sm:inline-block h-4 w-px bg-ink/20" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50 text-center sm:text-left">
            {appContent.subtitle}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-widest font-bold text-ink/60 mb-8">
          <Link href="/about" className="hover:text-solar transition-colors">
            {footerContent.about}
          </Link>
          <span className="text-ink/20">/</span>
          <Link
            href="/manifesto"
            className="hover:text-solar transition-colors"
          >
            {footerContent.manifesto}
          </Link>
          <span className="text-ink/20">/</span>
          <a
            href="https://github.com/carmen-buendia/sicilia-soil"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-solar transition-colors"
          >
            {footerContent.github}
          </a>
          <span className="text-ink/20">/</span>
          <a
            href="https://github.com/carmen-buendia/sicilia-soil/blob/master/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-solar transition-colors"
          >
            {footerContent.license}
          </a>
        </div>

        <div className="text-center font-mono text-[10px] uppercase tracking-widest text-ink/40 leading-loose">
          <div className="flex items-center justify-center gap-2 mb-1">
            <SikeliaLogo />
            <span>{footerContent.createdBy}</span>
          </div>
          <p>
            © {new Date().getFullYear()} SikeliaSoil · {footerContent.madeWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
