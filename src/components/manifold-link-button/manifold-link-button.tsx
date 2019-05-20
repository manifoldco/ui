import { h, Component, Prop } from '@stencil/core';

@Component({
  tag: 'manifold-link-button',
  styleUrl: 'link-button.css',
  shadow: true,
})
export class LinkButton {
  @Prop() color?: 'black' | 'white';
  @Prop() href?: string;
  @Prop() onClickEvent?: (e: Event) => void;
  @Prop() rel?: string;
  @Prop() size?: 'small';
  @Prop() target?: string;

  render() {
    return (
      <a
        href={this.href}
        rel={this.rel}
        onClick={this.onClickEvent}
        target={this.target}
        data-color={this.color}
        data-size={this.size}
      >
        <slot />
      </a>
    );
  }
}
