import { newSpecPage } from '@stencil/core/testing';
import { ManifoldOauth } from './manifold-oauth';

describe('<manifold-oauth>', () => {
  describe('v0 API', () => {
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
});
