module.exports = {
  extends: "./es2018",
  parserOptions: {
    ecmaVersion: 10 // Same as ES2019 syntax
  },
  rules: { "no-unused-vars": { caughtErrors: "all" } }
};
