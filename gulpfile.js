// -------------------------------------------------------------------------- //
//                                                                            //
// Transpiling ES6 to ES5.                                                    //
//                                                                            //
// -------------------------------------------------------------------------- //
var gulp       = require('gulp');
var jscs       = require('gulp-jscs');
var babel      = require('gulp-babel');
var jshint     = require('gulp-jshint');
var stylish    = require('gulp-jscs-stylish');
var sourcemaps = require('gulp-sourcemaps');

var mocha      = require('gulp-mocha');
var istanbul   = require('gulp-istanbul');

gulp.task('default', ['build']);

gulp.task('build', function() {

  gulp.src(['src/**/*.js'], { base: 'src' })
    .pipe(sourcemaps.init())
    .pipe(babel({
      auxiliaryCommentBefore: 'istanbul ignore next'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('lib'));

});

gulp.task('lint', function() {

  gulp.src(['src/**/*.js'], { base: 'src' })
    .pipe(jshint())
    .pipe(jscs())
    .on('error', function() { })
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));

});

gulp.task('test', ['lint', 'build'], function() {

  return gulp.src(['test/index.js'], { read: false })
    .pipe(mocha({ reporter: 'spec' }));

});

gulp.task('cover', ['lint', 'build'], function(done) {

  gulp.src(['lib/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      gulp.src(['test/index.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports({
          dir: 'coverage',
          reportOpts: { dir: 'coverage' },
          reporters: ['text', 'text-summary', 'json', 'html']
        }))
        .on('end', done);
    });
});

gulp.task('watch', function() {

  gulp.watch(['src/**/*.js'], ['build']);

});
