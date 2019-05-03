import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import postCSSPresetEnv from 'postcss-preset-env';

// https://stenciljs.com/docs/config

export const config: Config = {
  namespace: 'manifold',
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  outputTargets: [{ type: 'dist' }, { type: 'www', serviceWorker: null }],
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
  ],
};
