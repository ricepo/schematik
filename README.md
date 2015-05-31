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
Please follow [this link](docs/index.md).

## Tests
In order to run the test suit, you need to install [mocha](http://mochajs.org/):
```
$ npm install -g mocha
```

Then, you would need to install all dependencies of this project:
```
$ npm install
```

Finally, run the test suit:
```
$ mocha
```

If you wish to generate a coverage report:
```
$ mocha -R html-cov > coverage.html
```
