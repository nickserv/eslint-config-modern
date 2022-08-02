/* eslint camelcase: ["error", { allow: ["_id$"] }] */
"use strict"
const config = require(".")
const { Linter } = require("eslint")
const prettier = require("eslint-config-prettier")
const { readFile } = require("fs/promises")
const { Client } = require("@notionhq/client")
require("dotenv/config")

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

;(async () => {
  const markdown = await readFile("README.md", "utf8")
  const headingMatches = markdown.matchAll(/\((?<rules>`.*`)\)$/gmu)
  const documentedRules = Array.from(headingMatches).flatMap(
    ({ groups: { rules } }) => {
      const ruleMatches = rules.matchAll(/`(?<rule>[a-z-]+)`/gu)
      return Array.from(ruleMatches).map(({ groups: { rule } }) => rule)
    },
  )

  const rules = Object.fromEntries(
    Array.from(new Linter().getRules().entries()).map(([rule, { meta }]) => [
      rule,
      {
        category: meta.docs.category,
        status:
          prettier.rules[rule] === "off"
            ? "Prettier"
            : documentedRules.includes(rule)
            ? "Documented"
            : rule in config.rules
            ? "Implemented"
            : "To-do",
        docs: `https://eslint.org/docs/latest/rules/${rule}`,
      },
    ]),
  )

  console.table(rules)

  const { id } = await notion.databases.create({
    parent: {
      page_id: process.env.NOTION_PAGE,
    },
    title: [{ text: { content: "ESLint Rules" } }],
    properties: {
      ID: { title: {} },
      Category: {
        select: {
          options: [
            { name: "Best Practices" },
            { name: "Stylistic Issues" },
            { name: "ECMAScript 6" },
            { name: "Node.js and CommonJS" },
            { name: "Possible Errors" },
            { name: "Variables" },
            { name: "Strict Mode" },
          ],
        },
      },
      Status: {
        select: {
          options: [
            { name: "To-do" },
            { name: "Implemented" },
            { name: "Documented" },
            { name: "Prettier" },
          ],
        },
      },
      Docs: { url: {} },
    },
  })

  for (const [rule, { category, status, docs }] of Object.entries(rules)) {
    notion.pages.create({
      parent: {
        database_id: id,
      },
      properties: {
        ID: { title: [{ text: { content: rule } }] },
        Category: { select: { name: category } },
        Status: { select: { name: status } },
        Docs: { url: docs },
      },
    })
  }
})()
