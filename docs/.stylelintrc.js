const base = require('../.stylelintrc');

module.exports = {
  ...base,
  processors: ['stylelint-processor-styled-components'],
  extends: [...base.extends, 'stylelint-config-styled-components'],
  rules: {
    ...base.rules,
    'no-empty-source': null,
    'order/properties-order': [],
  },
};
