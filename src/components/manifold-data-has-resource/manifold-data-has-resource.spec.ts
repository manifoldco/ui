import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldDataHasResource } from './manifold-data-has-resource';
import resource from '../../spec/mock/elegant-cms/resource';
import { createGraphqlFetch } from '../../utils/graphqlFetch';

const graphqlEndpoint = 'http://test.com/graphql';

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

  const component = page.doc.createElement('manifold-data-has-resource');
  component.innerHTML = `
    <div slot="loading"></div>
    <div slot="has-resource"></div>
    <div slot="no-resource"></div>
  `;

  component.graphqlFetch = createGraphqlFetch({ endpoint: () => graphqlEndpoint });
  component.paused = true;
  component.label = label;

  if (onLoad) {
    page.doc.addEventListener('manifold-hasResource-load', onLoad);
  }

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-data-has-resource>', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('v0 slots', () => {
    it('loading', async () => {
      // arbitrary, but enough time for the 1st render to complete
      const response = new Promise(resolve => setTimeout(() => resolve(multiResources), 100));
      fetchMock.mock(`begin:${graphqlEndpoint}`, response);

      const { page, component } = await setup({});

      expect(component.shadowRoot).toEqualHtml(`<slot name="loading"></slot>`);
      await response;
      await page.waitForChanges();
    });

    it('has-resource', async () => {
      fetchMock.mock(`begin:${graphqlEndpoint}`, multiResources);

      const { component } = await setup({});

      expect(component.shadowRoot).toEqualHtml(`<slot name="has-resource"></slot>`);
    });

    it('no-resource', async () => {
      fetchMock.mock(`begin:${graphqlEndpoint}`, { data: { resources: { edges: [] } } });

      const { component } = await setup({});

      expect(component.shadowRoot).toEqualHtml(`<slot name="no-resource"></slot>`);
    });
  });

  describe('v0 props', () => {
    it('label', async () => {
      fetchMock.mock(`begin:${graphqlEndpoint}`, singleResource);

      const { component } = await setup({ label: 'my-resource' });

      expect(component.shadowRoot).toEqualHtml(`<slot name="has-resource"></slot>`);
    });
  });

  describe('v0 events', () => {
    it('load: has resources', async () => {
      fetchMock.mock(`begin:${graphqlEndpoint}`, multiResources);

      const mockLoad = jest.fn();
      const resourceLabel = 'my-resource';
      await setup({ onLoad: mockLoad, label: resourceLabel });

      expect(mockLoad).toHaveBeenCalledWith(
        expect.objectContaining({ detail: { hasAnyResources: true, resourceLabel } })
      );
    });

    it('load: no resources', async () => {
      fetchMock.mock(`begin:${graphqlEndpoint}`, { data: null });

      const mockLoad = jest.fn();
      const resourceLabel = 'my-resource';
      await setup({ onLoad: mockLoad, label: resourceLabel });

      expect(mockLoad).toHaveBeenCalledWith(
        expect.objectContaining({ detail: { hasAnyResources: false, resourceLabel } })
      );
    });
  });
});
