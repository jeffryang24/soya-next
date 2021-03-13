"use strict";

module.exports = function babelConfig(api) {
  const presetEnvOptions = api.env("esm")
    ? {
        modules: false,
      }
    : {};

  const ignore = api.env("test") ? [] : ["**/__tests__/**"];

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
    ignore,
  };
};
