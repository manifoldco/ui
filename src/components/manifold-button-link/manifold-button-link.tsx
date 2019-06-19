import { h, Component, Prop, Event, EventEmitter } from '@stencil/core';

interface EventDetail {
  href?: string;
}

@Component({
  tag: 'manifold-button-link',
  styleUrl: '../manifold-button/manifold-button.css',
  shadow: true,
})
export class ManifoldButtonLink {
  @Prop() color?: 'black' | 'gray' | 'orange' | 'pink' | 'white' = 'white';
  @Prop() href: string;
  @Prop() preserveEvent?: boolean = false;
  @Prop() rel?: string;
  @Prop() size?: 'medium' | 'small' = 'medium';
  @Prop() target?: string;
  @Prop() stencilClickEvent?: (e: MouseEvent) => void;
  @Event({ eventName: 'manifold-buttonLink-click', bubbles: true }) buttonClick: EventEmitter;

  onClick = (e: MouseEvent): void => {
    if (this.preserveEvent) {
      e.preventDefault();
    }

    const detail: EventDetail = { href: this.href };
    this.buttonClick.emit(detail);

    if (this.stencilClickEvent) {
      this.stencilClickEvent(e);
    }
  };

  render() {
    return (
      <a
        class="button"
        data-color={this.color}
        data-size={this.size}
        href={this.href}
        onClick={this.onClick}
        rel={this.rel}
        target={this.target}
      >
        <slot />
      </a>
    );
  }
}
