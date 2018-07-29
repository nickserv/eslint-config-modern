# eslint-config-modern

## Guidelines

### Consistently format code with Prettier

[Prettier](https://prettier.io/) is highly recommended to format your code. It is much more opinionated, powerful, and consistent than ESLint's formatting support. By using both, you can get better formatting from Prettier and still get advice of what features to use and potential errors in ESLint. Removing formatting from this style guide also makes it much simpler and more flexible, as you can use any settings you'd like in Prettier.

### Use new replacements of problematic features

JavaScript has many problematic and difficult to understand syntax features that have been replaced by newer features. Migrating to new features can drastically improve the readability, safety, and consistency of JavaScript.

- Use ES classes with `class` instead of constructor functions with `function`.
- Use ES modules (CJS is fine for Node) instead of globals.
- Replace `var` with `const` if you don't need to reassign the variable, and `let` if you do.
- Replace `for (const i = 0; i < array.length; i++)` and `for (const value in array)` with `for (const value of array)`.
- Only use `` for string concatenation and + for addition.
- Use spread arguments like `...args` instead of `arguments`.
- Prefer Promises over callbacks when using async errors.
- Prefer `async`/`await` over `.then()` to use Promises.
- Don't give `parseInt()` a radix, it properly defaults to 10 on modern browsers.
- Don't assign `this` to a variable, use arrow functions or `.bind()` to avoid shadowing.
- Use `"strict mode"` in all files. Note that it's enabled automatically in ES modules, you only need it at the top of files that don't use `import` or `export`.
- Use `===` and `!==` instead of `==` and `!=`.
- Use `fetch` or a third party library to make requests in browsers instead of `XMLHTTPRequest`. `node-fetch` is a good third party alternative for Node.

### Improve semantics

Some features have potentially dangerous or confusing usages and can be improved with care.

- Use `null` instead of `undefined`, unless you're comparing an existing value `undefined` value.
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

## To review

- https://github.com/airbnb/javascript
- http://jshint.com/
- https://standardjs.com/
- https://github.com/eslint/eslint/blob/master/conf/eslint-recommended.js
- https://github.com/walmartlabs/eslint-config-walmart/blob/master/docs/styleguide.md
- https://github.com/FormidableLabs/eslint-config-formidable
- https://jslint.com/
- https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app
- https://github.com/kunalgolani/eslint-config
- https://github.com/ericclemmons/eslint-config-future
- https://github.com/thenativeweb/eslint-config-es
- https://github.com/kukiron/eslint-config-latest
