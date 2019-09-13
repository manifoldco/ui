import { newSpecPage, SpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldResourceContainer } from './manifold-resource-container';
import { connections } from '../../utils/connections';
import { createRestFetch } from '../../utils/restFetch';
import { createGraphqlFetch } from '../../utils/graphqlFetch';
import { GatewayResource } from '../../spec/mock/gateway';

const graphqlEndpoint = 'http://test.com/graphql';

const GraphqlResource = {
  data: {
    resource: {
      plan: {
        product: {
          id: '1234',
          displayName: 'Product',
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
    element = page.doc.createElement('manifold-resource-container');
    element.restFetch = createRestFetch({
      getAuthToken: jest.fn(() => '1234'),
      wait: 10,
      setAuthToken: jest.fn(),
    });
    element.graphqlFetch = createGraphqlFetch({
      endpoint: graphqlEndpoint,
      getAuthToken: jest.fn(() => '1234'),
      wait: 10,
      setAuthToken: jest.fn(),
    });
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
    fetchMock.mock(`${connections.prod.gateway}/resources/me/${resourceLabel}`, GatewayResource);
    fetchMock.mock(graphqlEndpoint, GraphqlResource);
    const root = page.root as HTMLElement;
    element.resourceLabel = resourceLabel;
    root.appendChild(element);
    await page.waitForChanges();
    expect(fetchMock.called(`${connections.prod.gateway}/resources/me/${resourceLabel}`)).toBe(
      true
    );
    expect(fetchMock.called(graphqlEndpoint)).toBe(true);
  });
  it('will not fetch the resource if the component has no resource label', async () => {
    const resourceLabel = 'test-resource';
    fetchMock.mock(`${connections.prod.gateway}/resources/me/${resourceLabel}`, GatewayResource);
    fetchMock.mock(graphqlEndpoint, GraphqlResource);
    const root = page.root as HTMLElement;
    root.appendChild(element);
    await page.waitForChanges();
    expect(fetchMock.called(`${connections.prod.gateway}/resources/me/${resourceLabel}`)).toBe(
      false
    );
    expect(fetchMock.called(graphqlEndpoint)).toBe(false);
  });
  it('will refetch the resource after load if given an invalid resource', async () => {
    const resourceLabel = 'test-resource';
    // @ts-ignore
    page.win.setTimeout = jest.fn(call => call());
    fetchMock
      .once(`${connections.prod.gateway}/resources/me/${resourceLabel}`, {})
      .once(`${connections.prod.gateway}/resources/me/${resourceLabel}`, GatewayResource);

    fetchMock.mock(graphqlEndpoint, GraphqlResource);

    const root = page.root as HTMLElement;
    element.resourceLabel = resourceLabel;
    element.refetchUntilValid = true;
    root.appendChild(element);
    await page.waitForChanges();
    expect(fetchMock.called(`${connections.prod.gateway}/resources/me/${resourceLabel}`)).toBe(
      true
    );
    expect(fetchMock.called(graphqlEndpoint)).toBe(true);
    expect(window.setTimeout).toHaveBeenCalledTimes(1);
  });
  it('will refetch the resource after load if it received an error', async () => {
    const resourceLabel = 'test-resource';
    // @ts-ignore
    page.win.setTimeout = jest.fn(call => call());
    fetchMock
      .once(`${connections.prod.gateway}/resources/me/${resourceLabel}`, 404)
      .once(`${connections.prod.gateway}/resources/me/${resourceLabel}`, GatewayResource);

    fetchMock.mock(graphqlEndpoint, GraphqlResource);

    const root = page.root as HTMLElement;
    element.resourceLabel = resourceLabel;
    element.refetchUntilValid = true;
    root.appendChild(element);
    await page.waitForChanges();
    expect(fetchMock.called(graphqlEndpoint)).toBe(true);
    expect(fetchMock.called(`${connections.prod.gateway}/resources/me/${resourceLabel}`)).toBe(
      true
    );
    expect(window.setTimeout).toHaveBeenCalledTimes(1);
  });
});
