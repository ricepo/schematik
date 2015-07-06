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

gulp.task('default', ['build']);

gulp.task('build', function() {

  gulp.src(['src/**/*.js'], { base: 'src' })
    .pipe(sourcemaps.init())
    .pipe(babel())
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

  // TODO Add after 1.2 is ready

});

gulp.task('watch', function() {

  gulp.watch(['src/**/*.js'], ['build']);

});
