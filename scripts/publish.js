/**
 * This ensures npm deploys get tagged correctly from Git:
 * v1.2.3         -> tag “latest”
 * v1.2.3-alpha.0 -> tag “alpha”
 * v1.2.3-rc.0    -> tag “rc”
 */
const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { execSync } = require('child_process');
const { copySync, emptyDirSync } = require('fs-extra');
const prettier = require('prettier');

// Settings
const WD = resolve(__dirname, '..', 'pkg'); // Working directory: pkg/
const FILES_TO_COPY = ['readme.md', 'CHANGELOG.md', 'LICENSE.md']; // other files to copy to WD

/* eslint-disable no-console */

const timeStart = process.hrtime();

const SELECT_FLAG = /-.*/; // Selects anything after a hyphen, or nothing
const oldDistDir = resolve(__dirname, '..', 'dist');
const newDistDir = resolve(WD, 'dist');

// 1. Use pkg/ for publishing because it’s a clean working directory (don’t have to manage .npmignore)
if (existsSync(WD)) {
  emptyDirSync(WD);
} else {
  mkdirSync(WD);
}
copySync(oldDistDir, newDistDir);
FILES_TO_COPY.forEach(file => copySync(resolve(__dirname, '..', file), resolve(WD, file)));
console.log(`[1/3] 🧹 Cleaning up…`);

// 2. Read Git tag
let version;
try {
  version = execSync('git describe --abbrev=0 --tags --exact-match')
    .toString()
    .replace('v', '')
    .replace('\n', '');
  console.log(`[2/3] 📦 Publishing ${version} to npm…`);
} catch (e) {
  console.error(`❌ Publish failed: ${e.message}`);
}

// 3. Determine if @latest or @[other]
let npmTag = 'latest'; // default (“public”)
const flag = SELECT_FLAG.exec(version); // If no hyphen, this is a “private“ release
if (flag && flag[0].length > 1) {
  const flagClean = flag[0].replace('-', '');
  npmTag = flagClean.includes('.') ? flagClean.split('.')[0] : flagClean;
}

// 4. Copy package.json, and add version
const packageJSON = JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json'), 'utf8'));
const newPackageJSON = { ...packageJSON, version };
delete newPackageJSON.scripts; // Don’t need this on npm
delete newPackageJSON.files; // Ship all files in pkg/
writeFileSync(
  resolve(WD, 'package.json'),
  prettier.format(JSON.stringify(newPackageJSON), { parser: 'json' })
);

// 5. Publish to npm
execSync(`npm publish ../pkg --tag ${npmTag}`, {
  cwd: __dirname, // run the command from this folder (so it can run anywhere)
});

const timeEnd = process.hrtime(timeStart);
const time = timeEnd[0] + Math.round(timeEnd[1] / 100000000) / 10;
console.log(`[3/3] 🚀 Deployed ${version} in ${time}s`);
