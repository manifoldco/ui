import { Component, Prop, State } from '@stencil/core';

@Component({ tag: 'manifold-lazy-image' })
export class ManifoldLazyImage {
  @Prop() src: string;
  @Prop() itemprop: string;
  @Prop() alt: string;
  @State() observer: IntersectionObserver;

  componentWillLoad() {
    this.observer = new IntersectionObserver(this.observe, {
      rootMargin: '0px 0px 50px 0px',
      threshold: 0,
    });
  }

  private observe = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ): void => {
    const entry = entries[0];
    if (entry && entry.isIntersecting) {
      const image = entry.target as HTMLImageElement;
      const source = image.getAttribute('data-src');

      if (source) {
        image.src = source;
      }

      observer.unobserve(image);
    }
  };

  private observeImage = (el?: HTMLElement) => {
    if (el) {
      this.observer.observe(el);
    }
  };

  render() {
    return (
      <img data-src={this.src} alt={this.alt} itemprop={this.itemprop} ref={this.observeImage} />
    );
  }
}
