const gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  uglify = require('gulp-uglify'),
  gulpif = require('gulp-if'),
  minifyCss = require('gulp-clean-css'),
  rigger = require('gulp-rigger'),
  autoprefixer = require('gulp-autoprefixer'),
  concatCss = require('gulp-concat-css'),
  rename = require('gulp-rename'),
  cssmin = require('gulp-cssmin'),
  del = require('del'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  tinypng = require('gulp-tinypng-compress');

let config = {
  paths: {
    sources: {
      noCompile: [
					'src/images/**/*.*',
					'src/fonts/**/*.*'
				]
    }
  }
};

/*browserSync*/
gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: "./build"
    },
    port: 8080,
    open: true,
    notify: false,
  });
});

/*clean*/
gulp.task('clean', function () {
  return del('build');
});

/*no-compile(static)*/
gulp.task('static', function () {
  return gulp.src(config.paths.sources.noCompile, {
      base: './src/'
    })
    .pipe(gulp.dest('./build'));
});

/*styles*/
gulp.task('styles', function () {
  return gulp.src('src/styles/scss/main.scss')
    .pipe(plumber({
      errorHandler: notify.onError(err => {
        return {
          'title': 'CSS-compile',
          'message': err.message
        };
      })
    }))
    .pipe(sass())
    .pipe(autoprefixer('last 5 versions'))
    .pipe(concatCss('main.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

/*html*/
gulp.task('html', function () {
  return gulp.src('src/html/*.html')
    .pipe(plumber({
      errorHandler: notify.onError(err => {
        return {
          'title': 'HTML-compile',
          'message': err.message
        };
      })
    }))
    .pipe(rigger())
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

/*js*/
gulp.task('js', function () {
  gulp.src('src/js/main.js')
    .pipe(plumber({
      errorHandler: notify.onError(err => {
        return {
          'title': 'JS-compile',
          'message': err.message
        };
      })
    }))
    .pipe(rigger())
    .pipe(uglify())
    .pipe(gulp.dest('build/js/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

//img
gulp.task('tinypng', function () {
  gulp.src('src/images/**/*.{png,jpg,jpeg}')
    .pipe(tinypng({
      key: ''
    }))
    .pipe(gulp.dest('build/images'));
});

//build (first step)
gulp.task('build', ['clean'], function () {
  gulp.start('html', 'styles', 'js', 'static');
});

// watch (second step)
gulp.task('watch', ['html', 'styles', 'js', 'static', 'browserSync'], function () {
  gulp.watch('src/html/**/*.*', ['html']);
  gulp.watch('src/styles/**/*.*', ['styles']);
  gulp.watch('src/js/**/*.*', ['js']);
  gulp.watch(config.paths.sources.noCompile, ['static']);
});

//img
gulp.task('img', ['tinypng'])
