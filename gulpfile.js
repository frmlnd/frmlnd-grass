/* Gulpfile */

var p = require('./package.json')

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass');
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    rename = require("gulp-rename"),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    insert = require('gulp-insert');

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

gulp.task('concatcompress', function() {
    gulp.src([
        './app/js/app.js', 
        './app/js/controllers/*.js', 
        './app/js/directives/*.js', 
        './app/js/services/*.js', 
        './app/js/filters/*.js'
    ])
        .on('error', function (err) { console.log(err.message); })
            .pipe(sourcemaps.init())
            .pipe(concat('frmlnd-grass.js'))  
            .pipe(rename('frmlnd-grass.min.js'))
            .pipe(insert.prepend(
                '/**\n  ' +
                '* A silly angular app that makes grass grow at the bottom of a container, most likely a webpage.\n  ' +
                '* @version ' + p.version + '\n  ' + 
                '* @link https://github.com/frmlnd/frmlnd-grass\n  ' +
                '* @license MIT License, http://www.opensource.org/licenses/MIT\n  */\n\n'
            ))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./app/js'));
});

gulp.task('watch', function(){
    gulp.watch(sources.sass, ['sass']);
    gulp.watch(sources.html, ['html']);
    gulp.watch(sources.js, ['js']);
    gulp.watch(sources.js, ['js','concatcompress']);
});

gulp.task( 'default', ['connect', 'copy', 'sass', 'concatcompress', 'watch'] );
gulp.task( 'build', ['copy', 'sass', 'concatcompress']  );