import { newE2EPage } from '@stencil/core/testing';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('<manifold-oauth>', () => {
  describe('security', () => {
    it('iframe is URL-locked', async () => {
      const page = await newE2EPage();

      await page.setContent('<manifold-oauth></manifold-oauth>');
      await page.waitForChanges();

      const iframe = await page.find('iframe');
      if (!iframe) {
        throw new Error('iframe not in document');
      }
      const url = await iframe.getAttribute('src');
      expect(url).toBe('https://login.manifold.co/signin/oauth/web');
    });

    it('iframe is sandboxed to only allow scripts', async () => {
      const page = await newE2EPage();

      await page.setContent('<manifold-oauth></manifold-oauth>');
      await page.waitForChanges();

      const iframe = await page.find('iframe');
      if (!iframe) {
        throw new Error('iframe not in document');
      }
      const sandbox = await iframe.getAttribute('sandbox');
      expect(sandbox).toEqual('allow-scripts allow-same-origin');
    });
  });

  describe('browser support', () => {
    it('Firefox: iframe isn’t display: none, but still appears invisible to user', async () => {
      const page = await newE2EPage();

      await page.setContent('<manifold-oauth></manifold-oauth>');
      await page.waitForChanges();
      const iframeStyling = await page.$eval('iframe', (elm: any) => ({
        attrs: {
          allowTransparency: elm.getAttribute('allowtransparency'),
          ariaHidden: elm.getAttribute('aria-hidden'),
          frameborder: elm.getAttribute('frameborder'),
          scrolling: elm.getAttribute('scrolling'),
          tabindex: elm.getAttribute('tabindex'),
        },
        border: elm.style.border,
        display: elm.style.display,
        height: elm.style.height,
        left: elm.style.left,
        margin: elm.style.margin,
        padding: elm.style.padding,
        pointerEvents: elm.style.pointerEvents,
        position: elm.style.position,
        userSelect: elm.style.userSelect,
        visibility: elm.style.visibility,
        width: elm.style.width,
      }));
      expect(iframeStyling).toEqual({
        attrs: {
          allowTransparency: 'true',
          ariaHidden: 'true',
          frameborder: '0',
          scrolling: 'no',
          tabindex: '-1',
        },
        border: 'none',
        display: 'block',
        height: '1px',
        left: '0px',
        margin: '0px',
        padding: '0px',
        pointerEvents: 'none',
        position: 'fixed',
        userSelect: 'none',
        visibility: 'hidden',
        width: '75vw',
      });
    });
  });
});
