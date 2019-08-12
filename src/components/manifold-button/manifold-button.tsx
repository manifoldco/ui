import { h, Component, Prop, Event, EventEmitter } from '@stencil/core';
import logger from '../../utils/logger';

export type buttonColors = 'black' | 'gray' | 'orange' | 'pink' | 'white';

@Component({
  tag: 'manifold-button',
  styleUrl: 'manifold-button.css',
  shadow: true,
})
export class ManifoldButton {
  @Prop() color?: 'black' | 'gray' | 'orange' | 'pink' | 'white' = 'white';
  @Prop() disabled?: boolean = false;
  @Prop() href?: string;
  @Prop() size?: 'medium' | 'small' = 'medium';
  @Prop() type?: 'button' | 'submit' = 'button';
  @Prop() stencilClickEvent?: (e: MouseEvent) => void;
  @Event({ eventName: 'manifold-button-click', bubbles: true }) buttonClick: EventEmitter;

  onClick = (e: MouseEvent): void => {
    this.buttonClick.emit();

    if (this.stencilClickEvent) {
      this.stencilClickEvent(e);
    }
  };

  @logger()
  render() {
    return (
      <button
        class="button"
        data-color={this.color}
        data-size={this.size}
        disabled={this.disabled}
        onClick={this.onClick}
        type={this.type}
      >
        <slot />
      </button>
    );
  }
}
