"use strict";
const { rules } = require(".");
const { Linter } = require("eslint");
const { groupBy } = require("lodash");

const allRules = new Linter().getRules();
const rulesByCategory = groupBy(
  Object.keys(rules),
  (rule) => allRules.get(rule).meta.docs.category
);

console.log(
  Object.entries(rulesByCategory)
    .map(([category, categoryRules]) =>
      [
        `${category} (${categoryRules.length})`,
        ...categoryRules.map((rule) => `- ${rule}`),
      ].join("\n")
    )
    .concat(`Total (${Object.keys(rules).length})`)
    .join("\n\n")
);
