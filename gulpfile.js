// const gulp = require('gulp');

// const sass = require('gulp-sass');
// const cssnano = require('gulp-cssnano');
// const cleancss = require('gulp-clean-css');
// const rev = require('gulp-rev');
// const uglify = require('gulp-uglify-es').default;



// gulp.task('css', function(done){
//     console.log('minifying css...');
//     gulp.src('./assets/scss/**/*.scss')
//     .pipe(sass())
//     .pipe(cssnano())
//     .pipe(gulp.dest('./assets/css/'));

//     return gulp.src('./assets/**/*.css')
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets/css/'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets/css/'));
//     done();

// });


// gulp.task('js', function(done){
//     console.log('minifying js ... ... ...');
//     gulp.src('./assets/**/*.js')
//     .pipe(uglify())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets/'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets/'))
//     done();
// });


const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');

function compilescss() {
  return src('assets/scss/*.scss') 
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(dest('public/assets/css')) 
};

function jsmin(){
  return src('assets/js/*.js') 
    .pipe(terser())
    .pipe(dest('public/assets/js'));
}

//watchtask
function watchTask(){
  watch('assets/scss/**/*.scss', compilescss); 
  watch('assets/js/*.js', jsmin); 
}


// Default Gulp task 
exports.default = series(
  compilescss,
  jsmin,
  watchTask
);