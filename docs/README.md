# Schematik Documentation

## Table of Contents

### [Modifiers](#mod_summary)
 - [`required`](#mod_required)
 - [`optional`](#mod_optional)

### [Functions](#func_summary)
 - [`done`](#func_done)
 - [`of`](#func_of)
 - [`enum`](#func_enum)
 - [`oneOf`](#func_oneOf)
 - [`anyOf`](#func_anyOf)
 - [`allOf`](#func_allOf)

### [Conjunctions](#conj_summary)

### Types
 - [Array](array.md)
 - [Boolean](boolean.md)
 - [Integer](integer.md)
 - [Null](null.md)
 - [Number](number.md)
 - [Object](object.md)
 - [String](string.md)


## <a id="mod_summary"></a> Modifiers
Modifiers are special properties defined on the Schematik objects that return
the Schematik instance iteself while modifying its state. Most common use of
modifiers is to alter the behavior of functions or to change Schematik object
properties.

### <a id="mod_required"></a> `required` modifier
This modifier sets the `required` property of Schematik instance to `true`.
Since it is defined on the `Schematik` class, it can be placed anywhere in the
chain. For example, all of the following are equivalent:

```js
new Schematik.String().required;
Schematik.required.string();
Schematik.string().required;
// { type: 'string', required: true }
```

### <a id="mod_optional"></a> `optional` modifier
This modifier removes the `required` property of Schematik instance.
Since it is defined on the `Schematik` class, it can be placed anywhere in the
chain. For example, all of the following are equivalent:

```js
new Schematik.String().optional;
Schematik.optional.string();
Schematik.string().optional;
// { type: 'string' }
```

## <a id="func_summary"></a> Functions
Functions are subroutines that can be called and supplied with arguments.
All functions defined on `Schematik` instances eventually return the instance
itself, enabling indefinite chaining of function calls.

Meanwhile, all functions defined on `Schematik` instances are also modifiers
that return the instance without altering it. You can use the
[`of` function](#func_of) to call the last function that was used as a modifier.
Note that calling any function clears the last pending function.

### <a id="func_done"></a> `done` function
Schematik objects are a *representation* of JSON schema, but not the equivalent.
When you finish manipulating the Schematik object, call the `done()` function to
get the JSON schema.
```js
Schematik.number().min(10).max(100).done();
// { "type": "number", "minimum": 10, "maximum": 100 }
```

### <a id="func_of"></a> `of` function
This function is a special one, since it allows you to call the last pending
function. For example, when you would normally call `Schematik.String.length`
as a function:
```js
Schematik.string().length(10);
```
You can also use it as a modifier and call it using `of`:
```js
Schematik.string().length.of(10);
```
This behavior works with any function defined on `Schematik` instance.

### <a id="func_enum"></a> `enum` function
This function specifies a list of possible values for any Schematik instance.
It corresponds to the `enum` property of the JSON schema.

It requires at lease one argument. Functions are not supported as arguments.

```js
Schematik.string().enum('a', 'b', 'c');
// { "type": "string", "enum": ["a", "b", "c"] }
```

### <a id="func_oneOf"></a> `oneOf` function
This function creates a new Schematik with `oneOf` constraint, which allows you
to indicate that the schema must match exactly one of the schemas you provide
as arguments. This function corresponds to the `oneOf` property of the JSON
schema. Obviously, you need to provide at least one argument.

*This is a static only function which is not available on Schematik instances.*

```js
Schematik.oneOf(Schematik.string(), { type: 'foo' });
// { "oneOf": [{ "type": "string" }, { "type": "foo" }] }
```

### <a id="func_anyOf"></a> `anyOf` function
This function creates a new Schematik with `anyOf` constraint, which allows you
to indicate that the schema must match at least one of the schemas you provide
as arguments. This function corresponds to the `anyOf` property of the JSON
schema. Obviously, you need to provide at least one argument.

*This is a static only function which is not available on Schematik instances.*

```js
Schematik.anyOf(Schematik.string(), { type: 'foo' });
// { "anyOf": [{ "type": "string" }, { "type": "foo" }] }
```

### <a id="func_allOf"></a> `allOf` function
This function creates a new Schematik with `allOf` constraint, which allows you
to indicate that the schema must match all of the schemas you provide
as arguments. This function corresponds to the `allOf` property of the JSON
schema. Obviously, you need to provide at least one argument.

*This is a static only function which is not available on Schematik instances.*

```js
Schematik.allOf(Schematik.string(), { type: 'foo' });
// { "allOf": [{ "type": "string" }, { "type": "foo" }] }
```

## <a id="conj_summary"></a> Conjunctions
Taking inspiration from Chai, Schematik provides a lot of conjunctions whose
only purpose is to increase human-friendliness of your JSON schemas.

Conjunctions are essentially modifiers that do not change the state of the
instance.

Schematik has a number of chaining modifiers that are there to make code more
human-friendly and do not provide any functionality. Those are:
 - to
 - be
 - been
 - is
 - that
 - which
 - and
 - has
 - have
 - with
 - at
 - same
 - in
 - a
 - an
 - the

```js
// Readable chaining
Schematik.number().that.is.in.range.of(10, 100).and.is.a.multiple.of(9);
// {
//   type: 'number',
//   required: true,
//   minimum: 10,
//   maximum: 100,
//   multipleOf: 9
// }

Schematik.optional.string().that.has.the.max.length.of(100).and.matches(/[0-9]+/);
// {
//   type: 'string',
//   maxLength: 100,
//   pattern: '[0-9]+'
// }
```
