import { Component, Prop } from '@stencil/core';
import { FieldType } from '../../types/Input';

@Component({
  tag: 'mf-input',
  styleUrl: 'mf-input.css',
  scoped: true,
})
export class MfInput {
  @Prop() type: FieldType = FieldType.Text;
  @Prop() name: string;
  @Prop() placeholder: string = 'hello';
  @Prop() value?: string | number;
  @Prop() required?: boolean;
  @Prop() onChange: (e: UIEvent) => void;
  @Prop() min?: number;
  @Prop() max?: number;
  @Prop() step?: number;
  @Prop() autocapitalize?: string;

  render() {
    return (
      <input
        class="field"
        type={this.type}
        name={this.name}
        placeholder={this.placeholder}
        value={this.value}
        required={this.required}
        onChange={this.onChange}
        min={this.min}
        max={this.max}
        step={this.step}
        autocapitalize={this.autocapitalize}
      />
    );
  }
}
