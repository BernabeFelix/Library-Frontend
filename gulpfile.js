var clean = require('gulp-clean');
var csso = require('gulp-csso');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var inject = require('gulp-inject');
var sass = require('gulp-sass');

function getInjectOptions() {
  return {
    addRootSlash: false,
    ignorePath: ['src', 'dist']
  };
}

gulp.task('set-dev-node-env', function() {
  return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
  return process.env.NODE_ENV = 'production';
});

gulp.task('cleanDist', function() {
  return gulp.src('dist/', {
      read: false
    })
    .pipe(clean());
});

gulp.task('styles', function() {
  var dest = process.env.NODE_ENV === 'development' ? 'src' : 'dist';

  return gulp.src('src/styles/main.scss')
    .pipe(sass())
    .pipe(csso())
    .pipe(gulp.dest(dest));
});

gulp.task('html', function() {
  var dest = process.env.NODE_ENV === 'development' ? 'src' : 'dist';
  var injectFiles = gulp.src(['dist/main.css']);

  return gulp.src('src/index.html')
    // .pipe(inject(injectFiles, getInjectOptions())) //inject css to html
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      removeCommentsFromCDATA: true
    })) //minify html
    .pipe(gulp.dest(dest));
});

gulp.task('build', ['set-prod-node-env', 'cleanDist', 'styles', 'html']);

gulp.task('default', ['set-dev-node-env', 'styles'], function() {
  gulp.watch('src/styles/*.scss', ['styles']);
});
