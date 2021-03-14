import React from "react";
import hoistStatics from "hoist-non-react-statics";
import getDisplayName from "../utils/getDisplayName";
import LocaleContext from "./LocaleContext";
import type { SoyaNextLocale } from "..";

export interface WithLocaleComponentInjectedProps {
  defaultLocale?: string;
  siteLocales?: string[];
  locale?: SoyaNextLocale;
}
export interface WithLocaleComponentProps {
  /**
   * It can be a `SoyaNextLocale` object or
   * a valid locale string, such as `en-id`.
   */
  locale?: SoyaNextLocale | string;
}

// TODO: remove class expression when the issue has been resolved
// from typescript side.
// - https://github.com/microsoft/TypeScript/issues/35822
// - https://github.com/microsoft/TypeScript/issues/28040
// error TS4060: Return type of exported function has or is using private name 'WithLocale'
export default function withLocaleComponent<
  TProps extends WithLocaleComponentInjectedProps
>(Component: React.ComponentType<TProps>) {
  const WithLocale = class WithLocale extends React.Component<
    Omit<TProps, keyof WithLocaleComponentInjectedProps> &
      WithLocaleComponentProps
  > {
    static displayName = getDisplayName("withLocale", Component);

    render() {
      return (
        <LocaleContext.Consumer>
          {context => {
            let locale = this.props.locale || context.locale;
            if (typeof locale === "string") {
              const [language, country] = locale.split("-");
              locale = { country, language };
            }
            return (
              <Component
                {...(this.props as TProps)}
                {...context}
                locale={locale}
              />
            );
          }}
        </LocaleContext.Consumer>
      );
    }
  };

  return hoistStatics(WithLocale, Component);
}
