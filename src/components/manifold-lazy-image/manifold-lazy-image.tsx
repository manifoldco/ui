import { h, Component, Prop, State } from '@stencil/core';

@Component({ tag: 'manifold-lazy-image' })
export class ManifoldLazyImage {
  @Prop() src: string;
  @Prop() itemprop?: string;
  @Prop() alt: string;
  @State() observer: IntersectionObserver;

  componentWillLoad() {
    this.observer = new IntersectionObserver(this.observe);
  }

  private observe = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ): void => {
    const entry = entries.find(({ isIntersecting }) => isIntersecting === true);
    if (!entry) return;

    const image = entry.target as HTMLImageElement;
    image.onload = () => image.setAttribute('data-loaded', 'true');
    const source = image.getAttribute('data-src');

    if (source) {
      image.src = source;
    }

    observer.unobserve(image);
  };

  private observeImage = (el?: HTMLElement) => {
    if (el) {
      this.observer.observe(el);
    }
  };

  render() {
    // TODO reimplement lazy loading and ensure it works on search in manifold-marketplace
    return (
      <img
        src={this.src}
        data-loaded
        alt={this.alt}
        itemprop={this.itemprop}
        loading="lazy"
        ref={this.observeImage}
      />
    );
  }
}
