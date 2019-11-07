import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldCredentials } from './manifold-credentials';
import { ManifoldCredentialsView } from '../manifold-credentials-view/manifold-credentials-view';
import { createGraphqlFetch } from '../../utils/graphqlFetch';
import { ResourceCredentialsQuery } from '../../types/graphql';

/* eslint-disable @typescript-eslint/no-explicit-any */

global.setTimeout = jest.fn();

const graphqlEndpoint = 'http://test.com/graphql';
const credentials: ResourceCredentialsQuery['resource']['credentials']['edges'] = [
  { node: { key: 'KEY_1', value: 'SECRET_1' } },
  { node: { key: 'KEY_2', value: 'SECRET_2' } },
];
const credentialsHTML = credentials
  .reduce(
    (secrets, credential) =>
      credential && credential.node
        ? [
            ...secrets,
            `<span class="env-key">${credential.node.key}</span>=<span class="env-value">${credential.node.value}</span>\n`,
          ]
        : secrets,
    []
  )
  .join('');

interface Props {
  resourceLabel?: string;
}

async function setup(props: Props) {
  const page = await newSpecPage({
    components: [ManifoldCredentials, ManifoldCredentialsView],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-credentials');
  component.graphqlFetch = createGraphqlFetch({
    endpoint: () => graphqlEndpoint,
    getAuthToken: jest.fn(() => '1234'),
    wait: () => 10,
    setAuthToken: jest.fn(),
  });
  component.resourceLabel = props.resourceLabel;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-credentials>', () => {
  beforeEach(() => {
    fetchMock.mock('begin:https://analytics.manifold.co', 200);
    // mock graphql (a resource with “error” in the name will throw)
    fetchMock.mock(graphqlEndpoint, (_, req) => {
      const body = (req.body && req.body.toString()) || '';
      return body.includes('error')
        ? { data: null, errors: [{ message: 'resource not found' }] }
        : {
            data: {
              resource: {
                resourceLabel: 'my-resource',
                credentials: { edges: credentials },
              },
            },
          };
    });
  });

  afterEach(() => fetchMock.restore());

  describe('v0 props', () => {
    it('[resource-label]: displays credentials when clicked', async () => {
      const { page, component } = await setup({ resourceLabel: 'success-resource' });

      // simulate button click to fetch credentials, and wait for page to update
      await component.showCredentials();
      await page.waitForChanges();

      const view = page.root && page.root.querySelector('manifold-credentials-view');

      // expect button to be present
      const button = view && view.shadowRoot && view.shadowRoot.querySelector('manifold-button');
      expect(button).not.toBeNull();

      const code = view && view.shadowRoot && view.shadowRoot.querySelector('code');
      expect(code && code.innerHTML).toEqualHtml(credentialsHTML);
    });

    it('[resource-label]: displays errors if not found', async () => {
      const { page, component } = await setup({ resourceLabel: 'error-resource' });

      // simulate button click to fetch credentials, and wait for page to update
      await component.showCredentials();
      await page.waitForChanges();

      const toast = page.root && page.root.querySelector('manifold-toast');
      expect(toast).not.toBeNull();
      expect(toast && toast.innerText).toBe('resource not found');
    });
  });
});
