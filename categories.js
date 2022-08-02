"use strict"
const config = require(".")
const { Linter } = require("eslint")
const prettier = require("eslint-config-prettier")
const { readFile } = require("fs/promises")

;(async () => {
  const markdown = await readFile("README.md", "utf8")
  const headingMatches = markdown.matchAll(/\((?<rules>`.*`)\)$/gmu)
  const documentedRules = Array.from(headingMatches).flatMap(
    ({ groups: { rules } }) => {
      const ruleMatches = rules.matchAll(/`(?<rule>[a-z-]+)`/gu)
      return Array.from(ruleMatches).map(({ groups: { rule } }) => rule)
    },
  )

  const allRules = new Linter().getRules()

  const prettierRules = Object.entries(prettier.rules)
    .filter(([, value]) => value === "off")
    .map(([key]) => key)

  console.table(
    Object.fromEntries(
      Array.from(allRules.entries()).map(([rule, { meta }]) => [
        rule,
        {
          category: meta.docs.category,
          status: prettierRules.includes(rule)
            ? "Prettier"
            : documentedRules.includes(rule)
            ? "Documented"
            : rule in config.rules
            ? "Implemented"
            : "To-do",
          docs: `https://eslint.org/docs/latest/rules/${rule}`,
        },
      ]),
    ),
  )
})()
