import { h, Component } from '@stencil/core';

@Component({
  tag: 'manifold-badge',
  styleUrl: 'mf-badge.css',
  shadow: true,
})
export class ManifoldBadge {
  render() {
    return <slot />;
  }
}
