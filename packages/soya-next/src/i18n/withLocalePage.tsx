import React from "react";
import hoistStatics from "hoist-non-react-statics";
import getDisplayName from "../utils/getDisplayName";
import { ensurePath } from "../utils/locale";
import { NEXT_STATICS } from "../constants/Statics";
import type { NextPage, NextPageContext } from "next";
import type { SoyaNextLocale } from "..";

export interface WithLocalePageInjectedProps {
  defaultLocale?: string;
  siteLocales?: string[];
  locale?: SoyaNextLocale;
}
export interface WithLocalePageProps {
  defaultLocale?: string;
  siteLocales?: string[];
  locale?: SoyaNextLocale;
}

// TODO: remove class expression when the issue has been resolved
// from typescript side.
// - https://github.com/microsoft/TypeScript/issues/35822
// - https://github.com/microsoft/TypeScript/issues/28040
// error TS4060: Return type of exported function has or is using private name 'WithLocale'
export default function withLocalePage<
  TProps extends WithLocalePageInjectedProps
>(Page: NextPage<TProps>) {
  const WithLocale = class WithLocale extends React.Component<
    Omit<TProps, keyof WithLocalePageInjectedProps> & WithLocalePageProps
  > {
    static displayName = getDisplayName("withLocale", Page);

    static async getInitialProps({ asPath, ...ctx }: NextPageContext) {
      const context = process.browser
        ? window.__NEXT_DATA__.props
        : ctx.req || {};
      const { defaultLocale, siteLocales } = context;
      if (process.browser) {
        if (ctx.query.locale) {
          const [language, country] = (ctx.query.locale as string).split("-");
          if (siteLocales.indexOf(`${language}-${country}`) !== -1) {
            context.locale = { language, country };
          }
        }
      }
      const props =
        Page.getInitialProps &&
        (await Page.getInitialProps({
          ...ctx,
          asPath: ensurePath(asPath || "", context.locale, defaultLocale),
          defaultLocale,
          siteLocales,
          locale: context.locale,
        }));
      return {
        ...props,
        defaultLocale,
        siteLocales,
        locale: context.locale,
      };
    }

    render() {
      return <Page {...(this.props as TProps)} />;
    }
  };

  return hoistStatics(WithLocale, Page, NEXT_STATICS);
}
