/**
 * This prepares the pkg directory for npm
 */
const { mkdirSync, readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { copySync, removeSync } = require('fs-extra');

// Settings
const WD = resolve(__dirname, '..', 'pkg'); // Working directory: pkg/
const FILES_TO_COPY = ['README.md', 'CHANGELOG.md', 'LICENSE']; // other files to copy to WD

const oldDistDir = resolve(__dirname, '..', 'dist');
const newDistDir = resolve(WD, 'dist');

// 1. Use pkg/ for publishing because it’s a clean working directory (don’t have to manage .npmignore)
removeSync(WD);
mkdirSync(WD);
copySync(oldDistDir, newDistDir);
FILES_TO_COPY.forEach(file => copySync(resolve(__dirname, '..', file), resolve(WD, file)));

// 2. Copy package.json, clean up
const packageJSON = JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json'), 'utf8'));
delete packageJSON.scripts; // Don’t need this on npm
delete packageJSON.files; // Ship all files in pkg/
writeFileSync(resolve(WD, 'package.json'), JSON.stringify(packageJSON, null, 2), 'utf8');
