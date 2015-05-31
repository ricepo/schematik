# Schematik.String
`Schematik.String` class implements schema generation for the `string` type
defined in the IETF specification draft.

## Constructor
There are two ways to create a `Schematik.String` object.

```js
// 1) Object-oriented way
var schema = new Schematik.String();

// 2) Functional way
var schema = Schematik.string();
```

If you need to add special properties to the resulting schema that are not
supported by Schematik, you can pass in an object to the constructor.

```js
new Schematik.String({ foo: 'bar' });
// { type: 'string', required: true, foo: 'bar' }
```

## `length` function
This function allows specifying the minimum and maximum length of the string,
which corresponds to `minLength` and `maxLength` properties of the JSON schema
string.

Similar to [`Schematik.Array.length` function](array.md), there is a total of
4 ways this function can be used.

  - When modified by `min` modifier, it sets the `minLength` property.
```js
Schematik.string().with.min.length(10);
// {
//   type: 'string',
//   required: true,
//   minLength: 10
// }
```
  - When modified by `max` modifier, it sets the `maxLength` property.
```js
Schematik.string().with.max.length(10);
// {
//   type: 'string',
//   required: true,
//   maxLength: 10
// }
```
  - When supplied with two arguments, it sets the range for string length.
```js
Schematik.string().with.length(10, 100);
// {
//   type: 'string',
//   required: true,
//   minLength: 10,
//   maxLength: 100
// }
```
  - When supplied with one argument, it sets both minimum and maximum item
  to the value provided.
```js
Schematik.string().with.length(10);
// {
//   type: 'string',
//   required: true,
//   minLength: 10,
//   maxLength: 10
// }
```

For better readability, you may want to use this function in conjunction with
a few of chaining conjunctions and the `of` function of `Schematik` class:
```js
Schematik.string().with.the.max.length.of(10);
// {
//   type: 'object',
//   required: true,
//   maxLength: 10
// }
```

## `matches` function
This function specifies the pattern that the string has to match, which
corresponds to the `pattern` property of the JSON schema string.

This function accepts one argument, which must be a RegExp instance.

**Note**: Schematik does not anchor the pattern for you. If needed, you will
have to anchor the pattern yourself before passing it to this function.

```js
Schematik.string().that.matches(/[A-Z]+/);
// { type: 'string', required: true, pattern: '[A-Z]+'}
```

## `oneOf` function
*Per JSON Schema IETF spec, this function will be moved to `Schematik` class.*
