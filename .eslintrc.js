"use strict"

module.exports = {
  extends: ".",
  env: {
    node: true,
  },
  parserOptions: {
    sourceType: "script",
  },
  overrides: [
    {
      files: "index.js",
      rules: {
        "sort-keys": "error",
      },
    },
  ],
}
