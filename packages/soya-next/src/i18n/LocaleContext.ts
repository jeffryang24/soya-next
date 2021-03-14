import React from "react";
import type { SoyaNextLocaleContext } from "..";

const LocaleContext = React.createContext<SoyaNextLocaleContext>({
  defaultLocale: "",
  siteLocales: [],
  locale: null,
});

LocaleContext.displayName = "LocaleContext";

export default LocaleContext;
