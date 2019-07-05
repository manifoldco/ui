import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldDataHasResource } from './manifold-data-has-resource';
import { Marketplace } from '../../types/marketplace';
import { Resource } from '../../spec/mock/marketplace';
import { connections } from '../../utils/connections';

const resources: Marketplace.Resource[] = [Resource];

describe('<manifold-resource-list>', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('Displays the right slot if user has resources', async () => {
    fetchMock.mock(`${connections.prod.marketplace}/resources/?me`, resources);

    const hasResource = await newSpecPage({
      components: [ManifoldDataHasResource],
      html: `
        <manifold-data-has-resource>
          <div itemprop="has-resource" slot="has-resources"></div>
          <div itemprop="no-resource" slot="no-resources"></div>
        </manifold-data-has-resource>`,
    });

    // @ts-ignore
    expect(hasResource.root.querySelector('[itemprop="has-resource"]')).toBeDefined();

    fetchMock.restore();
  });

  it('Displays the right slot if user has no resources', async () => {
    fetchMock.mock(`${connections.prod.marketplace}/resources/?me`, []);

    const hasResource = await newSpecPage({
      components: [ManifoldDataHasResource],
      html: `
        <manifold-data-has-resource>
          <div itemprop="no-resource" slot="no-resources"></div>
          <div itemprop="has-resource" slot="has-resources"></div>
        </manifold-data-has-resource>`,
    });

    // @ts-ignore
    expect(hasResource.root.querySelector('[itemprop="no-resource"]')).toBeDefined();

    fetchMock.restore();
  });
});
