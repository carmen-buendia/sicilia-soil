import { es } from "./es";
import { en } from "./en";
import { DEFAULT_LOCALE, type LocaleKey } from "../types/locale.types";

export type Locale = typeof es;

export const locales: Record<LocaleKey, Locale> = { es, en };

export function getLocale(key: LocaleKey = DEFAULT_LOCALE): Locale {
  return locales[key] ?? locales[DEFAULT_LOCALE];
}

export { es, en };
export type { LocaleKey };
export {
  DEFAULT_LOCALE,
  LOCALE_KEYS,
  LOCALE_LABELS,
} from "../types/locale.types";
