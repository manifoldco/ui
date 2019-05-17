import { h, Component } from '@stencil/core';

@Component({
  tag: 'manifold-skeleton-text',
  styleUrl: 'manifold-skeleton-text.css',
  shadow: true,
})
export class ManifoldSkeletonText {
  render() {
    return (
      <div class="wrapper">
        <slot />
      </div>
    );
  }
}
