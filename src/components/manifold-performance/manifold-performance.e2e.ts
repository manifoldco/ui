import { newE2EPage } from '@stencil/core/testing';

describe('<manifold-performance>', () => {
  it('should receive manifold-time-to-render event', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<manifold-performance><manifold-plan product-label="elegant-cms" plan-label="manifold-developer"></manifold-plan></manifold-performance>`
    );
    const evtSpy = await page.spyOnEvent('manifold-time-to-render');
    await new Promise(resolve => {
      const interval = setInterval(async () => {
        if (evtSpy.events.length > 0) {
          clearInterval(interval);
          resolve();
        }
      }, 500);
    });
    expect(evtSpy).toHaveReceivedEvent();
  });
});
