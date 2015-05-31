# Schematik.Null
`Schematik.Null` class implements schema generation for the `null` type
defined in the IETF specification draft.

## Constructor
There are two ways to create a `Schematik.Null` object.

```js
// 1) Object-oriented way
var schema = new Schematik.Null();

// 2) Functional way
var schema = Schematik.null();
```

If you need to add special properties to the resulting schema that are not
supported by Schematik, you can pass in an object to the constructor.

```js
new Schematik.Null({ foo: 'bar' });
// { type: 'null', required: true, foo: 'bar' }
```
