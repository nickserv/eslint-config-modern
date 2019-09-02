module.exports = {
  extends: ".",
  env: {
    es2017: true // Same as ES2018 globals
  },
  parserOptions: {
    ecmaVersion: 9 // Same as ES2018 syntax
  },
  rules: { "prefer-object-spread": "error" }
};
