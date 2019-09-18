import { h, Component } from '@stencil/core';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

@Component({
  tag: 'manifold-badge',
  styleUrl: 'mf-badge.css',
  shadow: true,
})
export class ManifoldBadge {
  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return <slot />;
  }
}
