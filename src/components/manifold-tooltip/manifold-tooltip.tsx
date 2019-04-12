import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'manifold-tooltip',
  styleUrl: 'style.css',
  shadow: true,
})
export class ManifoldTooltip {
  @Prop() labelText?: string;

  render() {
    return [<slot />, this.labelText && <div class="tooltip">{this.labelText}</div>];
  }
}
