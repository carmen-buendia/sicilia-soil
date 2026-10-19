export type LocaleKey = "es" | "en";

export const LOCALE_KEYS: readonly LocaleKey[] = ["es", "en"] as const;

export const DEFAULT_LOCALE: LocaleKey = "es";

export const LOCALE_LABELS: Record<LocaleKey, string> = {
  es: "Español",
  en: "English",
};
