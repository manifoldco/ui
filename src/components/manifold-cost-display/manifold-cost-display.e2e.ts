import { newE2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

describe('<manifold-plan-cost>', () => {
  it('displays nothing while loading', async () => {
    const page = await newE2EPage({ html: `<manifold-cost-display />` });
    const el = await page.find('manifold-cost-display >>> .cost');
    expect(el).toEqualHtml('<div class="cost"></div>');
  });

  it('displays “Free” (no badge) when large', async () => {
    const page = await newE2EPage({ html: `<manifold-cost-display />` });
    await page.$eval('manifold-cost-display', (elm: any) => {
      elm.baseCost = 0;
      elm.measuredFeatures = [];
    });
    await page.waitForChanges();
    const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
    expect(el).toEqualHtml('<span itemprop="price">Free</span>');
  });

  it('displays “Free” (badge) when small', async () => {
    const page = await newE2EPage({ html: `<manifold-cost-display />` });
    await page.$eval('manifold-cost-display', (elm: any) => {
      elm.baseCost = 0;
      elm.compact = true;
      elm.measuredFeatures = [];
    });
    await page.waitForChanges();
    const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
    expect(el).toEqualHtml(
      '<span itemprop="price"><manifold-badge class="hydrated" data-tag="free">Free</manifold-badge></span>'
    );
  });

  it('displays “$2.00 / mo” in fixed view', async () => {
    const page = await newE2EPage({ html: `<manifold-cost-display />` });
    await page.$eval('manifold-cost-display', (elm: any) => {
      elm.baseCost = 200;
      elm.measuredFeatures = [];
    });
    await page.waitForChanges();
    const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
    expect(el).toEqualHtml('<span itemprop="price">$2<small>&nbsp;/&nbsp;mo</small></span>');
  });

  it('hides “ / mo” when compact', async () => {
    const page = await newE2EPage({ html: `<manifold-cost-display />` });
    await page.$eval('manifold-cost-display', (elm: any) => {
      elm.baseCost = 200;
      elm.compact = true;
    });
    await page.waitForChanges();
    const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
    expect(el).toEqualHtml('<span itemprop="price">$2</span>');
  });

  it('displays “$0.25 / hr” when measurable', async () => {
    const page = await newE2EPage({ html: `<manifold-cost-display />` });
    await page.$eval('manifold-cost-display', (elm: any) => {
      elm.baseCost = 0;
      elm.measuredFeatures = [
        {
          type: 'number',
          measurable: true,
          value: {
            numeric_details: {
              suffix: 'hr',
              cost_ranges: [{ cost_multiple: 250000000, limit: -1 }],
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

  it('displays “$0.25 per 1000 hrs” when feature is very cheap', async () => {
    const page = await newE2EPage({ html: `<manifold-cost-display />` });
    await page.$eval('manifold-cost-display', (elm: any) => {
      elm.baseCost = 0;
      elm.measuredFeatures = [
        {
          type: 'number',
          measurable: true,
          value: {
            numeric_details: {
              suffix: 'hr',
              cost_ranges: [{ cost_multiple: 250000, limit: -1 }],
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

  it('displays “Starting at” when compact & too many measurable costs', async () => {
    const page = await newE2EPage({ html: `<manifold-cost-display />` });
    await page.$eval('manifold-cost-display', (elm: any) => {
      elm.compact = true;
      elm.baseCost = 500;
      elm.measuredFeatures = [{}, {}, {}];
    });
    await page.waitForChanges();
    const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
    expect(el).toEqualHtml(`
<span itemprop="price">
  <span class="starting">Starting at</span>
  $5
</span>`);
  });

  it('displays “Starting at” when compact & customizable', async () => {
    const page = await newE2EPage({ html: `<manifold-cost-display />` });
    await page.$eval('manifold-cost-display', (elm: any) => {
      elm.baseCost = 400;
      elm.compact = true;
      elm.startingAt = true;
    });
    await page.waitForChanges();
    const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
    expect(el).toEqualHtml(`
<span itemprop="price">
  <span class="starting">Starting at</span>
  $4
</span>`);
  });

  it('doesn’t display “Starting at” when customizable, but not compact', async () => {
    const page = await newE2EPage({ html: `<manifold-cost-display />` });
    await page.$eval('manifold-cost-display', (elm: any) => {
      elm.baseCost = 400;
      elm.startingAt = true;
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
