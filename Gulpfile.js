// Use these configs to setup the livereload gulp task
var config = require('./config.project.json');

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  ngAnnotate = require('gulp-ng-annotate'),
  ngTemplateCache = require('gulp-angular-templatecache');

gulp.task('angular-templates', function(){
  // Create template cache
  return gulp.src(config.angularSource+'/**.html')
    .pipe(ngTemplateCache(
      config.angularAppName+'.templates.js',
      {
        module: config.angularAppName,
        root: config.angularAppName+"/templates/",
        standAlone: false
      }
    ))
    .pipe(gulp.dest(config.angularSource));
});

gulp.task('angular', ['angular-templates'], function(){
  // Concat and minify js
  return gulp.src([
      config.angularSource+'/'+config.angularAppName+'.js',
      config.angularSource+'/'+config.angularAppName+'.**.js'
    ])
    .pipe(concat(config.angularAppName +'.js'))
    .pipe(gulp.dest(config.angularTarget))
    .pipe(rename({suffix: '.min'}))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(config.angularTarget));
});

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
  gulp.watch('./'+config.angularSource+'/**.js', ['angular']);
  gulp.watch('./**.html', notifyLiveReload);
  gulp.watch('./'+config.cssTarget+'/**.css', notifyLiveReload);
  gulp.watch('./'+config.angularTarget+'/**.js', notifyLiveReload);
});

gulp.task('default', ['styles', 'angular', 'express', 'livereload', 'watch'], function() {
  console.log('Connected to livereload on port %s', config.livereloadPort);
  console.log('Connected to express on port %s', config.port);
});
