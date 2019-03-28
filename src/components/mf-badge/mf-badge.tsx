import { Component } from '@stencil/core';

@Component({
  tag: 'manifold-badge',
  styleUrl: 'mf-badge.css',
  shadow: true,
})
export class MfIcon {
  render() {
    return <slot />;
  }
}
