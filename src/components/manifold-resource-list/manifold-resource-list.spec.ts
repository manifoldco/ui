import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldResourceList } from './manifold-resource-list';
import { Marketplace } from '../../types/marketplace';
import { Provisioning } from '../../types/provisioning';
import { Resource } from '../../spec/mock/marketplace';
import { connections } from '../../utils/connections';
import { createRestFetch } from '../../utils/restFetch';
import { createGraphqlFetch } from '../../utils/graphqlFetch';

const Product = {
  id: '12345',
  displayName: 'product',
  logoUrl: 'https://fillmurray.com/200/200',
};

const mockGraphqlProducts = {
  products: {
    edges: [
      {
        node: Product,
      },
    ],
  },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const proto = ManifoldResourceList.prototype as any;
const oldCallback = proto.componentWillLoad;

proto.componentWillLoad = function() {
  (this as any).restFetch = createRestFetch({
    getAuthToken: jest.fn(() => '1234'),
    wait: () => 10,
    setAuthToken: jest.fn(),
  });
  (this as any).graphqlFetch = createGraphqlFetch({
    getAuthToken: jest.fn(() => '1234'),
    wait: () => 10,
    setAuthToken: jest.fn(),
  });

  if (oldCallback) {
    oldCallback.call(this);
  }
};

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

  it('The resources list are rendered if given.', async () => {
    fetchMock
      .mock(`${connections.prod.marketplace}/resources/?me`, resources)
      .mock(connections.prod.graphql, { data: mockGraphqlProducts })
      .mock(`${connections.prod.provisioning}/operations/?is_deleted=false`, [provisionOperation]);

    const page = await newSpecPage({
      components: [ManifoldResourceList],
      html: `
          <manifold-resource-list paused=""></manifold-resource-list>
        `,
    });

    if (!page.root || !page.root.shadowRoot) {
      throw new Error('<manifold-resource-list> not found in document');
    }

    // TODO: Add a test that will test that the resources are rendered with their various states
    // to replace the 'processes resources properly' here.
    expect(page.root.shadowRoot.querySelector('.wrapper')).toBeTruthy();
    expect(page.root.shadowRoot.querySelectorAll('manifold-resource-card-view')).toHaveLength(1);
  });

  it('processes resources properly', async () => {
    fetchMock
      .mock(`${connections.prod.marketplace}/resources/?me`, resources)
      .mock(connections.prod.graphql, { data: mockGraphqlProducts })
      .mock(`${connections.prod.provisioning}/operations/?is_deleted=false`, [provisionOperation]);

    const page = await newSpecPage({
      components: [ManifoldResourceList],
      html: `<manifold-resource-list paused=""></manifold-resource-list>`,
    });

    const instance = page.rootInstance as ManifoldResourceList;

    expect(fetchMock.called(`${connections.prod.marketplace}/resources/?me`)).toBe(true);
    expect(fetchMock.called(connections.prod.graphql)).toBe(true);
    expect(fetchMock.called(`${connections.prod.provisioning}/operations/?is_deleted=false`)).toBe(
      true
    );

    expect(instance.resources).toHaveLength(1);
    expect(instance.resources).toEqual([
      {
        id: Resource.id,
        name: Resource.body.name,
        label: Resource.body.label,
        logo: Product.logoUrl,
        logoLabel: Product.displayName,
        status: 'provision',
      },
    ]);
  });

  describe('v0 API', () => {
    it('[paused]: true stops interval', () => {
      window.clearInterval = jest.fn();

      const resourceList = new ManifoldResourceList();
      resourceList.pausedChange(true);

      expect(window.clearInterval).toHaveBeenCalled();
    });

    it('[paused]: false creates interval', () => {
      window.setInterval = jest.fn();

      const resourceList = new ManifoldResourceList();
      resourceList.pausedChange(false);

      expect(window.setInterval).toHaveBeenCalled();
    });

    it('slot="loading" is rendered if still loading.', async () => {
      fetchMock
        .mock(`${connections.prod.marketplace}/resources/?me`, {})
        .mock(connections.prod.graphql, { data: [] })
        .mock(`${connections.prod.provisioning}/operations/?is_deleted=false`, []);

      const page = await newSpecPage({
        components: [ManifoldResourceList],
        html: `
            <manifold-resource-list paused="">
              <div data-test="loading" slot="loading"></div>
            </manifold-resource-list>
          `,
      });

      expect(page.root && page.root.querySelector('[data-test="loading"]')).toBeTruthy();
    });

    it('slot="no-resources" is rendered if no resources are found.', async () => {
      fetchMock
        .mock(`${connections.prod.marketplace}/resources/?me`, [])
        .mock(connections.prod.graphql, { data: [] })
        .mock(`${connections.prod.provisioning}/operations/?is_deleted=false`, []);

      const page = await newSpecPage({
        components: [ManifoldResourceList],
        html: `
          <manifold-resource-list paused="">
            <div data-test="no-resources" slot="no-resources"></div>
          </manifold-resource-list>
        `,
      });

      expect(page.root && page.root.querySelector('[data-test="no-resources"]')).toBeTruthy();
    });
  });
});
