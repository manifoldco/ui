import { ManifoldRegionSelector } from './manifold-region-selector';
import { Regions } from '../../spec/mock/catalog';

describe('manifold-region-selector', () => {
  it('filters regions and returns them in allowedRegions order', () => {
    const regionSelector = new ManifoldRegionSelector();
    regionSelector.regions = Regions;

    const [one, two, three] = Regions;
    regionSelector.allowedRegions = [three.id, two.id, one.id];

    expect(regionSelector.filterRegions(Regions)).toEqual([three, two, one]);
  });
});
