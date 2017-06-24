const gulp = require('gulp');
const preprocess = require('gulp-preprocess');
const gulpCopy = require('gulp-copy');

const sourceFiles = ['manifest.json', 'stackage.js', 'icons/*', 'settings/*']

gulp.task('chrome', function() {
  gulp.src(sourceFiles)
      .pipe(gulpCopy('./chrome/'))
  
  gulp.src('./chrome/stackage.js')
      .pipe(preprocess({context: {BROWSER_ENV: 'CHROME'}}))
      .pipe(gulp.dest('./chrome/'))
});
