const fs = require('fs');
const path = require('path');

const PACKAGE_JSON_LOCATION = path.resolve(__dirname, '..', 'pkg', 'package.json');

if (!fs.existsSync(PACKAGE_JSON_LOCATION)) {
  console.error('pkg/package.json not found. Did you forget to build?');
}

// read file
const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_LOCATION, 'utf8'));

// clean file
delete packageJson.files;
delete packageJson.bundlesize;
delete packageJson.scripts;

// save file
fs.writeFileSync(PACKAGE_JSON_LOCATION, JSON.stringify(packageJson, undefined, 2), 'utf8');
