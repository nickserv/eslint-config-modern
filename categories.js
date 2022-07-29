"use strict"
const config = require(".")
const { Linter } = require("eslint")
const { readFile } = require("fs/promises")
const { groupBy } = require("lodash")

async function getDocumentedRules() {
  const markdown = await readFile("README.md", "utf8")
  const headingMatches = markdown.matchAll(/^#.*\((?<rules>.*)\)$/gmu)
  return Array.from(headingMatches).flatMap(({ groups: { rules } }) => {
    const ruleMatches = rules.matchAll(/`(?<rule>[a-z-]+)`/gu)
    return Array.from(ruleMatches).map(({ groups: { rule } }) => rule)
  })
}

function getRulesByCategory() {
  const allRules = new Linter().getRules()
  return groupBy(
    Object.keys(config.rules),
    (rule) => allRules.get(rule).meta.docs.category,
  )
}

;(async () => {
  const documentedRules = await getDocumentedRules()

  function countDocumentedRules(rules) {
    return rules.filter((rule) => documentedRules.includes(rule)).length
  }

  console.log(
    Object.entries(getRulesByCategory())
      .map(([category, categoryRules]) =>
        [
          `${category} (${countDocumentedRules(categoryRules)}/${
            categoryRules.length
          })`,
          ...categoryRules.map(
            (rule) => `${documentedRules.includes(rule) ? "✓" : "✖"} ${rule}`,
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
