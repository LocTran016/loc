const {dest, series, src, watch} = require('gulp');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const favicons = require('@flexis/favicons/lib/stream');
const inject = require('gulp-inject');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const gulpRemoveHtml = require('gulp-remove-html');
const terser = require('gulp-terser');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();

var filePath = {
  src: 'src/',
  html: {
    src: ['src/**/*.html',"!src/partials/*.html"],
    dist: 'public/'
  },
  css: {
    src: "src/css/*.css",
    dist: "public/css/",
    full_dist: "public/js/*.min.css"
  }
  js: {
    src: "src/js/*.js",
    dist: "public/js/",
    full_dist: "public/js/*.min.js"
  }
  img: {
    src: 'src/img/*.{jpg,jpeg,png,gif}',
    dist: "public/img/"
  }
}

function lint() {
    return src(filePath.src)
        .pipe(eslint({
            fix: true,
            useEslintrc: true,
        }))
        .pipe(eslint.results(results => {
            console.log(`Total Results: ${results.length}`);
            console.log(`Total Warnings: ${results.warningCount}`);
            console.log(`Total Errors: ${results.errorCount}`);
        }))
        // .pipe(eslint.failAfterError());
  }
function imgToWeBP() {
    return src('src/img/')
        .pipe(webp())
        .pipe(dest('public/img/'))
}
function minImg() {
    return src(filePath.img.src)
        .pipe(imagemin({
          verbose: true
        }))
        .pipe(dest(filePath.img.src))
}

function faviconICO() {
    return src('src/img/favicon.jpeg')
    .pipe(favicons())
    .pipe(dest('public/img/'))
}

function html() {
    var sources = src([filePath.css.full_dist,filePath.js.full_dist], {read: false});
   
    return src(filePath.html.src)
      .pipe(inject(sources))
      .pipe(dest(filePath.html.dist))
      src(filePath.html.dist)
      .pipe(gulpRemoveHtml())
      .pipe(dest(filePath.html.dist));
  };

  function js() {
    return src(filePath.js.src)
      .pipe(terser({
        module: true,
        ecma: 2015
      }))
      .pipe(rename({ extname: '.min.js' }))
      .pipe(dest(filePath.js.dist));
  }

function css(){
    return src(filePath.css.src)
    .pipe(cleanCSS({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
        console.log(`${details.name}: ${details.errors}`);
        console.log(`${details.name}: ${details.warnings}`);
      }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest(filePath.css.dist));
}

function watch() {
  watch(filePath.html.src,browserSync.reload)
  watch(filePath.js.src, browserSync.reload)
  watch(filePath.css.src, browserSync.reload)
}

function liveReload() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
}
export.develop = series(liveReload,watch)
exports.default = series(lint, imgToWeBP, minImg, css, js, html, /*faviconICO,*/);