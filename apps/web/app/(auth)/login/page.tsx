import Link from "next/link";
import { getLocale } from "@sicilia-soil/core";
import { Sprout, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { login } from "./actions";
import { Button } from "@sicilia-soil/ui";

const t = getLocale("es");

export const metadata = {
  title: t.ui.auth.signIn,
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; registered?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-paper p-4 sm:p-8 relative overflow-hidden">
      {/* Rejilla de fondo sutil */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#2B363C 1px, transparent 1px), linear-gradient(90deg, #2B363C 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="w-full max-w-md md:max-w-5xl bg-card border border-ink/20 shadow-sm flex flex-col md:flex-row relative z-10 md:h-[650px]">
        {/* LADO IZQUIERDO: Formulario */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 md:p-12 flex flex-col justify-center h-full relative">
          <Link
            href="/"
            className="absolute top-6 left-6 sm:top-8 sm:left-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest font-bold text-ink/50 hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t.ui.nav.backToHome}
          </Link>

          <div className="mb-8 mt-6 sm:mt-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-8 group"
            >
              <div className="p-2 bg-chloro text-paper group-hover:bg-solar transition-colors">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-ink">
                Sikelia Soil<span className="text-solar">.</span>Protocol
              </span>
            </Link>

            <h1 className="text-3xl font-serif font-bold text-ink mb-2">
              {t.ui.auth.signIn}
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
              {t.ui.auth.subtitle}
            </p>
          </div>

          {params.error && (
            <div className="mb-6 p-3 bg-red-500/5 border border-red-500/20 text-red-500 font-mono text-[10px] uppercase tracking-wider font-bold flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                {(t.ui.auth.errors as Record<string, string>)[params.error] ||
                  t.ui.auth.errors.unknown}
              </span>
            </div>
          )}

          {params.registered === "true" && (
            <div className="mb-6 p-3 bg-chloro/5 border border-chloro/20 text-chloro font-mono text-[10px] uppercase tracking-wider font-bold flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{t.ui.auth.success.registered}</span>
            </div>
          )}

          <form action={login} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block font-mono text-[10px] uppercase tracking-widest font-bold text-ink/70 mb-1.5"
              >
                {t.forms.email.label}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-ink/20 focus:outline-none focus:border-ink bg-paper font-mono text-sm transition-colors"
                placeholder={t.forms.email.placeholder}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-mono text-[10px] uppercase tracking-widest font-bold text-ink/70 mb-1.5"
              >
                {t.forms.password.label}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 border border-ink/20 focus:outline-none focus:border-ink bg-paper font-mono text-sm transition-colors"
                placeholder={t.forms.password.placeholder}
              />
            </div>

            <Button
              type="submit"
              variant="bare"
              size="none"
              className="!rounded-none flex items-center justify-center gap-2 w-full px-8 py-4 bg-ink text-paper font-mono text-xs uppercase tracking-widest font-bold hover:bg-chloro hover:!scale-100 transition-colors mt-2"
            >
              {t.ui.auth.signIn} <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="mt-8 font-mono text-xs text-ink/60 text-center font-bold uppercase tracking-wider">
            {t.ui.auth.noAccount}{" "}
            <Link
              href="/register"
              className="text-solar hover:text-ink transition-colors"
            >
              {t.ui.auth.registerLink}
            </Link>
          </p>
        </div>

        {/* LADO DERECHO: Visualización */}
        <div className="hidden md:flex w-1/2 bg-ink relative items-center justify-center overflow-hidden border-l border-ink h-full">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-[500px] h-[500px] border border-paper rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[350px] h-[350px] border-2 border-dashed border-chloro rounded-full animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute w-[200px] h-[200px] border border-solar rounded-full" />
          </div>

          <div className="relative z-10 w-32 h-32 bg-ink border-2 border-chloro rotate-45 flex items-center justify-center">
            <Sprout className="w-16 h-16 text-chloro -rotate-45" />
          </div>

          <div className="absolute bottom-10 left-8 right-8 text-center">
            <div className="bg-ink/80 border border-ink/20 p-6">
              <p className="text-paper font-serif italic text-lg leading-relaxed mb-3">
                "{t.content.auth.quotes.login.text}"
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-solar font-bold">
                — {t.content.auth.quotes.login.author}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
