import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import postCSSPresetEnv from 'postcss-preset-env';
import replace from "rollup-plugin-replace";

// https://stenciljs.com/docs/config

export const config: Config = {
  namespace: 'manifold',
  globalStyle: 'src/global/theme.css',
  globalScript: 'src/global/app.ts',
  outputTargets: [{ type: 'dist' }],
  excludeSrc: ['**/*-happo.*', '**/spec/mock/*'],
  plugins: [
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
      exclude: "node_modules/**",
      delimiters: ["<@", "@>"],
      values: {
        DATADOG_CLIENT_TOKEN: process.env.DATADOG_CLIENT_TOKEN
      }
    })
  ],
  testing: {
    testPathIgnorePatterns: [
      '<rootDir>/dist/',
      '<rootDir>/docs/',
      '<rootDir>/pkg/',
      '/node_modules/',
    ],
  },
};
