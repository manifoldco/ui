import { newE2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

/**
 * Tests not covered in this file:
 * - Loading view (Happo VRT)
 * - Name/Label/Logo (Happo VRT)
 */

describe('<manifold-resource-card-view>', () => {
  describe('v0 API', () => {
    it('[resource-status]: displays status', async () => {
      const page = await newE2EPage({
        html: `<manifold-resource-card-view></manifold-resource-card-view>`,
      });
      page.$eval('manifold-resource-card-view', (elm: any) => {
        elm.resourceStatus = 'provision';
        elm.resourceId = 'test';
      });
      await page.waitForChanges();
      const el = await page.find('manifold-resource-card-view >>> manifold-resource-status-view');
      const status = el.shadowRoot.querySelector('[role="status"]');
      expect(status && status.innerHTML).toBe('Provision');
    });
  });
});
