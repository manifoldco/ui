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
    });
    await page.waitForChanges();
    const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
    expect(el).toEqualHtml(
      '<span itemprop="price"><manifold-badge class="hydrated">Free</manifold-badge></span>'
    );
  });

  it('displays “$2.00 / mo” in fixed view', async () => {
    const page = await newE2EPage({ html: `<manifold-cost-display />` });
    await page.$eval('manifold-cost-display', (elm: any) => {
      elm.baseCost = 200;
    });
    await page.waitForChanges();
    const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
    expect(el).toEqualHtml('<span itemprop="price">$2.00<small>&nbsp;/&nbsp;mo</small></span>');
  });

  it('hides “ / mo” when compact', async () => {
    const page = await newE2EPage({ html: `<manifold-cost-display />` });
    await page.$eval('manifold-cost-display', (elm: any) => {
      elm.baseCost = 200;
      elm.compact = true;
    });
    await page.waitForChanges();
    const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
    expect(el).toEqualHtml('<span itemprop="price">$2.00</span>');
  });

  it('displays “$0.25 / hr” when measurable', async () => {
    const page = await newE2EPage({ html: `<manifold-cost-display />` });
    await page.$eval('manifold-cost-display', (elm: any) => {
      elm.baseCost = 0;
      elm.measuredCosts = [[25, 'hr']];
    });
    await page.waitForChanges();
    const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
    expect(el).toEqualHtml(`
<span itemprop="price">
  $0.25
  <small>&nbsp;/&nbsp;hr</small>
</span>`);
  });

  it('displays “$5.00 / mo + $0.25 / hr + $1.00 / GB ” when fixed + measurable', async () => {
    const page = await newE2EPage({ html: `<manifold-cost-display />` });
    await page.$eval('manifold-cost-display', (elm: any) => {
      elm.baseCost = 500;
      elm.measuredCosts = [[25, 'hr'], [100, 'GB']];
    });
    await page.waitForChanges();
    const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
    expect(el).toEqualHtml(`
<span itemprop="price">
  $5.00<small>&nbsp;/&nbsp;mo</small>
  <span>&nbsp;+&nbsp;</span>
  $0.25<small>&nbsp;/&nbsp;hr</small>
  <span>&nbsp;+&nbsp;</span>
  $1.00<small>&nbsp;/&nbsp;GB</small>
</span>`);
  });

  it('displays “Starting at” when customizable & compact', async () => {
    const page = await newE2EPage({ html: `<manifold-cost-display />` });
    await page.$eval('manifold-cost-display', (elm: any) => {
      elm.baseCost = 400;
      elm.compact = true;
      elm.isCustomizable = true;
    });
    await page.waitForChanges();
    const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
    expect(el).toEqualHtml(`
<span itemprop="price">
  <span class="starting">Starting at</span>
  $4.00
</span>`);
  });

  it('doesn’t display “Starting at” when customizable, but not compact', async () => {
    const page = await newE2EPage({ html: `<manifold-cost-display />` });
    await page.$eval('manifold-cost-display', (elm: any) => {
      elm.baseCost = 400;
      elm.isCustomizable = true;
    });
    await page.waitForChanges();
    const el = await page.find('manifold-cost-display >>> [itemprop="price"]');
    expect(el).toEqualHtml(`
<span itemprop="price">
  $4.00
  <small>&nbsp;/&nbsp;mo</small>
</span>`);
  });
});
