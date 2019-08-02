import { newSpecPage, SpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { Resource } from '../../spec/mock/marketplace';
import { connections } from '../../utils/connections';
import { Connector } from '../../types/connector';
import { ManifoldDataSsoButton } from './manifold-data-sso-button';
import { createRestFetch } from '../../utils/restFetch';

describe('<manifold-data-sso-button>', () => {
  let page: SpecPage;
  let element: HTMLManifoldDataSsoButtonElement;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [ManifoldDataSsoButton],
      html: `<div></div>`,
    });
    element = page.doc.createElement('manifold-data-sso-button');
    element.restFetch = createRestFetch({
      getAuthToken: jest.fn(() => '1234'),
      wait: 10,
      setAuthToken: jest.fn(),
    });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('fetches resource id on change if not set', () => {
    const resourceLabel = 'new-resource';

    const provisionButton = new ManifoldDataSsoButton();
    provisionButton.fetchResourceId = jest.fn();
    provisionButton.resourceLabel = 'old-resource';

    provisionButton.labelChange(resourceLabel);
    expect(provisionButton.fetchResourceId).toHaveBeenCalledWith(resourceLabel);
  });

  it('does not resource id on change if set', () => {
    const resourceLabel = 'new-resource';

    const provisionButton = new ManifoldDataSsoButton();
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
        <button type="submit" data-resource-id="${Resource.id}"></button>
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
        <button type="submit" disabled="" data-resource-id></button>
      `);
    });
  });

  describe('When sending a request to sso', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    beforeEach(() => {
      fetchMock.mock(`${connections.prod.marketplace}/resources/?me&label=${Resource.body.label}`, [
        Resource,
      ]);
    });

    const authCode: Connector.AuthorizationCode = {
      id: '1',
      type: 'authorization_code',
      version: '1',
      body: {
        code: '1234',
        redirect_uri: 'http://test.test',
        user_id: '1',
        resource_id: Resource.id,
        created_at: '2019-04-25T22:11:06.691Z',
        expires_at: '2019-04-25T22:11:06.691Z',
      },
    };

    it('will trigger a dom event on successful sso', async () => {
      const onClick = jest.fn();
      const onSuccess = jest.fn();
      fetchMock.mock(`${connections.prod.connector}/sso`, authCode);

      const root = page.root as HTMLElement;
      element.resourceLabel = Resource.body.label;
      root.appendChild(element);
      await page.waitForChanges();

      element.addEventListener('manifold-ssoButton-click', onClick);
      element.addEventListener('manifold-ssoButton-success', onSuccess);
      expect(element.querySelector('button')).toBeDefined();
      // @ts-ignore
      element.querySelector('button').click();
      await page.waitForChanges();
      // TODO: wait for changes does not wait for all events to finish emitting.... WHYYYYYYY
      // TODO: Wait on this: https://github.com/ionic-team/stencil/issues/1781
      await new Promise(resolve => setTimeout(resolve, 1000));

      expect(fetchMock.called(`${connections.prod.connector}/sso`)).toBe(true);
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            resourceLabel: Resource.body.label,
            resourceId: Resource.id,
          },
        })
      );
      expect(onSuccess).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            message: `${Resource.body.label} successfully ssoed`,
            resourceLabel: Resource.body.label,
            resourceId: Resource.id,
            redirectUrl: authCode.body.redirect_uri,
          },
        })
      );
    });

    it('will trigger a dom event on failed sso', async () => {
      const onError = jest.fn();
      fetchMock.mock(`${connections.prod.connector}/sso`, {
        status: 500,
        body: {
          message: 'ohnoes',
        },
      });

      const root = page.root as HTMLElement;
      element.resourceLabel = Resource.body.label;
      root.appendChild(element);
      await page.waitForChanges();

      element.addEventListener('manifold-ssoButton-error', onError);
      expect(element.querySelector('button')).toBeDefined();
      // @ts-ignore
      element.querySelector('button').click();
      await page.waitForChanges();
      // TODO: wait for changes does not wait for all events to finish emitting.... WHYYYYYYY
      // TODO: Wait on this: https://github.com/ionic-team/stencil/issues/1781
      await new Promise(resolve => setTimeout(resolve, 1000));

      expect(fetchMock.called(`${connections.prod.connector}/sso`)).toBe(true);
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            message: 'ohnoes',
            resourceLabel: Resource.body.label,
            resourceId: Resource.id,
          },
        })
      );
    });

    it('will do nothing if still loading', async () => {
      fetchMock
        .mock(`${connections.prod.marketplace}/resources/?me&label=test`, [])
        .mock(`${connections.prod.connector}/sso`, 200);

      const root = page.root as HTMLElement;
      element.resourceLabel = 'test';
      root.appendChild(element);
      await page.waitForChanges();

      expect(element.querySelector('button')).toBeDefined();
      // @ts-ignore
      element.querySelector('button').click();
      await page.waitForChanges();

      expect(fetchMock.called(`${connections.prod.connector}/sso`)).toBe(false);
    });

    it('will do nothing if no resourceId is provided', async () => {
      fetchMock
        .mock(`${connections.prod.marketplace}/resources/?me&label=test`, [])
        .mock(`${connections.prod.connector}/sso`, 200);

      const root = page.root as HTMLElement;
      element.resourceLabel = Resource.body.label;
      root.appendChild(element);
      await page.waitForChanges();

      element.resourceId = undefined;
      expect(element.querySelector('button')).toBeDefined();
      // @ts-ignore
      element.querySelector('button').click();
      await page.waitForChanges();

      expect(fetchMock.called(`${connections.prod.connector}/sso`)).toBe(false);
    });
  });
});
