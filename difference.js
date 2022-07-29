"use strict"
const config = require(".")
const { Linter } = require("eslint")
const prettier = require("eslint-config-prettier")
const { difference } = require("lodash")

const allRules = Array.from(new Linter().getRules().keys())

const prettierRules = Object.entries(prettier.rules)
  .filter(([, value]) => value === "off")
  .map(([key]) => key)

const rules = Object.keys(config.rules)

console.log(difference(allRules, prettierRules, rules))
