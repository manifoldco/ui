import { h, Component } from '@stencil/core';
import logger from '../../utils/logger';

@Component({
  tag: 'manifold-badge',
  styleUrl: 'mf-badge.css',
  shadow: true,
})
export class ManifoldBadge {
  @logger()
  render() {
    return <slot />;
  }
}
