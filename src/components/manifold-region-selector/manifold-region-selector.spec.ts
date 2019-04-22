import { ManifoldRegionSelector } from './manifold-region-selector';
import { Regions } from '../../spec/mock/catalog';

describe('manifold-region-selector', () => {
  it('filters the correct regions', () => {
    const regionSelector = new ManifoldRegionSelector();
    regionSelector.regions = Regions;

    const [one, two, three] = Regions;
    regionSelector.allowedRegions = [one.id, two.id, three.id];

    expect(regionSelector.filteredRegions).toEqual([one, two, three]);
  });
});
