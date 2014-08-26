var gulp      = require('gulp');
var less      = require('gulp-less');
var csscomb   = require('gulp-csscomb');
var plumber   = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./dist"
        }
    });
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('script', function () {
  gulp.src(['./dev/js/*.js'])
    .pipe(concat('theme.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({stream:true}));
});

gulp.task('less', function () {
  gulp.src([
    './dev/less/theme.less', 
    './dev/less/bootstrap.less'
    ])
    .pipe(plumber())
    .pipe(less())
    .pipe(csscomb())
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({stream:true}));
});

gulp.task('watch', function () {
  gulp.watch(['./dist/*.html'], ['bs-reload']);
  gulp.watch(['./dev/*.less'], ['less']);
});

gulp.task('default', ['browser-sync', 'less', 'watch']);