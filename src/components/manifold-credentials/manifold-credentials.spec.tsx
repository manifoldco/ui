import { newSpecPage, SpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldCredentials } from './manifold-credentials';
import { ManifoldCredentialsView } from '../manifold-credentials-view/manifold-credentials-view';
import { createGraphqlFetch } from '../../utils/graphqlFetch';
import { CredentialEdge } from '../../types/graphql';

/* eslint-disable @typescript-eslint/no-explicit-any */

const graphqlEndpoint = 'http://test.com/graphql';
const credentials: Partial<CredentialEdge[]> = [
  { cursor: '', node: { key: 'KEY_1', value: 'SECRET_1' } },
  { cursor: '', node: { key: 'KEY_2', value: 'SECRET_2' } },
];
const credentialsHTML = credentials
  .reduce(
    (secrets, credential) =>
      credential && credential.node
        ? [
            ...secrets,
            `<span class="env-key">${credential.node.key}</span>=<span class="env-value">${credential.node.value}</span>`,
          ]
        : secrets,
    []
  )
  .join('');

describe('<manifold-credentials>', () => {
  let page: SpecPage;
  let element: HTMLManifoldCredentialsElement;

  beforeEach(async () => {
    // set up test page
    page = await newSpecPage({
      components: [ManifoldCredentials, ManifoldCredentialsView],
      html: `<div></div>`,
    });
    element = page.doc.createElement('manifold-credentials');
    element.graphqlFetch = createGraphqlFetch({
      endpoint: () => graphqlEndpoint,
      getAuthToken: jest.fn(() => '1234'),
      wait: () => 10,
      setAuthToken: jest.fn(),
    });

    // mock graphql (a resource with “error” in the name will throw)
    fetchMock.reset();
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

  describe('v0 props', () => {
    it('[resource-label]: displays credentials when clicked', async () => {
      element.resourceLabel = 'success-resource';
      if (!page.root) {
        throw new Error('<manifold-credentials> not in document');
      }
      page.root.appendChild(element);

      // simulate button click to fetch credentials, and wait for page to update
      element.showCredentials();
      await page.waitForChanges();

      const view = page.root && page.root.querySelector('manifold-credentials-view');

      // expect button to be present
      const button = view && view.shadowRoot && view.shadowRoot.querySelector('manifold-button');
      expect(button).not.toBeNull();

      const code = view && view.shadowRoot && view.shadowRoot.querySelector('code');
      expect(code && code.innerHTML).toEqualHtml(credentialsHTML);
    });

    it('[resource-label]: displays errors if not found', async () => {
      element.resourceLabel = 'error-resource';
      if (!page.root) {
        throw new Error('<manifold-credentials> not in document');
      }
      page.root.appendChild(element);

      // simulate button click to fetch credentials, and wait for page to update
      element.showCredentials();
      await page.waitForChanges();

      const toast = page.root.querySelector('manifold-toast');
      expect(toast).not.toBeNull();
      expect(toast && toast.innerText).toBe('resource not found');
    });
  });
});
