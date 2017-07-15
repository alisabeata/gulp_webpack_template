'use strict';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const gulp = require('gulp');

function requireGulpTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;

  gulp.task(taskName, function (callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
}

requireGulpTask('styles', './tasks/styles', {
  src: [
    'assets/frontend/stylus/pages/base.styl',
    'assets/frontend/stylus/pages/*.styl'
  ],
  dest: 'build/frontend/css',
  isDevelopment
});

requireGulpTask('pug', './tasks/pug', {
  src: 'assets/frontend/templates/pages/*.pug',
  dest: 'build/frontend',
  taskName: 'pug',
  isDevelopment
});

requireGulpTask('clean', './tasks/clean', {
  src: [
    'build',
    'manifest'
  ]
});

requireGulpTask('copy:files', './tasks/copy', {
  src: 'assets/frontend/copy/**',
  dest: 'build/frontend',
  taskName: 'copy:files',
  isDevelopment
});

requireGulpTask('copy:img', './tasks/copy', {
  src: 'assets/frontend/img/**/**.*',
  dest: 'build/frontend/img',
  taskName: 'copy:img',
  isDevelopment
});

requireGulpTask('server', './tasks/server', {
  src: 'build/frontend/',
  baseDir: './',
  watch: 'build/frontend/**/*.*'
});

requireGulpTask('eslint', './tasks/eslint', {
  src: 'assets/frontend/js/**/*.js'
});

requireGulpTask('webpack', './tasks/webpack', {
  mainFile: 'main.js',
  output: 'common.min.js',
  src: './assets/frontend/js/',
  dest: './build/frontend/js',
  isDevelopment
});


gulp.task('watch', function () {
  gulp.watch(
    'assets/frontend/stylus/**/*.*',
    gulp.series('styles')
  );

  gulp.watch(
    'assets/frontend/templates/**/*.pug',
    gulp.series('pug')
  );

  gulp.watch(
    'assets/frontend/copy/**/*.*',
    gulp.series('copy:files')
  );

  gulp.watch(
    'assets/frontend/img/**/*.*',
    gulp.series('copy:img')
  );
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel(
      'styles',
      'webpack'
    ),
    'pug',
    gulp.parallel(
      'copy:files',
      'copy:img'
    )
  )
);

gulp.task('dev', gulp.series(
    'build', 
    gulp.parallel('watch', 'server')
  )
);

gulp.task('default', gulp.series(
    'build', 
    'eslint',
    gulp.parallel('watch', 'server')
  )
);

    