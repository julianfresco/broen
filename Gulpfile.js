// Use these configs to setup the livereload gulp task
var config = require('./config.project.json');

var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  rename = require('gulp-rename');

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({ port: config.livereloadPort }));
  app.use(express.static(__dirname));
  config.port = config.port || 4000;
  app.listen(config.port, '0.0.0.0');
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
    tinylr.listen(config.livereloadPort);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('styles', function() {
  return sass(config.scssSource, { style: 'expanded' })
    .pipe(gulp.dest(config.cssTarget))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(config.cssTarget));
});

gulp.task('watch', function() {
  gulp.watch('./'+config.scssSource+'/**.scss', ['styles']);
  gulp.watch('./**.html', notifyLiveReload);
  gulp.watch('./'+config.cssTarget+'/**.css', notifyLiveReload);
});

gulp.task('default', ['styles', 'express', 'livereload', 'watch'], function() {
  console.log('Connected to livereload on port %s', config.livereloadPort);
  console.log('Connected to express on port %s', config.port);
});
