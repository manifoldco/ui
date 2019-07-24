module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-namespace': 'off', // namespaces are fine
    camelcase: 'off', // underscores are a thing
    'class-methods-use-this': 'off', // component lifecycle methods sometimes don't use `this`
    'import/prefer-default-export': 'off', // named exports are perfectly fine
    'lines-between-class-members': 'off', // class members don’t need that space!
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': 'off', // allow .tsx
    'react/prop-types': 'off', // use TS
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off', // Node.js is cool
      },
    },
  ],
};
