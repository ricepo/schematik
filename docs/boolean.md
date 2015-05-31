# Schematik.Null
`Schematik.Boolean` class implements schema generation for the `boolean` type
defined in the IETF specification draft.

## Constructor
There are two ways to create a `Schematik.Boolean` object.

```js
// 1) Object-oriented way
var schema = new Schematik.Boolean();

// 2) Functional way
var schema = Schematik.boolean();
```

If you need to add special properties to the resulting schema that are not
supported by Schematik, you can pass in an object to the constructor.

```js
new Schematik.Boolean({ foo: 'bar' });
// { type: 'boolean', required: true, foo: 'bar' }
```
