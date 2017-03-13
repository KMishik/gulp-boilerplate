# gulp-boilerplate
Generate start stack: less(concat, minify, sourcemap) + sprite generator + js (babel, concatinate, uglify, sourcemap) + deploy (ftp) + watch + livereload

## Get started

```
git clone https://github.com/xdan/gulp-boilerplate.git
cd gulp-boilerplate
npm install
gulp --dbg
```
## Deploy to GITHUB

```
npm run build
```

## Commands

```
gulp sprite
```
Build `assets/images/*` images in one sprite and generate `sprite.less`

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
gulp default --dbg
```
or
```
gulp --dbg
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
