const {gulp, series} = require('gulp');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
 
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

exports.build = series(imgToWeBP, minImg);