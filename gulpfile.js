var gulp            = require('gulp');

var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var jshint          = require('gulp-jshint');

var less            = require('gulp-less');
var csscomb         = require('gulp-csscomb');
var minify          = require('gulp-minify-css');

var notify          = require('gulp-notify');
var browserSync     = require('browser-sync');
var reload          = browserSync.reload;

var html2wp     = require('html2wp');

var   styleSource   = './dev/less',
      styleDist     = './dist/css';


var handleErrors = function() {
    notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
    }).apply(this, arguments);
    this.emit('end');
};

gulp.task('style', function () {
  gulp.src([
    styleSource + "/theme.less", 
    styleSource + "/bootstrap.less"
    ])
    .pipe(less())
    .on('error', handleErrors)
    .pipe(csscomb())
    .pipe(minify())
    .pipe(gulp.dest(styleDist));
});

gulp.task('script', function () {
  gulp.src(['./dev/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('theme.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('bootstrap-script', function () {
  gulp.src(['./dev/js/bootstrap-script/*.js'])
    .pipe(concat('bootstrap.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});


gulp.task('watch', function () {
  gulp.watch([styleSource + '/**/*.less'], ['style']);
  gulp.watch(['./dev/js/**/*.js'], ['script']);
});

gulp.task('browser-sync', function () {
    var files = [
    './dist/js/**/*.js',
    styleDist + '/**/*.css',
    './dist/img/**/*.{png,jpg,jpeg,gif}',
    './**/*.html'
    ];

    browserSync.init(files, {
    server: {
      baseDir: "./dist"
    }
    });
});

gulp.task('default', [
  'browser-sync',
  'style', 
  'watch', 
  'script', 
  'bootstrap-script'
]);


gulp.task('build', function () {
 html2wp();
});