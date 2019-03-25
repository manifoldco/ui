describe('default value methods', () => {
  it('string features return default value');
  it('number features return default value');
  it('boolean features return true when default is true');
  it('boolean features return true when default is false');
  it('initial features return map of all default values');
});

describe('display value methods', () => {
  it('string features return value name');
  it('non-measurable number features return value name');
  it('measurable number features return “free” when always free');
  it('measurable number features return unavailable when unavailable');
  it('measurable number features return cost when flat cost');
  it('measurable number features display range when pricing tiers');
  it('boolean features return “Yes” when true');
  it('boolean features return “No when false');
});

describe('cost utilities', () => {
  it('featureCost returns correct value in cents');
});

describe('other plan methods', () => {
  it('number features return price descriptions');
});
