import { SpecPage, newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldDataHasResource } from './manifold-data-has-resource';
import { connections } from '../../utils/connections';
import { resource } from '../../spec/mock/graphql';
import { createGraphqlFetch } from '../../utils/graphqlFetch';

const singleResource = { data: { resource } };
const multiResources = {
  data: {
    resources: {
      edges: [{ node: resource }, { node: resource }],
    },
  },
};

describe('<manifold-data-has-resource>', () => {
  let page: SpecPage;
  let element: HTMLManifoldDataHasResourceElement;

  beforeEach(async () => {
    page = await newSpecPage({ components: [ManifoldDataHasResource], html: '<div></div>' });
    element = page.doc.createElement('manifold-data-has-resource');
    element.graphqlFetch = createGraphqlFetch({
      getAuthToken: jest.fn(() => '1234'),
      wait: () => 10,
      setAuthToken: jest.fn(),
    });
    element.paused = true;
    element.innerHTML = `
      <div slot="loading"></div>
      <div slot="has-resource"></div>
      <div slot="no-resource"></div>
    `;
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('v0 slots', () => {
    it('loading', async () => {
      fetchMock.mock(
        `begin:${connections.prod.graphql}`,
        () => setTimeout(() => multiResources, 100) // arbitrary, but usually enough time for the 1st render to complete
      );

      if (page.root) {
        page.root.appendChild(element);
      }
      const hasResource = page.doc.querySelector('manifold-data-has-resource');
      if (!hasResource) {
        throw new Error('<manifold-data-has-resource> not found in document');
      }
      await page.waitForChanges();

      expect(hasResource.shadowRoot).toEqualHtml(`<slot name="loading"></slot>`);
    });

    it('has-resource', async () => {
      fetchMock.mock(`begin:${connections.prod.graphql}`, multiResources);

      if (page.root) {
        page.root.appendChild(element);
      }
      const hasResource = page.doc.querySelector('manifold-data-has-resource');
      if (!hasResource) {
        throw new Error('<manifold-data-has-resource> not found in document');
      }
      await page.waitForChanges();

      expect(hasResource.shadowRoot).toEqualHtml(`<slot name="has-resource"></slot>`);
    });

    it('no-resource', async () => {
      fetchMock.mock(`begin:${connections.prod.graphql}`, { data: { resources: { edges: [] } } });

      if (page.root) {
        page.root.appendChild(element);
      }
      const hasResource = page.doc.querySelector('manifold-data-has-resource');
      if (!hasResource) {
        throw new Error('<manifold-data-has-resource> not found in document');
      }
      await page.waitForChanges();

      expect(hasResource.shadowRoot).toEqualHtml(`<slot name="no-resource"></slot>`);
    });
  });

  describe('v0 props', () => {
    it('label', async () => {
      fetchMock.mock(`begin:${connections.prod.graphql}`, singleResource);

      if (page.root) {
        page.root.appendChild(element);
      }
      const hasResource = page.doc.querySelector('manifold-data-has-resource');
      if (!hasResource) {
        throw new Error('<manifold-data-has-resource> not found in document');
      }
      await page.waitForChanges();

      expect(hasResource.shadowRoot).toEqualHtml(`<slot name="has-resource"></slot>`);
    });
  });
});
