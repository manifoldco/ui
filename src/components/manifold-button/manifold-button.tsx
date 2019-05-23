import { h, Component, Prop } from '@stencil/core';

@Component({
  tag: 'manifold-button',
  styleUrl: 'button.css',
  shadow: true,
})
export class ManifoldButton {
  @Prop() color?: 'black' | 'white';
  @Prop() onClickEvent?: (e: MouseEvent) => void;
  @Prop() size?: 'small';
  @Prop() disabled: boolean = false;
  @Prop() wait: boolean = false;

  render() {
    return (
      <button
        onClick={this.onClickEvent}
        data-color={this.color}
        data-size={this.size}
        data-wait={this.wait}
        disabled={this.disabled}
      >
        <slot />
      </button>
    );
  }
}
