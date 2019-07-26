import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldResourceList } from './manifold-resource-list';
import { Marketplace } from '../../types/marketplace';
import { Provisioning } from '../../types/provisioning';
import { Resource } from '../../spec/mock/marketplace';
import { Product } from '../../spec/mock/catalog';
import { connections } from '../../utils/connections';

const resources: Marketplace.Resource[] = [
  {
    ...Resource,
    body: {
      ...Resource.body,
      product_id: Product.id,
    },
  },
];

const provisionOperation: Provisioning.Operation = {
  id: '1',
  body: {
    resource_id: Resource.id,
    user_id: '2',
    type: 'provision',
    state: 'provision',
  } as Provisioning.provision,
  type: 'operation',
  version: 1,
};

describe('<manifold-resource-list>', () => {
  window.setInterval = jest.fn();

  afterEach(() => {
    fetchMock.restore();
  });

  describe('The two slots for the state of the components', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('The "no-resources" slot is rendered if no resources are found.', async () => {
      fetchMock
        .mock(`${connections.prod.marketplace}/resources/?me`, [])
        .mock(`${connections.prod.catalog}/products`, [])
        .mock(`${connections.prod.provisioning}/operations/?is_deleted=false`, []);

      const page = await newSpecPage({
        components: [ManifoldResourceList],
        html: `
          <manifold-resource-list paused="">
            <div data-test="no-resources" slot="no-resources"></div>
          </manifold-resource-list>
        `,
      });

      // @ts-ignore
      expect(page.root.querySelector('[data-test="no-resources"]')).toBeTruthy();
    });

    it('The "loading" state is rendered if still loading.', async () => {
      fetchMock
        .mock(`${connections.prod.marketplace}/resources/?me`, {})
        .mock(`${connections.prod.catalog}/products`, [])
        .mock(`${connections.prod.provisioning}/operations/?is_deleted=false`, []);

      const page = await newSpecPage({
        components: [ManifoldResourceList],
        html: `
          <manifold-resource-list paused="">
            <div data-test="loading" slot="loading"></div>
          </manifold-resource-list>
        `,
      });

      // @ts-ignore
      expect(page.root.querySelector('[data-test="loading"]')).toBeTruthy();
    });

    it('The resources list are rendered if given.', async () => {
      fetchMock
        .mock(`${connections.prod.marketplace}/resources/?me`, resources)
        .mock(`${connections.prod.catalog}/products`, [Product])
        .mock(`${connections.prod.provisioning}/operations/?is_deleted=false`, [
          provisionOperation,
        ]);

      const page = await newSpecPage({
        components: [ManifoldResourceList],
        html: `
          <manifold-resource-list paused=""></manifold-resource-list>
        `,
      });

      // TODO: Add a test that will test that the resources are rendered with their various states
      // to replace the 'processes resources properly' here.
      // @ts-ignore
      expect(page.root.shadowRoot.querySelector('.wrapper')).toBeTruthy();
      // @ts-ignore
      expect(page.root.shadowRoot.querySelectorAll('manifold-resource-card-view')).toHaveLength(1);
    });
  });

  it('processes resources properly', async () => {
    fetchMock
      .mock(`${connections.prod.marketplace}/resources/?me`, resources)
      .mock(`${connections.prod.catalog}/products`, [Product])
      .mock(`${connections.prod.provisioning}/operations/?is_deleted=false`, [provisionOperation]);

    const resourceList = new ManifoldResourceList();
    resourceList.connection = connections.prod;

    await resourceList.fetchResources();

    expect(resourceList.resources).toHaveLength(1);
    expect(resourceList.resources).toEqual([
      {
        id: Resource.id,
        name: Resource.body.name,
        label: Resource.body.label,
        logo: Product.body.logo_url,
        status: 'provision',
      },
    ]);
  });

  it('changing the paused attribute to true leads to a removal of the interval', () => {
    window.clearInterval = jest.fn();

    const resourceList = new ManifoldResourceList();
    resourceList.pausedChange(true);

    expect(window.clearInterval).toHaveBeenCalled();
  });

  it('changing the paused attribute to false leads to a creation of the interval', () => {
    window.setInterval = jest.fn();

    const resourceList = new ManifoldResourceList();
    resourceList.pausedChange(false);

    expect(window.setInterval).toHaveBeenCalled();
  });
});
