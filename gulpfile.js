process.on('uncaughtException', (err) => {
  console.error(err.stack || err);
});

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
      browserSync = require('browser-sync'),
      cleanCss = require('gulp-clean-css'),
      concat = require('gulp-concat'),
      cssNano = require('gulp-cssnano'),
      ghPages = require('gulp-gh-pages'),
      gulp = require('gulp'),
      minifyCss = require('gulp-csso'),
      path = require('path'),
      postCss = require('gulp-postcss');

gulp.task('less', function() {
  let processors = [
    autoprefixer,
    cssNano
  ];
  return gulp.src(path.join(__dirname, 'src/less/*.less'))
    .pipe(postCss(processors))
    .pipe(minifyCss())
    .pipe(concat('bundle.min.css'))
    .pipe(autoprefixer({browsers: autoprefixBrowsers}))
    .pipe(cssNano())
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(path.join(__dirname, 'static')))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('deploy', function() {
  let buildSrc = path.join(__dirname, 'static', '**', '*');
  console.log(buildSrc);
  return gulp.src(buildSrc).pipe(ghPages({
    branch: 'master',
    remoteUrl: 'https://github.com/IronF3/lizard-post.git'
  }))
});

gulp.task('default', gulp.series(['less'], function(done) {
  done();
}));
