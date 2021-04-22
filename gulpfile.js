var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var sassGlob = require("gulp-sass-glob");
var devserver = require("browser-sync");
var twig = require("gulp-twig2html");
var rename = require("gulp-rename");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var sourcemaps = require("gulp-sourcemaps");

/*
  Twig to Html Task
  -> This task will convert all the twig files we create into the HTML templates in the dist folder.
*/
gulp.task("twig", function () {
  return gulp
    .src(["src/**/*.twig", "!src/**/_*.twig"])
    .pipe(twig({}))
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest("dist"));
});

/*
  Copying fonts from source to dist
*/
gulp.task("fonts", function () {
  return gulp
    .src(["src/fonts/*.ttf", "src/fonts/*.txt"])
    .pipe(gulp.dest("dist/fonts"));
});

/*
  Image Minify
  -> This task will minify all the images inside the img folder and copy it to the dist/img folder.
*/
gulp.task("imageMin", async () => {
  gulp.src("src/img/*").pipe(imagemin()).pipe(gulp.dest("dist/img"));
});

/*
  Ugify Js
  -> This will make the js ugly also minified.
*/
gulp.task("minifyJs", async () => {
  gulp.src("src/js/*.js").pipe(uglify()).pipe(gulp.dest("dist/js"));
});

/*
  SASS Compiling
  -> This will compile our sass and will copy into the dist/css folder.
  -> Remove the outputStyle parameter for the non minified scss output.
*/
gulp.task("sass", async () => {
  gulp
    .src("src/sass/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/css"));
});

//Default
gulp.task(
  "build",
  gulp.series("sass", "minifyJs", "twig", "imageMin"),
  async () => {
    console.log("Ola Gulp is Walking...");
  }
);

/*
  This task will watch for the changes you declare here.
*/
const watch = async () => {
  gulp.watch("src/sass/**/*.scss", gulp.series("sass", "browser-reload"));
  gulp.watch("src/js/*.js", gulp.series("minifyJs", "browser-reload"));
  gulp.watch("src/**/*.twig", gulp.series("twig", "browser-reload"));
  gulp.watch("src/img/*", gulp.series("imageMin", "browser-reload"));
  httpserver.init(serveoptions);
};

//Devserver
const serveoptions = {
  server: {
    baseDir: "./dist",
    index: "index.html",
    serveStaticOptions: {
      extensions: ["html"],
    },
  },
};
const httpserver = devserver.create();

gulp.task("browser-reload", function (cb) {
  httpserver.reload();
  cb();
});

module.exports.build = gulp.series("build");
module.exports.serve = gulp.series("build", watch);
