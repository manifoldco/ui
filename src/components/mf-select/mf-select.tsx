import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { Option, Value } from 'types/Select';

@Component({
  tag: 'mf-select',
  styleUrl: 'mf-select.css',
  scoped: true,
})
export class MfSelect {
  @Prop() eventName?: string;
  @Prop() name: string;
  @Prop() options: Option[] = [];
  @Prop() required?: boolean;
  @Prop() selectedValue?: Value;
  @Event({ eventName: this.eventName }) onChange: EventEmitter;

  private onChangeHandler(e: Event) {
    console.log('changed');
    if (!e.target || !this.eventName) return;
    const el = e.target as HTMLSelectElement;
    this.onChange.emit({ name: el.getAttribute('name'), value: el.value });
  }

  render() {
    return (
      <select name={this.name} required={this.required} onChange={this.onChangeHandler}>
        {this.options.map(({ label, value }) => (
          <option value={value} selected={this.selectedValue === value}>
            {label}
          </option>
        ))}
      </select>
    );
  }
}
