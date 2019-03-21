import { Component, Prop, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'mf-toggle',
  styleUrl: 'mf-toggle.css',
  scoped: true,
})
export class MfToggle {
  @Prop() ariaLabelledby?: string;
  @Prop() defaultValue?: boolean;
  @Prop() disabled?: boolean;
  @Prop() label?: string;
  @Prop() name: string = '';
  @Event() updateValue: EventEmitter;
  @Watch('defaultValue') watchHandler(newVal: boolean) {
    this.updateValue.emit({ name: this.name, value: newVal });
  }

  onChangeHandler = (e: Event) => {
    if (!e.target) return;
    const { checked } = e.target as HTMLInputElement;
    this.updateValue.emit({
      name: this.name,
      value: checked === true,
    });
  };

  render() {
    return (
      <label class="wrapper">
        <input
          aria-labelledby={this.ariaLabelledby}
          disabled={this.disabled}
          name={this.name}
          onChange={this.onChangeHandler}
          checked={this.defaultValue}
          type="checkbox"
        />
        <div class="toggle" />
        {this.label && <div class="label">{this.label}</div>}
      </label>
    );
  }
}
