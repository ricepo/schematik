/**
 * gulpfile.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */
const gulp         = require('gulp');

const fs           = require('fs');
const del          = require('del');
const babel        = require('gulp-babel');
const mocha        = require('gulp-mocha');
const eslint       = require('gulp-eslint');
const notify       = require('gulp-notify');
const changed      = require('gulp-changed');
const istanbul     = require('gulp-istanbul');
const sourcemaps   = require('gulp-sourcemaps');

/*!
* Load plugin configuration files.
*/
const eslintrc     = JSON.parse(fs.readFileSync('.eslintrc', 'utf8'));
const babelrc      = JSON.parse(fs.readFileSync('.babelrc',  'utf8'));


/*!
 * Default build target.
 */
gulp.task('default', [ 'test' ]);


/*!
 * Delete previous builds.
 */
gulp.task('clean', function() {
  return del([ 'lib/**' ]);
});


/*!
 * Incremental build (use with watch).
 */
const build = function() {

  return gulp.src(['src/**/*.js'], { base: 'src' })
    .pipe(changed('lib'))
    .pipe(sourcemaps.init())
    .pipe(babel(babelrc))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('lib'))
    .pipe(notify({ message: 'Build Successful', onLast: true }));

};
gulp.task('build', ['lint'], build);
gulp.task('rebuild', [ 'relint' ], build);


/*!
 * Lint all source files.
 */
const lint = function() {

  return gulp.src(['src/**/*.js'])
    .pipe(changed('lib'))
    .pipe(eslint(eslintrc))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

};
gulp.task('lint', lint);
gulp.task('relint', ['clean'], lint);


/*!
 * Run the test suit.
 */
gulp.task('test', ['build'], function() {

  gulp.src([ 'test/index.spec.js' ], { read: false })
  .pipe(mocha({ reporter: 'spec' }));

});


/*!
 * Test coverage.
 */
gulp.task('coverage', ['build'], function(done) {

  gulp.src(['lib/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      gulp.src(['test/index.spec.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports({
          dir: 'coverage',
          reportOpts: { dir: 'coverage' },
          reporters: ['text-summary', 'html', 'lcov']
        }))
        .on('end', done);
    });

});


/*!
 * Automatically rebuild on save.
 */
gulp.task('watch', ['rebuild'], function() {
  gulp.watch('src/**/*.js', ['build']);
});
