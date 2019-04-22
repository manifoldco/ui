import { newE2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

describe('manifold-template-card', () => {
  it('renders if it has templates for a category', async () => {
    const page = await newE2EPage({ html: `<manifold-template-card />` });
    await page.$eval('manifold-template-card', (elm: any) => {
      elm.category = 'database';
    });
    await page.waitForChanges();

    expect(await page.find('manifold-template-card >>> a')).not.toBeNull();
  });

  it('doesn’t render if no templates to show', async () => {
    const page = await newE2EPage({ html: `<manifold-template-card />` });
    await page.$eval('manifold-template-card', (elm: any) => {
      elm.category = 'electric-boogaloo';
    });
    await page.waitForChanges();

    expect(await page.find('manifold-template-card >>> a')).toBeNull();
  });
});
