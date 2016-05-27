var gulp =require('gulp');
var browserSync = require('browser-sync').create();
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var config = require('./../../config/Server');
var exec = require("child_process").exec;
var supervisor = require("gulp-supervisor");
var gulpAutoprefixer = require('gulp-autoprefixer');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 8',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 4',
  'opera >= 23',
  'ios >= 4',
  'android >= 4.0',
  'bb >= 10'
];


gulp.task("default",['node','sass'], function () {

});
// Static Server + watching scss/html files
gulp.task('serve', ['node','sass'], function() {

    //create server
    browserSync.init({
        proxy:"localhost:"+config.port
    });

    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch(["src/javascript/**/*.js","views/**/*.html"]).on('change', browserSync.reload);
});

/**
 * Compile with gulp-ruby-sass + source maps
 */
gulp.task('sass', function () {
    return   gulp.src('src/scss/*.scss')
        .pipe(sass({
            style: 'expanded',
            precision: 10
        }).on('error', sass.logError))
        .pipe(gulpAutoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(notify("build sass file: <%= file.relative %>!"))
        .pipe(gulp.dest("src/stylesheets"))
        .pipe(browserSync.stream());
});

gulp.task('node', function (complete) {

    supervisor("app.js",{
        args: ["--dev"],
        watch: ["app",'routes'],
        ignore: ["tasks", "src", "node_modules", "public", "views"],
        pollInterval: 500,
        extensions: ["js"],
        exec: "node",
        debug: false,
        debugBrk: false,
        harmony: true,
        noRestartOn: "exit",
        forceWatch: true,
        quiet: false
    });
    complete();
});