module.exports = {
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'prettier', '@manifoldco/stencil'],
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
    '@manifoldco/stencil/component-prefix': ['error', { prefix: 'manifold-' }],
    '@manifoldco/stencil/require-render-decorator': ['error'],
    '@manifoldco/stencil/restrict-required-props': 'error',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // compiler catches these well enough
    'arrow-parens': 'off', // let Prettier decide
    camelcase: 'off', // underscores are a thing
    'class-methods-use-this': 'off', // component lifecycle methods sometimes don't use `this`
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'never',
        functions: 'never', // function commas are weird
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    curly: ['error', 'all'],
    'func-names': 'off',
    'function-paren-newline': 'off', // let Prettier decide
    'implicit-arrow-linebreak': 'off', // let Prettier decide
    'import/extensions': 'off', // TypeScript handles this
    'import/no-named-as-default': 'off',
    'import/no-extraneous-dependencies': 'off', // We need zero deps for npm
    'import/prefer-default-export': 'off', // named exports are perfectly fine
    'lines-between-class-members': 'off', // class members don’t need that space!
    'max-len': 'off', // let Prettier decide
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-irregular-whitespace': 'off',
    'object-curly-newline': 'off', // let Prettier decide,
    'prettier/prettier': 'error',
  },
};
