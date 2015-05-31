# Schematik.Integer
`Schematik.Integer` class implements schema generation for the `integer` type
defined in the IETF specification draft.

## Constructor
There are two ways to create a `Schematik.Integer` object.

```js
// 1) Object-oriented way
var schema = new Schematik.Integer();

// 2) Functional way
var schema = Schematik.integer();
```

If you need to add special properties to the resulting schema that are not
supported by Schematik, you can pass in an object to the constructor.

```js
new Schematik.Integer({ foo: 'bar' });
// { type: 'integer', required: true, foo: 'bar' }
```

## `min` and `max` functions
Minimum and maximum values of the integer can be specified by calling `min` or
`max` functions of the `Schematik.Integer` instance. They correspond to `minimum`
and `maximum` properties of the JSON schema integer.

These do not have to be called in any particular order.

```js
Schematik.integer().min(10);
// { type: 'integer', required: true, minimum: 10 }

Schematik.integer().max(100);
// { type: 'integer', required: true, maximum: 100 }

Schematik.integer().min(10).max(100);
// { type: 'integer', required: true, minimum: 10, maximum: 100 }
```

## `range` function
This function serves as a shorthand for specifying both minimum and maximum
values at the same time. It is equivalent to `.min(a).max(b)`.

```js
Schematik.integer().in.range(10, 100);
// { type: 'integer', required: true, minimum: 10, maximum: 100 }
```

## `exclusive` modifier
According to JSON schema IETF specification, both minimum and maximum values are
by default inclusive. However, this behavior can be changed by using `exclusive`
modifier before calling `min`, `max` or `range`. This modifier corresponds to
`exclusiveMinimum` and `exclusiveMaximum` properties of the JSON schema integer.

```js
Schematik.integer().with.exclusive.min(10);
// { type: 'integer', required: true, minimum: 10, exclusiveMinimum: true }

Schematik.integer().with.exclusive.max(100);
// { type: 'integer', required: true, maximum: 100, exclusiveMaximum: true }

Schematik.integer().in.exclusive.range(10, 100);
// {
//   type: 'integer',
//   required: true,
//   minimum: 10,
//   maximum: 100,
//   exclusiveMinimum: true,
//   exclusiveMaximum: true
// }
```

`exclusive` modifier only affects functions **after it**, so it is possible to
only make one end of the range exclusive.

```js
Schematik.integer().with.min(10).and.exclusive.max(100);
// {
//   type: 'integer',
//   required: true,
//   minimum: 10,
//   maximum: 100,
//   exclusiveMaximum: true  
// }

```

## `multiple` function
This function allows constraining the integer to multiples of a number. This
function corresponds to the `multipleOf` property of JSON schema integer.

```js
Schematik.integer().multiple(9);
// { type: 'integer', required: true, multipleOf: 9 }
```

For better readability, you may consider using this function together with the
`of` function of `Schematik` class. For example, the following is equivalent to
the example above:

```js
Schematik.integer().that.is.a.multiple.of(9);
// { type: 'integer', required: true, multipleOf: 9 }
```
