import { newE2EPage } from '@stencil/core/testing';
import { icon } from '../../assets/icons';

/* eslint-disable no-param-reassign */

const iconKey = 'activity';

describe('<mf-icon>', () => {
  it('displays the icon (gradient)', async () => {
    const page = await newE2EPage({
      html: `<mf-icon />`,
    });
    await page.$eval('mf-icon', (elm: any) => {
      elm.icon = 'activity';
      elm.style = '--gradient: linear-gradient(to top right, #329dd1, #4f50a4)';
      elm.gradient = '--gradient';
    });

    await page.waitForChanges();

    const el = await page.find('mf-icon >>> path');
    expect(el.getAttribute('d')).toBe(icon[iconKey]);
    expect(el.getAttribute('d')).toBeTruthy();
  });

  it('displays the icon (solid color)', async () => {
    const page = await newE2EPage({
      html: `<mf-icon />`,
    });

    await page.$eval('mf-icon', (elm: any) => {
      elm.icon = 'activity';
      elm.color = '#888888';
    });

    await page.waitForChanges();

    const el = await page.find('mf-icon >>> path');
    expect(el.getAttribute('d')).toBe(icon[iconKey]);
    expect(el.getAttribute('d')).toBeTruthy();
  });
});
