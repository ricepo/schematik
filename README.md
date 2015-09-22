# Schematik

[![Circle CI](https://circleci.com/gh/jluchiji/schematik/tree/master.svg?style=svg)](https://circleci.com/gh/jluchiji/schematik/tree/master)
[![Code Climate](https://codeclimate.com/github/jluchiji/schematik/badges/gpa.svg)](https://codeclimate.com/github/jluchiji/schematik)
[![Test Coverage](https://codeclimate.com/github/jluchiji/schematik/badges/coverage.svg)](https://codeclimate.com/github/jluchiji/schematik/coverage)

Modular and human-friendly JSON schema.

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
Schematik.number().in.exclusive.range.of(-180, 180).that.is.a.multiple.of(45);
```
or this, if you don't want to spare any keystrokes:
```js
Schematik.number().exclusive.range(-180, 180).multiple(45);
```

Schematik objects are guaranteed to be immutable, therefore you can reuse them
without worrying about accidental changes. For example:
```js
const number = Schematik.number().in.range.of(10, 100);

const object = Schematik.object.with.property('foo', number.optional);
```
The number included in the `object` becomes optional, while the original `number`
remains required.

Heavily inspired by
[Chai](http://chaijs.com/),
[Squel.js](https://hiddentao.github.io/squel/) and
[lodash](https://lodash.com/).

## Getting Started
```
$ npm install schematik
```

After that:
```js
Schematik = require('schematik');

var schema = Schematik.string().that.matches(/\d+/).done();
// { type: 'string', required: true, pattern: '\d+' }
```

Have fun!

## Documentation
Please follow [this link](docs/README.md).

## Testing
```
$ npm run test
```

## Changes
### 1.0.0
 - Initial Release

### 1.1.0
 - Various Bugfixes

### 2.0.0
 - Complete rewrite to ensure immutability.
 - `Array.of()` renamed to `Array.items()`

## License
[MIT](http://opensource.org/licenses/MIT)
