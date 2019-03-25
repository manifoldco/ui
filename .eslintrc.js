module.exports = {
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
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
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    parser: '@typescript-eslint/parser',
    'arrow-parens': 'off', // let Prettier decide
    camelcase: 'off', // underscores are a thing
    'class-methods-use-this': 'off', // component lifecycle methods sometimes don't use `this`
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'never',
        functions: 'never', // function commas are weird
        imports: 'never',
        objects: 'always-multiline',
      },
    ],
    'function-paren-newline': 'off', // let Prettier decide
    'implicit-arrow-linebreak': 'off', // let Prettier decide
    'import/prefer-default-export': 'off', // named exports are perfectly fine
    'lines-between-class-members': 'off', // class members don’t need that space!
    'max-len': 'off', // let Prettier decide
    'object-curly-newline': 'off', // let Prettier decide,
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // compiler catches these well enough
    '@typescript-eslint/no-namespace': 'off', // used in our generated catalog types
  },
};
