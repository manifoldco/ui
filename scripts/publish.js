/**
 * This ensures npm deploys get tagged correctly from Git:
 * v1.2.3         -> tag “latest”
 * v1.2.3-alpha.0 -> tag “alpha”
 * v1.2.3-rc.0    -> tag “rc”
 */
const { execSync } = require('child_process');

/* eslint-disable no-console */

const timeStart = process.hrtime();
const SELECT_FLAG = /-.*/; // Selects anything after a hyphen, or nothing

// 1. Read Git tag
let version;
try {
  version = execSync('git describe --abbrev=0 --tags')
    .toString()
    .replace('v', '')
    .replace('\n', '');
} catch (e) {
  console.error(`❌ Publish failed: ${e.message}`);
}

// 2. Determine if @latest or @[other]
let npmTag = 'latest'; // default (“public”)
const flag = SELECT_FLAG.exec(version); // If no hyphen, this is a “private“ release
if (flag && flag[0].length > 1) {
  const flagClean = flag[0].replace('-', '');
  npmTag = flagClean.includes('.') ? flagClean.split('.')[0] : flagClean;
}

console.log(`📦 Publishing ${version} to npm…`);

// 3. Publish to npm
execSync(`npm publish ../pkg --tag ${npmTag}`, {
  cwd: __dirname, // run the command from this folder (so it can run anywhere)
});

const timeEnd = process.hrtime(timeStart);
const time = timeEnd[0] + Math.round(timeEnd[1] / 100000000) / 10;
console.log(`🚀 Deployed ${version} in ${time}s`);
