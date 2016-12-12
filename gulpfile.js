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
    path = require('path'),
    gutil = require('gulp-util'),
    ftp = require('vinyl-ftp'),
    argv = require('yargs').argv;

var config = {
    debug: argv.dbg,
    sprite: {
        template: 'stuf/less.template.handlebars'
    },
    ftp: {
        host: '',
        user: '',
        password: '',
        path: '/templates/',
    }
};    
    
gulp.task('deploy', () => {
 
    var conn = ftp.create( {
        host:     config.ftp.host,
        user:     config.ftp.user,
        password: config.ftp.password,
        parallel: 1,
        timeOffset: -1,
        log:      gutil.log
    } );
 
    var globs = [
        'src/**',
        'css/**',
        'js/**',
        'fonts/**',
        'index.html'
    ];

    gulp.src( ['./build/**', './assets/**', 'package.json', 'gulpfile.js'], { base: '.', buffer: false } )
        .pipe( conn.newerOrDifferentSize(config.ftp.path) ) // only upload newer files 
        .pipe( conn.dest(config.ftp.path));
 
});     
    

gulp.task('less', function () {
    var pipe = gulp.src('./assets/css/loader.less')
            .pipe(less({
                plugins: [autoprefix],
            }))
            .pipe(concatCss("bundle.css"));
     
    if (!config.debug) {
        pipe.pipe(cleanCSS())
    }

    pipe.pipe(gulp.dest('./build/css'));

    if (browserSync) {
        browserSync.reload();
    }
});

gulp.task('compress', function () {
    var pipe = gulp.src('./assets/js/*.js')
        .pipe(concat('bundle.js'));

    if (!config.debug) {    
        pipe = pipe.pipe(uglify())
    }
    
    pipe
        .on('error', console.log.bind(console)) 
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

            cssName: 'sprite.less',
            cssTemplate: config.sprite.template,
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