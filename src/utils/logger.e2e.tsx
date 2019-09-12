import { h } from '@stencil/core';
import logger, { hasSkeletonElements } from './logger';

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
      component: 'MockComponent', // event should contain class name (above)
      error: 'oops', // event should contain original error message
    });
  });
});

describe('hasSkeletonElements', () => {
  it('returns true if rendered result has any <skeleton-*> descendents', () => {
    class ComponentWithSkeletons {
      @logger()
      public render() {
        return (
          <div>
            <section>
              <manifold-skeleton-text>☠️</manifold-skeleton-text>
            </section>
          </div>
        );
      }
    }
    const render = new ComponentWithSkeletons().render();
    expect(hasSkeletonElements(render)).toEqual(true);
  });
  it('returns false if rendered result contains no <skeleton-*> descendents', () => {
    class ComponentWithoutSkeletons {
      @logger()
      public render() {
        return (
          <div>
            <section>
              <p>💁‍</p>
            </section>
          </div>
        );
      }
    }
    const render = new ComponentWithoutSkeletons().render();
    expect(hasSkeletonElements(render)).toEqual(false);
  });
});
