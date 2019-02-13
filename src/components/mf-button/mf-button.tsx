import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'mf-button',
  styleUrl: 'mf-button.css',
  shadow: true,
})
export class MfButton {
  @Prop() id: string = '';
  @Prop() loading: boolean = false;

  render() {
    return (
      <a>
        <slot />
      </a>
    );
  }
}
