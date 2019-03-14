const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { execSync } = require('child_process');
const prettier = require('prettier');

const SELECT_FLAG = /-.*/; // Selects anything after a hyphen, or nothing
const DIST_DIR = resolve(__dirname, '..', 'dist');

// 1. Read Git tag
const gitTag = execSync('git describe --abbrev=0 --tags')
  .toString()
  .replace('\n', '');
const flag = SELECT_FLAG.exec(gitTag);

// 2. Determine if “public” or “private” release
let npmTag = 'latest'; // default (“public”)

// If there is a hyphen in the version, this is a “private“ release
if (flag && flag[0].length > 1) {
  const flagClean = flag[0].replace('-', '');
  npmTag = flagClean.includes('.') ? flagClean.split('.')[0] : flagClean;
}

// 3. Generate package.json for npm
const packageJSON = JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json'), 'utf8'));
const newPackageJSON = {
  ...packageJSON,
  version: gitTag.replace('v', ''),
  files: ['*'],
  main: './manifold.js',
  esnext: './esm',
  module: './esm',
  types: './types/components.d.ts',
  collection: './collection/collection-manifest.json',
};
delete newPackageJSON.scripts; // Don’t need this on npm
writeFileSync(
  resolve(DIST_DIR, 'package.json'),
  prettier.format(JSON.stringify(newPackageJSON), { parser: 'json' })
);

// 4. Publish to npm
execSync(`npm publish ../dist --tag ${npmTag}`, {
  cwd: __dirname, // Set cwd, so it can find ../dist/
});
