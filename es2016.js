module.exports = {
  extends: ".",
  parserOptions: {
    ecmaVersion: 7 // Same as ES2016 syntax
  },
  rules: {
    "no-restricted-properties": [
      "error",
      {
        object: "Math",
        property: "pow",
        message: "Use the exponentiation operator (**) instead."
      }
    ]
  }
};
