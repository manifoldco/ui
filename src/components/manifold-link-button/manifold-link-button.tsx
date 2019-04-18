import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'manifold-link-button',
  styleUrl: 'link-button.css',
  shadow: true,
})
export class LinkButton {
  @Prop() href?: string;
  @Prop() onClick?: (e: Event) => void;
  @Prop() rel?: string;
  @Prop() target?: string;

  render() {
    return (
      <a href={this.href} rel={this.rel} onClick={this.onClick} target={this.target}>
        <slot />
      </a>
    );
  }
}
