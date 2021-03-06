"use strict";
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var frontMatter = require('gulp-front-matter'); // used for adding page variables to rendered page
var extname = require('gulp-extname');
var hb = require('gulp-hb');
var hbLayouts = require('handlebars-layouts');
var hbHelpers = require('handlebars-helpers');
var pageList = require('./page-list');
var livereload = require('gulp-livereload');

gulp.task('pagelist', function() {
  return gulp.src('src/pages/index.hbs')
    .pipe(frontMatter({
      property: 'data.pageData',
      remove: true
    }))
    .pipe(hb({
        bustCache: true,
        cwd: process.cwd()
      })
      .data('dist/pageList.json')
      .data('src/data/global.json')
      .partials('./src/layouts/**/*.hbs')
      .partials('./src/partials/**/*.hbs')
      .helpers(hbHelpers)
      .helpers(hbLayouts)
    )
    .pipe(extname())
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});