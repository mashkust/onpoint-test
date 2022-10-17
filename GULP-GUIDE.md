```js
  const gulp = require(`gulp`); // основа gulp
  const sass = require(`gulp-sass`); // дополнительный плагин
```
```js
  gulp.task(`css`, function () {
    return gulp.src(`source/sass/style.scss`) // указываем с каким файлом мы работаем
        .pipe(sass()) // преобразуем scss в css
        .pipe(gulp.dest(`build/css`)) // указываем куда положить результат преобразования
  });
```
```js
  const pugToHtml = () => {
    return gulp.src('source/pug/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(cached('pug'))
        .pipe(gulp.dest('build'));
  };
```
```js
  const css = () => {
    return gulp.src('source/sass/style.scss')
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer({
          grid: true,
        })]))
        .pipe(gcmq()) // выключите, если в проект импортятся шрифты через ссылку на внешний источник
        .pipe(gulp.dest('build/css'))
        .pipe(csso())
        .pipe(rename('style.min.css'))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('build/css'))
        .pipe(server.stream());
  };
```
```js
  const js = () => {
    return gulp.src(['source/js/main.js'])
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('build/js'))
  };
```
```js
  const svgo = () => {
    return gulp.src('source/img/**/*.{svg}')
        .pipe(imagemin([
          imagemin.svgo({
              plugins: [
                {removeViewBox: false},
                {removeRasterImages: true},
                {removeUselessStrokeAndFill: false},
              ]
            }),
        ]))
        .pipe(gulp.dest('source/img'));
  };
```
```js
  const sprite = () => {
    return gulp.src('source/img/sprite/*.svg')
        .pipe(svgstore({inlineSvg: true}))
        .pipe(rename('sprite_auto.svg'))
        .pipe(gulp.dest('build/img'));
  };
```
```js
  const syncserver = () => {
    server.init({
      server: 'build/',
      notify: false,
      open: true,
      cors: true,
      ui: false,
    });

    gulp.watch('source/html/*.html', gulp.series(copy, refresh));
    gulp.watch('source/sass/**/*.{scss,sass}', gulp.series(css));
    gulp.watch('source/js/**/*.{js,json}', gulp.series(js, refresh));
    gulp.watch('source/img/**/*.svg', gulp.series(copysvg, sprite, refresh));
    gulp.watch('source/img/**/*.{png,jpg,webp}', gulp.series(copypngjpg, refresh));
    gulp.watch('source/favicon/**', gulp.series(copy, refresh));
  };

  const refresh = (done) => {
    server.reload();
    done();
  };

  const copysvg = () => {
    return gulp.src('source/img/**/*.svg', {base: 'source'})
        .pipe(gulp.dest('build'));
  };

  const copypngjpg = () => {
    return gulp.src('source/img/**/*.{png,jpg,webp}', {base: 'source'})
        .pipe(gulp.dest('build'));
  };
      
```
```js
  const copy = () => {
    return gulp.src([
      'source/html/**',
      'source/fonts/**',
      'source/img/**',
      'source/favicon/**',
    ], {
      base: 'source',
    })
        .pipe(gulp.dest('build'));
  };
```
```js
  const clean = () => {
    return del('build');
  };
```
```js
  const build = gulp.series(clean, svgo, copy, css, sprite, js, pugToHtml);

  const start = gulp.series(build, syncserver);
```
```js
  const createWebp = () => {
    const root = '';
    return gulp.src(`source/img/${root}**/*.{png,jpg}`)
      .pipe(webp({quality: 90}))
      .pipe(gulp.dest(`source/img/${root}`));
  };
```
```js
  const optimizeImages = () => {
    return gulp.src('build/img/**/*.{png,jpg}')
        .pipe(imagemin([
          imagemin.optipng({optimizationLevel: 3}),
          imagemin.mozjpeg({quality: 75, progressive: true}),
        ]))
        .pipe(gulp.dest('build/img'));
  };
```
