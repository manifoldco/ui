import { newE2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

describe('<manifold-plan-cost>', () => {
  it('displays nothing while loading', async () => {
    const page = await newE2EPage({ html: `<manifold-cost-display />` });
    const el = await page.find('manifold-cost-display >>> .cost');
    expect(el).toEqualHtml('<div class="cost"></div>');
  });

  describe('v0 props', () => {
    it('[compact]: displays no badge when false', async () => {
      const page = await newE2EPage({ html: `<manifold-cost-display />` });
      await page.$eval('manifold-cost-display', (elm: any) => {
        elm.baseCost = 0;
        elm.meteredFeatures = [];
      });
      await page.waitForChanges();
      const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
      expect(el).toEqualHtml('<span itemprop="price">Free</span>');
    });

    it('[compact]: displays badge when true', async () => {
      const page = await newE2EPage({ html: `<manifold-cost-display />` });
      await page.$eval('manifold-cost-display', (elm: any) => {
        elm.baseCost = 0;
        elm.compact = true;
        elm.meteredFeatures = [];
      });
      await page.waitForChanges();
      const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
      expect(el).toEqualHtml(
        '<span itemprop="price"><manifold-badge class="hydrated" data-tag="free">Free</manifold-badge></span>'
      );
    });

    it('[compact]: hides “ / mo” when true', async () => {
      const page = await newE2EPage({ html: `<manifold-cost-display />` });
      await page.$eval('manifold-cost-display', (elm: any) => {
        elm.baseCost = 200;
        elm.compact = true;
      });
      await page.waitForChanges();
      const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
      expect(el).toEqualHtml('<span itemprop="price">$2</span>');
    });

    it('[metered-features]: displays monthly charge if none', async () => {
      const page = await newE2EPage({ html: `<manifold-cost-display />` });
      await page.$eval('manifold-cost-display', (elm: any) => {
        elm.baseCost = 200;
        elm.meteredFeatures = [];
      });
      await page.waitForChanges();
      const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
      expect(el).toEqualHtml('<span itemprop="price">$2<small>&nbsp;/&nbsp;mo</small></span>');
    });

    it('[metered-features]: displays “$0.25 / hr” when metered', async () => {
      const page = await newE2EPage({ html: `<manifold-cost-display />` });
      await page.$eval('manifold-cost-display', (elm: any) => {
        elm.baseCost = 0;
        elm.meteredFeatures = [
          {
            node: {
              numericDetails: {
                unit: 'hr',
                costTiers: [{ cost: 250000000, limit: -1 }],
              },
            },
          },
        ];
      });
      await page.waitForChanges();
      const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
      expect(el).toEqualHtml(`
  <span itemprop="price">
    $0.25
    <small>&nbsp;/&nbsp;hr</small>
  </span>`);
    });

    it('[metered-features]: displays cost in cents if feature is cheap', async () => {
      const page = await newE2EPage({ html: `<manifold-cost-display />` });
      await page.$eval('manifold-cost-display', (elm: any) => {
        elm.baseCost = 0;
        elm.meteredFeatures = [
          {
            node: {
              numericDetails: {
                unit: 'hr',
                costTiers: [{ cost: 250000, limit: -1 }],
              },
            },
          },
        ];
      });
      await page.waitForChanges();
      const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
      expect(el).toEqualHtml(`
  <span itemprop="price">
    $0.25
    <small>&nbsp;per&nbsp;1,000 hrs</small>
  </span>`);
    });

    it('[metered-features]: displays “+ metered” when too many metered costs', async () => {
      const page = await newE2EPage({ html: `<manifold-cost-display />` });
      await page.$eval('manifold-cost-display', (elm: any) => {
        elm.compact = true;
        elm.baseCost = 500;
        elm.meteredFeatures = [{}, {}, {}];
      });
      await page.waitForChanges();
      const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
      expect(el).toEqualHtml(`
  <span itemprop="price">
    $5 + <small>metered usage</small>
  </span>`);
    });

    it('[configurable]: displays “Starting at” when compact', async () => {
      const page = await newE2EPage({ html: `<manifold-cost-display />` });
      await page.$eval('manifold-cost-display', (elm: any) => {
        elm.baseCost = 400;
        elm.compact = true;
        elm.configurable = true;
      });
      await page.waitForChanges();
      const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
      expect(el).toEqualHtml(`
  <span itemprop="price">
    <span class="starting">Starting at</span>
    $4
  </span>`);
    });

    it('[configurable]: doesn’t display “Starting at” when not compact', async () => {
      const page = await newE2EPage({ html: `<manifold-cost-display />` });
      await page.$eval('manifold-cost-display', (elm: any) => {
        elm.baseCost = 400;
        elm.compact = false;
        elm.configurable = true;
      });
      await page.waitForChanges();
      const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
      expect(el).toEqualHtml(`
  <span itemprop="price">
    $4
    <small>&nbsp;/&nbsp;mo</small>
  </span>`);
    });
  });
});
