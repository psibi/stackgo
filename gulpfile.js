const gulp = require('gulp');
const preprocess = require('gulp-preprocess');
const gulpCopy = require('gulp-copy');

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
