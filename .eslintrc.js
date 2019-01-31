module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
      jsx: true,
    },
  },
  rules: {
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
  },
};
