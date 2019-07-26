import puppeteer from 'puppeteer';
import logger from './logger';

class MockComponent {
  @logger()
  public render(errorMsg?: string) {
    if (errorMsg) {
      return new Error(errorMsg);
    }

    return 'success';
  }
}

describe('@logger', () => {
  it('doesn’t affect existing render() function', () => {
    const myComponent = new MockComponent();
    expect(myComponent.render()).toBe('success');
  });

  it('reports errors if render() fails', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // https://github.com/GoogleChrome/puppeteer/blob/master/examples/custom-event.js
    function listenFor(type: string) {
      return page.evaluateOnNewDocument(type => {
        document.addEventListener(type, e => {
          window.onCustomEvent({ type, detail: e.detail });
        });
      }, type);
    }

    const evt = await new Promise(async resolve => {
      const myComponent = new MockComponent();
      await page.exposeFunction('onCustomEvent', e => {
        resolve(e);
      });
      await listenFor('manifold-error');
      myComponent.render('oops');
    });

    expect(evt).toBe('manifold-error', { error: 'oops' });
  });
});
