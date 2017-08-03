var gulp = require('gulp');
var uglify = require('gulp-uglify');
var del = require('del');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var stripDebug = require('gulp-strip-debug');
var cssmin = require('gulp-cssmin');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');

var paths = {
  js: [
    'bower_components/angular/angular.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/howler.js/dist/howler.min.js',
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/office-ui-fabric/dist/js/jquery.fabric.min.js',
    './app/**/*.js',
    './assets/vendor/kage-engine/*.js'
  ],
  css: [
    './bower_components/office-ui-fabric/dist/css/fabric.min.css',
    './bower_components/office-ui-fabric/dist/css/fabric.components.min.css',
    './assets/css/*.css'
  ],
  assets: [
    './assets/**/*.png',
    './assets/**/*.mp3'
  ],
  templates: ['./**/*.tpl.html'],
  buildjs: ['./build/**/*.js'],
  buildcss: ['./build/**/*.css']
};

gulp.task('clean', function () {
  return del('./build');
});

gulp.task('carrier', function () {
  return gulp.src(paths.assets)
    .pipe(gulp.dest('./build/assets'))
});

gulp.task('templateCache', function () {
  return gulp.src(paths.templates)
    .pipe(templateCache({module: 'app'}))
    .pipe(gulp.dest('./build'))
});

gulp.task('deployCSS', function() {
 return gulp.src(paths.css)
 .pipe(cssmin())
 .pipe(concat('all.css'))
 .pipe(gulp.dest('./build'));
});

gulp.task('js', function () {
  return gulp.src(paths.js)
  .pipe(sourcemaps.init())
  .pipe(stripDebug())
  .pipe(uglify())
  .pipe(concat('all.min.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./build'));
});

gulp.task('inject', function () {
 return gulp.src('./index.html')
 .pipe(inject(gulp.src(paths.buildjs, {read: false}), {relative: true, ignorePath: 'build'}))
 .pipe(inject(gulp.src(paths.buildcss, {read: false}), {relative: true, ignorePath: 'build'}))
 .pipe(gulp.dest('./build'));
});

gulp.task('build', function (callback) {
  runSequence(
    'clean',
    'templateCache',
    'js',
    'deployCSS',
    'carrier',
    'inject',
    callback
  );
});

gulp.task('serve', function (){
  var bs = require('browser-sync').create();
  bs.init({
    startPath: '/',
    server: {
      baseDir: './'
    }
  });
})
