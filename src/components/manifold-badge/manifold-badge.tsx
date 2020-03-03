import { h, Component } from '@stencil/core';
import logger, { loadMark } from '../../utils/logger';

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
