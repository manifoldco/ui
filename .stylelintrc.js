module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order', // provides a rational order of properites as a base
  ],
  plugins: ['stylelint-order'],
  rules: {
    'declaration-colon-newline-after': null, // this is fine
    'property-no-vendor-prefix': null, // some properties need vendor prefixes
    'value-list-comma-newline-after': null, // this is fine
    'selector-type-no-unknown': [
      true,
      {
        ignore: ['custom-elements'],
      },
    ],
  },
  syntax: 'postcss',
};
