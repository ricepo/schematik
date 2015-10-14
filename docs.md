# Getting Started

**Schematik.js** is a library for writing modular and readable JSON schemas.

```
$ npm install schematik
```

It is heavily inspired by [Chai.js](http://chaijs.com/)，therefore the way it
works may look very familiar.

```js
const Schematik = require('schematik');
Schematik.number().in.range.of(10, 100);
```

# Basics

## Types
Schematik is a generator for JSON Schema as specified by the IETF specification
Draft. As per the draft, Schematik supports the following types:

 + `array`
 + `boolean`
 + `integer`
 + `number`
 + `null`
 + `object`
 + `string`

## Modifiers
Modifiers are properties that return an altered version of the Schematik it was
called on. For example, the `optional` modifier makes a Schematik optional, so
that if it is used as an object's property, it can be omitted.

```
new Schematik.Number().optional
```

Schematik instances are guaranteed to be immutable. What that means is applying
modifiers and calling functions will return a new instance, while leaving the
original instance unchanged. For example, in the following code, `number` will
always remain required even though `schema` is an optional version of it.

```js
const number = new Schematik.Number();
const schema = number.optional;
```

## Conjunctions
The `Schematik` class has a series of modifiers that return the instance itself
without any modifications, so that you can improve the readability of your code.
We call these *conjunctions*.

```js
new Schematik.Number().in.range.of(-180, 180).that.is.a.multiple.of(45);
```

The full list of conjunctions is the following:

 + `to`
 + `be`
 + `been`
 + `is`
 + `that`
 + `which`
 + `and`
 + `has`
 + `have`
 + `with`
 + `at`
 + `same`
 + `in`
 + `a`
 + `an`
 + `the`

## Instantiation
For every builtin type, there are two equivalent ways to instantiate them. You
can either directly create a class instance using the `new` operator, or use
the corresponding shorthand function.

```js
new Schematik.Number();
Schematik.number();
```

It is worth noting that shorthand versions will detect any modifiers used before
them.

```js
Schematik.optional.array();
```

# Core
In this section, we will outline some frequently used modifiers and functions
in schematik.

## `required`
Using the `required` modifier marks the Schematik as required, which automatically
adds it into the `required` field if this Schematik is used as an object property.

By default, all Schematik instances are required, unless the `optional` modifier
was used.
```js
const str = Schematik.required.string();

new Schematik.Object().property('foo', str);
```
```json
{
  "type": "object",
  "properties": {
    "foo": { "type": "string" }
  },
  "required": [ "foo" ]
}
```

## `optional`
The `optional` modifier is the opposite of the `required` modifier: if an optional
Schematik is used as an object property, the `optional` flag prevents it from being
added into the `required` field.
```js
const str = Schematik.optional.string();

new Schematik.Object().property('foo', str);
```
```json
{
  "type": "object",
  "properties": {
    "foo": { "type": "string" }
  },
  "required": [ ]
}
```


## `not`
Aliases: `no`

If the next called function supports this modifier, it will have the opposite
effect.

```js
new Schematik.Object().no.additional.properties();
```
```json
{
  "type": "object",
  "additionalProperties": false
}
```

## `minimum`
Aliases: `min`

Modifies the next called function to be the lower limit of a value.

```js
new Schematik.String().min.length(0);
```
```json
{
  "type": "string",
  "minLength": 0
}
```

## `maximum`
Aliases: `max`

Modifies the next called function to be the upper limit of a value.

```js
new Schematik.String().max.length(10);
```
```json
{
  "type": "string",
  "maxLength": 10
}
```

## `of()`
Calls the last uncalled function.

A function is *uncalled* when it is used as a modifier, like in this case `length()`
is uncalled.

```js
new Schematik.String().length;
```

`of()` forwards all arguments to the last uncalled function.

```js
new Schematik.String().min.length.of(20);
```
```json
{
  "type": "string",
  "minLength": 20
}
```

## `enum()`
Specifies a list of valid values for a Schematik. More specifically, its arguments
will be set to the `enum` property of the resulting JSON schema.

```js
new Schematik.String().enum('foo', 'bar');
```
```json
{
  "type": "string",
  "enum": [ "foo", "bar" ]
}
```


# Number

# Integer

# String

# Array
`Schematik.Array` class implements JSON schema generation for the `array` type.

```js
new Schematik.Array();
Schematik.array();
```

## `unique`
By applying the `unique` modifier, you can constraint the array to only
containing unique elements.

```js
new Schematik.Array().unique;
Schematik.array().unique;
```
```json
{
  "type": "array",
  "uniqueItems": true
}
```

## `items`
This function specifies what items are allowed in the array. It accepts multiple
arguments, which can be either Schematik instances or plain JSON schema objects.
For precise semantics of this function, please refer to the JSON schema
specification's section on array items.

```js
new Schematik.Array().items(Schematik.string(), Schematik.number());
```
```json
{
  "type": "array",
  "items": [
    { "type": "string" },
    { "type": "number" }
  ]
}
```

## `additional`
The `additional` modifiers, when used along with `items`, specifies constraints
on an array's additional items. When modified by `additional`, `items` accepts
one argument, which must be a boolean, a Schematik or a plain JSON schema object.

```js
new Schematik.Array().additional.items(false);
```
```json
{
  "type": "array",
  "additionalItems": false
}
```

You can also use the `no` modifier to do exactly the same thing:

```js
new Schematik.Array().no.additional.items();
```

## `length`
The `length` function specifies constraints on an array's length. It can be used
along with `min` and `max` modifiers.

```js
new Schematik.Array().min.length(10);
```
```json
{
  "type": "array",
  "minItems": 10
}
```

When used without modifiers and supplied with two arguments, the function sets
both minimum and maximum length respectively.

```js
new Schematik.Array().length(10, 100);
```
```json
{
  "type": "array",
  "minItems": 10,
  "maxItems": 100
}
```

When used without modifiers and supplied with one argument, the function sets
both minimum and maximum length to that value.

```js
new Schematik.Array().length(10);
```
```json
{
  "type": "array",
  "minItems": 10,
  "maxItems": 10
}
```

# Object

# Boolean
`Schematik.Boolean` class implements JSON schema generation for the `boolean` type.

```js
new Schematik.Boolean();
Schematik.boolean();
```

There are no other builtin methods or modifiers unique to the `Schematik.Boolean`
class.

# Null
`Schematik.Null` class implements JSON schema generation for the `null` type.

```js
new Schematik.Null();
Schematik.null();
```

There are no other builtin methods or modifiers unique to the `Schematik.Null`
class.
