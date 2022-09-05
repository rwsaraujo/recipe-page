// Add the installed modules
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

// Function for compile Sass and add the prefixes
function compileSass() {
  return gulp
    .src("./src/styles/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest("./dist/styles/"))
    .pipe(browserSync.stream());
}

// Gulp task for Sass function
exports.compileSass = compileSass;

// Function to concat the JavaScript
function gulpJS() {
  return gulp
    .src("./src/scripts/*.js")
    .pipe(concat("app.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("./dist/scripts/"))
    .pipe(browserSync.stream());
}

exports.gulpJS = gulpJS;

// Function for start the browser
function browser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}

// Task for start browser-sync
exports.browser = browser;

// Gulp watch function
function watch() {
  gulp.watch("./src/styles/scss/**/*.scss", compileSass);
  gulp.watch("./src/scripts/*.js", gulpJS);
  gulp.watch("*.html").on("change", browserSync.reload);
}

// Start the watch task
exports.watch = watch;

// Gulp default task which starts the watch and the browser tasks
exports.default = gulp.parallel(watch, browser, compileSass, gulpJS);
