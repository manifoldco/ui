import { newE2EPage } from '@stencil/core/testing';

describe(`<plan-details>`, () => {
  it('sets its initial features correctly', async () => {
    const page = await newE2EPage({ html: `<plan-details />` });
    await page.$eval('plan-details', (elm: any) => {});
  });
});
