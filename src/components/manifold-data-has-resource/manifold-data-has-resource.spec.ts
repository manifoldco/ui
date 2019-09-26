import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldDataHasResource } from './manifold-data-has-resource';
import { resource } from '../../spec/mock/graphql';
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

async function setup(label?: string) {
  const page = await newSpecPage({
    components: [ManifoldDataHasResource],
    html: `<div></div>`,
  });
  const component = page.doc.createElement('manifold-data-has-resource');
  component.graphqlFetch = createGraphqlFetch({ endpoint: () => graphqlEndpoint });
  component.paused = true;
  component.innerHTML = `
    <div slot="loading"></div>
    <div slot="has-resource"></div>
    <div slot="no-resource"></div>
  `;
  if (label) {
    component.label = label;
  }
  (page.root as HTMLDivElement).appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-data-has-resource>', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('v0 slots', () => {
    it('loading', async () => {
      fetchMock.mock(
        `begin:${graphqlEndpoint}`,
        new Promise(resolve => setTimeout(() => resolve(multiResources), 100)) // arbitrary, but usually enough time for the 1st render to complete
      );
      const { component } = await setup();
      expect(component.shadowRoot).toEqualHtml(`<slot name="loading"></slot>`);
    });

    it('has-resource', async () => {
      fetchMock.mock(`begin:${graphqlEndpoint}`, multiResources);
      const { component } = await setup();
      expect(component.shadowRoot).toEqualHtml(`<slot name="has-resource"></slot>`);
    });

    it('no-resource', async () => {
      fetchMock.mock(`begin:${graphqlEndpoint}`, { data: { resources: { edges: [] } } });
      const { component } = await setup();
      expect(component.shadowRoot).toEqualHtml(`<slot name="no-resource"></slot>`);
    });
  });

  describe('v0 props', () => {
    it('label', async () => {
      fetchMock.mock(`begin:${graphqlEndpoint}`, singleResource);
      const { component } = await setup('my-resource');
      expect(component.shadowRoot).toEqualHtml(`<slot name="has-resource"></slot>`);
    });
  });

  describe('v0 events', () => {
    it('load:', async () => {
      fetchMock.mock(`begin:${graphqlEndpoint}`, multiResources);

      // event listener
      const mockLoad = jest.fn();

      const page = await newSpecPage({
        components: [ManifoldDataHasResource],
        html: '<div></div>',
      });
      page.doc.addEventListener('manifold-hasResource-load', mockLoad);
      const component = page.doc.createElement('manifold-data-has-resource');
      component.graphqlFetch = createGraphqlFetch({ endpoint: () => graphqlEndpoint });
      component.paused = true;
      component.label = 'my-resource';
      (page.root as HTMLDivElement).appendChild(component);
      await page.waitForChanges();

      // wait for event
      await new Promise(resolve => mockLoad.mockImplementation(() => resolve()));
      expect(mockLoad).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            hasAnyResources: true,
            resourceLabel: 'my-resource',
          },
        })
      );
    });
  });
});
