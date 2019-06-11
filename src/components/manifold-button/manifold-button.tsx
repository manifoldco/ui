import { h, Component, Prop, Event, EventEmitter } from '@stencil/core';

interface EventDetail {
  href?: string;
}

@Component({
  tag: 'manifold-button',
  styleUrl: 'manifold-button.css',
  shadow: true,
})
export class ManifoldButton {
  @Prop() color?: 'black' | 'gray' | 'orange' | 'pink' | 'white' = 'white';
  @Prop() disabled?: boolean = false;
  @Prop() href?: string;
  @Prop() preserveEvent: boolean = false;
  @Prop() size?: 'medium' | 'small' = 'medium';
  @Prop() onClickEvent?: (e: MouseEvent) => void;
  @Event({ eventName: 'manifold-button-click', bubbles: true }) buttonClick: EventEmitter;

  onClick = (e: Event): void => {
    if (this.preserveEvent) {
      e.preventDefault();
    }
    const detail: EventDetail = { href: this.href };
    this.buttonClick.emit(detail);
  };

  render() {
    if (this.href) {
      return (
        <a
          onClick={this.onClick}
          class="button"
          href={this.href}
          data-color={this.color}
          data-size={this.size}
        >
          <slot />
        </a>
      );
    }

    return (
      <button
        class="button"
        data-color={this.color}
        data-size={this.size}
        disabled={this.disabled}
        onClick={this.onClickEvent}
        type="button"
      >
        <slot />
      </button>
    );
  }
}
