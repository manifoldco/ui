/* eslint-disable @typescript-eslint/no-var-requires,no-console */
const fs = require('fs');
const path = require('path');

const major = process.versions.node.split('.')[0];
const versionRange = `>=${major} <${parseInt(major, 10) + 1}`;
console.info(`Testing Node ${process.versions.node} @ ${versionRange}`);
const packageJSON = `{
  "name": "test-install",
  "engines": {
    "node": "${versionRange}"
  }
}
`;

const testInstallPath = path.resolve(__dirname, '..', 'test-install');
fs.writeFileSync(path.join(testInstallPath, 'package.json'), packageJSON);
