import { getLocale } from "@sicilia-soil/core";
import { login } from "./actions";
const t = getLocale("es");

export const metadata = {
  title: t.ui.auth.signIn,
};

export default function LoginPage() {
  return (
    <div className="bg-white/70 backdrop-blur-sm border border-oliveGreen/15 rounded-2xl p-8 shadow-lg">
      <h1 className="text-2xl font-bold text-charcoalGray mb-2">
        {t.ui.auth.signIn}
      </h1>
      <p className="text-sm text-oliveGreen/70 mb-6">{t.ui.auth.subtitle}</p>

      <form action={login} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-charcoalGray mb-1"
          >
            {t.forms.email.label}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full px-3 py-2 border border-oliveGreen/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-oliveGreen/40 bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-charcoalGray mb-1"
          >
            {t.forms.password.label}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full px-3 py-2 border border-oliveGreen/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-oliveGreen/40 bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-oliveGreen text-white rounded-lg font-medium hover:bg-oliveGreen/90 transition-colors"
        >
          {t.ui.auth.signIn}
        </button>
      </form>

      <p className="mt-6 text-xs text-center text-oliveGreen/60">
        {t.ui.auth.noAccount}
      </p>
    </div>
  );
}
