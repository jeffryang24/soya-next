"use strict";

module.exports = function babelConfig(api) {
  api.cache(true);

  const presetEnvOptions =
    process.env.BABEL_ENV === "esm"
      ? {
          modules: false,
        }
      : {};

  return {
    presets: [
      [
        "next/babel",
        {
          "preset-env": presetEnvOptions,
        },
      ],
    ],
    comments: false,
    ignore: ["**/__tests__/**"],
  };
};
