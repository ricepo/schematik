# Schematik
The proof-of-concept human-friendly JSON schema generator. Heavily inspired by
[Chai](http://chaijs.com/), [Squel.js](https://hiddentao.github.io/squel/)
and [lodash](https://lodash.com/).

The goal of the project is not to implement every bit and quirk or the IETF
specification, but to provide a bit more readable syntax for writing JSON
schemas.

## Example
Instead of writing this:
```json
{
  "type": "number",
  "required": true,
  "minimum": -180,
  "maximum": 180,
  "exclusiveMinimum": true,
  "exclusiveMaximum": true,
  "multipleOf": 45
}
```
write this:
```js
Schematik.number().in.exclusive.range.of(-180, 180).that.is.a.multiple.of(45)
```

## Documentation

### Required / Optional
By default, all Schematik objects have the `required` flag turned on. At this
moment, you have to use the `optional` modifier to explicitly specify schema
as optional.
```js
Schematik.optional.string();
new Schematik.String().optional;
```
There is also a `required` modifier to do the opposite.

*In examples below, `required` field will be omitted when not essential.*

### Generating Schema
Schematik objects are a *representation* of JSON schema, but not the equivalent.
When you finish manipulating the Schematik object, call the `done()` function to
get the JSON schema.
```js
Schematik.number().min(10).max(100).done();
// { "type": "number", "minimum": 10, "maximum": 100 }
```

### Chaining
Schematik is heavily inspired by Chai, and attempts to provide a similar chaining
syntax for creating JSON schemas. An example of such chaining can be seen in the
example section above.

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

```js
// Readable chaining
Schematik.number().that.is.in.range.of(10, 100).and.is.a.multiple.of(9);
```

One special chaining property is `of`, which has two different behaviors.
```js
// 1) 'normal' behavior: same as all the other chaining modifiers
Schematik.number().of.max(10);
// { "type": "number", "maximum": 10 }

// 2) 'chaining' behavior: if called after a function that is used like a
// modifier, 'of()' will call the last chained function and forward arguments.
// For example, the max() below should be a function, but was used as a modifier.
Schematik.number().with.max.of(10);
// The line above is equivalent to the following
Schematik.number().max(10);
/// { "type": "number", "maximum": 10 }
```

### Types
#### Array
*Work in progress*

#### Boolean
Creating a schema with `boolean` type:
```js
// 1) Object-oriented way
new Schematik.Boolean();
// 2) Functional way
Schematik.boolean();
// Both generate { "type": "boolean" }
```

All modifiers work as expected:
```js
Schematik.optional.boolean();
new Schematik.Boolean().required;
//
```

#### Integer / Number
```js
// You can create schemas with types of integer or number like this
// 1) Object-oriented way
new Schematik.Number();
new Schematik.Integer();
// 2) Functional way
Schematik.number();
Schematik.integer();

// Modifiers work as expected
Schematik.optional.number();
new Schematik.Integer().required;

// You can specify minimum and maximum values
Schematik.number().min(10).max(100);

// Min/max after an 'exclusive' modifier will be made exclusive
Schematik.number().min(10).exclusive.max(100);
// {
//   "required": true,
//   "minimum": 10,
//   "maximum": 100,
//   "exclusiveMaximum": true
// }

// There is a shorthand for specifying both
Schematik.number().range(10, 100);

// Which is also affected by 'exclusive' modifier
Schematik.number().exclusive.range(10, 100);
// {
//   "required": true,
//   "minimum": 10,
//   "exclusiveMinimum": true,
//   "maximum": 100,
//   "exclusiveMaximum": true
// }

// You can also limit the number to multiples of a value like this
Schematik.number().multiple.of(10);
// {
//   "required": true,
//   "multipleOf": 10
// }

```

#### Null
```js
// Creating a { type: 'null' } schema
// 1) Object-oriented way
new Schematik.Null();
// 2) Functional way
Schematik.null();

// Modifiers work as expected
Schematik.required.null();
// { "type": "null", "required": true }
```

#### Object
*Work in progress*

#### String
```js
// Creating a { type: 'string' } schema
// 1) Object-oriented way
new Schematik.String();
// 2) Functional way
Schematik.string();

// Modifiers work as expected
Schematik.required.string();
// { "type": "string", "required": true }

// You can specify minimum length like this
Schematik.string().with.min.length(10);
// { "type": "string", "minLength": 10 }

// You can also specify maximum length like this
Schematik.string().with.max.length(100);
// { "type": "string", "maxLength": 100 }

// Another way is to specify them at the same time
Schematik.string().with.length(10, 100);
// { "type": "string", "minLength": 10, "maxLength": 100 }

// If your minimum and maximum lengths are the same, only supply one argument
Schematik.string().with.length(10);
// { "type": "string", "minLength": 10, "maxLength": 10 }


// You also match patterns using the matches() function
// Just like in JSON schema, you need to anchor the pattern yourself.
Schematik.string().that.matches(/^\d+$/);
// { "type": "string", "pattern": "^\d+$" }

```
