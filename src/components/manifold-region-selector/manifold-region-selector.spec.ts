import fetchMock from 'fetch-mock';
import { newSpecPage } from '@stencil/core/testing';
import { Catalog } from '../../types/catalog';
import { ManifoldRegionSelector } from './manifold-region-selector';
import { Regions } from '../../spec/mock/catalog';
import { createRestFetch } from '../../utils/restFetch';
import { connections } from '../../utils/connections';

async function setup() {
  const page = await newSpecPage({
    components: [ManifoldRegionSelector],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-region-selector');
  component.restFetch = createRestFetch({
    getAuthToken: jest.fn(() => '1234'),
    wait: 10,
    setAuthToken: jest.fn(),
  });

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-region-selector>', () => {
  it('fetches regions on load', async () => {
    fetchMock.mock(`${connections.prod.catalog}/regions`, Regions);

    await setup();

    expect(fetchMock.called(`${connections.prod.catalog}/regions`)).toBe(true);
  });

  it('filters regions and returns them in region order', () => {
    const regionSelector = new ManifoldRegionSelector();
    regionSelector.regions = Regions;

    const [one, two, three] = Regions;
    regionSelector.allowedRegions = [three.id, two.id, one.id];

    expect(regionSelector.filterRegions(Regions)).toEqual([one, two, three]);
  });

  it('generates region codes like aws-us-east-1', () => {
    const regionSelector = new ManifoldRegionSelector();

    const nyc1: Catalog.Region = {
      body: {
        location: 'nyc1',
        name: 'DigitalOcean - New York 1',
        platform: 'digital-ocean',
        priority: 95,
      },
      id: '235j17hyc3kw0bd5bgh799xdugq7a',
      type: 'region',
      version: 1,
    };

    expect(regionSelector.regionCode(nyc1)).toEqual('do-nyc1');
  });

  it('sorts regions based on preference, and includes ommitted at the end', () => {
    const regionSelector = new ManifoldRegionSelector();

    // Grab 7 regions
    const regions = Regions.slice(0, 7);
    const [one, two, three, four, five, six, seven] = Regions;
    // Order: 3, 2, 1, 6, 4, 5 (7 omitted, but should be at the end)
    const order = [
      regionSelector.regionCode(three),
      regionSelector.regionCode(two),
      regionSelector.regionCode(one),
      regionSelector.regionCode(six),
      regionSelector.regionCode(four),
      regionSelector.regionCode(five),
    ];

    expect(regionSelector.sortRegions(regions, order)).toEqual([
      three,
      two,
      one,
      six,
      four,
      five,
      seven,
    ]);
  });
});
