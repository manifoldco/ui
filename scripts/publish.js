/**
 * This ensures npm deploys get tagged correctly from Git:
 * v1.2.3         -> tag “latest”
 * v1.2.3-alpha.0 -> tag “alpha”
 * v1.2.3-rc.0    -> tag “rc”
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/* eslint-disable no-console */

const timeStart = process.hrtime();
const SELECT_TAG = /-.*/; // Selects anything after a hyphen, or nothing

// 1. Read package.json
const pkgManifest = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '..', 'package.json'), 'utf8')
);

// 2. Determine if @latest or @[other]
let npmTag = 'latest'; // default
const tag = SELECT_TAG.exec(pkgManifest.version);
if (tag && tag[0].length > 1) {
  npmTag = tag[0].replace('-', '').replace(/\.[^.]+$/, '');
}

console.log(`📦 Publishing ${pkgManifest.version} to npm…`);

// 3. Publish to npm
execSync(`npm publish ../pkg --tag ${npmTag}`, {
  cwd: __dirname, // run the command from this folder (so it can run anywhere)
});

const timeEnd = process.hrtime(timeStart);
const time = timeEnd[0] + Math.round(timeEnd[1] / 100000000) / 10;
console.log(`🚀 Deployed ${pkgManifest.version} in ${time}s`);
