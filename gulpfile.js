'use stric';

var gulp   = require('gulp'),
    minify = require('gulp-minify'),
    uglify = require('gulp-uglify'),
    sass   = require('gulp-sass'),
    rename = require('gulp-rename');

gulp.task('default', () => {
    gulp.start('sass');
    gulp.start('js');
})

gulp.task('js', () => {
    return  gulp.src("./src/js/**/*.js")
            .pipe(minify())
            .pipe(rename({
                dirname: "/js",
                basename: "main",
                suffix: ".min",
                extname: ".js"
            }))
            .pipe(gulp.dest("./public"));
})

gulp.task('sass', () =>{
    return  gulp.src("./src/scss/**/*.scss")
            .pipe(sass())
            .pipe(minify())
            .pipe(rename({
                dirname: "/css",
                basename: "main",
                suffix: ".min",
                extname: ".css"
            }))
            .pipe(gulp.dest("./public"));
});