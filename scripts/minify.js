/**
 * Minifies Stencil output after build.
 * This was chosen instead of rollup-plugin-terser for safety (that affects file contents)
 * Don’t believe me? Try it and compare `dist/esm/loader.mjs` to this method.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { minify } = require('terser');

const FILES = 'dist/**/*.@(js|mjs)';

const cwd = path.resolve(__dirname, '..');

glob.sync(FILES, { absolute: true, cwd, nodir: true }).forEach(file => {
  const { code, error } = minify(fs.readFileSync(file, 'utf8'));
  if (error) {
    console.error(error);
    throw new Error(`Could not minify ${file}. Consider excluding it from minification.`);
  }
  fs.writeFileSync(file, code, 'utf8');
});
