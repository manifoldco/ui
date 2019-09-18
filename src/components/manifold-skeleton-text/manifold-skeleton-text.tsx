import { h, Component } from '@stencil/core';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

@Component({
  tag: 'manifold-skeleton-text',
  styleUrl: 'manifold-skeleton-text.css',
  shadow: true,
})
export class ManifoldSkeletonText {
  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return (
      <div class="wrapper">
        <slot />
      </div>
    );
  }
}
