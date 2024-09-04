# eslint-config-modern

ESLint configuration for modern JavaScript that improves code quality by removing bad features and preventing anti-patterns

## Installation

You can install ESLint using npm or Yarn:

```
npm install eslint --save-dev
```

```
yarn add eslint --dev
```

Then install this configuration:

```
npm install eslint-config-modern --save-dev
```

```
yarn add eslint-config-modern --dev
```

## Usage

In your `.eslintrc` file, add:

```json
"extends": "modern"
```

## Environment support

This config uses features from ES6/ES2015 to ES2019 which are supported in the following environments:

- Chrome
- Firefox
- Safari
- Node.js 12.17.0+
- TypeScript 2.7+

## Guidelines

### Consistently format code with Prettier

[Prettier](https://prettier.io/) is highly recommended to format your code. It is much more opinionated, powerful, and consistent than ESLint's formatting support. By using both, you can get better formatting from Prettier and still get advice of what features to use and potential errors in ESLint. Removing formatting from this style guide also makes it much simpler and more flexible, as you can use any settings you'd like in Prettier.

While configuration is not required, it's recommended you enable support for ES2017 trailing commas:

```json
"trailingComma": "all"
```

### Use new replacements of problematic features

JavaScript has many problematic and difficult to understand syntax features that have been replaced by newer features. Migrating to new features can drastically improve the readability, safety, and consistency of JavaScript.

#### Replace constructor functions with classes

```js
// ❌
function Animal() {}
Animal.prototype.speak = function () {
  return this
}

// ✅
class Animal {
  speak() {
    return this
  }
}
```

#### Replace globals and CJS modules with ES modules (`no-implicit-globals`)

The ES module standard makes it easy to safely reuse JavaScript code across files without leaking into the global scope, and enables useful tooling features like tree shaking and loaders.

```js
// ❌ globals
window.greeting = "Hello, world!"

// ❌ CJS
exports.greeting = "Hello, world!"

// ✅ ES
export const greeting = "Hello, world!"
```

#### Replace `var` with `let`/`const` (`no-const-assign`, `no-var`, `prefer-const`)

Variables created with `var` are hoisted to the nearest function, which can cause confusing behavior with the order of accessing variables and variables overriding each other in nearby scopes. `let` and `const` replace `var` with more predictable block scoping (typical with other programming languages). `const` should be preferred if you don't need to reassign the variable, otherwise use `let`.

```js
// ❌
var greeting = "Hello, world!"
var enabled = true
enabled = false

// ✅
const greeting = "Hello, world!"
let enabled = true
enabled = false
```

#### Use iteration with `for`

C-style `for` loops are often unnecessarily complicated and error prone for basic iteration. `for...of` can replace it in most cases, and in other cases you should prefer other iteration operators or methods.

```js
// ❌
for (const i = 0; i < array.length; i++) {
  console.log(array[i])
}

// ✅
for (const value of array) {
  console.log(value)
}
```

#### Replace `for...in` with `for...of` (`no-restricted-syntax`)

Unfortunately `for...in` loops include the entire prototype chain, not just iterable items in an object. This can cause confusing behavior, like logging methods of a custom array type when you only want to log array items. `for...of` is similar, but it uses iterators to only loop over iterable items.

```js
// ❌
for (const value in array)

// ✅
for (const value of array)
```

#### Replace string concatenation with template literals (`prefer-template`)

`+` can have ambiguous behavior if it's used between strings and numbers interchangeably. To avoid bugs and unwanted formatting, it's better to use template literal syntax (which also allows for custom templates) for strings and exclusively use `+` for math.

```js
// ❌
const name = "world"
console.log("Hello, " + name + "!")

// ✅
const name = "world"
console.log(`Hello, ${name}!`)
```

#### Replace the `arguments` keyword with spread arguments (`prefer-rest-params`)

`arguments` used to be the only way to get a variable number of arguments from a function dynamically, but it isn't supported in arrow functions and confusingly is not an actual Array object. The spread argument (`...`) solves this issue and works with both `function` and arrow functions.

```js
// ❌
function joinWords() {
  return Array.from(arguments).join(" ")
}

// ✅
function joinWords(...args) {
  return args.join(" ")
}
```

#### Prefer Promises over callbacks when using async errors

Originally, callbacks were the only basic primitive for asyncronous operations in JavaScript. However, chaining together asyncronous operations with multiple callbacks can often result in messy indentation. Callbacks also don't necessarily have consistent error handling, making error handling logic repetitive and easy to misuse. Promises on the other hand are objects that represent a future value, running listeners when complete. This makes asyncronous data processing and error handling easier and less error-prone.

```js
// ❌
function getFirstResult(callback) {
  getResults((error, results) {
    if (error) {
      callback(error)
    } else {
      callback(null,results[0])
    }
  })
}

// ✅
async function getFirstResult() {
  const results = await getResults()
  return results[0]
}
```

#### Prefer `async`/`await` over `.then()` to use Promises (`no-restricted-properties`)

`async` functions allow for more convenient usage of Promise values without manually nesting or chaining Promises. Instead of using `.then()` to wait for a Promise to resolve and `.catch()` to handle errors, use the Promise in an `async` function with `await` with an ordinary `try`/`catch` clause for error handling (each Promise chain should have at least one handler).

```js
// ❌
function getExample() {
  return fetch("https://example.com")
    .then((response) => response.text())
    .catch((error) => console.error(error))
}

// ✅
async function getExample() {
  try {
    const response = await fetch("https://example.com")
    return response.text()
  } catch (error) {
    console.error(error)
  }
}
```

#### Use `parseInt()` without a radix for base 10

Modern JavaScript specs require the radix/base of integer parsing to always be 10, so defensively passing `10` as the second argument is no longer necessary.

```js
// ❌
const integer = parseInt(string, 10)

// ✅
const integer = parseInt(string)
```

#### Don't assign `this` to a variable, use arrow functions or `.bind()` to avoid shadowing (`consistent-this`)

```js
// ❌
const that = this
const processedItems = items.map(function (item) {
  return that.processItem(item)
})

// ✅
const processedItems = items.map((item) => this.processItem(item))
```

#### Use strict mode in all files (`strict`)

Strict mode is automatically enabled in ES modules, so you only need `"use strict"` at the top of files that don't use `import` or `export`.

```js
// ❌
console.log("Hello, world!")

// ✅ file
import greeting from "./greeting" // or if you don't have imports/exports, use "use-strict" on the first line
console.log(greeting)
```

#### Use `===` and `!==` instead of `==` and `!=` (`eqeqeq`)

JavaScript's default comparison operators (`==` and `!=`) can compare different types of primitives, leading to confusion behavior and bugs from unexpected types and other coercion issues. It's better to explicitly use `===` and `!==`, which check to see if values are equivalent and of the same type.

```js
// ❌
nameOrId == 1

// ✅
nameOrId === 1
```

#### Use `fetch` instead of `XMLHTTPRequest` (`no-restricted-globals`)

`XMLHTTPRequest` is a fairly old API for making HTTP/AJAX requests in browsers. It relies on multiple events and callbacks, making it more difficult to learn and harder to reuse. `fetch` is a more modern alternative that's entirely based on Promises, and therefore has better data management and error handling (see above).

If you're using Node 18+, you can use `fetch` globally. If not, we recommend `undici` as Node's legacy HTTP client is also fairly complex.

### Improve semantics

Some features have potentially dangerous or confusing usages and can be improved with care.

- Use `null` instead of `undefined`, unless you're comparing with an existing `undefined` value.
- Use break/return/throw for every `case` in `switch`.
- Don't extend or reassign built in types and values.
- Prefer standard APIs over third party packages when you can get equivalent functionality.
- Use capital letters for class names to signify that `new` should be used to create instances.
- Only throw Error objects (or subclasses).

### Avoid bad features

Some features are too dangerous or confusing to be worth using.

- Avoid `eval()`, use other techniques to make code dynamic.
- Avoid `continue`, use conditional statements inside blocks instead. (`no-continue`)
- Avoid typed wrappers (Boolean/Number/String/Object/Array), use literals like `false`, `0`, `''`, `{}`, and `[]` instead. (`no-new-wrappers`)
- Avoid `with`, manually read properties or use destructuring instead. (`no-with`)
- Avoid `void`, it's better to use `undefined` or break up multiple statements instead. (`no-void`)
- Avoid bitwise operators like `&` and `|`, they're usually confused with the `&&` and `||` (and/or) operators, and bitwise operations are not very performant or useful in JavaScript. (`no-bitwise`)
- Avoid labels (`no-labels`)

### Follow best practices

- Always define a getter for each setter (`accessor-pairs`)
- Return values in Array methods (`array-callback-return`)
- Always use `this` in class methods (`class-methods-use-this`)
- Consistently return values (`consistent-return`)
- Always provide a `default` in `case` as a fallback (`default-case`)
- Avoid using `[]` unnecessary when indexing (`dot-notation`)
- Use one class per file (`max-classes-per-file`)

## Inspiration

- https://github.com/eslint/eslint/blob/master/conf/eslint-recommended.js
- https://github.com/prettier/prettier
- https://github.com/prettier/eslint-config-prettier
- https://standardjs.com/
- https://www.jslint.com/
- https://github.com/ssoloff/eslint-config-crockford
- https://github.com/airbnb/javascript
- https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app
