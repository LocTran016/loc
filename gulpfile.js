
'use strict';
const {dest, series, src, watch,parallel} = require('gulp');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const favicons = require('gulp-favicons');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();
const gulpIf = require('gulp-if');
const useref = require('gulp-useref');
const sourcemaps = require('gulp-sourcemaps');
const lec = require('gulp-line-ending-corrector');
const lazypipe = require('lazypipe');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');

function sassToCss() {
  return src('_site/scss/*.scss')
         .pipe(sass())
         .pipe(dest('_site/css/'))
         .pipe(browserSync.reload({
          stream: true
        }));
}
function imgToWeBP() {
  return src('_site/img/*.{jpg,jpeg,png}')
      .pipe(webp())
      .pipe(dest('public/img/'));
}

function minImg() {
  return src('_site/img/*.{jpg,jpeg,png,gif,svg}')
      .pipe(imagemin({
        verbose: true,
      }))
      .pipe(dest('public/img/'));
}

function faviconICO() {
  return src('_site/img/favicon.{jpg,jpeg,png,gif}')
      .pipe(
          favicons({
            appName: 'LocTran016 - All my presentation',
            appShortName: 'LocTran016',
            appDescription: 'I used this website to store all my presentations for school',
            developerName: 'Tran Tan Loc',
            developerURL: 'https://loctran016.github.io/',
            background: '#020307',
            path: '/',
            url: 'https://loctran016.github.io/',
            display: 'standalone',
            orientation: 'portrait',
            scope: '/',
            start_url: '/?homescreen=1',
            version: 1.0,
            logging: false,
            html: 'favicon.html',
            pipeHTML: true,
            replace: true,
          })
      )
      .pipe(dest('public/'));
}

function babelTransfer() {
  return src('public/js/*.min.js')
      .pipe(babel())
      .pipe(dest('public/js/'));
}

function copyJson() {
  return src('_site/index.json')
         .pipe(dest('public/'))
}
function minifyHtml(){
  return src('_site/**/*.html')
    .pipe(htmlmin({}))
    .pipe(dest('public/'));
}

function minifyCode() {
  return src(['puplic/**/*.js','public/**/*.css'])
  .pipe(gulpIf('*.min.js', terser({
    module: true,
    ecma: 2015,
  })))
  .pipe(gulpIf('*.min.css', cleanCSS({debug: true}, (details) => {
    console.log(`${details.name}: ${details.stats.originalSize}`);
    console.log(`${details.name}: ${details.stats.minifiedSize}`);
    console.log(`${details.name}: ${details.errors}`);
    console.log(`${details.name}: ${details.warnings}`);
  })))
}

// function compileCode() {
//   return src('_site/**/*.html')
//       .pipe(useref({base:'public/'}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
//       .pipe(sourcemaps.write('maps'))
//       .pipe(dest('public/'))
//       .pipe(browserSync.reload({
//         stream: true
//       }));
// }
function concatBody() {
  return src('_site/js/body/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('body.js'))
      .pipe(rename({ extname: '.min.js' }))
      .pipe(sourcemaps.write())
      .pipe(dest('public/js/'))
      .pipe(browserSync.reload({
        stream: true
      }));     
}
function concatHead() {
  return src('_site/js/hesad/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('head.js'))
      .pipe(rename({ extname: '.min.js' }))
      .pipe(sourcemaps.write())
      .pipe(dest('public/js/')) 
      .pipe(browserSync.reload({
        stream: true
      }));
}
function concatCSS() {
  return src('_site/css/*.css')
      .pipe(sourcemaps.init())
      .pipe(concatCss('main.css'))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(sourcemaps.write())
      .pipe(dest('public/css/'))
       .pipe(browserSync.reload({
        stream: true
      }));
}

function watchFiles() {
  watch('_site/**/*.html', browserSync.reload);
  watch('_site/**/*.scss', sassToCss());
  watch('_site/**/*.js', browserSync.reload);
  watch('_site/**/*.css', browserSync.reload);
  watch('_site/img/*.{jpg,jpeg,png,gif}', browserSync.reload);
}

function liveReload() {
  browserSync.init({
    server: {
      baseDir: '_site',
    },
  });
}

function Fileslint() {
  return src('./_site/')
      .pipe(eslint({
        fix: true,
        useEslintrc: true,
      }))
      .pipe(eslint.format())
      .pipe(eslint.results((results) => {
        console.log(`Total Results: ${results.length}`);
        console.log(`Total Warnings: ${results.warningCount}`);
        console.log(`Total Errors: ${results.errorCount}`);
      }));
  // .pipe(eslint.failAfterError());
}

exports.favicon = faviconICO();
exports.develop = parallel(liveReload,watchFiles);
exports.default = series(Fileslint, imgToWeBP, minImg, sassToCss,  concatBody, concatHead, concatCSS,
  minifyCode, minifyHtml, copyJson);
