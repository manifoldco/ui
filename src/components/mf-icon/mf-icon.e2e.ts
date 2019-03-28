import { newE2EPage } from '@stencil/core/testing';
import { icon } from '../../assets/icons';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

const iconKey = 'activity';

describe('<manifold-icon>', () => {
  it('displays the icon (gradient)', async () => {
    const page = await newE2EPage({
      html: `<manifold-icon />`,
    });
    await page.$eval('manifold-icon', (elm: any) => {
      elm.icon = 'activity';
      elm.style = '--gradient: linear-gradient(to top right, #329dd1, #4f50a4)';
      elm.gradient = '--gradient';
    });

    await page.waitForChanges();

    const el = await page.find('manifold-icon >>> path');
    expect(el.getAttribute('d')).toBe(icon[iconKey]);
    expect(el.getAttribute('d')).toBeTruthy();
  });

  it('displays the icon (solid color)', async () => {
    const page = await newE2EPage({
      html: `<manifold-icon />`,
    });

    await page.$eval('manifold-icon', (elm: any) => {
      elm.icon = 'activity';
      elm.color = '#888888';
    });

    await page.waitForChanges();

    const el = await page.find('manifold-icon >>> path');
    expect(el.getAttribute('d')).toBe(icon[iconKey]);
    expect(el.getAttribute('d')).toBeTruthy();
  });
});
