/**
 * This prepares the pkg directory for npm
 */
const { mkdirSync, readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { execSync } = require('child_process');
const { copySync, removeSync } = require('fs-extra');
const prettier = require('prettier');

// Settings
const WD = resolve(__dirname, '..', 'pkg'); // Working directory: pkg/
const FILES_TO_COPY = ['readme.md', 'CHANGELOG.md', 'LICENSE.md']; // other files to copy to WD

const oldDistDir = resolve(__dirname, '..', 'dist');
const newDistDir = resolve(WD, 'dist');

// 1. Use pkg/ for publishing because it’s a clean working directory (don’t have to manage .npmignore)
removeSync(WD);
mkdirSync(WD);
copySync(oldDistDir, newDistDir);
FILES_TO_COPY.forEach(file => copySync(resolve(__dirname, '..', file), resolve(WD, file)));

// 2. Read Git tag
let version;
try {
  version = execSync('git describe --abbrev=0 --tags --exact-match')
    .toString()
    .replace('v', '')
    .replace('\n', '');
} catch (e) {
  console.error(`❌ Build failed: ${e.message}`);
}

// 3. Copy package.json, and add version
const packageJSON = JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json'), 'utf8'));
const newPackageJSON = { ...packageJSON, version };
delete newPackageJSON.scripts; // Don’t need this on npm
delete newPackageJSON.files; // Ship all files in pkg/
writeFileSync(
  resolve(WD, 'package.json'),
  prettier.format(JSON.stringify(newPackageJSON), { parser: 'json' })
);
