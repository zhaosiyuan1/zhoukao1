// 引入插件
var gulp = require('gulp');
var scss = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var webServer = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var babel = require('gulp-babel');
var datalist = require('./src/data/data.json');
// 开发环境

// 编译scss
gulp.task('devScss', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >=4.0']
        }))
        .pipe(gulp.dest('src/css'))
});
// 编译js
gulp.task('devJS', function() {
    gulp.src(['./src/js/*.js'], ['!./src/js/*.min.js'])
        .pipe(uglify())
        .pipe(gulp.dest('src/js'))
});
// 启服务
gulp.task('server', ['devScss'], function() {
    gulp.src('src')
        .pipe(webServer({
            port: "8888",
            host: "169.254.96.149",
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return;
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify({ code: 0, data: datalist }))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});
// 监听scss的变化
gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['devScss']);
});
// 压缩html
gulp.task('copyHtml', function() {
    gulp.src('./src/**/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('src'));
});
// 用一个任务来代替 server 和 watch
gulp.task('dev', ['server', 'watch']);