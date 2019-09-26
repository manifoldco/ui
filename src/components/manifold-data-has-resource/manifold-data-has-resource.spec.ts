import { newSpecPage } from '@stencil/core/testing';
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

interface Setup {
  onLoad?: (e: Event) => void;
  label?: string;
}

async function setup({ onLoad, label }: Setup) {
  const page = await newSpecPage({
    components: [ManifoldDataHasResource],
    html: '<div></div>',
  });

  const loading = page.doc.createElement('div');
  loading.slot = 'loading';
  const hasResources = page.doc.createElement('div');
  hasResources.slot = 'has-resource';
  const noResource = page.doc.createElement('div');
  noResource.slot = 'no-resource';

  const element = page.doc.createElement('manifold-data-has-resource');
  element.appendChild(loading);
  element.appendChild(hasResources);
  element.appendChild(noResource);

  element.graphqlFetch = createGraphqlFetch({});
  element.paused = true;
  element.label = label;

  if (onLoad) {
    page.doc.addEventListener('manifold-hasResource-load', onLoad);
  }

  const root = page.root as HTMLDivElement;
  root.appendChild(element);
  await page.waitForChanges();

  return { page, element };
}

describe('<manifold-data-has-resource>', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('v0 slots', () => {
    it('loading', async () => {
      // arbitrary, but enough time for the 1st render to complete
      const response = new Promise(resolve => setTimeout(() => resolve(multiResources), 100));
      fetchMock.mock(
        `begin:${connections.prod.graphql}`,
        response // arbitrary, but usually enough time for the 1st render to complete
      );

      const { element } = await setup({});

      expect(element.shadowRoot).toEqualHtml(`<slot name="loading"></slot>`);
      await response;
    });

    it('has-resource', async () => {
      fetchMock.mock(`begin:${connections.prod.graphql}`, multiResources);

      const { element } = await setup({});

      expect(element.shadowRoot).toEqualHtml(`<slot name="has-resource"></slot>`);
    });

    it('no-resource', async () => {
      fetchMock.mock(`begin:${connections.prod.graphql}`, { data: { resources: { edges: [] } } });

      const { element } = await setup({});

      expect(element.shadowRoot).toEqualHtml(`<slot name="no-resource"></slot>`);
    });
  });

  describe('v0 props', () => {
    it('label', async () => {
      fetchMock.mock(`begin:${connections.prod.graphql}`, singleResource);

      const { element } = await setup({ label: 'my-resource' });

      expect(element.shadowRoot).toEqualHtml(`<slot name="has-resource"></slot>`);
    });
  });

  describe('v0 events', () => {
    it('load: has resources', async () => {
      fetchMock.mock(`begin:${connections.prod.graphql}`, multiResources);

      const mockLoad = jest.fn();
      await setup({ onLoad: mockLoad });

      expect(mockLoad).toHaveBeenCalledWith(
        expect.objectContaining({ detail: { hasAnyResources: true } })
      );
    });

    it('load: no resources', async () => {
      fetchMock.mock(`begin:${connections.prod.graphql}`, { data: null });

      const mockLoad = jest.fn();
      await setup({ onLoad: mockLoad });

      expect(mockLoad).toHaveBeenCalledWith(
        expect.objectContaining({ detail: { hasAnyResources: false } })
      );
    });
  });
});
