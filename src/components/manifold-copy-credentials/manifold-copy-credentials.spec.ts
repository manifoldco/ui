import { newSpecPage, SpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

/* eslint-disable import/first */

// mock clipboard-polyfill before importing the component
const copy = jest.fn();
copy.mockImplementation(() => new Promise(resolve => resolve()));
jest.mock('clipboard-polyfill', () => ({
  writeText: copy,
}));

import { ManifoldCopyCredentials } from './manifold-copy-credentials';
import { createGraphqlFetch } from '../../utils/graphqlFetch';
import { CredentialEdge } from '../../types/graphql';

const graphqlEndpoint = 'http://test.com/graphql';
const credentials: Partial<CredentialEdge[]> = [
  { cursor: '', node: { key: 'KEY_1', value: 'SECRET_1' } },
  { cursor: '', node: { key: 'KEY_2', value: 'SECRET_2' } },
];
const credentialsText = credentials
  .reduce(
    (secrets, credential) =>
      credential && credential.node
        ? [...secrets, `${credential.node.key}=${credential.node.value}`]
        : secrets,
    []
  )
  .join('\n');

describe('<manifold-copy-credentials>', () => {
  let page: SpecPage;
  let element: HTMLManifoldCopyCredentialsElement;

  beforeEach(async () => {
    // set up test page
    page = await newSpecPage({ components: [ManifoldCopyCredentials], html: `<div></div>` });
    element = page.doc.createElement('manifold-copy-credentials');
    element.graphqlFetch = createGraphqlFetch({
      endpoint: graphqlEndpoint,
      getAuthToken: jest.fn(() => '1234'),
      wait: 10,
      setAuthToken: jest.fn(),
    });

    // reset clipboard calls
    copy.mockClear();

    // mock graphql (a resource with “error” in the name will throw)
    fetchMock.reset();
    fetchMock.mock(graphqlEndpoint, (_, req) => {
      const body = (req.body && req.body.toString()) || '';
      return body.includes('error')
        ? { data: null, errors: [{ message: 'resource not found' }] }
        : { data: { resource: { credentials: { edges: credentials } } } };
    });
  });

  describe('v0 props', () => {
    it('[resource-label]: copies creds to clipboard', async () => {
      // set up page
      element.resourceLabel = 'my-resource';
      const { root } = page;
      if (!root) {
        throw new Error('<manifold-copy-credentials> not found in document');
      }
      root.appendChild(element);
      // wait for creds to fetch
      await page.waitForChanges();

      // select button
      const button = root.querySelector('button');
      if (!button) {
        throw new Error('<button> not found in document');
      }
      // expect button is not disabled
      expect(button.getAttribute('disabled')).toBeNull();

      // expect button has creds formatted properly
      button.click();
      expect(copy).toHaveBeenCalledWith(credentialsText);
    });

    it('[resource-label]: disables button if bad resource', async () => {
      // set up page
      element.resourceLabel = 'error-resource';
      const { root } = page;
      if (!root) {
        throw new Error('<manifold-copy-credentials> not found in document');
      }
      root.appendChild(element);
      // wait for creds to fetch
      await page.waitForChanges();

      // select button
      const button = root.querySelector('button');
      if (!button) {
        throw new Error('<button> not found in document');
      }
      // expect button is disabled from error
      expect(button.getAttribute('disabled')).not.toBeNull();
    });
  });

  describe('v0 events', () => {
    it('error', async () => {
      // set up page
      const resourceLabel = 'error-resource';
      element.resourceLabel = resourceLabel;
      const { root, rootInstance, doc } = page;
      if (!root || !doc) {
        throw new Error('<manifold-copy-credentials> not found in document');
      }

      // set up listener, and wait for it to resolve
      const mockError = jest.fn();
      await new Promise(resolve => {
        mockError.mockImplementation(() => resolve());
        doc.addEventListener('manifold-copyCredentials-error', mockError);
        root.appendChild(element);
        // reload component manually because mocking the endpoint fires too quickly
        page.waitForChanges().then(() => rootInstance.componentWillLoad());
      });

      expect(mockError).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            message: 'resource not found',
            resourceLabel,
          },
        })
      );
    });

    it('success', async () => {
      const resourceLabel = 'success-resource';
      element.resourceLabel = resourceLabel;
      const { root, doc } = page;
      if (!root || !doc) {
        throw new Error('<manifold-copy-credentials> not found in document');
      }
      root.appendChild(element);
      // wait for creds
      await page.waitForChanges();

      // select button
      const button = root.querySelector('button');
      if (!button) {
        throw new Error('<button> not found in document');
      }

      // set up listener, and wait for it to resolve
      const mockSuccess = jest.fn();
      await new Promise(resolve => {
        mockSuccess.mockImplementation(() => resolve());
        doc.addEventListener('manifold-copyCredentials-success', mockSuccess);
        button.click();
      });
      expect(mockSuccess).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            resourceLabel,
          },
        })
      );
    });
  });

  describe('security', () => {
    it('credentials aren’t exposed in success event', async () => {
      const resourceLabel = 'my-resource';
      element.resourceLabel = resourceLabel;
      const { root, doc } = page;
      if (!root || !doc) {
        throw new Error('<manifold-copy-credentials> not found in document');
      }
      root.appendChild(element);
      // wait for creds
      await page.waitForChanges();

      // select button
      const button = root.querySelector('button');
      if (!button) {
        throw new Error('<button> not found in document');
      }

      // set up listeners, and wait for success
      const mockSuccess = jest.fn();
      await new Promise(resolve => {
        mockSuccess.mockImplementation(() => resolve());
        doc.addEventListener('manifold-copyCredentials-success', mockSuccess);
        button.click();
      });

      const eventData = JSON.stringify(
        mockSuccess.mock.calls.map(({ detail }) => JSON.stringify(detail))
      );

      // ensure no credentials are present in output
      credentials.forEach(credential => {
        if (!credential || !credential.node) {
          throw new Error('credential node missing');
        }
        expect(eventData.includes(credential.node.key)).toBe(false);
        expect(eventData.includes(credential.node.value)).toBe(false);
      });
    });

    it('credentials aren’t exposed in any HTML', async () => {
      element.resourceLabel = 'my-resource';
      const { root } = page;
      if (!root) {
        throw new Error('<manifold-copy-credentials> not found in document');
      }
      root.appendChild(element);
      await page.waitForChanges();
      const html = root.outerHTML;

      credentials.forEach(credential => {
        if (!credential || !credential.node) {
          throw new Error('credential node missing');
        }
        expect(html.includes(credential.node.key)).toBe(false);
        expect(html.includes(credential.node.value)).toBe(false);
      });
    });
  });
});
