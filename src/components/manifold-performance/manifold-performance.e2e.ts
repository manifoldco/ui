import { newE2EPage } from '@stencil/core/testing';

describe('<manifold-performance>', () => {
  it('should set data-start attribute on descendent components and receive manifold-time-to-render event', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<manifold-performance><manifold-plan product-label="elegant-cms" plan-label="manifold-developer"></manifold-plan></manifold-performance>`
    );
    const evtSpy = await page.spyOnEvent('manifold-time-to-render');
    let el = await page.find('manifold-plan-details');
    await new Promise(resolve => {
      const interval = setInterval(async () => {
        el = await page.find('manifold-plan-details');
        if (el.getAttribute('data-end')) {
          clearInterval(interval);
          resolve();
        }
      }, 500);
    });
    expect(evtSpy).toHaveReceivedEvent();
  });
});
