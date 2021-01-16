const {gulp, series} = require('gulp');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const favicons = require('@flexis/favicons/lib/stream');
const inject = require('gulp-inject');
const cleanCSS = require('gulp-clean-css');
var gulpRemoveHtml = require('gulp-remove-html');

function removeCode() {
    return gulp.src('src/*.html')
      .pipe(gulpRemoveHtml())
      .pipe(gulp.dest('public/'));
  };

function imgToWeBP() {
    gulp.src('src/img/')
        .pipe(webp())
        .pipe(gulp.dest('public/img/'))
}
function minImg() {
    gulp.src('src/img/')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img/'))
}

function faviconICO() {
    gulp.src('src/img/favicon.jpeg')
    .pipe(favicons({
        manifest,
        headers: true
    }))
    .pipe(gulp.dest('public/img/'))
}
function injectAssets() {
    var target = gulp.src('./src/**/*.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./public/js/*.min.js', './public/css/*.css'], {read: false});
   
    return target.pipe(inject(sources))
      .pipe(gulp.dest('./public/'));
  };

function minJS() {
    // Include JavaScript and CSS files in a single pipeline
    return gulp.src(['src/js/*.js', 'src/css/*.css'])
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('public/js/'));
  }
function minCSS(){
    return gulp.src('src/css/*.css')
    .pipe(cleanCSS({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
        console.log(`${details.name}: ${details.errors}`);
        console.log(`${details.name}: ${details.warnings}`);
      }))
    .pipe(gulp.dest('dist'));
}

exports.build = series(imgToWeBP, minImg, minCSS, minJS, injectAssets, removeCode, faviconICO);