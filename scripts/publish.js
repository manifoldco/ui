const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { execSync } = require('child_process');
const { copySync } = require('fs-extra');
const prettier = require('prettier');

/* eslint-disable no-console */

const SELECT_FLAG = /-.*/; // Selects anything after a hyphen, or nothing
const oldDistDir = resolve(__dirname, '..', 'dist');
const newDistDir = resolve(__dirname, '..', 'pkg', 'dist');
const pkgDir = resolve(__dirname, '..', 'pkg');

// 1. Setup: make dirs, copy README
if (!existsSync(pkgDir)) mkdirSync(pkgDir);
copySync(oldDistDir, newDistDir);
copySync(resolve(__dirname, '..', 'readme.md'), resolve(pkgDir, 'readme.md'));

// 2. Read Git tag
const version = execSync('git describe --abbrev=0 --tags --exact-match')
  .toString()
  .replace('v', '')
  .replace('\n', '');
console.log(`📦 Publishing ${version}`);

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
writeFileSync(
  resolve(pkgDir, 'package.json'),
  prettier.format(JSON.stringify(newPackageJSON), { parser: 'json' })
);

// 5. Publish to npm
execSync(`npm publish ../pkg --tag ${npmTag}`, {
  cwd: __dirname, // Set cwd, so it can find ../pkg/
});
