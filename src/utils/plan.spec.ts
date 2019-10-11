import { featureCost, oneCent } from './plan';

describe('cost utilities', () => {
  it('featureCost returns correct value in cents', () => {
    // Get your pad & paper out! This should be 1/10 millionth of a cent
    const price = 200000000;
    const ten = 10;
    const million = 1000000;
    expect(featureCost(price)).toBe(price / ten / million);
  });

  it('oneCent returns the number of features it takes to equal $0.01', () => {
    const price = 5000;
    const ten = 10;
    const million = 1000000;
    expect(oneCent(price)).toBe(Math.ceil((ten * million) / price));
  });
});
