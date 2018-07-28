# eslint-config-modern

## To review

### Rules

- Use ES classes
- Use ES modules (CJS is fine for Node) instead of globals
- Use let and const
- Use // comments
- Avoid using undefined over null
- Only use for of loops
- Use break/return/throw in switches
- Only use `` for string concatenation and + for addition
- Use explicit spread arguments over arguments
- Don't extend or reassign built in types and values
- Prefer standard APIs
- Prefer Promises over callbacks when using async errors
- Prefer async/await over Promise then
- Don't give parseInt a radix
- Don't rename this
- Use a code formatter or a consistent syntax
- Use strict mode (implied for imported ES modules)
- Use === and !== instead of == and !==
- Avoid eval and continue
- Avoid typed wrappers (Boolean/Number/String/Object/Array)
- Use capital letters for constructors/functions
- Use Prettier (a specific style is not important, just be consistent)
- Avoid with
- Avoid void
- Use fetch or a third party library instead of XMLHTTPRequest
- Only throw Error objects (or subclasses)
- No bitwise

### Prior art

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
