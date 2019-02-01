module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'property-no-vendor-prefix': null, // some properties need vendor prefixes
    'value-list-comma-newline-after': null,
  },
  syntax: 'postcss',
};
