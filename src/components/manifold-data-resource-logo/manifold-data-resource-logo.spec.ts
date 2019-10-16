import fetchMock, { MockResponseObject } from 'fetch-mock';
import { newSpecPage } from '@stencil/core/testing';
import { ManifoldDataResourceLogo } from './manifold-data-resource-logo';
import { createGraphqlFetch, GraphqlError } from '../../utils/graphqlFetch';
import { resource } from '../../spec/mock/graphql';

const graphqlEndpoint = 'http://test.com/graphql';

async function setup(resourceLabel: string) {
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
  component.resourceLabel = resourceLabel;

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
      if (body.includes('query RESOURCE_LOGO')) {
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

  afterEach(() => {
    fetchMock.restore();
  });

  it('fetches resource on load', async () => {
    const resourceLabel = 'my-resource';
    await setup(resourceLabel);
    expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(true);
  });

  it('fetches resource on change', async () => {
    const resourceLabel = 'my-resource';
    const { page, component } = await setup(resourceLabel);

    const newResourceLabel = 'new-resource';

    component.resourceLabel = newResourceLabel;
    await page.waitForChanges();

    const req = fetchMock.lastOptions(`begin:${graphqlEndpoint}`) as MockResponseObject;
    const body = (req && req.body && req.body.toString()) || '';
    const { variables } = JSON.parse(body);

    expect(variables.resourceLabel).toMatch(newResourceLabel);
  });
});
