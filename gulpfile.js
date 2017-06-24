const gulp = require('gulp');
const preprocess = require('gulp-preprocess');
const gulpCopy = require('gulp-copy');
const zip = require('gulp-zip');

const sourceFiles = ['manifest.json', 'icons/*', 'settings/options.html']

gulp.task('chrome', function() {
  gulp.src(sourceFiles)
      .pipe(gulpCopy('./chrome/'))

  gulp.src(['./stackage.js'])
      .pipe(preprocess({context: {BROWSER_ENV: 'CHROME'}}))
      .pipe(gulp.dest('./chrome/'))

  gulp.src(['./settings/options.js'])
      .pipe(preprocess({context: {BROWSER_ENV: 'CHROME'}}))
      .pipe(gulp.dest('./chrome/settings/'))
});

gulp.task('firefox', function() {
  gulp.src(sourceFiles)
      .pipe(gulpCopy('./firefox/'))

  gulp.src(['./stackage.js'])
      .pipe(preprocess({context: {BROWSER_ENV: 'FIREFOX'}}))
      .pipe(gulp.dest('./firefox/'))

  gulp.src(['./settings/options.js'])
      .pipe(preprocess({context: {BROWSER_ENV: 'FIREFOX'}}))
      .pipe(gulp.dest('./firefox/settings/'))
  
  gulp.src('firefox/*')
      .pipe(zip('firefox.zip'))
      .pipe(gulp.dest('dist'))
});
