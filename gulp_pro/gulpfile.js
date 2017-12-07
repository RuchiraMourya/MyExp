
// Gulp.js configuration
// https://www.sitepoint.com/introduction-gulp-js/
var
  // modules
  gulp = require('gulp'),
  // clean html remove all whitespace etc
  htmlclean = require('gulp-htmlclean'),
  newer = require('gulp-newer'),
  // folders
  folder = {
    src: 'src/',
    build: 'build/'
  }
;


// HTML processing
gulp.task('html', function() {
  var
    out = folder.build + 'html/',
    page = gulp.src(folder.src + 'html/**/*')
      .pipe(newer(out));

    page = page.pipe(htmlclean());
    // Use gulp html commond

  return page.pipe(gulp.dest(out));
});

gulp.task( 'default', [ 'html' ] );
// run all tasks
//gulp.task('run', ['html', 'css', 'js']);
//Use gulp run to run html, css and js task
//Use gulp sometask anothertask to run bunch of task
// gulp.task('default', ['run',  'watch']);
// use gulp to run default task
