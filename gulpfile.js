const gulp = require('gulp');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
 
gulp.task('imgToWeBP', () =>
    gulp.src('src/img/')
        .pipe(webp())
        .pipe(gulp.dest('public/img/'))
);

gulp.task('minImg', () =>  
    gulp.src('src/img/')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img/'))
)

gulp.task('default', ['imgToWeBP', 'minImg']);