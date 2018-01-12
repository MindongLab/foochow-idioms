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
var webpack = require('webpack-stream');
var console = require('console');
var bs = require('browser-sync');

var paths = {
  js: [
    'bower_components/angular/angular.min.js',
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'bower_components/howler.js/dist/howler.min.js',
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/office-ui-fabric/dist/js/jquery.fabric.min.js',
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
  buildjs: ['./build/**/*.js'],
  buildcss: ['./build/**/*.css']
};

gulp.task('clean', function () {
  return del(['app/**/*.js', 'app/**/*.js.map','./build']);
});

gulp.task('assets', function () {
  return gulp.src(paths.assets)
    .pipe(gulp.dest('./build/assets'))
});

gulp.task('style:bundle', function() {
 return gulp.src(paths.css)
 .pipe(cssmin())
 .pipe(concat('bundle.css'))
 .pipe(gulp.dest('./build'));
});

gulp.task('js:vendor', function () {
  return gulp.src(paths.js)
  .pipe(sourcemaps.init())
  .pipe(stripDebug())
  .pipe(uglify())
  .pipe(concat('all.min.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./build'));
});

// Build Angular App files via Webpack
gulp.task('js:webpack', function () {
  return gulp.src('app/app.ts')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./build'));
});

gulp.task('inject', function () {
 return gulp.src('./index.html')
 .pipe(inject(gulp.src(paths.buildjs, {read: false}), {relative: true, ignorePath: 'build'}))
 .pipe(inject(gulp.src(paths.buildcss, {read: false}), {relative: true, ignorePath: 'build'}))
 .pipe(gulp.dest('./build'));
});

gulp.task('build:dev', 
  gulp.series(
    'clean',
    gulp.parallel('js:vendor', 'js:webpack', 'style:bundle', 'assets'),
    'inject'
  )
);

gulp.task('build:partial', 
  gulp.series(
    gulp.parallel('js:webpack', 'style:bundle'),
    'inject'
  )
);

gulp.task('serve:prod', function (){
  bs.create();
  bs.init({
    startPath: '/',
    server: {
      baseDir: './'
    }
  });
})

gulp.task('serve:dev', gulp.series('build:dev', function (){
  bs.create();
  gulp.watch(["app/**/*.ts",
              "app/**/*.html"], 
              gulp.series('build:partial', 
              function (done) {
                bs.reload();
                done();
              })
  );
  bs.init({
    startPath: '/',
    server: {
      baseDir: './build',
      routes: {
        '/assets': './assets',  // dev only: serve audio files locally
                                // we need this route because `assets` is not copied to the `build` folder
        '/favicon.ico': './favicon.ico'                       
      }
    }
  });
}));
