const gulp = require('gulp');
const webp = require('gulp-webp');
 
gulp.task('imgToWeBP', () =>
    gulp.src('src/img/')
        .pipe(webp())
        .pipe(gulp.dest('img/'))
);

gulp.task('default', ['imgToWeBP']);