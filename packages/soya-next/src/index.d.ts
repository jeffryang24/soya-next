import { CompressionOptions } from 'compression';

/**
 * Soya Legacy Configuration for Soya Next
 * ---
 */
export interface SoyaLegacyConfig {
  absoluteComponentsDir?: any[];
  assetHostPath?: string;
  assetProtocol?: string;
  clientReplace?: Record<string, any>;
  clientResolve?: any[];
  commonFileThreshold?: number;
  componentBrowser?: boolean;
  debug?: boolean;
  defaultImportBase?: string;
  hotReload?: boolean;
  maxRequestBodyLength?: number;
  minifyJs?: boolean;
  port?: number;
  precompileClient?: boolean;
  routerNodeRegistrationAbsolutePath?: string;
  useStyledModules?: boolean;
}

/**
 * Soya Next Configuration - Base Path Object
 * ---
 * It can be accessed through `config.get('basePath')` or `config.basePath`
 * by using `node-config`.
 */
export interface SoyaNextBasePath {
  exclude?: string | string[];
  test?: string;
}

/**
 * Soya Next Configuration - Redirect Object
 * ---
 * It can be accessed through `config.get('redirects')` or `config.redirects`
 * by using `node-config`.
 */
export interface SoyaNextRedirectConfig {
  /**
   * **Note:** It must match one of the `config.routes` key.
   * @example '/p/:id'
   */
  to: string;
}

/**
 * Soya Next Configuration - Route Object
 * ---
 * It can be accessed through `config.get('routes')` or `config.routes`
 * by using `node-config`.
 */
export interface SoyaNextRouteConfig {
  /**
   * @example '/post'
   */
  page: string;
}

/**
 * Soya Next Configuration - Server Section
 * ---
 * It can be accessed through `config.get('server')` or `config.server`
 * by using `node-config`.
 */
export interface SoyaNextServerConfig {
  /**
   * Express server compression options.
   *
   * @see [compression](https://www.npmjs.com/package/compression#compressionoptions)
   */
  compression?: CompressionOptions;

  /**
   * Server header configuration
   * @example
   * {
   *   'X-Frame-Options': 'SAMEORIGIN'
   * }
   */
  headers: Record<string, any>;

  /**
   * Server host.
   * @example '0.0.0.0'
   */
  host?: string;

  /**
   * Server port number.
   * @example 3000
   */
  port?: number;
}

/**
 * Soya Next Configuration
 * ---
 * Soya next configuration for `node-config` file (`config/default.js`,
 * `config/production.js`, etc.). You can extend this interface with your
 * own configuration, and then do module-augmenting `config` module
 * with this interface for better autocompletion.
 *
 * @example
 * // Inside your custom type directory, such as `/[your_project_root]/src/@types/config.d.ts`.
 * import { SoyaNextConfig } from 'soya-next';
 *
 * declare module 'config' {
 *   // You also can extends from other config interfaces.
 *   declare interface IConfig extends SoyaNextConfig {
 *     captchaSiteKey?: string;
 *     // Add your custom config property here.
 *   }
 * }
 *
 * // Using `get` method.
 * const captchaSiteKey: string = config.get('captchaSiteKey');
 *
 * // Old direct value access method.
 * const captchaSiteKey = config.captchaSiteKey || '';
 */
export interface SoyaNextConfig {
  /**
   * Soya next basePath configuration.
   *
   * Used in NextJS `assetPrefix` configuration or soya-next
   * `createRouter` method.
   */
  basePath?: string | SoyaNextBasePath;

  /**
   * Soya next router defaultLocale.
   *
   * **Note:** The value must match one of
   * the `siteLocales` config values.
   * @example 'en-id'
   */
  defaultLocale?: string;

  /**
   * Soya legacy configuration for soya-next.
   *
   * This configuration is not required anymore if you are using the latest
   * soya-next framework. You may need to provide this configuration
   * if you still use the old soya framework alongside with soya-next 😏.
   *
   * @see [https://github.com/traveloka/soya#configurations](https://github.com/traveloka/soya#configurations)
   */
  legacy?: SoyaLegacyConfig;

  /**
   * Soya next server redirects configuration.
   * @example
   * redirects: {
   *   '/post/:id': {
   *     to: '/p/:id', // must target available routes
   *   },
   * }
   */
  redirects?: Record<string, SoyaNextRedirectConfig>;

  /**
   * Soya next server routes configuration.
   * @example
   * routes: {
   *   '/p/:id': {
   *     page: '/post',
   *   },
   * }
   */
  routes?: Record<string, SoyaNextRouteConfig>;

  /**
   * Soya next server configuration.
   */
  server?: SoyaNextServerConfig;

  /**
   * Soya next router siteLocales.
   * @example ['en-id', 'id-id']
   */
  siteLocales?: string[];

  /**
   * Soya next `whoami` response object.
   *
   * It is used for `/whoami` response.
   */
  whoami?: Record<string, any>;
}
