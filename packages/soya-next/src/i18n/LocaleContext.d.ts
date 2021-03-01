import { Context } from "react";

/**
 * Soya Next - i18n - Locale
 */
export interface Locale {
  country: string;
  language: string;
}

export interface LocaleContextInterface {
  defaultLocale?: string;
  siteLocales?: string[];
  locale?: Locale | null;
}

/**
 * Soya Next - i18n - Locale Context
 * ---
 */
declare const LocaleContext: Context<LocaleContextInterface>;

export default LocaleContext;
