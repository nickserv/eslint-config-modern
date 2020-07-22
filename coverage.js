"use strict";
const { readFile } = require("fs/promises");

(async () => {
  const markdown = await readFile("README.md", "utf8");
  const headingMatches = markdown.matchAll(/^#.*\((?<rules>.*)\)$/gmu);
  const documentedRules = Array.from(headingMatches).flatMap(
    ({ groups: { rules } }) => {
      const ruleMatches = rules.matchAll(/`(?<rule>[a-z-]+)`/gu);
      return Array.from(ruleMatches).map(({ groups: { rule } }) => rule);
    }
  );

  console.log(documentedRules);
})();
