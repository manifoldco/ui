import { h, Component, Prop } from '@stencil/core';

@Component({ tag: 'manifold-tooltip-text' })
export class ManifoldTooltipText {
  @Prop() text: string;

  render() {
    return <manifold-tooltip>{this.text}</manifold-tooltip>;
  }
}
