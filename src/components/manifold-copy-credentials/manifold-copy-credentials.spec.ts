import { newSpecPage, SpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldCopyCredentials } from './manifold-copy-credentials';
import { createGraphqlFetch } from '../../utils/graphqlFetch';
import { CredentialEdge } from '../../types/graphql';

const graphqlEndpoint = 'http://test.com/graphql';
const credentials: Partial<CredentialEdge[]> = [
  { cursor: '', node: { key: 'KEY_1', value: 'SECRET_1' } },
  { cursor: '', node: { key: 'KEY_2', value: 'SECRET_2' } },
];

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

    // mock graphql (a resource with “error” in the name will throw)
    fetchMock.reset();
    fetchMock.mock(graphqlEndpoint, (_, req) => {
      const body = (req.body && req.body.toString()) || '';
      return body.includes('error')
        ? { data: null, errors: [{ message: 'resource not found' }] }
        : { data: { resource: { credentials: { edges: credentials } } } };
    });
  });

  describe('v0 API', () => {
    it('[resource-label]: fetches creds', async () => {
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
      const secretText = credentials
        .reduce(
          (secrets, credential) =>
            credential && credential.node
              ? [...secrets, `${credential.node.key}=${credential.node.value}`]
              : secrets,
          []
        )
        .join('\n');
      expect(button.getAttribute('data-clipboard-text')).toBe(secretText);
    });

    it('[resource-label]: errs if missing', async () => {
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

  describe('security', () => {
    it('credentials aren’t exposed in any events', async () => {
      element.resourceLabel = 'my-resource';
      const { root, doc } = page;
      if (!root || !doc) {
        throw new Error('<manifold-copy-credentials> not found in document');
      }
      root.appendChild(element);
      // wait for creds
      await page.waitForChanges();

      // store all event data
      let eventData = '';

      // select button
      const button = root.querySelector('button');
      if (!button) {
        throw new Error('<button> not found in document');
      }

      // set up listeners, and wait for success
      const mockError = jest.fn();
      const mockSuccess = jest.fn();
      await new Promise(resolve => {
        mockError.mockImplementation(args => {
          eventData = `${eventData}${JSON.stringify(args)}`;
        });
        mockSuccess.mockImplementation(args => {
          eventData = `${eventData}${JSON.stringify(args)}`;
          resolve();
        });
        doc.addEventListener('manifold-copyCredentials-error', mockError);
        doc.addEventListener('manifold-copyCredentials-success', mockSuccess);
        button.click();
      });

      // ensure no credentials are present in output
      credentials.forEach(credential => {
        if (!credential || !credential.node) {
          throw new Error('credential node missing');
        }
        expect(eventData.includes(credential.node.key)).toBe(false);
        expect(eventData.includes(credential.node.value)).toBe(false);
      });
    });
  });

  describe('events', () => {
    it('error', async () => {
      // set up page
      element.resourceLabel = 'error-resource';
      const { root, doc } = page;
      if (!root || !doc) {
        throw new Error('<manifold-copy-credentials> not found in document');
      }

      // set up listener, and wait for it to resolve
      const mockError = jest.fn();
      await new Promise(resolve => {
        mockError.mockImplementation(() => resolve());
        doc.addEventListener('manifold-copyCredentials-error', mockError);
        root.appendChild(element);
      });

      expect(mockError).toHaveBeenCalledWith(expect.objectContaining({ detail: {} }));
    });

    it('success', async () => {
      element.resourceLabel = 'my-resource';
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
      expect(mockSuccess).toHaveBeenCalledWith(expect.objectContaining({ detail: {} }));
    });
  });
});
