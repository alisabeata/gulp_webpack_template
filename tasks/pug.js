'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combine = require('stream-combiner2').obj;

module.exports = function (options) {

  return function () {
    
    return gulp.src(options.src)
      .pipe($.pug())
      .on('error', $.notify.onError(function (err) {
        return {
          title: 'Pug',
          message: err.message
        };
      }))
    
      .pipe($.htmlPrettify({
        indent_char: ' ',
        indent_size: 2
      }))
    
      .pipe($.if(!options.isDevelopment, combine(
        $.revReplace({
          manifest: gulp.src('manifest/common.css.json', {
              allowEmpty: true
            })
        }),
      
        $.revReplace({
          manifest: gulp.src('manifest/common.min.js.json', {
            allowEmpty: true
          })
        }))
      ))
    
      .pipe(gulp.dest(options.dest));
  };
};