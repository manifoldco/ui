import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';
import { ManifoldPlanSelector } from './manifold-plan-selector';
import { createGraphqlFetch } from '../../utils/graphqlFetch';
import product from '../../spec/mock/graphql/product';

const graphqlEndpoint = 'http://test.com/graphql';

async function setup() {
  const page = await newSpecPage({
    components: [ManifoldPlanSelector],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-plan-selector');
  component.graphqlFetch = createGraphqlFetch({ endpoint: () => graphqlEndpoint });
  component.productLabel = 'test-product';

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe(`<manifold-plan-selector>`, () => {
  beforeEach(() => fetchMock.mock(`begin:${graphqlEndpoint}`, { data: { product } }));
  afterEach(() => fetchMock.restore());

  describe('v0 props', () => {
    it('[product-label]', async () => {
      await setup();
      expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(true);
    });
  });
});
