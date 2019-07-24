/* DEPRICATED: replaced by manifold-service-card-view */
import { h, Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'manifold-service-card-view',
  styleUrl: 'manifold-service-card-view.css',
  shadow: true,
})
export class ManifoldServiceView {
  @Element() el: HTMLElement;
  @Prop() name?: string;
  @Prop() description?: string;
  @Prop({ reflect: true }) isFeatured?: boolean;
  @Prop() label?: string;
  @Prop() logo?: string;
  @Prop() productId?: string;
  @Prop() loading?: boolean = false;
  @Prop() isFree?: boolean = false;
  @Prop() asCard?: boolean = true;
  @Prop() hideTags?: boolean = false;

  render() {
    console.warn('DEPRICATED: replaced by manifold-service-card-view');
    return !this.loading ? (
      <div class={this.asCard ? 'card-wrapper' : 'wrapper'}>
        <div class="logo">
          <manifold-lazy-image src={this.logo} alt={this.name} itemprop="image" />
        </div>
        <h3 class="name" itemprop="name">
          {this.name}
        </h3>
        <div class="info">
          <p class="description" itemprop="description">
            {this.description}
          </p>
        </div>
        {!this.hideTags && (
          <div class="tags">
            {this.isFeatured && <manifold-badge>Featured</manifold-badge>}
            {this.isFree && <manifold-badge data-tag="free">Free</manifold-badge>}
          </div>
        )}
      </div>
    ) : (
      // ☠
      <div class={this.asCard ? 'card-wrapper' : 'wrapper'}>
        <div class="logo">
          <manifold-skeleton-img />
        </div>
        <h3 class="name">
          <manifold-skeleton-text>{this.name}</manifold-skeleton-text>
        </h3>
        <div class="info">
          <p class="description">
            <manifold-skeleton-text>{this.description}</manifold-skeleton-text>
          </p>
        </div>
      </div>
    );
  }
}
