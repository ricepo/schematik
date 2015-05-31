# Schematik.Array
`Schematik.Array` class implements schema generation for the `array` type
defined in the IETF specification draft.

## Constructor
There are two ways to create a `Schematik.Array` object.

```js
// 1) Object-oriented way
var schema = new Schematik.Array();

// 2) Functional way
var schema = Schematik.array();
```

If you need to add special properties to the resulting schema that are not
supported by Schematik, you can pass in an object to the constructor.

```js
new Schematik.Array({ foo: 'bar' });
// { type: 'array', required: true, foo: 'bar' }
```

## `unique` modifier
`uniqueItems` constraint indicates that the array must contain unique elements,
and can be enabled using the `unique` modifier. The `unique` modifier is fully
chainable, and therefore can be placed anywhere within the function chain.


```js
// Following are all equivalent
new Schematik.Array().unique;
Schematik.array().unqiue;
Schematik.unique.array();
// { type: 'array', required: true, uniqueItems: true }
```

## `of` function
`Schematik.Array` overwrites the default implementation of the `of` function.
If there is a pending function in the chain, the `of` function behaves in
exactly the same way as the default implementation, calling the last pending
function and forwarding arguments.

However, when called without a pending function, arguments of the `of` function
specify schemas for array elements. The arguments of the `of` function
correspond to the `items` field of the JSON schema array.

There may be one or more arguments, each of which can be a Schematik instance,
a JSON schema object or an array of those.

```js
Schematik.array().of(Schematik.string());
// { type: 'array', required: true, items: { type: 'string' } }

Schematik.array().of(Schematik.string(), { type: 'number' });
// {
//   type: 'array',
//   required: true,
//   items: [
//     { type: 'string' },
//     { type: 'number' }
//   ]
// }

Schematik.array().of(Schematik.string(), [ Schematik.number() ]);
// {
//   type: 'array',
//   required: true,
//   items: [
//     { type: 'string' },
//     { type: 'number' }
//   ]
// }
```

## `more` function
Calling the `more` function in the chain specifies that the array may contain
additional items. This function corresponds to the `additionalItems` property
of the JSON schema array.

This function accepts one argument, which must be either a boolean, a Schematik
instance or a JSON schema object. If no argument is provided, it defaults to
`true`.

```js
Schematik.array().of(Schematik.string()).and.more();
// {
//   type: 'array',
//   required: true,
//   items: { type: 'string' },
//   additionalItems: true
// }

Schematik.array().of(Schematik.string()).and.more(Schematik.number());
// {
//   type: 'array',
//   required: true,
//   items: { type: 'string' },
//   additionalItems: { type: 'number' }
// }
```

## `length` function
Using the `length` function it is possible to specify minimum and maximum item
count of the array. This function corresponds to both `minItems` and `maxItems`
properties of the JSON schema array, depending on the way it is used.

There is a total of 4 ways this function may be used.

  1. When modified by `min` modifier, it sets the `minItems` property.
```js
Schematik.array().of(Schematik.string()).with.min.length(10);
// {
//   type: 'array',
//   required: true,
//   items: { type: 'string' },
//   minItems: 10
// }
```
  2. When modified by `max` modifier, it sets the `maxItems` property.
```js
Schematik.array().of(Schematik.string()).with.max.length(10);
// {
//   type: 'array',
//   required: true,
//   items: { type: 'string' },
//   maxItems: 10
// }
```
  3. When supplied with two arguments, it sets the range for item count.
```js
Schematik.array().of(Schematik.string()).with.length(10, 100);
// {
//   type: 'array',
//   required: true,
//   items: { type: 'string' },
//   minItems: 10,
//   maxItems: 100
// }
```
  4. When supplied with one argument, it sets both minimum and maximum item
  to the value provided.
```js
Schematik.array().of(Schematik.string()).with.length(10);
// {
//   type: 'array',
//   required: true,
//   items: { type: 'string' },
//   minItems: 10,
//   maxItems: 10
// }
```
