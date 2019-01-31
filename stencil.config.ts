import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import postCSSPresetEnv from 'postcss-preset-env';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  outputTargets: [
    {
      type: 'www',
      // uncomment the following line to disable service workers in production
      // serviceWorker: null
    },
  ],
  plugins: [
    postcss({
      plugins: [
        // TODO What options do we want to customize if any? Docs: https://github.com/csstools/postcss-preset-env
        postCSSPresetEnv(),
      ],
    }),
  ],
};
