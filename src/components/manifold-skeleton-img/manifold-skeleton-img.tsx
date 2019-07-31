import { h, Component } from '@stencil/core';
import logger from '../../utils/logger';

@Component({
  tag: 'manifold-skeleton-img',
  styleUrl: 'manifold-skeleton-img.css',
  shadow: true,
})
export class ManifoldSkeletonImg {
  @logger()
  render() {
    return <div class="img" />;
  }
}
