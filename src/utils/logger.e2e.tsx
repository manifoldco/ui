import logger from './logger';

/* eslint max-classes-per-file: ["error", 3] */

class MockComponent {
  errorMsg?: string;

  constructor(errorMsg?: string) {
    this.errorMsg = errorMsg;
  }

  @logger()
  public render() {
    if (this.errorMsg) {
      throw new Error(this.errorMsg);
    }

    return 'success';
  }
}

describe('@logger', () => {
  it('passes render() contents through', () => {
    const render = new MockComponent().render();
    expect(render).toBe('success');
  });

  it('reports errors if render() fails', async () => {
    const errorListener = jest.fn();
    window.addEventListener('manifold-error', errorListener);

    new MockComponent('oops').render();

    const [eventDetail] = errorListener.mock.calls[0];

    expect(eventDetail.bubbles).toBe(true); // event should bubble
    expect(eventDetail.detail).toEqual({
      code: 'Error',
      componentName: 'MockComponent', // event should contain class name (above)
      message: 'oops', // event should contain original error message
      uiVersion: '<@NPM_PACKAGE_VERSION@>',
    });
  });
});
