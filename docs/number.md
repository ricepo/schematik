# Schematik.Number
`Schematik.Number` class implements schema generation for the `number` type
defined in the IETF specification draft.

## Constructor
There are two ways to create a `Schematik.Number` object.

```js
// 1) Object-oriented way
var schema = new Schematik.Number();

// 2) Functional way
var schema = Schematik.number();
```

If you need to add special properties to the resulting schema that are not
supported by Schematik, you can pass in an object to the constructor.

```js
new Schematik.Number({ foo: 'bar' });
// { type: 'number', required: true, foo: 'bar' }
```

## functions and modifiers
All functions and modifiers defined on `Schematik.Number` class are also defined
on `Schematik.Integer` class.

For more information, please refer to
[`Schematik.Integer` documentation](integer.md)
