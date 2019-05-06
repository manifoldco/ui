const { existsSync, readdirSync } = require('fs');
const { resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = ({ config }) => {
  // 1. Allow webpack to import Stencil
  const babelLoader = config.module.rules.find(
    ({ use }) => use && use[0].loader === 'babel-loader'
  );
  babelLoader.exclude = [/node_modules\/(?!\@stencil).*/];
  if (babelLoader.use[0].options) {
    babelLoader.use[0].options.plugins = ['@babel/plugin-syntax-dynamic-import'];
  }

  // 2. Load JS & CSS from our components
  config.entry.push(resolve(__dirname, '..', 'dist', 'manifold.js'));
  config.entry.push(resolve(__dirname, '..', 'dist', 'manifold.css'));

  const components = resolve(__dirname, '..', 'dist', 'collection', 'components');
  readdirSync(components).map(file => {
    jsFilePath = resolve(components, file, `${file}.js`);
    try {
      if (existsSync(jsFilePath)) config.entry.push(jsFilePath);
    } catch (err) {
      console.error(err);
    }

    cssFilePath = resolve(components, file, `${file}.css`);
    try {
      if (existsSync(cssFilePath)) config.entry.push(cssFilePath);
    } catch (err) {
      console.error(err);
    }
  });

  // 3. Fix dynamic imports for Storybook
  // IMPORTANT: webpack must be at 4.28 due to a bug. See here: https://github.com/webpack/webpack/issues/8656
  config.plugins.push(
    new CopyPlugin([
      {
        from: resolve(__dirname, '..', 'dist'),
        to: resolve(__dirname, '..', 'node_modules', '@storybook', 'core', 'dist', 'public'),
      },
    ])
  );

  return config;
};
