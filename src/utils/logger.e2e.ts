import logger from './logger';

class MockComponent {
  @logger()
  public render(errorMsg?: string) {
    if (errorMsg) {
      throw new Error(errorMsg);
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

    new MockComponent().render('oops');

    const [eventDetail] = errorListener.mock.calls[0];

    expect(eventDetail.bubbles).toBe(true); // event should bubble
    expect(eventDetail.detail).toEqual({ error: 'oops' }); // event should contain original error message
  });
});
