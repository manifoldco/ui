import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'mf-toggle',
  styleUrl: 'mf-toggle.css',
  scoped: true,
})
export class MfToggle {
  @Prop() label?: string;
  @Prop() name: string = '';
  @Prop() disabled?: boolean;
  @Prop() ariaLabelledby?: string;

  render() {
    return (
      <label class="wrapper">
        <input
          name={this.name}
          aria-labelledby={this.ariaLabelledby}
          type="checkbox"
          disabled={this.disabled}
        />
        <div class="toggle" />
        {this.label && <div class="label">{this.label}</div>}
      </label>
    );
  }
}
