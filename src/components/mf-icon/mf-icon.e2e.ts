import { newE2EPage } from '@stencil/core/testing';
import { icon } from '../../assets/icons';

const iconKey = 'activity';
const gradient = 'linear-gradient(to top right, #329dd1, #4f50a4)';
const color = '#888888';
describe('<mf-icon>', () => {
  it('displays the icon (gradient)', async () => {
    const page = await newE2EPage({
      html: `<mf-icon style="--gradient: ${gradient}" icon="${iconKey}" gradient="--gradient" />`,
    });

    const el = await page.find('mf-icon >>> path');
    expect(el.getAttribute('d')).toBe(icon[iconKey]);
    expect(el.getAttribute('d')).toBeTruthy();
  });

  it('displays the icon (solid color)', async () => {
    const page = await newE2EPage({
      html: `<mf-icon icon="${iconKey}" color="${color}" />`,
    });

    const el = await page.find('mf-icon >>> path');
    expect(el.getAttribute('d')).toBe(icon[iconKey]);
    expect(el.getAttribute('d')).toBeTruthy();
  });
});
