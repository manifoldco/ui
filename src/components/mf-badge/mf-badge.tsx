import { Component } from '@stencil/core';

@Component({
  tag: 'mf-badge',
  styleUrl: 'mf-badge.css',
  shadow: true,
})
export class MfIcon {
  render() {
    return <slot />;
  }
}
