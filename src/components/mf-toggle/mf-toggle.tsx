import { Component, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'mf-toggle',
  styleUrl: 'mf-toggle.css',
  scoped: true,
})
export class MfToggle {
  @Prop() ariaLabelledby?: string;
  @Prop() disabled?: boolean;
  @Prop() eventName?: string;
  @Prop() label?: string;
  @Prop() name: string = '';
  @Event({ eventName: this.eventName }) onChange: EventEmitter;

  private onChangeHandler(e: Event) {
    if (!e.target || !this.eventName) return;
    const el = e.target as HTMLInputElement;
    this.onChange.emit({ name: el.getAttribute('name'), value: el.checked === true });
  }

  render() {
    return (
      <label class="wrapper">
        <input
          aria-labelledby={this.ariaLabelledby}
          disabled={this.disabled}
          name={this.name}
          onChange={this.onChangeHandler}
          type="checkbox"
        />
        <div class="toggle" />
        {this.label && <div class="label">{this.label}</div>}
      </label>
    );
  }
}
