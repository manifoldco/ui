import { Component, Prop } from '@stencil/core';
import { Option, Value } from 'types/Select';

@Component({
  tag: 'mf-select',
  styleUrl: 'mf-select.css',
  scoped: true,
})
export class MfSelect {
  @Prop() options: Option[] = [];
  @Prop() selectedValue?: Value;
  @Prop() name: string;
  @Prop() required?: boolean;
  @Prop() onChange: (e: UIEvent) => void;

  render() {
    return (
      <select name={this.name} required={this.required} onChange={this.onChange}>
        {this.options.map(({ label, value }) => (
          <option value={value} selected={this.selectedValue === value}>
            {label}
          </option>
        ))}
      </select>
    );
  }
}
