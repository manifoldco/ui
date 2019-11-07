import { newSpecPage, SpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldResourceContainer } from './manifold-resource-container';
import { createGraphqlFetch } from '../../utils/graphqlFetch';
import { ResourceStatusLabel } from '../../types/graphql';

const graphqlEndpoint = 'http://test.com/graphql';

const GraphqlResource = {
  data: {
    resource: {
      status: {
        label: ResourceStatusLabel.Creating,
      },
      plan: {
        product: {
          id: '1234',
          displayName: 'Product',
          tagline: 'Amazing product',
          label: 'product',
          logoUrl: 'https://fillmurray.com/200/200',
        },
      },
    },
  },
};

fetchMock.config.overwriteRoutes = false;

describe('<manifold-resource-credentials>', () => {
  let page: SpecPage;
  let element: HTMLManifoldResourceContainerElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [ManifoldResourceContainer],
      html: `<div></div>`,
    });
    page.win.setTimeout = jest.fn();
    element = page.doc.createElement('manifold-resource-container');
    element.graphqlFetch = createGraphqlFetch({
      endpoint: () => graphqlEndpoint,
    });
    fetchMock.mock('begin:https://analytics.manifold.co', 200);
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('fetches resource on label change', () => {
    const newResource = 'new-resource';
    const resourceCreds = new ManifoldResourceContainer();
    resourceCreds.fetchResource = jest.fn();
    resourceCreds.resourceLabel = 'old-resource';
    resourceCreds.resourceChange(newResource);
    expect(resourceCreds.fetchResource).toHaveBeenCalledWith(newResource);
  });

  it('fetches resource on refetch change', () => {
    const resourceCreds = new ManifoldResourceContainer();
    resourceCreds.fetchResource = jest.fn();
    resourceCreds.resourceLabel = 'old-resource';
    resourceCreds.refreshChange(true);
    expect(resourceCreds.fetchResource).toHaveBeenCalledWith('old-resource');
  });

  it('will fetch the resource on load', async () => {
    const resourceLabel = 'test-resource';
    fetchMock.mock(graphqlEndpoint, GraphqlResource);
    const root = page.root as HTMLElement;
    element.resourceLabel = resourceLabel;
    root.appendChild(element);
    await page.waitForChanges();
    expect(fetchMock.called(graphqlEndpoint)).toBe(true);
  });

  it('will not fetch the resource if the component has no resource label', async () => {
    fetchMock.mock(graphqlEndpoint, GraphqlResource);
    const root = page.root as HTMLElement;
    root.appendChild(element);
    await page.waitForChanges();
    expect(fetchMock.called(graphqlEndpoint)).toBe(false);
  });

  it('will refetch the resource after load if given an invalid resource', async () => {
    const resourceLabel = 'test-resource';
    fetchMock.once(graphqlEndpoint, GraphqlResource).once(graphqlEndpoint, {
      data: {
        resource: {
          ...GraphqlResource.data.resource,
          status: { label: ResourceStatusLabel.Available },
        },
      },
    });

    const root = page.root as HTMLElement;
    element.resourceLabel = resourceLabel;
    element.refetchUntilValid = true;
    root.appendChild(element);
    await page.waitForChanges();
    expect(fetchMock.called(graphqlEndpoint)).toBe(true);
    expect(page.win.setTimeout).toHaveBeenCalledTimes(1);
  });

  it('will refetch the resource after load if it received an error', async () => {
    const resourceLabel = 'test-resource';
    // In order to test refetching resources we need to set the resource status label
    // to available when the first timeout is called.
    // @ts-ignore

    fetchMock.mock(graphqlEndpoint, { errors: 'something really bad' }).once(graphqlEndpoint, {
      data: {
        resource: {
          ...GraphqlResource.data.resource,
          status: { label: ResourceStatusLabel.Available },
        },
      },
    });

    const root = page.root as HTMLElement;
    element.resourceLabel = resourceLabel;
    element.refetchUntilValid = true;
    root.appendChild(element);
    await page.waitForChanges();
    expect(fetchMock.called(graphqlEndpoint)).toBe(true);
    expect(page.win.setTimeout).toHaveBeenCalled();
  });
});
