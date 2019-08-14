import { newE2EPage } from '@stencil/core/testing';
import { activity } from '@manifoldco/icons';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

describe('<manifold-icon>', () => {
  it('displays the icon (gradient)', async () => {
    const page = await newE2EPage({
      html: `<manifold-icon />`,
    });
    const props = { icon: activity };
    await page.$eval(
      'manifold-icon',
      (elm: any, { icon }: any) => {
        elm.icon = icon;
        elm.style = '--gradient: linear-gradient(to top right, #329dd1, #4f50a4)';
        elm.gradient = '--gradient';
      },
      props
    );

    await page.waitForChanges();

    const el = await page.find('manifold-icon >>> path');
    expect(el.getAttribute('d')).toBe(activity);
  });

  it('displays the icon (solid color)', async () => {
    const page = await newE2EPage({
      html: `<manifold-icon />`,
    });

    const props = { icon: activity };
    await page.$eval(
      'manifold-icon',
      (elm: any, { icon }: any) => {
        elm.icon = icon;
        elm.color = '#888888';
      },
      props
    );

    await page.waitForChanges();

    const el = await page.find('manifold-icon >>> path');
    expect(el.getAttribute('d')).toBe(activity);
  });
});
