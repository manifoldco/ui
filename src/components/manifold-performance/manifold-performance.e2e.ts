import { newE2EPage } from '@stencil/core/testing';

describe('<manifold-performance>', () => {
  it('should receive manifold-time-to-render event', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <manifold-connection>
        <manifold-performance>
          <manifold-plan plan-id="2351kz26adxddkbewu644wx4b186y"></manifold-plan>
        </manifold-performance>
      </manifold-connection>`);
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
