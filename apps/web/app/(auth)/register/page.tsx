import Link from "next/link";
import { getLocale } from "@sicilia-soil/core";
import { Sprout, ShieldCheck, UserPlus, ArrowLeft } from "lucide-react";
import { register } from "./actions";

const t = getLocale("es");

export const metadata = {
  title: t.ui.auth.registerTitle,
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fcfbf9] p-4 sm:p-8 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 sm:w-96 sm:h-96 bg-oliveGreen/20 blur-3xl rounded-full z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 sm:w-96 sm:h-96 bg-wheatGold/20 blur-3xl rounded-full z-0" />

      <div className="w-full max-w-md md:max-w-5xl bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row relative z-10 md:h-[650px]">
        <div className="w-full md:w-1/2 p-8 sm:p-10 md:p-12 flex flex-col justify-center h-full relative">
          <Link
            href="/login"
            className="absolute top-6 left-6 sm:top-8 sm:left-8 inline-flex items-center gap-2 text-sm font-medium text-oliveGreen/60 hover:text-oliveGreen transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t.ui.nav.backToLogin}
          </Link>

          <div className="mb-6 mt-6 sm:mt-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-6 group"
            >
              <div className="p-2.5 bg-gradient-to-br from-oliveGreen to-wheatGold rounded-xl shadow-sm group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-charcoalGray tracking-tight">
                MycoMesh<span className="text-sicilian-red">·</span>Protocol
              </span>
            </Link>

            <h1 className="text-3xl font-bold text-charcoalGray mb-2">
              {t.ui.auth.registerTitle}
            </h1>
            <p className="text-sm text-oliveGreen/70">
              {t.ui.auth.registerSubtitle}
            </p>
          </div>

          {params.error === "user_exists" ? (
            <div className="mb-5 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl">
              Este email ya está registrado.{" "}
              <Link href="/login" className="font-bold underline">
                Ve a Iniciar Sesión
              </Link>
            </div>
          ) : params.error ? (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
              {(t.ui.auth.errors as Record<string, string>)[params.error] ||
                t.ui.auth.errors.unknown}
            </div>
          ) : null}

          <form action={register} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-charcoalGray mb-1.5"
              >
                {t.forms.name.label}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 border border-oliveGreen/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-oliveGreen/40 bg-white transition-all text-base"
                placeholder={t.forms.name.placeholder}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-charcoalGray mb-1.5"
              >
                {t.forms.email.label}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-oliveGreen/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-oliveGreen/40 bg-white transition-all text-base"
                placeholder={t.forms.email.placeholder}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-charcoalGray mb-1.5"
              >
                {t.forms.password.label}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 border border-oliveGreen/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-oliveGreen/40 bg-white transition-all text-base"
                placeholder={t.forms.password.newPlaceholder}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-oliveGreen text-white rounded-xl font-bold text-lg hover:bg-oliveGreen/90 transition-all active:scale-[0.98] shadow-lg shadow-oliveGreen/20 flex items-center justify-center gap-2 mt-2"
            >
              {t.ui.auth.registerButton} <UserPlus className="w-5 h-5" />
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-oliveGreen/70">
            {t.ui.auth.haveAccount}{" "}
            <Link
              href="/login"
              className="text-oliveGreen font-bold hover:underline"
            >
              {t.ui.auth.loginLink}
            </Link>
          </p>
        </div>

        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-oliveGreen/10 to-wheatGold/10 relative items-center justify-center overflow-hidden border-l border-white/20 h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[500px] h-[500px] border border-oliveGreen/20 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[350px] h-[350px] border-2 border-dashed border-oliveGreen/30 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute w-[200px] h-[200px] border border-oliveGreen/40 rounded-full" />
          </div>

          <div className="relative z-10 w-32 h-32 bg-white/40 backdrop-blur-md rounded-3xl rotate-45 border border-white/50 shadow-2xl flex items-center justify-center">
            <Sprout className="w-16 h-16 text-oliveGreen -rotate-45" />
          </div>

          <div className="absolute bottom-10 left-8 right-8 text-center">
            <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 rounded-2xl shadow-xl">
              <p className="text-charcoalGray font-medium italic mb-2">
                "{t.content.auth.quotes.register.text}"
              </p>
              <p className="text-xs text-oliveGreen font-bold uppercase tracking-wider">
                — {t.content.auth.quotes.register.author}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
