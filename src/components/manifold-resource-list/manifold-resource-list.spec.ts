import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldResourceList } from './manifold-resource-list';
import { connections } from '../../utils/connections';
import resource from '../../spec/mock/elegant-cms/resource';
import { createGraphqlFetch } from '../../utils/graphqlFetch';
import { ResourceEdge } from '../../types/graphql';

const resources: ResourceEdge[] = [
  { node: resource, cursor: '1' },
  { node: resource, cursor: '2' },
];

const data = {
  resources: {
    edges: resources,
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      endCursor: 'spookyboo',
    },
  },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const proto = ManifoldResourceList.prototype as any;
const oldCallback = proto.componentWillLoad;

proto.componentWillLoad = function() {
  (this as any).graphqlFetch = createGraphqlFetch({
    getAuthToken: jest.fn(() => '1234'),
    wait: () => 10,
    setAuthToken: jest.fn(),
  });

  if (oldCallback) {
    oldCallback.call(this);
  }
};

describe('<manifold-resource-list>', () => {
  window.setInterval = jest.fn();

  afterEach(() => {
    fetchMock.restore();
  });

  it('The resources list are rendered if given.', async () => {
    fetchMock.mock(connections.prod.graphql, { data });

    const page = await newSpecPage({
      components: [ManifoldResourceList],
      html: `
          <manifold-resource-list paused="true"></manifold-resource-list>
        `,
    });

    if (!page.root || !page.root.shadowRoot) {
      throw new Error('<manifold-resource-list> not found in document');
    }

    // TODO: Add a test that will test that the resources are rendered with their various states
    // to replace the 'processes resources properly' here.
    expect(page.root.shadowRoot.querySelector('.wrapper')).toBeTruthy();
    expect(page.root.shadowRoot.querySelectorAll('manifold-resource-card-view')).toHaveLength(
      resources.length
    );
  });

  it('processes resources properly', async () => {
    fetchMock.mock(connections.prod.graphql, { data });

    const page = await newSpecPage({
      components: [ManifoldResourceList],
      html: `<manifold-resource-list paused="true"></manifold-resource-list>`,
    });

    const instance = page.rootInstance as ManifoldResourceList;

    expect(instance.resources).toHaveLength(resources.length);
    expect(instance.resources).toEqual(resources);
  });

  it('renders a skeleton when no resources available', async () => {
    fetchMock.mock(connections.prod.graphql, 200);

    const page = await newSpecPage({
      components: [ManifoldResourceList],
      html: `<manifold-resource-list paused="true"></manifold-resource-list>`,
    });

    if (!page.root || !page.root.shadowRoot) {
      throw new Error('<manifold-resource-list> not found in document');
    }

    expect(page.root.shadowRoot.querySelectorAll('manifold-resource-card-view')).toHaveLength(4);
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
      fetchMock.mock(connections.prod.graphql, { data: {} });

      const page = await newSpecPage({
        components: [ManifoldResourceList],
        html: `
            <manifold-resource-list paused="true">
              <div data-test="loading" slot="loading"></div>
            </manifold-resource-list>
          `,
      });

      expect(page.root && page.root.querySelector('[data-test="loading"]')).toBeTruthy();
    });

    it('slot="no-resources" is rendered if no resources are found.', async () => {
      fetchMock.mock(connections.prod.graphql, data);

      const page = await newSpecPage({
        components: [ManifoldResourceList],
        html: `
          <manifold-resource-list paused="true">
            <div data-test="no-resources" slot="no-resources"></div>
          </manifold-resource-list>
        `,
      });

      expect(page.root && page.root.querySelector('[data-test="no-resources"]')).toBeTruthy();
    });
  });
});
