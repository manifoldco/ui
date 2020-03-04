import { h, Component } from '@stencil/core';
import logger, { loadMark } from '../../utils/logger';

@Component({
  tag: 'manifold-skeleton-img',
  styleUrl: 'manifold-skeleton-img.css',
  shadow: true,
})
export class ManifoldSkeletonImg {
  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return <div class="img" />;
  }
}
