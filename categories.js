"use strict";
const { rules } = require(".");
const { Linter } = require("eslint");
const { groupBy } = require("lodash");

const allRules = new Linter().getRules();
const rulesByCategory = groupBy(
  Object.keys(rules),
  (rule) => allRules.get(rule).meta.docs.category
);

console.log(rulesByCategory);
