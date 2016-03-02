'use strict';
var gulp = require('gulp'),

    less = require('gulp-less'),
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix = new LessPluginAutoPrefix({ browsers: ["last 15 versions", "> 1%", "ie 9"] }),
    uglify = require('gulp-uglify'),
    sprite = require('gulp.spritesmith'),
    browserSync = require('browser-sync').create(),
    path = require('path');

gulp.task('less', function () {
    gulp.src('./assets/css/*.less')
        .pipe(less({
            plugins: [autoprefix],
            //paths: [path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(concatCss("bundle.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./build/css'));

    if (browserSync) {
        browserSync.reload();
    }
});

gulp.task('compress', function () {
    gulp.src('./assets/js/*.js')
        .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./build/js/'));
    if (browserSync) {
        browserSync.reload();
    }
});


gulp.task('sprite', function() {
    var spriteOutput;
 
	spriteOutput = gulp.src("./assets/images/*.png")
		.pipe(sprite({
            imgName: 'sprite.png',
            imgPath: '../images/sprite.png',
            retinaImgName: 'sprite@2x.png',
            retinaImgPath: '../images/sprite@2x.png',

            retinaSrcFilter: './assets/images/*@2x.png',
            
            cssName: 'sprite.less',
            cssTemplate: 'stuf/less_retina.template.handlebars',
            algorithm: 'binary-tree',
		}));
 
    spriteOutput.css.pipe(gulp.dest("./assets/css"));
    spriteOutput.img.pipe(gulp.dest("./build/images"));
});


var settings = {
    start: "./"
};

gulp.task('watch', function() {
    gulp
        .watch('assets/css/**.less', function() {
            gulp.run('less');
        });
    gulp
        .watch('stuf/**.handlebars', function() {
            gulp
                .run('sprite');
        });
});
// Запуск сервера разработки gulp watch
gulp.task('default', ['sprite', 'less', 'compress'], function() {
   
    browserSync.init({
        server: settings.start,
        port: 4000
    });
    
    gulp
        .watch('index.html')
        .on("change", browserSync.reload);
    
    gulp
        .watch('stuf/**.handlebars', function() {
            gulp
                .run('sprite');
        })
        .on("change", browserSync.reload);
    gulp
        .watch('assets/css/**.less', function() {
            gulp.run('less');
        })
        .on("change", browserSync.reload);

    gulp
        .watch('assets/images/**', function() {
            gulp.run('sprite');
        })
        .on("change", browserSync.reload);

    gulp
        .watch('assets/js/**', function() {
            gulp.run('compress');
        })
         .on("change", browserSync.reload);

});