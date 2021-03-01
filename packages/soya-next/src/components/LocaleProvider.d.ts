import * as React from "react";
import { Locale } from "../i18n/LocaleContext";

export interface Props {
  defaultLocale?: string;
  siteLocales?: string[];
  locale?: Locale;

  /**
   * Requires one react element only since
   * the render method implements `React.Children.only`.
   */
  children: React.ReactNode;
}

export interface State {
  defaultLocale?: string;
  siteLocales?: string[];
  locale?: Locale;
}

/**
 * Soya Next - Locale Provider
 * ---
 */
declare class LocaleProvider extends React.Component<Props, State> {}

export default LocaleProvider;
