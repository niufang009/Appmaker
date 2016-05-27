var gulp = require("gulp");
var uglify = require("gulp-uglify");
var runSequence = require("run-sequence");
var minifyCss = require("gulp-minify-css");
var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");
var exec = require("child_process").exec;
var ejs = require("gulp-ejs");

gulp.task('publish',['clear'],function () {
    runSequence('sass','copy-image','compile-html','only-copy-libjs','copy-website-js','copy-css');
});

gulp.task('publish-cdn',['clear'],function () {
    runSequence('sass','copy-image','compile-html-cdn','only-copy-libjs','revreplace');
});

function compileHtml(cdnUrl){
    return gulp.src("views/*.html")
        .pipe(ejs({
            relativePath:cdnUrl,
            version: Date.now()
        }))
        .pipe(gulp.dest("./public/website"));
}
gulp.task("compile-html",function(){
    return compileHtml('.');
});

gulp.task("compile-html-cdn",function(){
    return compileHtml('//woncdn.maxleap.cn/website');
});

gulp.task("only-copy-libjs", function () {
    return gulp.src(["src/javascript/**/*.*",'!src/javascript/website/**/*.*'])
        .pipe(gulp.dest("public/website/javascript/"));
});

gulp.task("copy-website-js",function(){
    return gulp.src("src/javascript/website/**/*.*")
        .pipe(gulp.dest("public/website/javascript/website"))
});
gulp.task("copy-image",function(){
    return gulp.src("src/images/**/*.*")
        .pipe(gulp.dest("public/website/images"))
});
gulp.task("copy-css",function(){
    return gulp.src("src/stylesheets/**/*.*")
        .pipe(gulp.dest("public/website/stylesheets"))
});
gulp.task("revision-css",function(){
	return gulp.src('src/stylesheets/**/*.css')
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest('public/website/stylesheets'))
        .pipe(rev.manifest({
            merge:true
        }))
        .pipe(gulp.dest('./'));
});
gulp.task("revision-js",function(){
	return gulp.src(['src/javascript/website/**/*.js'])
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('public/website/javascript/website'))
        .pipe(rev.manifest({
            merge:true
        }))
        .pipe(gulp.dest('./'));
});


gulp.task("revreplace", ["revision-js", "revision-css"], function(){
    runSequence(['revreplace-html']);
});
gulp.task("revreplace-html",function(){
    var manifest = gulp.src("./rev-manifest.json");

    return gulp.src(["./public/website/*.html"])
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest("public/website"));
});
gulp.task("clear", function (done) {
    exec("rm -rf ./public/website/images && rm -rf ./public/website/javascript && rm -rf ./public/website/stylesheets  && rm ./public/website/*.html",function(){
       done();
    });
});