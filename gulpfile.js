const gulp = require('gulp');
const ts = require('gulp-typescript');
const minify = require('gulp-minify');

const tsProject = ts.createProject('tsconfig.json', {
  compilerOptions: {
    target: 'es6',
    module: 'commonjs',
    lib: ['dom', 'es6', 'es2017', 'esnext.asynciterable'],
    skipLibCheck: true,
    sourceMap: true,
    moduleResolution: 'node',
    removeComments: true,
    noImplicitAny: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
    noImplicitThis: true,
    noUnusedLocals: false,
    noUnusedParameters: false,
    noImplicitReturns: false,
    noFallthroughCasesInSwitch: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    resolveJsonModule: true,
    baseUrl: '.'
  }
});

gulp.task('default', () => {
  const tsResult = gulp.src('./src/*.ts').pipe(tsProject());
  const tsResultMin = tsResult.js.pipe(minify());

  return tsResultMin.pipe(gulp.dest('dist'));
});
