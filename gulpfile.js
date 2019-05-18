process.on('uncaughtException', (err) => {
  console.error(err.stack || err);
});

del = require('del');
path = require('path');
browserSync = require('browser-sync').create();
typescript = require('gulp-typescript');
bro = require('gulp-bro');
gulp = require('gulp');
gulp_watch = require('gulp-watch');
sourcemaps = require('gulp-sourcemaps');

const filePathConfig = {
  less: path.join(__dirname, 'src/less/*.less'),
  ts: path.join(__dirname, 'src/**/*.ts*'),
  js: path.join(__dirname, 'dest/tmp/js/**/*.js'),
  static: path.join(__dirname, 'static/**/*'),

  outStatic: path.join(__dirname, 'dest/'),
  outTs: path.join(__dirname, 'dest/tmp/js/'),
  outJs: path.join(__dirname, 'dest/js'),
  outLess: path.join(__dirname, 'dest/css/')
};

// autoprefixer really only useful for css. 
const autoprefixer = require('gulp-autoprefixer'),
  autoprefixBrowsers = [
    'ie >= 11',
    'ie_mob >= 11',
    'ff >= 66',
    'chrome >=73',
    'safari >= 12',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ],
  cleanCss = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  cssNano = require('gulp-cssnano'),
  minifyCss = require('gulp-csso'),
  tslint = require('gulp-tslint'),
  postCss = require('gulp-postcss');

gulp.task('less', function () {
  let processors = [
    autoprefixer
  ];
  return gulp.src(filePathConfig.less)
    .pipe(postCss(processors))
    .pipe(minifyCss())
    .pipe(concat('bundle.min.css'))
    .pipe(autoprefixer({ browsers: autoprefixBrowsers }))
    .pipe(cssNano())
    .pipe(cleanCss({ compatibility: 'ie11' }))
    .pipe(gulp.dest(filePathConfig.outLess));
});

gulp.task('cp-index', function () {
  return gulp.src(filePathConfig.static)
    .pipe(gulp.dest(filePathConfig.outStatic));
});

gulp.task('clean', function () {
  return del(path.join(__dirname, 'dest/**/*'));
});

var tsProject = typescript.createProject('tsconfig.json');

gulp.task('ts', function () {
  return gulp.src(filePathConfig.ts)
    .pipe(tsProject())
    .pipe(gulp.dest(filePathConfig.outTs));
});

gulp.task('js', function () {
  return gulp.src(filePathConfig.js)
    .pipe(bro({
      "transform": [
        "babelify"
      ]
    }))
    .pipe(gulp.dest(filePathConfig.outJs));
})

gulp.task('ts-lint', function () {
  return gulp.src(filePathConfig.ts)
    .pipe(tslint({

    }))
    .pipe(tslint.report());
});

gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: 'dest/',
      index: 'index.html'
    },
    port: 8080,
    watch: true
  });
  console.log('befor gulp.watch');
  gulp.watch(filePathConfig.less, gulp.parallel('less'));
  gulp.watch(filePathConfig.static, gulp.parallel('cp-index'));
  gulp.watch(filePathConfig.ts.toString(), gulp.parallel(gulp.series('ts-lint', 'ts', 'js')));
  gulp.watch('dest/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', gulp.series(['clean', 'less', 'ts-lint', 'ts', 'js', 'cp-index', 'watch']), function (done) {

  done();
});
