import { newE2EPage } from '@stencil/core/testing';
import { tagName } from 'components/plan-details';

describe(`<${tagName}>`, () => {
  it('sets its initial features correctly', async () => {
    const page = await newE2EPage({ html: `<${tagName} />` });
    await page.$eval(tagName, (elm: any) => {});
  });
});
