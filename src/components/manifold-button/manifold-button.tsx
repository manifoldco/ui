import { h, Component, Prop } from '@stencil/core';

@Component({
  tag: 'manifold-button',
  styleUrl: 'manifold-button.css',
  shadow: true,
})
export class ManifoldButton {
  @Prop() color?: 'black' | 'gray' | 'orange' | 'pink' | 'white' = 'white';
  @Prop() disabled?: boolean = false;
  @Prop() onClickEvent?: (e: MouseEvent) => void = () => null;
  @Prop() size?: 'medium' | 'small' = 'medium';

  render() {
    return (
      <button
        onClick={this.onClickEvent}
        data-color={this.color}
        data-size={this.size}
        disabled={this.disabled}
      >
        <slot />
      </button>
    );
  }
}
