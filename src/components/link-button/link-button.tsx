import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'link-button',
  styleUrl: 'link-button.css',
  shadow: true,
})
export class LinkButton {
  @Prop() id: string = '';
  @Prop() loading: boolean = false;
  @Prop() icon?: string;

  @Prop() href: string;
  @Prop() class?: string;
  @Prop() rel?: string;
  @Prop() target?: string;

  @Prop() kind?: 'cta' | 'warning';

  render() {
    return (
      <a
        href={this.href}
        class={this.class}
        id={this.id}
        rel={this.rel}
        target={this.target}
        data-kind={this.kind}
      >
        <slot />
      </a>
    );
  }
}
