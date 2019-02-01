module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
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
    'max-len': 'off', // let Prettier decide
    'object-curly-newline': 'off', // let Prettier decide
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      rules: {
        'import/no-unresolved': 'off', // handled by TS
        indent: 'off', // thrown off by types
        'no-undef': 'off', // handled by TS
        'no-unused-vars': 'off', // handled by TS
      },
    },
  ],
};
