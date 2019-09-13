import { newSpecPage } from '@stencil/core/testing';
import { ManifoldOauth } from './manifold-oauth';

describe('<manifold-oauth>', () => {
  describe('v0 props', () => {
    // Testing implementation details isn’t preferred, but E2E testing with
    // page.on('request') proved to be too difficult with Stencil.
    it('[tick]: when changed it resets iframe', async () => {
      const page = await newSpecPage({
        components: [ManifoldOauth],
        html: '<manifold-oauth></manifold-oauth>',
      });
      const { root, rootInstance } = page;
      if (!root || !rootInstance) {
        throw new Error('manifold-oauth not in document');
      }

      const mockRefresh = jest.fn();
      rootInstance.refreshIframe = mockRefresh;

      expect(mockRefresh).not.toHaveBeenCalled();
      rootInstance.tick = new Date().getTime();
      await page.waitForChanges();
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  describe('v0 events', () => {
    it('receiveManifoldToken', async () => {
      const data = {
        access_token: 'secret-token',
        expiry: 1,
      };

      const mock = jest.fn();
      const page = await newSpecPage({
        components: [ManifoldOauth],
        html: '<manifold-oauth></manifold-oauth>',
      });
      await page.waitForChanges();
      const component = page.root;
      if (!component) {
        throw new Error('<manifold-oauth> not in document');
      }
      component.addEventListener('receiveManifoldToken', mock);

      // send bad origin, expect token to not be received
      page.rootInstance.tokenListener({ origin: 'http://badorigin.com', data });
      expect(mock).not.toHaveBeenCalled();

      // send correct origin, expect token to be received
      const goodEvent = { origin: 'https://login.manifold.co', data };
      page.rootInstance.tokenListener(goodEvent);
      expect(mock).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            error: undefined,
            expiry: data.expiry,
            token: data.access_token,
          }),
        })
      );
    });
  });
});
