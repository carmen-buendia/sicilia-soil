import Link from "next/link";
import { Sprout } from "lucide-react";
import { SicilianFlag } from "./SicilianFlag";

export function AppFooter() {
  return (
    <footer className="bg-gradient-to-b from-oliveGreen/5 to-transparent border-t border-oliveGreen/15 py-10 mt-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="p-1.5 bg-gradient-to-br from-oliveGreen to-wheatGold rounded-lg shadow-sm">
            <Sprout className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-charcoalGray text-base">
            MycoMesh<span className="text-sicilian-red">·</span>Protocol
          </span>
          <span className="hidden sm:inline text-xs text-oliveGreen/50 ml-2">
            Open-source soil infrastructure for regenerative agriculture
          </span>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-oliveGreen/70 mb-4 flex-wrap">
          <Link
            href="/about"
            className="hover:text-oliveGreen transition-colors"
          >
            About
          </Link>
          <span className="text-oliveGreen/30">·</span>
          <Link
            href="/manifesto"
            className="hover:text-oliveGreen transition-colors"
          >
            Manifesto
          </Link>
          <span className="text-oliveGreen/30">·</span>
          <a
            href="https://github.com/carmen-buendia/sicilia-soil"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-oliveGreen transition-colors"
          >
            GitHub
          </a>
          <span className="text-oliveGreen/30">·</span>
          <a
            href="https://github.com/carmen-buendia/sicilia-soil/blob/master/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-oliveGreen transition-colors"
          >
            Apache 2.0
          </a>
        </div>

        <div className="text-center text-[11px] text-oliveGreen/50 leading-relaxed">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <SicilianFlag size="small" />
            <span>Project created by Carmen María Buendía Sánchez</span>
          </div>
          <p>
            © {new Date().getFullYear()} MycoMesh Protocol · Created with 🌱 in
            Sicilia
          </p>
        </div>
      </div>
    </footer>
  );
}
