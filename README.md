# Schematik !

[![Circle CI](https://circleci.com/gh/jluchiji/schematik/tree/master.svg?style=svg)](https://circleci.com/gh/jluchiji/schematik/tree/master)

Write human-friendly JSON schema!
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
```
Schematik.number().exclusive.range(-180, 180).multiple(45);
```

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
First, install [mocha](http://mochajs.org/) and project dependencies.
```
$ npm install -g mocha
$ npm install
```

Then, you can run the test suit like this:
```
$ mocha
```

If you wish to generate a coverage report:
```
$ mocha -R html-cov > coverage.html
```

## License
[MIT](http://opensource.org/licenses/MIT)
