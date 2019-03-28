import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'manifold-link-button',
  styleUrl: 'link-button.css',
  shadow: true,
})
export class LinkButton {
  @Prop() href: string;
  @Prop() rel?: string;
  @Prop() target?: string;

  render() {
    return (
      <a href={this.href} rel={this.rel} target={this.target}>
        <slot />
      </a>
    );
  }
}
