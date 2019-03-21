import { Component, Prop, Event, EventEmitter, Watch } from '@stencil/core';
import { Option } from 'types/Select';

@Component({
  tag: 'mf-select',
  styleUrl: 'mf-select.css',
  scoped: true,
})
export class MfSelect {
  @Prop() defaultValue?: string;
  @Prop() name: string;
  @Prop() options: Option[] = [];
  @Prop() required?: boolean;
  @Event() updateValue: EventEmitter;
  @Watch('defaultValue') watchHandler(newVal: string) {
    this.updateValue.emit({ name: this.name, value: newVal });
  }

  onChangeHandler = (e: Event) => {
    if (!e.target) return;
    const { value } = e.target as HTMLSelectElement;
    this.updateValue.emit({ name: this.name, value });
  };

  render() {
    return (
      <select name={this.name} required={this.required} onChange={this.onChangeHandler}>
        {this.options.map(({ label, value }) => (
          <option value={value} selected={value === this.defaultValue}>
            {label}
          </option>
        ))}
      </select>
    );
  }
}
