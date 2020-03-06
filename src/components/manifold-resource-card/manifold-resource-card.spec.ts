import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';
import { ManifoldResourceCard } from './manifold-resource-card';
import { createGraphqlFetch } from '../../utils/graphqlFetch';

const graphqlEndpoint = 'http://test.com/graphql';

interface Setup {
  ownerId?: string;
  label?: string;
}

async function setup({ label, ownerId }: Setup) {
  const page = await newSpecPage({
    components: [ManifoldResourceCard],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-resource-card');
  component.graphqlFetch = createGraphqlFetch({ endpoint: () => graphqlEndpoint });
  component.label = label;
  component.ownerId = ownerId;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-data-has-resource>', () => {
  beforeEach(() => fetchMock.mock(`begin:${graphqlEndpoint}`, 200));
  afterEach(fetchMock.restore);

  describe('v0 props', () => {
    it('[owner-id]: uses if passed', async () => {
      await setup({ label: 'my-resource', ownerId: 'my-owner-id' });

      const [[_, firstRequest]] = fetchMock.calls();
      const body = JSON.parse(`${firstRequest && firstRequest.body}`);
      const { variables } = body;

      expect(variables.owner).toBe('my-owner-id');
    });
  });
});
