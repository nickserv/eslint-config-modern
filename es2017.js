module.exports = {
  extends: "./es2016",
  env: { es2017: true },
  rules: {
    "no-restricted-properties": [
      "error",
      { property: "then", message: "Please use async/await instead." },
    ],
  },
};
