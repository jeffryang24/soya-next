import PropTypes from "prop-types";

/**
 * Soya Next Locale PropTypes Shape
 * ---
 * If you are using typescript in your project,
 * probably you may use `SoyaNextLocale` interface
 * from `soya-next` package.
 */
export const localeShape = PropTypes.shape({
  country: PropTypes.string,
  language: PropTypes.string,
});
