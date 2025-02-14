const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');

/*---server---*/
gulp.task('server', function () {
    browserSync.init({
        server: {
            port:9000,
            baseDir:"build"
        }
    });

    gulp.watch('build/**/*').on('change', browserSync.reload);
});

/*--compile template - pug compile */
gulp.task('templates:compile', function buildHTML() {
    return gulp.src('source/template/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
});

/**--styles compile---*/
gulp.task('styles:compile', function () {
    return gulp.src('source/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'));
});

/** --sprite--*/
gulp.task('sprite', function (cb) {
    const spriteData = gulp.src('source/image/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../images/sprite.png',
        cssName: 'sprite.scss'
    }));

    spriteData.img.pipe(gulp.dest('build/images/'));
    spriteData.css.pipe(gulp.dest('source/styles/global/'));
    cb();
});


/**---delete--- */
gulp.task('clean', function del(cb) {
    return rimraf('build', cb);
});

/**---copy fonts*/
gulp.task('copy:fonts', function () {
    return gulp.src('./source/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});

/**---copy img*/
gulp.task('copy:images', function () {
    return gulp.src('./source/images/**/*.*')
        .pipe(gulp.dest('build/images'));
});

/**--copy ---*/
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));

/**--watchers-- */
gulp.task('watch', function () {
    gulp.watch('source/template/**/*.pug', gulp.series('templates:compile'));
    gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
});

/**--gulp defaulp---*/
gulp.task('default', gulp.series(
    //'clean',
    gulp.parallel('templates:compile', 'styles:compile', 'sprite', 'copy'),
    gulp.parallel('watch','server')
));