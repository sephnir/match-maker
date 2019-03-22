var gulp = require("gulp");

var browserify = require("browserify");
var watchify = require("watchify");
var babelify = require("babelify");
var cssmodulesify = require("css-modulesify");

var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var merge = require("utils-merge");

var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var livereload = require("gulp-livereload");

/* nicer browserify errors */
var log = require("fancy-log");
var chalk = require("chalk");

const fs = require("fs");

var static = require("node-static");

function map_error(err) {
  if (err.fileName) {
    // regular error
    log(
      chalk.red(err.name) +
        ": " +
        chalk.yellow(err.fileName.replace(__dirname + "/src/js/", "")) +
        ": " +
        "Line " +
        chalk.magenta(err.lineNumber) +
        " & " +
        "Column " +
        chalk.magenta(err.columnNumber || err.column) +
        ": " +
        chalk.blue(err.description)
    );
  } else {
    // browserify error..
    log(chalk.red(err.name) + ": " + chalk.yellow(err.message));
  }

  this.end();
}
/* */

gulp.task("watchify", function() {
  livereload.listen({ reloadPage: "./app/editor.html" });

  var args = merge(watchify.args, { debug: true });
  var bundler = watchify(browserify("./src/js/editor.js", args))
    .transform(babelify, { presets: ["env"] })
    .plugin(cssmodulesify, {
      rootDir: "app"
    });

  bundle_js(bundler);
  bundler.on("css stream", function(css) {
    css.pipe(fs.createWriteStream("app/css/editor.css"));
  });
  bundler.on("update", function() {
    bundle_js(bundler).pipe(livereload());
  });
});

function bundle_js(bundler) {
  return (
    bundler
      .bundle()
      .on("error", map_error)
      .pipe(source("editor.js"))
      .pipe(buffer())
      .pipe(gulp.dest("app/js"))
      .pipe(rename("editor.min.js"))
      .pipe(sourcemaps.init({ loadMaps: true }))
      // capture sourcemaps from transforms
      .pipe(uglify())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("app/js"))
  );
}

// Without watchify
gulp.task("browserify", function() {
  var bundler = browserify("./src/js/editor.js", { debug: true })
    .transform(babelify, { presets: ["env"] })
    .plugin(cssmodulesify, {
      rootDir: "app"
    });

  return bundle_js(bundler);
});

// Without sourcemaps
gulp.task("browserify-production", function() {
  var bundler = browserify("./src/js/editor.js")
    .transform(babelify, {
      presets: ["env"]
    })
    .plugin(cssmodulesify, {
      rootDir: "app"
    });

  return bundler
    .bundle()
    .on("error", map_error)
    .pipe(source("editor.js"))
    .pipe(buffer())
    .pipe(rename("editor.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"));
});
