import { h, Component } from '@stencil/core';

@Component({
  tag: 'manifold-skeleton-img',
  styleUrl: 'manifold-skeleton-img.css',
  shadow: true,
})
export class ManifoldSkeletonImg {
  render() {
    return <div class="img" />;
  }
}
