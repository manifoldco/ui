import { newSpecPage, SpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { Resource, Credential } from '../../spec/mock/marketplace';
import { connections } from '../../utils/connections';
import { ManifoldCopyCredentials } from './manifold-copy-credentials';
import { createRestFetch } from '../../utils/restFetch';

describe('<manifold-copy-credentials>', () => {
  let page: SpecPage;
  let element: HTMLManifoldCopyCredentialsElement;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [ManifoldCopyCredentials],
      html: `<div></div>`,
    });
    element = page.doc.createElement('manifold-copy-credentials');
    element.restFetch = createRestFetch({
      getAuthToken: jest.fn(() => '1234'),
      wait: 10,
      setAuthToken: jest.fn(),
    });

    fetchMock.reset();
  });

  it('fetches resource id on change if not set', () => {
    const resourceLabel = 'new-resource';

    const provisionButton = new ManifoldCopyCredentials();
    provisionButton.fetchResourceId = jest.fn();
    provisionButton.resourceLabel = 'old-resource';

    provisionButton.labelChange(resourceLabel);
    expect(provisionButton.fetchResourceId).toHaveBeenCalledWith(resourceLabel);
  });

  it('does not resource id on change if set', () => {
    const resourceLabel = 'new-resource';

    const provisionButton = new ManifoldCopyCredentials();
    provisionButton.fetchResourceId = jest.fn();
    provisionButton.resourceLabel = 'old-resource';
    provisionButton.resourceId = '1234';

    provisionButton.labelChange(resourceLabel);
    expect(provisionButton.fetchResourceId).not.toHaveBeenCalled();
  });

  describe('when created without a resource ID', () => {
    it('will fetch the resource id', async () => {
      const resourceLabel = 'new-resource';

      fetchMock.mock(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`, [
        Resource,
      ]);

      const root = page.root as HTMLElement;
      element.resourceLabel = resourceLabel;
      root.appendChild(element);
      await page.waitForChanges();

      expect(
        fetchMock.called(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`)
      ).toBe(true);

      expect(element.querySelectorAll('button')).toHaveLength(1);
      expect(element.querySelector('button')).toEqualHtml(`
        <button data-resource-id="${Resource.id}"></button>
      `);
    });

    it('will do nothing on a fetch error', async () => {
      const resourceLabel = 'new-resource';

      fetchMock.mock(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`, []);

      const root = page.root as HTMLElement;
      element.resourceLabel = resourceLabel;
      root.appendChild(element);
      await page.waitForChanges();

      expect(
        fetchMock.called(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`)
      ).toBe(true);

      expect(element.querySelectorAll('button')).toHaveLength(1);
      expect(element.querySelector('button')).toEqualHtml(`
        <button disabled="" data-resource-id></button>
      `);
    });
  });

  describe('When sending a request to get credentials', () => {
    it('will do nothing if still loading', async () => {
      fetchMock
        .mock(`${connections.prod.marketplace}/resources/?me&label=test`, [])
        .mock(`path:/v1/credentials/`, [Credential]);

      const root = page.root as HTMLElement;
      element.resourceLabel = 'test';
      root.appendChild(element);
      await page.waitForChanges();

      expect(element.querySelector('button')).toBeDefined();
      // @ts-ignore
      element.querySelector('button').click();
      await page.waitForChanges();

      expect(fetchMock.called(`path:/v1/credentials/`)).toBe(false);
    });

    it('will do nothing if no resourceId is provided', async () => {
      fetchMock
        .mock(`${connections.prod.marketplace}/resources/?me&label=test`, [])
        .mock(`path:/v1/credentials/`, [Credential]);

      const root = page.root as HTMLElement;
      element.resourceLabel = Resource.body.label;
      root.appendChild(element);
      await page.waitForChanges();

      element.resourceId = undefined;
      expect(element.querySelector('button')).toBeDefined();
      // @ts-ignore
      element.querySelector('button').click();
      await page.waitForChanges();

      expect(fetchMock.called(`path:/v1/credentials/`)).toBe(false);
    });
  });

  describe('events', () => {
    beforeEach(() => fetchMock.mock(/\/resources\//, [Resource]));

    it('click', async () => {
      fetchMock.mock(`path:/v1/credentials/`, [Credential]);

      if (!page.root) {
        throw new Error('<manifold-copy-credentials> not found in document');
      }

      const resourceLabel = 'click-label';
      element.resourceLabel = resourceLabel;
      page.root.appendChild(element);
      await page.waitForChanges();

      const button = element.querySelector('button');
      if (!button) {
        throw new Error('button not found in document');
      }

      const onClick = jest.fn();
      await new Promise(resolve => {
        // listen for event and fire
        onClick.mockImplementation(() => resolve());
        element.addEventListener('manifold-getCredentialsButton-click', onClick);
        button.click();
      });

      expect(fetchMock.called(`path:/v1/credentials/`)).toBe(true);
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            resourceLabel,
            resourceId: Resource.id,
          },
        })
      );
    });

    it('error', async () => {
      const message = 'ohnoes';
      fetchMock.mock(`path:/v1/credentials/`, {
        status: 500,
        body: { message },
      });

      if (!page.root) {
        throw new Error('<manifold-copy-credentials> not found in document');
      }

      const resourceLabel = 'error-label';
      element.resourceLabel = resourceLabel;
      page.root.appendChild(element);
      await page.waitForChanges();

      const button = element.querySelector('button');
      if (!button) {
        throw new Error('button not found in document');
      }

      const onError = jest.fn();
      await new Promise(resolve => {
        // listen for event and fire
        onError.mockImplementation(() => resolve());
        element.addEventListener('manifold-getCredentialsButton-error', onError);
        button.click();
      });

      expect(fetchMock.called(`path:/v1/credentials/`)).toBe(true);
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            message,
            resourceLabel,
            resourceId: Resource.id,
          },
        })
      );
    });

    it('success with copy to clipboard', async () => {
      fetchMock.mock(`path:/v1/credentials/`, [Credential]);

      if (!page.root) {
        throw new Error('<manifold-sso-button> not found in document');
      }

      const resourceLabel = 'success-label';
      element.resourceLabel = resourceLabel;
      page.root.appendChild(element);
      await page.waitForChanges();

      const button = element.querySelector('button');
      if (!button) {
        throw new Error('button not found in document');
      }

      const onSuccess = jest.fn();
      await new Promise(resolve => {
        // listen for event and fire
        onSuccess.mockImplementation(() => resolve());
        element.addEventListener('manifold-getCredentialsButton-success', onSuccess);
        button.click();
      });

      expect(fetchMock.called(`path:/v1/credentials/`)).toBe(true);
      expect(onSuccess).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            message: `successfully obtained the credentials for ${resourceLabel}`,
            resourceLabel,
            resourceId: Resource.id,
            credentials: Credential.body.values,
          },
        })
      );
    });
  });
});
