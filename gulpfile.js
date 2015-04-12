/* Gulpfile */

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass');
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    rename = require("gulp-rename"),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

var sources = {
    sass: ['./app/scss/*.scss'],
    html: ['./app/**/*.html'],
    js: ['./app/**/*.js'],
    bower_js: [
        './bower_components/angular/angular.min.js',
        './bower_components/angular/angular.min.js.map'
    ]
};

gulp.task('sass', function(){
    gulp.src(sources.sass)
        .on('error', function (err) { console.log(err.message); })
            .pipe(sass({style: 'expanded'}))
            .pipe(gulp.dest('./app/css'))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest('./app/css'))
            .pipe(connect.reload());
});

gulp.task('js', function(){
    gulp.src( sources.js )
        .pipe(connect.reload());
});

gulp.task('html', function(){
    gulp.src( sources.html )
        .pipe(connect.reload());
});

gulp.task('copy', function() {
    gulp.src(sources.bower_js)
        .pipe(gulp.dest('./app/js'));

});

gulp.task('connect', function(){
    connect.server({
        livereload: true,
        port:8181
    });
});

/*
gulp.task('concatcompress', function() {
    gulp.src( ['./js/app.js'] )
        .pipe(sourcemaps.init())
        .pipe(concat('./js/app.js'))
        .pipe(rename('./js/app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'))
});
*/

gulp.task('watch', function(){
    gulp.watch(sources.sass, ['sass']);
    gulp.watch(sources.html, ['html']);
    gulp.watch(sources.js, ['js']);
    //gulp.watch(sources.js, ['js','concatcompress']);
});

gulp.task( 'default', ['connect', 'copy', 'sass'/*, 'concatcompress'*/, 'watch'] );
gulp.task( 'build', ['copy', 'sass', 'concatcompress']  );