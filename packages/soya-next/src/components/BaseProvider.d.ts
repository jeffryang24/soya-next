import * as React from "react";
import { Cookies } from "react-cookie";
import { Locale } from "../i18n/LocaleContext";

export interface Props {
  cookies: Cookies;
  defaultLocale?: string;
  siteLocales?: string[];
  locale?: Locale;

  /**
   * Requires one react element only since
   * the render method implements `React.Children.only`.
   */
  children: React.ReactNode;
}

/**
 * Soya Next - Base Provider
 * ---
 */
declare class BaseProvider extends React.Component<Props> {}

export default BaseProvider;
