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

function removeCode() {
    return src('src/*.html')
      .pipe(gulpRemoveHtml())
      .pipe(dest('public/'));
  };

function lintFiles() {
    return src(['src/js/*.js','src/css/*.css'])
        .pipe(eslint({
            fix: true,
            useEslintrc: true,
        }))
        .pipe(eslint.results(results => {
            // Called once for all ESLint results.
            console.log(`Total Results: ${results.length}`);
            console.log(`Total Warnings: ${results.warningCount}`);
            console.log(`Total Errors: ${results.errorCount}`);
        }))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        // .pipe(eslint.failAfterError());
  }
function imgToWeBP() {
    return src('src/img/')
        .pipe(webp())
        .pipe(dest('public/img/'))
}
function minImg() {
    return src('src/img/')
        .pipe(imagemin())
        .pipe(dest('public/img/'))
}

/* function faviconICO() {
    return src('src/img/favicon.jpeg')
    .pipe(favicons())
    .pipe(dest('public/img/'))
} */
function injectAssets() {
    var target = src('./src/**/*.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = src(['./public/js/*.min.js', './public/css/*.css'], {read: false});
   
    return target.pipe(inject(sources))
      .pipe(dest('./public/'));
  };

  function minJS() {
    return src('src/js/*.js')
      .pipe(terser({
        module: true,
        ecma: 2015
      }))
      .pipe(rename({ extname: '.min.js' }))
      .pipe(dest('public/js/'));
  }

function minCSS(){
    return src('src/css/*.css')
    .pipe(cleanCSS({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
        console.log(`${details.name}: ${details.errors}`);
        console.log(`${details.name}: ${details.warnings}`);
      }))
    .pipe(dest('dist'));
}

function watchTask() {
    watch(['src/js/*.js', 'src/css/*.css'], series(minJS, minCSS, injectAssets)),
    watch('./src/**/*.html', removeCode,),
    watch('src/img/', series(minImg,imgToWeBP))
    // watch('src/img/favicon.jpeg', faviconICO)
}
exports.default = series(lintFiles, imgToWeBP, minImg, minCSS, minJS, injectAssets, removeCode, /* faviconICO,*/);