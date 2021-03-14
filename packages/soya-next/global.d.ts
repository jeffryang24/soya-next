import type { NEXT_DATA } from "next/dist/next-server/lib/utils";

declare global {
  declare var __NEXT_DATA__: NEXT_DATA;

  // INFO: status & statusCode fields are used inside decodeParam util.
  declare interface URIError extends Error {
    status?: number;
    statusCode?: number;
  }

  // Extend the NodeJS namespace with Next.js-defined properties
  declare namespace NodeJS {
    // INFO: Not set it to readonly for testing purpose.
    interface Process {
      browser: boolean;
    }

    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production" | "test";
    }
  }
}

declare module "next/dist/next-server/lib/utils" {
  declare interface NextPageContext {
    defaultLocale?: string;
    siteLocales?: string[];
    locale?: SoyaNextLocale;
  }
}
