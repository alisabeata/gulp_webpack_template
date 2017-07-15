'use strict';

const gulp = require('gulp');
const webpack = require('webpack-stream').webpack;
const gutil = require('gulp-util');

module.exports = function (options) {
  return function (callback) {
    
    
    let webpackOptions = {
      entry: `${options.src}${options.mainFile}`,
      
      output: {
        path: `${options.dest}`,
        filename: `${options.output}`,
        //library: 'nameOfTheAllModules' // make global variable
      },

      // watcher
      watch: options.isDevelopment, // watch: true

      // sorce-map
      devtool: options.isDevelopment ? 'cheap-inline-module-sorce-map' : null,

      // babel
      module: {
        loaders: [{
          test:   /\.js$/,
          exclude: /(node_modules|bower_components|tasks)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }]
      },
      
      plugins: [],
      
    };
    
    // uglify
    if (!options.isDevelopment) {
      webpackOptions.plugins.push(
        new webpack.optimize.UglifyJsPlugin({

          compress: {
            warnings: false,
          },

          output: {
            comments: false,
          },
        })
      );
    }
    
    // init
    webpack(webpackOptions, function(err, stats) {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }

      gutil.log('[webpack]', stats.toString({
        colors: true
      }));

      callback();
    });
    
  }
};