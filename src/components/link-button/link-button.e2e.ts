import { newE2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign */

const url = 'https://manifold.co';
const label = 'Greatest Website Ever';

describe('<link-button>', () => {
  it('links to the provided href', async () => {
    const page = await newE2EPage({
      html: `<link-button href="${url}">${label}</link-button>`,
    });
    const el = await page.find('link-button >>> a');

    expect(el.getAttribute('href')).toBe(url);
  });

  it('displays the label', async () => {
    const page = await newE2EPage({
      html: `<link-button href="${url}">${label}</link-button>`,
    });
    const el = await page.find('link-button');

    expect(el.innerText).toBe(label);
  });
});
