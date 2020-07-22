# eslint-config-modern

ESLint configuration for modern JavaScript that improves code quality by removing bad features and preventing anti-patterns

## Installation

You can install ESLint using npm or Yarn:

    npm install eslint --save-dev
    yarn add eslint --dev

Then install this configuration:

    npm install eslint-config-modern --save-dev
    yarn add eslint --dev

## Usage

In your `.eslintrc` file, add:

```json
{
  "extends": "modern"
}
```

## Environment support

### Browsers

This config uses features from ES6/ES2015 to ES2019 which are supported by Chrome, Firefox, and Safari. Legacy browsers like Internet Explorer require build tools like https://babeljs.io/docs/en/babel-preset-env.

### Node

It's assumed that you're using a supported version of Node (see [release schedule](https://github.com/nodejs/Release#release-schedule)).

## Guidelines

### Consistently format code with Prettier

[Prettier](https://prettier.io/) is highly recommended to format your code. It is much more opinionated, powerful, and consistent than ESLint's formatting support. By using both, you can get better formatting from Prettier and still get advice of what features to use and potential errors in ESLint. Removing formatting from this style guide also makes it much simpler and more flexible, as you can use any settings you'd like in Prettier.

### Use new replacements of problematic features

JavaScript has many problematic and difficult to understand syntax features that have been replaced by newer features. Migrating to new features can drastically improve the readability, safety, and consistency of JavaScript.

#### Replace constructor functions with classes

```js
// bad
function Animal() {}
Animal.prototype.speak = function () {
  return this;
};

// good
class Animal {
  speak() {
    return this;
  }
}
```

#### Replace globals with ES/CJS modules

The ES module standard makes it easy to safely reuse JavaScript code across files without leaking into the global scope, and enables useful tooling features like tree shaking and loaders. CJS modules can also be used with Node, though they're not as analyzable and flexible with build tools.

```js
// bad
window.greeting = "Hello, world!";

// good (ES)
export const greeting = "Hello, world!";

// good (CJS)
exports.greeting = "Hello, world!";
```

#### Replace `var` with `let`/`const`

Variables created with `var` are hoisted to the nearest function, which can cause confusing behavior with the order of accessing variables and variables overriding each other in nearby scopes. `let` and `const` replace `var` with more predictable block scoping (typical with other programming languages). `const` should be preferred if you don't need to reassign the variable, otherwise use `let`.

```js
// bad
var greeting = "Hello, world!";
var enabled = true;
enabled = false;

// good
const greeting = "Hello, world!";
let enabled = true;
enabled = false;
```

#### Replace string concatenation with template literals

`+` can have ambiguous behavior if it's used between strings and numbers interchangeably. To avoid bugs and unwanted formatting, it's better to use template literal syntax (which also allows for custom templates) for strings and exclusively use `+` for math.

```js
// bad
const name = "world";
console.log("Hello, " + name + "!");

// good
const name = "world";
console.log(`Hello, ${name}!`);
```

#### Replace the `arguments` keyword with spread arguments

`arguments` used to be the only way to get a variable number of arguments from a function dynamically, but it isn't supported in arrow functions and confusingly is not an actual Array object. The spread argument (`...`) solves this issue and works with both `function` and arrow functions.

```js
// bad
function joinWords() {
  return Array.from(arguments).join(" ");
}

// good
function joinWords(...args) {
  return args.join(" ");
}
```

- Replace `for (const i = 0; i < array.length; i++)` and `for (const value in array)` with `for (const value of array)`.
- Prefer Promises over callbacks when using async errors.
- Prefer `async`/`await` over `.then()` to use Promises.
- Don't give `parseInt()` a radix, it properly defaults to 10 on modern browsers.
- Don't assign `this` to a variable, use arrow functions or `.bind()` to avoid shadowing.
- Use strict mode in all files. Note that it's enabled automatically in ES modules, you only need `"use strict"` at the top of files that don't use `import` or `export`.
- Use `===` and `!==` instead of `==` and `!=`.
- Use `fetch` or a third party library to make requests in browsers instead of `XMLHTTPRequest`. `node-fetch` is a good third party alternative for Node.

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
- Avoid `continue`, use conditional statements inside blocks instead.
- Avoid typed wrappers (Boolean/Number/String/Object/Array), use literals like `false`, `0`, `''`, `{}`, and `[]` instead.
- Avoid `with`, manually read properties or use destructuring instead.
- Avoid `void`, it's better to use `undefined` or break up multiple statements instead.
- Avoid bitwise operators like `&` and `|`, they're usually confused with the `&&` and `||` (and/or) operators, and bitwise operations are not very performant or useful in JavaScript.
- Avoid `arguments`
- Avoid labels

### Follow best practices

- acessor-pairs Always define a getter for each setter
- array-callback-return Return values in Array methods
- class-methods-use-this Always use `this` in class methods
- consistent-return
- default-case Always provide a `default` in `case` as a fallback
- dot notation Avoid using `[]` unnecessary when indexing
- max-classes-per-file Use one class per file

## Inspiration

- https://github.com/eslint/eslint/blob/master/conf/eslint-recommended.js
- https://github.com/prettier/prettier
- https://github.com/prettier/eslint-config-prettier
- https://standardjs.com/
- https://www.jslint.com/
- https://github.com/ssoloff/eslint-config-crockford
- https://github.com/airbnb/javascript
- https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app
