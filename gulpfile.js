var gulp = require('gulp'),
    // plugins for less
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    LessAutoprefix = require('less-plugin-autoprefix'),
    autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] }),
    // plugins for jshint
    jshint = require('gulp-jshint'),
    // plugins for build
    usemin = require('gulp-usemin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css');
 
gulp.task('less', function () {
    return gulp
        .src('./less/main.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'));
});

gulp.task('jshint', function () {
    return gulp
        .src('./scripts/*.js')
        .pipe(jshint({
            'esversion': 6
        }))
        .pipe(jshint.reporter('default'));
});

gulp.task('build', ['less'], function () {
    return gulp
        .src('./*.html')
        .pipe(usemin({
            html: [ minifyHtml({ empty: true }) ],
            css: [ minifyCss() ],
            js: [ uglify() ]
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
    gulp.watch('./less/*.less', ['less'])
        .on('change', function (event) {
            console.log(`Watch: ${event.path} was ${event.type}.`);
        });
    gulp.watch('./scripts/*.js', ['jshint'])
        .on('change', function(event) {
            console.log(`Watch: ${event.path} was ${event.type}.`);
        });    
});
