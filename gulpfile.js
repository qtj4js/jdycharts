const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const rimraf = require('rimraf');
const babel = require('gulp-babel');
const merge2 = require('merge2');

gulp.task('clear-dir', function(cb) {
	rimraf('lib', function () {
		rimraf('es', function () {
			cb();
		});
	});
});

gulp.task("tsc", function () {
  const tsResult =  gulp.src([
    'src/**/*.ts',
    'src/**/*.tsx',
    'typings/*.d.ts'
  ]).pipe(tsProject());
  const tsd = tsResult.dts.pipe(gulp.dest('lib'));
  const js = tsResult.js.pipe(gulp.dest('es'));
  return merge2([tsd, js]);
});

gulp.task('js', function() {
  return gulp.src([
    'src/**/*.js',
    'src/**/*.jsx'
  ]).pipe(gulp.dest('es'));
});

gulp.task('babel', function() {
  return gulp.src('es/**/*').pipe(babel()).pipe(gulp.dest('lib'));
});

gulp.task('less', function() {
  return gulp.src(['src/**/*.less', 'src/**/*.woff', 'src/**/*.ttf', 'src/**/*.gif']).pipe(gulp.dest('lib')).pipe(gulp.dest('es'));
});

gulp.task('compile:min', gulp.series('clear-dir', 'tsc', 'js', 'babel', 'less'));