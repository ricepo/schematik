# Schematik.Object
`Schematik.Object` class implements schema generation for the `object` type
defined in the IETF specification draft.

## Constructor
There are two ways to create a `Schematik.Object` object.

```js
// 1) Object-oriented way
var schema = new Schematik.Object();

// 2) Functional way
var schema = Schematik.object();
```

If you need to add special properties to the resulting schema that are not
supported by Schematik, you can pass in an object to the constructor.

```js
new Schematik.Object({ foo: 'bar' });
// { type: 'object', required: true, foo: 'bar' }
```

## `count` function
This function allows specifying the minimum and maximum number of properties
in the object, which corresponds to `minProperties` and `maxProperties`
properties of the JSON schema object.

Similar to [`Schematik.Array.length` function](array.md), there is a total of
4 ways this function can be used.

  - When modified by `min` modifier, it sets the `minProperties` property.
```js
Schematik.object().with.min.count(10);
// {
//   type: 'object',
//   required: true,
//   minProperties: 10
// }
```
  - When modified by `max` modifier, it sets the `maxProperties` property.
```js
Schematik.object().with.max.count(10);
// {
//   type: 'object',
//   required: true,
//   maxProperties: 10
// }
```
  - When supplied with two arguments, it sets the range for item count.
```js
Schematik.object().with.count(10, 100);
// {
//   type: 'object',
//   required: true,
//   minProperties: 10,
//   maxProperties: 100
// }
```
  - When supplied with one argument, it sets both minimum and maximum item
  to the value provided.
```js
Schematik.object().with.count(10);
// {
//   type: 'object',
//   required: true,
//   minProperties: 10,
//   maxProperties: 10
// }
```

For better readability, you may want to use this function in conjunction with
a few of chaining conjunctions and the `of` function of `Schematik` class:
```js
Schematik.object().with.max.property.count.of(10);
// {
//   type: 'object',
//   required: true,
//   maxProperties: 10
// }
```

## `property` function
This function adds a property to the object schema. Its behavior depends on
what modifiers are present before it is called.

### When called with no modifiers
When called with no modifiers, this function adds a property to the `properties`
property of the JSON schema object.

In this case, the function accepts two arguments, first of which must be a
string representing the property name, and the second of which can be either a
Schematik instance or a JSON schema object.

```js
Schematik.object().with.property('test', Schematik.string());
// {
//   type: 'object',
//   required: true,
//   properties: {
//     test: {
//       type: 'string',
//       required: true
//     }
//   }
// }
```

If so desired, multiple `property` calls can be chained together to add multiple
properties. Please note, however, that attempting overwrite a property that is
already defined in schema will result in error.

```js
Schematik.object().with
  .property('test', Schematik.string())
  .property('foo',  { type: 'bar' });
// {
//   type: 'object',
//   required: true,
//   properties: {
//     test: {
//       type: 'string',
//       required: true
//     },
//     foo: {
//       type: 'bar',
//       required" true
//     }
//   }
// }
```

### When called with `pattern` modifier
When called with `pattern` modifier preceding it, this function adds a property
to the `patternProperties` property of the JSON schema object.

In this case, the function accepts two arguments, first of which must be a
RegExp instance, and the second of which can be either a Schematik instance or a
JSON schema object.

```js
Schematik.object().with.property(/[0-9]+/, Schematik.string());
// {
//   type: 'object',
//   required: true,
//   patternProperties: {
//     "[0-9]+": {
//       type: 'string',
//       required: true
//     }
//   }
// }
```

If so desired, multiple `property` calls can be chained together to add multiple
properties. Please note, however, that attempting overwrite a property that is
already defined in schema will result in error.

The `pattern` modifier must be used for each `property` call, otherwise calls to
this function that do not have a `pattern` modifier before it will add the
property to `properties` instead of `patternProperties`.

```js
Schematik.object().with
  .pattern.property(/[0-9]+/, Schematik.string())
  .pattern.property(/[A-Z]+/,  { type: 'bar' });
// {
//   type: 'object',
//   required: true,
//   patternProperties: {
//     "[0-9]+": {
//       type: 'string',
//       required: true
//     },
//     "[A-Z]+": {
//       type: 'bar',
//       required" true
//     }
//   }
// }
```

### When called with `additional` modifier
When called with `additional` modifier, this function specifies the behavior
regarding additional properties by setting the `additionalProperties` property
of the JSON schema object.

In this case, this function accepts one argument, which must be either a boolean,
a Schematik instance or a JSON schema object.

```js
Schematik.object().with.additional.property(true);
// {
//   type: 'object',
//   required: true,
//   additionalProperties: true
// }

Schematik.object().with.additional.property(Schematik.string());
// {
//   type: 'object',
//   required: true,
//   additionalProperties: {
//     type: 'string'
//   }
// }

Schematik.object().with.additional.property({ type: 'foo' });
// {
//   type: 'object',
//   required: true,
//   additionalProperties: {
//     type: 'foo'
//   }
// }
```

In case if no arguments are provided, this function will look for the presence
of a `no` modifier and set the value depending on that.

```js
Schematik.object().with.additional.property();
// {
//   type: 'object',
//   required: true,
//   additionalProperties: true
// }

Schematik.object().with.no.additional.property();
// {
//   type: 'object',
//   required: true,
//   additionalProperties: false
// }
```

For better readability, consider using `properties` function instead:
```js
Schematik.object().with.no.additional.properties();
// {
//   type: 'object',
//   required: true,
//   additionalProperties: false
// }
```

## `properties` function
This function is a shorthand for chaining multiple calls to the `property`
function. This function is affected by `additional` and `pattern` modifiers
in the same way the `property` function is affected.

### When called with no modifiers
When called without modifiers, this function adds multiple properties to the
`properties` property of the JSON schema object.

In this case the function accepts one argument, which is a map of property names
to their schemas, which can be either Schematik instances or JSON schema objects.

```js
Schematik.object().with.properties({
  test: Schematik.string(),
  foo:  { type: 'bar' }
});
// {
//   type: 'object',
//   required: true,
//   properties: {
//     test: {
//       type: 'string',
//       required: true
//     },
//     foo: {
//       type: 'bar',
//       required" true
//     }
//   }
// }
```

### When called with `pattern` modifier
When called with the `pattern` modifier, this function adds multiple properties
into the `patternProperties` property of the JSON schema object.

In this case the function accepts one argument, which is a map of property name
patterns to their schemas, which can be either Schematik instances or JSON
schema objects.

```js
Schematik.object().with.pattern.properties({
  "[0-9]+": Schematik.string(),
  "[A-Z]+": { type: 'bar' }
});
// {
//   type: 'object',
//   required: true,
//   patternProperties: {
//     "[0-9]+": {
//       type: 'string',
//       required: true
//     },
//     "[A-Z]+": {
//       type: 'bar',
//       required" true
//     }
//   }
// }
```

### When called with `additional` modifier
When called with `additional` modifier, this function behaves similarly to the
`property` function, except that it does not support any arguments.

Whether this function will set `additionalProperties` to `true` or `false`
depends on whether a `no` modifier is present before this function call.

```js
Schematik.object().with.additional.properties();
// {
//   type: 'object',
//   required: true,
//   additionalProperties: true
// }

Schematik.object().with.no.additional.properties();
// {
//   type: 'object',
//   required: true,
//   additionalProperties: false
// }
```
