
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
const sass = require('gulp-sass')

function sassToCss() {
  return src('public/css/*.scss')
         .pipe(sass())
         .pipe(dest('public/css/'))
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

// function babelTransfer() {
//   return src('public/js/*.js')
//       .pipe(babel())
//       .pipe(dest('public/js/'));
// }

function lineEndingFix() {
  return src(['_site/**/*.html'])
      .pipe(lec({eolc: 'CRLF'}))
      .pipe(dest('./public/'));
};

function compileCode() {
  return src(['_site/**/*.html'])
      .pipe(useref({}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
      .pipe(sourcemaps.write('maps'))
      .pipe(gulpIf('*.js', terser({
        module: true,
        ecma: 2015,
      })))
      .pipe(gulpIf('*.css', cleanCSS({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
        console.log(`${details.name}: ${details.errors}`);
        console.log(`${details.name}: ${details.warnings}`);
      })))
      .pipe(dest('public/'));
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
exports.default = series(Fileslint, imgToWeBP, minImg, lineEndingFix, /*babelTransfer,*/ sassToCss, compileCode);
