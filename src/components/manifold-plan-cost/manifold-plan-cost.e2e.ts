import { newE2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

describe('<manifold-plan-cost>', () => {
  it('displays nothing while loading', async () => {
    const page = await newE2EPage({ html: '<manifold-plan-cost />' });

    const el = await page.find('manifold-plan-cost >>> div');

    expect(el).toEqualText('');
  });

  // TODO

  // it('displays “Free” (no badge) when large')
  // it('displays “Free” (badge) when small')
  // it('displays “$2.00 / mo” when fixed')
  // it('displays “$0.25 / hour” when measurable')
  // it('displays “$2.00 / mo + 0.25 / hour” when fixed + measurable')
  // it('displays “Starting at $2.00 / mo” when customizable')
});
