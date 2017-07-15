'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports = function (options) {
  
  return function () {
    
    return gulp.src(options.src, {since: gulp.lastRun(options.taskName)})
    
      .pipe(
        $.if(!options.isDevelopment,
          $.revReplace({
            manifest: gulp.src('manifest/common.css.json', {
              allowEmpty: true
            })
          })
        ))
    
      .pipe(gulp.dest(options.dest));
    
  };
};