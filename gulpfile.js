var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var path = require('path');

var OUTPUT = 'build';

gulp.task('desktop', ['desktop prototype', 'build desktop']);
gulp.task('mobile', ['mobile prototype', 'build mobile']);

gulp.task('clean', function () {
    del(OUTPUT);
});

gulp.task('desktop prototype', ['clean'], function () {
    gulp.src('src/desktop/**/*', {base: 'desktop'})
        .pipe(gulp.dest(OUTPUT));
});

gulp.task('mobile prototype', ['clean'], function () {
    gulp.src('src/mobile/**/*', {base: 'mobile'})
        .pipe(gulp.dest(OUTPUT));
});

gulp.task('build desktop', function () {
    gulp.src(['src/*.js', 'src/services/**/*', 'src/controllers/desktop/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(OUTPUT));

    gulp.src('server/FF/public/i/*')
        .pipe(gulp.dest(path.join(OUTPUT, 'i')) );
});

gulp.task('build mobile', function () {
    gulp.src(['src/*.js', 'src/services/**/*', 'src/controllers/mobile/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(OUTPUT));

    gulp.src('server/FF/public/i/*')
        .pipe(gulp.dest(path.join(OUTPUT, 'i')) );
});

gulp.task('watch desktop', ['desktop'], function () {
    gulp.watch(['src/*.js', 'src/services/**/*', 'src/desktop/**/*'], ['build desktop']);
});

gulp.task('watch mobile', ['mobile'], function () {
    gulp.watch(['src/*.js', 'src/services/**/*', 'src/mobile/**/*'], ['build mobile']);
});
