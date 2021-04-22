### Gulp Starter

This is a gulp starter for twig templating.

To begin first install the npm dependencies

```
npm install
```

To run the engine. It will create the build folder with all the HTML files.

```
npm run serve
```

To build only

```
npm run build
```

It is configured with the following.

- gulp-twig2html (Convets all the twig files to HTML)
- gulp-sass (To Compile the SASS/SCSS files)
- postcss (The postcss middleware used to convert css which can be understood by most browsers)
- autoprefixer (Used to add prefix of css as per the browsers)
- browser-sync (Used to create a local server and test the development builds)
- gulp
- gulp-imagemin (To minify the images)
- gulp-postcss (The postcss plugin for gulp)
- gulp-rename (To remanme the twig file to HTML)
- gulp-sass-glob
- gulp-sourcemaps
- gulp-uglify (Minify JS)
