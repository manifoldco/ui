const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const changelog = readFileSync(resolve(__dirname, '..', 'CHANGELOG.md'), 'utf-8');
const withFrontmatter = `---
title: Changelog
path: /changelog
---
${changelog}`;
writeFileSync(resolve(__dirname, '..', 'docs', 'docs', 'changelog.md'), withFrontmatter, 'utf-8');
