import { newE2EPage, E2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

const label = 'Greatest Website Ever';

describe('<manifold-button>', () => {
  let page: E2EPage;

  beforeAll(async () => {
    page = await newE2EPage({
      html: `<manifold-button>${label}</manifold-button>`,
    });

    await page.waitForChanges();
  });

  it('displays the label', async () => {
    const el = await page.find('manifold-button');
    expect(el.innerText).toBe(label);
  });
});
