const gulp = require("gulp");

const browserify = require("browserify");
const watchify = require("watchify");
const tsify = require("tsify");
const cssmodulesify = require("css-modulesify");

const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const merge = require("utils-merge");

const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const livereload = require("gulp-livereload");

/* nicer browserify errors */
const log = require("fancy-log");
const chalk = require("chalk");

const open = require("opn");

const http = require("http");
const fs = require("fs");
const static = require("node-static");

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
        chalk.blue(err.description) +
        "\n" +
        chalk.gray(err.message)
    );
  } else {
    // browserify error..
    log(chalk.red(err.name) + ": " + chalk.yellow(err.message));
  }

  this.end();
}
/* */
function createDir() {
  return gulp
    .src("*.*", { read: false })
    .pipe(gulp.dest("dist/css"))
    .pipe(gulp.dest("dist/js"))
    .pipe(gulp.dest("dist/img"));
}

gulp.task("watchify", function() {
  createDir();

  start_static("dist");
  livereload.listen({ reloadPage: "./dist/editor.html" });

  var args = merge(watchify.args, { debug: true });
  var bundler = watchify(browserify("./src/js/editor.ts", args))
    .plugin(tsify, {})
    .plugin(cssmodulesify, {
      rootDir: "dist"
    });

  bundle_js(bundler);
  copy_files();
  bundler.on("css stream", function(css) {
    css.pipe(fs.createWriteStream("dist/css/editor.css"));
  });
  bundler.on("update", function() {
    console.log("Changes detected");
    copy_files();
    bundle_js(bundler).pipe(livereload());
  });

  (async () => {
    open("http://localhost:8080");
  })();
});

function copy_files() {
  gulp.src(["src/html/*.html"]).pipe(gulp.dest("dist"));
  gulp
    .src(["node_modules/bootswatch/dist/cyborg/bootstrap.min.css"])
    .pipe(gulp.dest("dist/css"));

  gulp.src(["src/img/**/*"]).pipe(gulp.dest("dist/img"));
  gulp.src(["src/lib/**/*"]).pipe(gulp.dest("dist/js"));
}

function bundle_js(bundler) {
  return (
    bundler
      .bundle()
      .on("error", map_error)
      .pipe(source("editor.js"))
      .pipe(buffer())
      .pipe(gulp.dest("dist/js"))
      .pipe(rename("editor.min.js"))
      .pipe(sourcemaps.init({ loadMaps: true }))
      // capture sourcemaps from transforms
      .pipe(uglify())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("dist/js"))
  );
}

function start_static(location) {
  // config

  var file = new static.Server(location, {
    cache: 3600,
    gzip: true
  });

  http
    .createServer(function(request, response) {
      request
        .addListener("end", function() {
          file.serve(request, response);
        })
        .resume();
    })
    .listen(8080);
}

// Without watchify
gulp.task("browserify", function() {
  createDir();
  var bundler = browserify("./src/js/editor.ts", { debug: true })
    .plugin(tsify, {})
    .plugin(cssmodulesify, {
      rootDir: "dist"
    });

  bundler.on("css stream", function(css) {
    return css.pipe(fs.createWriteStream("dist/css/editor.css"));
  });

  return bundle_js(bundler);
});

// Without sourcemaps
gulp.task("browserify-production", function() {
  createDir();
  var bundler = browserify("./src/js/editor.ts")
    .plugin(tsify, {})
    .plugin(cssmodulesify, {
      rootDir: "dist"
    });

  bundler.on("css stream", function(css) {
    return css.pipe(fs.createWriteStream("dist/css/editor.css"));
  });

  return bundler
    .bundle()
    .on("error", map_error)
    .pipe(source("editor.js"))
    .pipe(buffer())
    .pipe(rename("editor.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});
