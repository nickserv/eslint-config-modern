"use strict"
const config = require(".")
const { Linter } = require("eslint")
const { readFile } = require("fs/promises")
const { groupBy } = require("lodash")

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
  const rulesByCategory = groupBy(
    Object.keys(config.rules),
    (rule) => allRules.get(rule).meta.docs.category,
  )

  function countDocumentedRules(rules) {
    return rules.filter((rule) => documentedRules.includes(rule)).length
  }

  console.log(
    Object.entries(rulesByCategory)
      .map(([category, categoryRules]) =>
        [
          `${category} (${countDocumentedRules(categoryRules)}/${
            categoryRules.length
          })`,
          ...categoryRules.map(
            (rule) => `${documentedRules.includes(rule) ? "✅" : "❌"} ${rule}`,
          ),
        ].join("\n"),
      )
      .concat(
        `Total (${countDocumentedRules(Object.keys(config.rules))}/${
          Object.keys(config.rules).length
        })`,
      )
      .join("\n\n"),
  )
})()
