'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var guglify = require('gulp-uglifyjs');
var gwebpack = require('gulp-webpack');

var pkg = require('./package.json');
var bower = require('./bower.json');

function errorHandler(title) {
  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
}

function webpackWrapper(callback) {

  var webpackOptions = {
    watch: !!callback,
    devtool: 'inline-source-map',
    module: {
      // preLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader'}],
      loaders: [{ test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate', 'babel-loader?presets[]=es2015']}]
    },
    output: { filename: bower.name.concat('.js') }
  };

  var webpackChangeHandler = function(err, stats) {

    if(err) {
      errorHandler('Webpack')(err);
    }
    gutil.log(stats.toString({
      colors: gutil.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));
    if(callback) {
      callback();
      callback = null;
    }
  };

  return gulp.src([ pkg.main ])
    .pipe(gwebpack(webpackOptions, null, webpackChangeHandler))
    .pipe(gulp.dest(''));
    
}

gulp.task('build', function () {
  return webpackWrapper();
});

gulp.task('minify', function () {

  return gulp.src([ bower.name.concat('.js') ])
    .pipe(guglify(bower.name.concat('.min.js')))
    .pipe(gulp.dest(''))
    .pipe(gulp.dest('gh-pages/js'));

});

gulp.task('watch', function (callback) {

  webpackWrapper(callback);
  return gulp.watch([bower.name.concat('.js')], ['minify']);

});

gulp.task('default', ['build']);
