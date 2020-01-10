var gulp = require('gulp');
var panini = require('panini');
var browserSync = require('browser-sync').create();

var reload = browserSync.reload;
var folder = {
  src: 'src/',
  build: 'build/'
};

gulp.task('css', () => {
  // build css
});

gulp.task('html', function() {
  return gulp.src(folder.src + 'pages/**/*.html')
    .pipe(panini({
      root: folder.src + 'pages/',
      layouts: folder.src + 'layouts/',
      partials: folder.src + 'partials/',
      helpers: folder.src + 'helpers/',
      data: folder.src + 'data/'
    }))
    .pipe(gulp.dest(folder.build));
});

gulp.task('refresh', (done) => {
  panini.refresh();
  done();
});

gulp.task('serve', gulp.series('html', function() { 
  browserSync.init({
      server: './' + folder.build,
      port: 3000
  });
  gulp.watch(
    ['./src/{pages,layouts,partials,helpers,data}/**/*.html'], 
    gulp.series('refresh', 'html', reload)
  );
}));