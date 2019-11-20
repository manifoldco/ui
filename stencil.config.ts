import fs from 'fs';
import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import postCSSPresetEnv from 'postcss-preset-env';
import replace from 'rollup-plugin-replace';
import { createFilter } from 'rollup-pluginutils';

// https://stenciljs.com/docs/config

const pkgManifest = JSON.parse(fs.readFileSync('package.json', 'utf8'));

interface Options {
  include?: string;
  exclude?: string;
}

function gql(opts: Options = {}) {
  if (!opts.include) {
    opts.include = '**/*.graphql'; // eslint-disable-line no-param-reassign
  }

  const filter = createFilter(opts.include, opts.exclude);

  return {
    name: 'gql',
    // eslint-disable-next-line consistent-return
    transform(code, id) {
      if (filter(id)) {
        return {
          code: `export default ${JSON.stringify(code)}`,
        };
      }
    },
  };
}

export const config: Config = {
  namespace: 'manifold',
  globalStyle: 'src/global/theme.css',
  globalScript: 'src/global/app.ts',
  outputTargets: [{ type: 'dist' }],
  excludeSrc: ['**/*-happo.*', '**/spec/mock/*'],
  plugins: [
    gql(),
    postcss({
      plugins: [
        postCSSPresetEnv({
          features: {
            'custom-media-queries': true,
            'nesting-rules': true,
          },
        }),
      ],
    }),
    replace({
      exclude: 'node_modules/**',
      delimiters: ['<@', '@>'],
      values: {
        NPM_PACKAGE_VERSION: pkgManifest.version,
      },
    }),
  ],
  testing: {
    setupFiles: ['./jest-setup'],
    testPathIgnorePatterns: [
      '<rootDir>/dist/',
      '<rootDir>/docs/',
      '<rootDir>/pkg/',
      '<rootDir>/e2e/',
      '/node_modules/',
    ],
    transform: {
      '\\.graphql$': './jest-transform-graphql',
    },
  },
};
