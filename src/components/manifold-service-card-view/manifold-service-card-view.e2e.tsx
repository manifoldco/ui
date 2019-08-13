import { newE2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

/**
 * Tests handled elsewhere:
 * - skeleton UI: Happo
 * - free badge: Happo
 * - featured badge: Happo
 * - link formatting: manifold-marketplace-grid.e2e.tsx
 * - click events: manifold-service-card-view.spec.ts
 */

describe('<manifold-service-card-view>', () => {
  it('passes through CTA slots', async () => {
    const page = await newE2EPage({
      html: `<manifold-service-card-view><button slot="cta" data-testid="my-button">My Button</button></manifold-service-card-view>`,
    });
    await page.waitForChanges();
    const button = await page.find('[data-testid="my-button"]');
    expect(button).not.toBeNull();
  });
});
