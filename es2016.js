module.exports = {
  extends: ".",
  parserOptions: { ecmaVersion: 7 },
  rules: {
    "no-restricted-properties": [
      "error",
      {
        object: "Math",
        property: "pow",
        message: "Use the exponentiation operator (**) instead.",
      },
    ],
  },
};
