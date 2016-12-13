# gulp-boilerplate
Generate start stack: less(concat, minify, sourcemap) + sprite generator + js (concatinate, uglify) + deploy (ftp) + watch + livereload

## Get started

```
git clone https://github.com/xdan/gulp-boilerplate.git
cd gulp-boilerplate
npm install
gulp
```
## Deploy to GITHUB

```
npm run biuld
```

## Commands

```
gulp sprite
```
Build `assets/images/*` images in one spritee and generate `sprite.less`

```
gulp less
```
Concatinate `assets/css/*.less` files in one, compile in `css`, adds prefix and clean

```
gulp compress
```
Concatinate `assets/js/*.js` files in one and uglify

```
gulp deploy
```
Send `build/*` to server by ftp

```
gulp watch
```
Watch for `assets/css/*.less`, `assets/js/*.js`,  `assets/images/*` after change run `sprite`, `less`, `compress` and after complete this run `deploy`

```
gulp default
```
or
```
gulp
```
Create http server, watch for `assets/css/*.less`, `assets/js/*.js`,  `assets/images/*` after change run `sprite`, `less`, `compress` and reload page

## Debug
```
gulp compress --dbg
```
Concat js files without `uglify` 
```
gulp less --dbg
```
Concat less and compile files without `cleanCSS` 
