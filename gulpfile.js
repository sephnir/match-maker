const gulp = require("gulp");

const browserify = require("browserify");
const watchify = require("watchify");
const babelify = require("babelify");
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
  start_static("app");
  livereload.listen({ reloadPage: "./app/editor.html" });

  var args = merge(watchify.args, { debug: true });
  var bundler = watchify(browserify("./src/js/editor.js", args))
    .plugin(tsify, {
      target: "es6",
      compilerOptions: {
        allowSyntheticDefaultImports: true
      }
    })
    .transform(babelify, {
      extensions: [".tsx", ".ts"],
      presets: ["@babel/preset-env"]
    })
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

  (async () => {
    open("http://localhost:8080");
  })();
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
  var bundler = browserify("./src/js/editor.js", { debug: true })
    .plugin(tsify, {
      target: "es6",
      compilerOptions: {
        allowSyntheticDefaultImports: true
      }
    })
    .transform(babelify, {
      extensions: [".tsx", ".ts"],
      presets: ["@babel/preset-env"]
    })
    .plugin(cssmodulesify, {
      rootDir: "app"
    });

  bundle_js(bundler);
  bundler.on("css stream", function(css) {
    css.pipe(fs.createWriteStream("app/css/editor.css"));
  });
  return bundler;
});

// Without sourcemaps
gulp.task("browserify-production", function() {
  var bundler = browserify("./src/js/editor.js")
    .plugin(tsify, {
      target: "es6",
      compilerOptions: {
        allowSyntheticDefaultImports: true
      }
    })
    .transform(babelify, {
      extensions: [".tsx", ".ts"],
      presets: ["@babel/preset-env"]
    })
    .plugin(cssmodulesify, {
      rootDir: "app"
    });

  bundler
    .bundle()
    .on("error", map_error)
    .pipe(source("editor.js"))
    .pipe(buffer())
    .pipe(rename("editor.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"));

  bundler.on("css stream", function(css) {
    css.pipe(fs.createWriteStream("app/css/editor.css"));
  });

  return bundler;
});
