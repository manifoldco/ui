import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { Resource } from '../../spec/mock/marketplace';
import { connections } from '../../utils/connections';
import { Connector } from '../../types/connector';
import { ManifoldDataSsoButton } from './manifold-data-sso-button';
import { createRestFetch } from '../../utils/restFetch';

/* eslint-disable @typescript-eslint/no-explicit-any */
const proto = ManifoldDataSsoButton.prototype as any;
const oldCallback = proto.componentWillLoad;

proto.componentWillLoad = function() {
  (this as any).restFetch = createRestFetch({
    getAuthToken: jest.fn(() => '1234'),
    wait: 10,
    setAuthToken: jest.fn(),
  });

  if (oldCallback) {
    oldCallback.call(this);
  }
};

describe('<manifold-data-sso-button>', () => {
  it('fetches the resource id on load if not set', () => {
    const resourceLabel = 'test-resource';

    const provisionButton = new ManifoldDataSsoButton();
    provisionButton.fetchResourceId = jest.fn();
    provisionButton.resourceLabel = resourceLabel;
    provisionButton.componentWillLoad();
    expect(provisionButton.fetchResourceId).toHaveBeenCalledWith(resourceLabel);
  });

  it('does not fetch the resource id on load if set', () => {
    const resourceLabel = 'test-resource';

    const provisionButton = new ManifoldDataSsoButton();
    provisionButton.fetchResourceId = jest.fn();
    provisionButton.resourceLabel = resourceLabel;
    provisionButton.resourceId = resourceLabel;
    provisionButton.componentWillLoad();
    expect(provisionButton.fetchResourceId).not.toHaveBeenCalled();
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
    afterEach(() => {
      fetchMock.restore();
    });

    it('will fetch the resource id', async () => {
      const resourceLabel = 'new-resource';

      fetchMock.mock(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`, [
        Resource,
      ]);

      const page = await newSpecPage({
        components: [ManifoldDataSsoButton],
        html: `
          <manifold-data-sso-button
            resource-label="${resourceLabel}"
          >SSO</manifold-data-sso-button>
        `,
      });

      expect(
        fetchMock.called(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`)
      ).toBe(true);

      const root = page.rootInstance as ManifoldDataSsoButton;
      expect(root.resourceId).toEqual(Resource.id);
    });

    it('will do nothing on a fetch error', async () => {
      const resourceLabel = 'new-resource';

      fetchMock.mock(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`, []);

      const page = await newSpecPage({
        components: [ManifoldDataSsoButton],
        html: `
          <manifold-data-sso-button
            resource-label="${resourceLabel}"
          >SSO</manifold-data-sso-button>
        `,
      });

      expect(
        fetchMock.called(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`)
      ).toBe(true);

      const root = page.rootInstance as ManifoldDataSsoButton;
      expect(root.resourceId).not.toEqual(Resource.id);
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

    it('will trigger a dom event on successful rename', async () => {
      fetchMock.mock(`${connections.prod.connector}/sso`, authCode);

      const page = await newSpecPage({
        components: [ManifoldDataSsoButton],
        html: `
          <manifold-data-sso-button
            resource-label="${Resource.body.label}"
          >SSO</manifold-data-sso-button>
        `,
      });

      const instance = page.rootInstance as ManifoldDataSsoButton;
      instance.success.emit = jest.fn();

      await instance.sso();

      expect(fetchMock.called(`${connections.prod.connector}/sso`)).toBe(true);
      expect(instance.success.emit).toHaveBeenCalledWith({
        message: `${Resource.body.label} successfully ssoed`,
        resourceLabel: Resource.body.label,
        resourceId: Resource.id,
        redirectUrl: authCode.body.redirect_uri,
      });
    });

    it('will trigger a dom event on failed rename', async () => {
      fetchMock.mock(`${connections.prod.connector}/sso`, {
        status: 500,
        body: {
          message: 'ohnoes',
        },
      });

      const page = await newSpecPage({
        components: [ManifoldDataSsoButton],
        html: `
          <manifold-data-sso-button
            resource-label="${Resource.body.label}"
            new-label="test2"
          >SSO</manifold-data-sso-button>
        `,
      });

      const instance = page.rootInstance as ManifoldDataSsoButton;
      instance.error.emit = jest.fn();

      await instance.sso();

      expect(fetchMock.called(`${connections.prod.connector}/sso`)).toBe(true);
      expect(instance.error.emit).toHaveBeenCalledWith({
        message: 'ohnoes',
        resourceLabel: Resource.body.label,
        resourceId: Resource.id,
      });
    });

    it('will do nothing if still loading', async () => {
      fetchMock
        .mock(`${connections.prod.marketplace}/resources/?me&label=test`, [])
        .mock(`${connections.prod.connector}/sso`, 200);

      const page = await newSpecPage({
        components: [ManifoldDataSsoButton],
        html: `
          <manifold-data-sso-button
            loading=""
            resource-label="test"
          >SSO</manifold-data-sso-button>
        `,
      });

      const instance = page.rootInstance as ManifoldDataSsoButton;
      instance.loading = true;

      await instance.sso();

      expect(fetchMock.called(`${connections.prod.connector}/sso`)).toBe(false);
    });

    it('will do nothing if no resourceId is provided', async () => {
      fetchMock
        .mock(`${connections.prod.marketplace}/resources/?me&label=test`, [])
        .mock(`${connections.prod.connector}/sso`, 200);

      const page = await newSpecPage({
        components: [ManifoldDataSsoButton],
        html: `
          <manifold-data-sso-button
            resource-label="test"
          >SSO</manifold-data-sso-button>
        `,
      });

      const instance = page.rootInstance as ManifoldDataSsoButton;
      instance.resourceId = undefined;

      await instance.sso();

      expect(fetchMock.called(`${connections.prod.connector}/sso`)).toBe(false);
    });
  });
});
