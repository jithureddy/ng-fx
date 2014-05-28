var gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    notify  = require('gulp-notify'),
    min     = require('gulp-ngmin'),
    uglify  = require('gulp-uglify'),
    jshint  = require('gulp-jshint');

var paths = {
  animations: [
    './src/animations/regular/helpers/animationsAssist.js',
    './src/animations/regular/helpers/animationClass.js',
    './src/animations/transitions/helpers/transitionsClass.js',
    './src/animations/regular/*.js',
    './src/animations/transitions/*.js',
    './src/animations/domAnimations/*.js',
    './src/animations/domAnimations/directives/*.js',
    './src/animate.js'
  ],
  dist: './dist/'
};

gulp.task('lint', function(){
  return gulp.src(paths.animations)
    .pipe(jshint({
      globals: {
        'TweenMax': true,
        'TimelineMax': true,
        'angular': true
      }
    }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(notify({message: 'Linting done'}));
});

gulp.task('concat', function(){
  return gulp.src(paths.animations)
    .pipe(concat('ng-Fx.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('minify', function(){
  return gulp.src(paths.animations)
    .pipe(concat('ng-Fx.min.js'))
    .pipe(gulp.dest(paths.dist));
});


gulp.task('preMin', ['minify'],function(){
  return gulp.src('./dist/ng-Fx.min.js')
    .pipe(min())
    .pipe(gulp.dest(paths.dist))
    .pipe(notify({message: 'Min done'}));
});

gulp.task('uglify', ['preMin'],function(){
  return gulp.src('./dist/ng-fx.min.js')
   .pipe(uglify())
   .pipe(gulp.dest(paths.dist))
   .pipe(notify({message: 'Build Done'}));
});


gulp.task('build', ['lint', 'concat','uglify']);

gulp.task('watch', function(){
  gulp.watch(paths.animations, ['build']);
});

gulp.task('default', ['build' ,'watch']);
