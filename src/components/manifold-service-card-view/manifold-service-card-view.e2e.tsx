import { newE2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

// Things tested in other places:
// - link formatting: manifold-marketplace-grid.e2e.tsx
// - click events: manifold-service-card.spec.ts

describe('<manifold-service-card-view>', () => {
  it('displays skeleton', async () => {
    const page = await newE2EPage({
      html: `<manifold-service-card-view></manifold-service-card-view>`,
    });
    page.$eval('manifold-service-card-view', (elm: any) => {
      elm.skeleton = true;
    });
    await page.waitForChanges();
    const skeletonText = await page.find('manifold-service-card-view >>> manifold-skeleton-text');
    expect(skeletonText).not.toBeNull();
  });

  it('passes through CTA slots', async () => {
    const page = await newE2EPage({
      html: `<manifold-service-card-view><button slot="cta" data-testid="my-button">My Button</button></manifold-service-card-view>`,
    });
    await page.waitForChanges();
    const button = await page.find('[data-testid="my-button"]');
    expect(button).not.toBeNull();
  });

  describe('v0 API', () => {
    it('[isFeatured]: hides featured badge without', async () => {
      const page = await newE2EPage({
        html: `<manifold-service-card-view></manifold-service-card-view>`,
      });
      await page.waitForChanges();
      const badge = await page.find('manifold-service-card-view >>> [data-tag="featured"]');
      expect(badge).toBeNull();
    });

    it('[isFeatured]: displays featured badge', async () => {
      const page = await newE2EPage({
        html: `<manifold-service-card-view></manifold-service-card-view>`,
      });
      page.$eval('manifold-service-card-view', (elm: any) => {
        elm.isFeatured = true;
      });
      await page.waitForChanges();
      const badge = await page.find('manifold-service-card-view >>> [data-tag="featured"]');
      expect(badge).not.toBeNull();
    });

    it('[isFree]: hides free badge without', async () => {
      const page = await newE2EPage({
        html: `<manifold-service-card-view></manifold-service-card-view>`,
      });
      await page.waitForChanges();
      const badge = await page.find('manifold-service-card-view >>> [data-tag="free"]');
      expect(badge).toBeNull();
    });

    it('[isFree]: displays free badge', async () => {
      const page = await newE2EPage({
        html: `<manifold-service-card-view></manifold-service-card-view>`,
      });
      page.$eval('manifold-service-card-view', (elm: any) => {
        elm.isFree = true;
      });
      await page.waitForChanges();
      const badge = await page.find('manifold-service-card-view >>> [data-tag="free"]');
      expect(badge).not.toBeNull();
    });
  });
});
