import fetchMock, { MockResponseObject } from 'fetch-mock';
import { newSpecPage } from '@stencil/core/testing';
import { ManifoldDataResourceLogo } from './manifold-data-resource-logo';
import { createGraphqlFetch, GraphqlError } from '../../utils/graphqlFetch';
import resource from '../../spec/mock/elegant-cms/resource';

const graphqlEndpoint = 'http://test.com/graphql';

interface SetupProps {
  resourceLabel: string;
  ownerId?: string;
}

async function setup(props: SetupProps) {
  const page = await newSpecPage({
    components: [ManifoldDataResourceLogo],
    html: '<div></div>',
  });
  const component = page.doc.createElement('manifold-data-resource-logo');
  component.graphqlFetch = createGraphqlFetch({
    endpoint: () => graphqlEndpoint,
    getAuthToken: jest.fn(() => '1234'),
    wait: () => 10,
    setAuthToken: jest.fn(),
  });
  component.resourceLabel = props.resourceLabel;
  component.ownerId = props.ownerId;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-data-resource-logo>', () => {
  beforeEach(async () => {
    fetchMock.mock(graphqlEndpoint, (_, req) => {
      const body = (req.body && req.body.toString()) || '';
      const { variables } = JSON.parse(body);
      const errors: GraphqlError[] = [{ message: 'something went wrong' }];
      if (body.includes('query ResourceLogo')) {
        // return new label in response
        const newResource = {
          ...resource,
          id: variables.resourceId || resource.id,
        };
        return body.includes('error') ? { data: null, errors } : { data: { data: newResource } };
      }
      return { data: null, errors };
    });
  });

  afterEach(fetchMock.restore);

  describe('v0 props', () => {
    it('[owner-id]: uses if passed', async () => {
      await setup({ resourceLabel: 'my-resource', ownerId: 'my-owner-id' });

      const [[_, firstRequest]] = fetchMock.calls();
      const body = JSON.parse(`${firstRequest && firstRequest.body}`);
      const { variables } = body;

      expect(variables.owner).toBe('my-owner-id');
    });
  });

  it('fetches resource on load', async () => {
    const resourceLabel = 'my-resource';
    await setup({ resourceLabel });
    expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(true);
  });

  it('fetches resource on change', async () => {
    const resourceLabel = 'my-resource';
    const { page, component } = await setup({ resourceLabel });

    const newResourceLabel = 'new-resource';

    component.resourceLabel = newResourceLabel;
    await page.waitForChanges();

    const req = fetchMock.lastOptions(`begin:${graphqlEndpoint}`) as MockResponseObject;
    const body = (req && req.body && req.body.toString()) || '';
    const { variables } = JSON.parse(body);

    expect(variables.resourceLabel).toMatch(newResourceLabel);
  });
});
