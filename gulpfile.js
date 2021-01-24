"use strict";

const {dest, series, src, watch} = require('gulp');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
// const favicons = require('@flexis/favicons/lib/stream');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();
const gulpIf = require('gulp-if');
const useref = require('gulp-useref');
const sourcemaps = require('gulp-sourcemaps');
const lec = require('gulp-line-ending-corrector');

function imgToWeBP() {
    return src('src/img/*.{jpg,jpeg,png,gif}')
        .pipe(webp())
        .pipe(dest('public/img/'))
}

function minImg() {
    return src('src/img/*.{jpg,jpeg,png,gif}')
        .pipe(imagemin({
          verbose: true
        }))
        .pipe(dest('public/img/'))
}

// function faviconICO() {
//     return src('src/img/favicon.jpeg')
//     .pipe(favicons())
//     .pipe(dest('public/img/'))
// }

function lineEndingFix() {
  return src(['src/**/*.html'])
      .pipe(lec({eolc: 'CRLF'}))
      .pipe(dest('./src/'));
}

function compileCode() {
    return src(['./src/','!src/img/*.{jpg,jpeg,png,gif}'])
    .pipe(sourcemaps.init())
      .pipe(useref())
      .pipe(gulpIf('*.js',terser({
        module: true,
        ecma: 2015
      })))
      .pipe(gulpIf('*.css',cleanCSS({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
        console.log(`${details.name}: ${details.errors}`);
        console.log(`${details.name}: ${details.warnings}`);
      })))
    .pipe(sourcemaps.write())
      .pipe(dest('public/'));
  }

function watchFiles() {
  watch('src/**/*.html',browserSync.reload)
  watch('src/**/*.js',browserSync.reload)
  watch('src/**/*.css',browserSync.reload)
  watch('src/img/*.{jpg,jpeg,png,gif}',browserSync.reload)
}

function liveReload() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
}

function Fileslint() {
    return src('./src/')
        .pipe(eslint({
            fix: true,
            useEslintrc: true,
        }))
        .pipe(eslint.format())
        .pipe(eslint.results(results => {
            console.log(`Total Results: ${results.length}`);
            console.log(`Total Warnings: ${results.warningCount}`);
            console.log(`Total Errors: ${results.errorCount}`);
        }))
        // .pipe(eslint.failAfterError());
  }

// exports.favicon = faviconICO()
exports.develop = series(liveReload,watchFiles)
exports.default = series(Fileslint, imgToWeBP, minImg, lineEndingFix, compileCode);
